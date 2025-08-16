import React, { useState, useEffect } from 'react';
import { supabase, isDemoMode } from './supabaseClient';

const App = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  // Enhanced Dashboard Component with Supabase
  const Dashboard = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [backendConnected, setBackendConnected] = useState(false);

    // Fetch opportunities from Supabase
  // In your Dashboard component, replace the fetchOpportunities function:
  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      if (isDemoMode || !supabase) {
        console.log('🔄 Demo mode: Using mock data');
        // Demo data that works without API keys
        setOpportunities([
          { rank: 1, base_token_symbol: 'PEPE', base_token_name: 'Pepe', score: 9.2, price_change_24h: 87.3, volume_24h: 45600000, dex_id: 'uniswapv3', signals: ['🐋 Whale Activity', '📈 Volume Surge'] },
          { rank: 2, base_token_symbol: 'DOGE', base_token_name: 'Dogecoin', score: 8.7, price_change_24h: 23.1, volume_24h: 12300000, dex_id: 'uniswapv2', signals: ['📈 Trending', '💎 High Volume'] },
          { rank: 3, base_token_symbol: 'SHIB', base_token_name: 'Shiba Inu', score: 8.1, price_change_24h: 45.2, volume_24h: 23400000, dex_id: 'pancakeswapv2', signals: ['🔥 Hot Momentum'] },
          { rank: 4, base_token_symbol: 'BONK', base_token_name: 'Bonk', score: 7.9, price_change_24h: 67.3, volume_24h: 12600000, dex_id: 'raydium', signals: ['🚀 Explosive'] },
          { rank: 5, base_token_symbol: 'FLOKI', base_token_name: 'Floki Inu', score: 7.6, price_change_24h: 34.7, volume_24h: 8900000, dex_id: 'quickswap', signals: ['📈 Rising'] }
        ]);
        setBackendConnected(false); // Show "Demo Mode" instead of "Database Online"
      } else {
        // Real Supabase connection
        const { data, error } = await supabase
          .from('opportunities')
          .select('*')
          .order('score', { ascending: false })
          .limit(10);

        if (error) throw error;
        console.log('✅ Supabase data loaded:', data?.length, 'opportunities');
        setOpportunities(data || []);
        setBackendConnected(true);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      // Always fallback to demo data on error
      setOpportunities([
        { rank: 1, base_token_symbol: 'PEPE', base_token_name: 'Pepe', score: 9.2, price_change_24h: 87.3, volume_24h: 45600000, dex_id: 'demo' }
      ]);
      setBackendConnected(false);
    }
    setLoading(false);
  };

    useEffect(() => {
      fetchOpportunities();
    }, []);

    const formatNumber = (num) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
      return `$${num?.toFixed(2) || '0.00'}`;
    };

    return (
      <div className="min-h-screen bg-[#0d1421] text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold">L</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">LiquidiTick</h1>
                    <p className="text-gray-400">Professional Trading Intelligence Platform</p>
                    
                    {/* Status Indicators */}
                    <div className="flex items-center space-x-4 mt-2">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                        backendConnected 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span>{backendConnected ? 'Database Online' : 'Using Mock Data'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={fetchOpportunities}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                  >
                    {loading ? 'Refreshing...' : '🔄 Refresh'}
                  </button>
                  <button
                    onClick={() => setShowDashboard(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    ← Back to Landing
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="mb-6">
            <div className="bg-[#0d1421] rounded-xl border border-blue-900/30 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-white">AI Market Intelligence</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-blue-400 text-sm font-medium mb-1">Market Sentiment</p>
                      <p className="text-white">🔥 BULLISH - Strong retail participation in meme tokens</p>
                    </div>
                    <div>
                      <p className="text-blue-400 text-sm font-medium mb-1">Key Trend</p>
                      <p className="text-white">High-volume breakouts • Layer 2 ecosystem growth</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                    <p className="text-sm text-gray-300">
                      <strong className="text-blue-400">⚡ Recommendation:</strong> Focus on tokens with >$1M volume and strong liquidity. Avoid sub-$50K liquidity plays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Opportunities Table */}
          <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-white">Live Opportunities</h2>
                  <p className="text-sm text-gray-400">
                    {loading ? 'Loading opportunities...' : `${opportunities.length} opportunities found`}
                  </p>
                </div>
                <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30">
                  {backendConnected ? 'Live Data' : 'Demo Mode'}
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Scanning markets for opportunities...</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {opportunities.map((opp, index) => (
                  <div key={index} className="p-6 hover:bg-gray-800/30 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                          opp.score >= 9 ? 'bg-green-600' :
                          opp.score >= 8 ? 'bg-yellow-600' :
                          opp.score >= 7 ? 'bg-blue-600' : 'bg-gray-600'
                        }`}>
                          #{opp.rank || index + 1}
                        </div>
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {opp.base_token_symbol?.charAt(0) || 'T'}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{opp.base_token_symbol || 'TOKEN'}</h3>
                          <p className="text-gray-400 text-sm">{opp.base_token_name || 'Token Name'}</p>
                          <p className="text-xs text-gray-500">{opp.dex_id || 'uniswap'}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-lg text-sm font-bold border mb-2 ${
                          opp.score >= 9 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          opp.score >= 8 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          opp.score >= 7 ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}>
                          {opp.score}/10
                        </div>
                        <div className={`text-sm font-semibold ${
                          (opp.price_change_24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {(opp.price_change_24h || 0) >= 0 ? '+' : ''}{(opp.price_change_24h || 0).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-400">
                          Vol: {formatNumber(opp.volume_24h || 0)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Landing Page (same as before)
  const LandingPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LiquidiTick
              </div>
              
              <button 
                onClick={() => setShowDashboard(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Find <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Explosive</span> Crypto Opportunities Before Everyone Else
                </h1>
                
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  LiquidiTick AI scans 6+ blockchains in real-time, scoring every opportunity 0-10 using advanced AI. Get professional-grade crypto intelligence at a fraction of enterprise costs.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Start Free Trial
                  </button>
                  <button className="bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-200">
                    See Live Demo
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">10,000+</div>
                    <div className="text-blue-200 text-sm">Tokens Scanned Daily</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">6+</div>
                    <div className="text-blue-200 text-sm">Blockchains Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">0-10</div>
                    <div className="text-blue-200 text-sm">AI Scoring System</div>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Preview */}
              <div className="relative">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold mr-3">
                      🚀
                    </div>
                    <div className="font-bold text-gray-800">Live Opportunities</div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { token: 'PEPE', change: '+1,247%', score: '9.2', icon: 'P', color: 'from-green-500 to-emerald-600' },
                      { token: 'SHIB', change: '+89%', score: '8.7', icon: 'S', color: 'from-blue-500 to-indigo-600' },
                      { token: 'DOGE', change: '+34%', score: '7.9', icon: 'D', color: 'from-purple-500 to-pink-600' }
                    ].map((opp, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition-all duration-200">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 bg-gradient-to-r ${opp.color} rounded-full flex items-center justify-center text-white font-bold text-sm mr-3`}>
                            {opp.icon}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{opp.token}</div>
                            <div className="text-sm text-gray-500">{opp.change} (24h)</div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                          {opp.score}/10
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  // Render based on state
  if (showDashboard) {
    return <Dashboard />;
  }

  return <LandingPage />;
};

export default App;