import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import FreemiumManager from './FreemiumManager';
import UpgradeModal from './UpgradeModal';

const CryptoDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [allTokens, setAllTokens] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('paginated');

  // Advanced Filtering States
  const [filters, setFilters] = useState({
    token: '',
    minScore: 0,
    minVolume: 0,
    minLiquidity: 0,
    opportunityType: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  // FREEMIUM STATES
  const [freemiumManager] = useState(new FreemiumManager());
  const [upgradeModal, setUpgradeModal] = useState({ show: false, promptData: {} });
  const [usageInfo, setUsageInfo] = useState({ remaining: 10, canAccess: true });
  const [userTier, setUserTier] = useState('free');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // FREEMIUM FUNCTIONS
  const updateUsageInfo = () => {
    const canAccess = freemiumManager.canAccess();
    const remaining = freemiumManager.getRemainingCount();
    setUsageInfo({ remaining, canAccess });
  };

  const handleUpgrade = () => {
    setUserTier('pro');
    localStorage.setItem('liquiditick_user_tier', 'pro');
    setUpgradeModal({ show: false, promptData: {} });
    setShowSuccessModal(true);
  };

  const resetUsageForTesting = () => {
    freemiumManager.resetUsage();
    setUserTier('free');
    localStorage.setItem('liquiditick_user_tier', 'free');
    updateUsageInfo();
    setUpgradeModal({ show: false, promptData: {} });
    
    if (process.env.NODE_ENV === 'development') {
      alert('🔧 DEBUG: Usage reset to 10/10 and tier set to Free');
    }
  };

  const getFreeUserOpportunityLimit = (opportunities) => {
    if (userTier !== 'free') {
      return opportunities;
    }
    const maxShow = Math.min(usageInfo.remaining + 3, 10);
    return opportunities.slice(0, maxShow);
  };

  const fetchOpportunities = async (isUserTriggered = false) => {
    console.log('🔒 fetchOpportunities called with isUserTriggered:', isUserTriggered);
    
    if (isUserTriggered && userTier === 'free') {
      if (!freemiumManager.canAccess()) {
        const upgradePrompt = freemiumManager.getUpgradePrompt();
        setUpgradeModal({ show: true, promptData: upgradePrompt });
        return;
      }
      
      freemiumManager.recordUsage();
      const remaining = freemiumManager.getRemainingCount();
      const canAccess = freemiumManager.canAccess();
      setUsageInfo({ remaining, canAccess });
      console.log('🔒 Usage recorded. Remaining:', remaining);
    }

    setLoading(true);
    try {
      // Build Supabase query
      let query = supabase
        .from('opportunities')
        .select('*')
        .order('score', { ascending: false });

      // Apply filters
      if (filters.token) {
        query = query.ilike('base_token_symbol', `%${filters.token}%`);
      }
      if (filters.minScore > 0) {
        query = query.gte('score', filters.minScore);
      }
      if (filters.minVolume > 0) {
        query = query.gte('volume_24h', filters.minVolume);
      }
      if (filters.minLiquidity > 0) {
        query = query.gte('liquidity', filters.minLiquidity);
      }
      if (filters.opportunityType) {
        query = query.eq('opportunity_type', filters.opportunityType);
      }

      const { data: opportunities, error } = await query.limit(50);

      if (error) {
        throw error;
      }

      console.log('📋 Opportunities fetched from Supabase:', opportunities.length);
      setOpportunities(opportunities || []);
      setBackendConnected(true);
      setLastUpdate(new Date());

    } catch (error) {
      console.error('Supabase connection failed:', error);
      setBackendConnected(false);
      // Fallback mock data
      const mockOpportunities = [
        {
          rank: 1, score: 9.2,
          base_token_symbol: 'PEPE', base_token_name: 'Pepe',
          price_usd: 0.00001234, price_change_24h: 87.3, price_change_1h: 15.7,
          volume_24h: 45600000, liquidity: 2890000, market_cap: 125000000, dex_id: 'uniswapv3',
          signals: ['🐋 Whale Activity', '📈 Volume Surge', '⚡ Momentum'], opportunity_type: 'momentum'
        },
        {
          rank: 2, score: 8.7,
          base_token_symbol: 'DOGE', base_token_name: 'Dogecoin',
          price_usd: 0.08234, price_change_24h: 23.1, price_change_1h: 5.2,
          volume_24h: 12300000, liquidity: 890000, market_cap: 95000000, dex_id: 'uniswapv2',
          signals: ['📈 Trending', '💎 High Volume'], opportunity_type: 'moonshot'
        }
      ];
      console.log('📋 Using mock opportunities:', mockOpportunities.length);
      setOpportunities(mockOpportunities);
      setLastUpdate(new Date());
    }
    setLoading(false);
  };

  const fetchAvailableTokens = async () => {
    try {
      const { data: tokens, error } = await supabase
        .from('opportunities')
        .select('base_token_symbol')
        .order('base_token_symbol');

      if (error) throw error;

      const uniqueTokens = [...new Set(tokens.map(t => t.base_token_symbol))];
      setAllTokens(uniqueTokens);
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
      setAllTokens(['PEPE', 'DOGE', 'SHIB', 'BONK', 'FLOKI']);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: stats, error } = await supabase
        .from('platform_stats')
        .select('*')
        .single();

      if (error) throw error;

      setStats({
        ...stats,
        total_opportunities: opportunities.length
      });
    } catch (error) {
      console.log('📋 Using fallback stats');
      setStats({
        total_opportunities: opportunities.length,
        win_rate: 73.2,
        avg_return: 24.7,
        subscribers: 247,
        monthly_revenue: 7161
      });
    }
  };

  useEffect(() => {
    if (opportunities.length > 0) {
      console.log('📋 Opportunities loaded, updating stats. Count:', opportunities.length);
      fetchStats();
    }
  }, [opportunities.length]);

  // CSV Export Function
// CSV Export Function
  const handleExportCSV = async () => {
    if (userTier === 'free') {
      setUpgradeModal({ 
        show: true, 
        promptData: {
          show: true,
          type: 'feature_locked',
          title: '📊 CSV Export - Pro Feature',
          message: 'CSV exports are available for Pro subscribers. Upgrade to export unlimited data and get advanced reporting features!',
          ctaText: 'Upgrade to Pro - $29/month'
        }
      });
      return;
    }

    setExportLoading(true);
    try {
      // Use opportunities directly instead of displayedOpportunities
      const dataToExport = opportunities.slice(0, 50); // Export up to 50 opportunities
      
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Rank,Symbol,Name,AI Score,Price USD,Change 1h %,Change 24h %,Volume 24h,Liquidity,Market Cap,DEX,Chain,Type,Signals\n"
        + dataToExport.map(opp => 
            `${opp.rank || 'N/A'},${opp.base_token_symbol || 'N/A'},${opp.base_token_name || 'N/A'},${opp.score || 0},${opp.price_usd || 0},${opp.price_change_1h || 0},${opp.price_change_24h || 0},${opp.volume_24h || 0},${opp.liquidity || 0},${opp.market_cap || 0},${opp.dex_id || 'N/A'},${opp.chain_id || 'N/A'},${opp.opportunity_type || 'N/A'},"${opp.signals?.join(' | ') || 'N/A'}"`
          ).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `liquiditick_opportunities_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('✅ CSV export completed successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('❌ Export failed. Please try again.');
    }
    setExportLoading(false);
  };


  // Continue with rest of your component logic...
  // [Include all the other functions and JSX from your current CryptoDashboard.js]
  // [The rest remains the same as your current implementation]

  return (
    // Your existing JSX here - just replace the fetchOpportunities, fetchStats, and fetchAvailableTokens functions above
    <div className="min-h-screen bg-[#0d1421]">
      {/* Rest of your component JSX stays the same */}
    </div>
  );
};

export default CryptoDashboard;