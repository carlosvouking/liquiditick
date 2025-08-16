# simple_scanner.py - ULTIMATE DYNAMIC CRYPTO SCANNER
import requests
import time
import random
from datetime import datetime
import logging
from collections import defaultdict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DexscreenerAPI:
    def __init__(self):
        self.base_url = "https://api.dexscreener.com/latest/dex"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
    def get_dynamic_trending_tokens(self, limit=150):
        """🚀 ULTIMATE DYNAMIC TOKEN DISCOVERY"""
        logger.info("🔍 Starting MEGA dynamic scan across all sources...")
        all_pairs = []
        
        # 🎯 Strategy 1: Trending Keywords Search
        trending_keywords = [
            # Meme coins
            "pepe", "doge", "shib", "floki", "bonk", "wojak", "ape", "meme",
            # Popular terms
            "moon", "safe", "baby", "elon", "trump", "biden", "ai", "rocket",
            # DeFi terms
            "swap", "token", "coin", "defi", "yield", "farm", "stake",
            # Trending patterns
            "pump", "gem", "x100", "trending", "new", "launch"
        ]
        
        for keyword in trending_keywords:
            try:
                pairs = self._search_by_keyword(keyword, limit=15)
                if pairs:
                    all_pairs.extend(pairs)
                    logger.info(f"🔍 '{keyword}': {len(pairs)} pairs found")
                time.sleep(0.1)  # Rate limiting
            except Exception as e:
                logger.debug(f"Keyword '{keyword}' failed: {e}")
        
        # 🌐 Strategy 2: Multi-Chain Top Performers  
        chains = ['ethereum', 'bsc', 'polygon', 'arbitrum', 'solana', 'avalanche']
        for chain in chains:
            try:
                pairs = self._get_chain_top_pairs(chain, limit=25)
                if pairs:
                    all_pairs.extend(pairs)
                    logger.info(f"⛓️ {chain}: {len(pairs)} top pairs")
                time.sleep(0.2)  # Rate limiting
            except Exception as e:
                logger.debug(f"Chain '{chain}' scan failed: {e}")
        
        # 💎 Strategy 3: Volume Discovery
        try:
            volume_pairs = self._discover_high_volume_tokens(limit=40)
            if volume_pairs:
                all_pairs.extend(volume_pairs)
                logger.info(f"💎 Volume discovery: {len(volume_pairs)} high-volume pairs")
        except Exception as e:
            logger.debug(f"Volume discovery failed: {e}")
        
        # 🎲 Strategy 4: Random Discovery (find hidden gems)
        try:
            random_pairs = self._random_discovery(limit=20)
            if random_pairs:
                all_pairs.extend(random_pairs)
                logger.info(f"🎲 Random discovery: {len(random_pairs)} random pairs")
        except Exception as e:
            logger.debug(f"Random discovery failed: {e}")
        
        # 🧹 Clean and deduplicate
        unique_pairs = self._deduplicate_pairs(all_pairs)
        processed_pairs = self._process_token_data(unique_pairs)
        
        logger.info(f"🎯 TOTAL DISCOVERED: {len(processed_pairs)} unique opportunities")
        return processed_pairs[:limit]
    
    def _search_by_keyword(self, keyword, limit=15):
        """Enhanced keyword search with multiple attempts"""
        try:
            url = f"{self.base_url}/search"
            params = {"q": keyword}
            
            response = self.session.get(url, params=params, timeout=12)
            if response.status_code == 200:
                data = response.json()
                pairs = data.get('pairs', [])
                
                # Filter for quality
                quality_pairs = []
                for pair in pairs[:limit]:
                    if self._is_quality_pair(pair):
                        quality_pairs.append(pair)
                
                return quality_pairs
            
        except Exception as e:
            logger.debug(f"Keyword search '{keyword}' error: {e}")
            return []
    
    def _get_chain_top_pairs(self, chain, limit=25):
        """Get top pairs by chain with multiple strategies"""
        pairs = []
        
        # Strategy A: Direct chain endpoint
        try:
            chain_mapping = {
                'ethereum': 'ethereum',
                'bsc': 'bsc', 
                'polygon': 'polygon',
                'arbitrum': 'arbitrum',
                'solana': 'solana',
                'avalanche': 'avalanche'
            }
            
            if chain in chain_mapping:
                # Try different approaches for each chain
                search_terms = ['', 'trending', 'volume', 'new']
                
                for term in search_terms:
                    try:
                        if term:
                            url = f"{self.base_url}/search"
                            params = {"q": f"{term} {chain}"}
                        else:
                            # Try to get general pairs
                            url = f"{self.base_url}/search"
                            params = {"q": chain}
                        
                        response = self.session.get(url, params=params, timeout=10)
                        if response.status_code == 200:
                            data = response.json()
                            chain_pairs = data.get('pairs', [])
                            
                            # Filter for this specific chain
                            filtered_pairs = []
                            for pair in chain_pairs:
                                chain_id = pair.get('chainId', '').lower()
                                if (chain_id == chain or 
                                    (chain == 'bsc' and 'bsc' in chain_id) or
                                    (chain == 'ethereum' and ('ethereum' in chain_id or chain_id == 'eth'))):
                                    if self._is_quality_pair(pair):
                                        filtered_pairs.append(pair)
                            
                            pairs.extend(filtered_pairs[:10])
                            if len(pairs) >= limit:
                                break
                                
                    except Exception as e:
                        continue
                        
        except Exception as e:
            logger.debug(f"Chain scan error for {chain}: {e}")
        
        return pairs[:limit]
    
    def _discover_high_volume_tokens(self, limit=40):
        """Discover tokens with high trading volume"""
        volume_pairs = []
        
        # Search for volume-related terms
        volume_terms = [
            "million volume", "high volume", "trending volume",
            "1M", "10M", "100M", "volume surge", "massive volume"
        ]
        
        for term in volume_terms:
            try:
                pairs = self._search_by_keyword(term, limit=8)
                volume_pairs.extend(pairs)
            except Exception as e:
                continue
        
        # Sort by volume and return top performers
        try:
            volume_sorted = sorted(volume_pairs,
                key=lambda x: self._safe_float(x.get('volume', {}).get('h24', 0)),
                reverse=True)
            return volume_sorted[:limit]
        except Exception as e:
            return volume_pairs[:limit]
    
    def _random_discovery(self, limit=20):
        """Random discovery to find hidden gems"""
        random_pairs = []
        
        # Random single letters and numbers (often find new tokens)
        random_searches = [
            "a", "x", "z", "1", "2", "3", "moon", "gem", "new",
            "token", "coin", "defi", "yield", "safe", "meta"
        ]
        
        # Randomly sample searches
        selected_searches = random.sample(random_searches, min(8, len(random_searches)))
        
        for search_term in selected_searches:
            try:
                pairs = self._search_by_keyword(search_term, limit=5)
                random_pairs.extend(pairs)
            except Exception as e:
                continue
        
        return random_pairs[:limit]
    
    def _is_quality_pair(self, pair):
        """Determine if a pair meets quality standards"""
        try:
            volume_24h = self._safe_float(pair.get('volume', {}).get('h24', 0))
            liquidity = self._safe_float(pair.get('liquidity', {}).get('usd', 0))
            price_usd = self._safe_float(pair.get('priceUsd', 0))
            
            # Quality thresholds
            min_volume = 10000      # $10K minimum volume
            min_liquidity = 5000    # $5K minimum liquidity
            min_price = 0.00000001  # Minimum price to avoid completely dead tokens
            
            base_token = pair.get('baseToken', {})
            symbol = base_token.get('symbol', '').upper()
            
            # Exclude obvious scams/test tokens
            scam_indicators = ['TEST', 'SCAM', 'FAKE', 'NULL', 'UNDEFINED']
            if any(indicator in symbol for indicator in scam_indicators):
                return False
            
            return (volume_24h >= min_volume and 
                    liquidity >= min_liquidity and 
                    price_usd >= min_price and
                    len(symbol) >= 2 and len(symbol) <= 20)  # Reasonable symbol length
                    
        except Exception as e:
            return False
    
    def _deduplicate_pairs(self, pairs):
        """Remove duplicates based on pair address and base token"""
        seen_pairs = set()
        seen_tokens = defaultdict(list)  # Track tokens to limit per token
        unique_pairs = []
        
        # Sort by volume first to prioritize high-volume pairs
        try:
            pairs_sorted = sorted(pairs,
                key=lambda x: self._safe_float(x.get('volume', {}).get('h24', 0)),
                reverse=True)
        except:
            pairs_sorted = pairs
        
        for pair in pairs_sorted:
            pair_address = pair.get('pairAddress', '')
            base_token_address = pair.get('baseToken', {}).get('address', '')
            symbol = pair.get('baseToken', {}).get('symbol', '').upper()
            
            # Skip if we've seen this exact pair
            if pair_address and pair_address in seen_pairs:
                continue
                
            # Limit to 3 pairs per token symbol to ensure diversity
            if len(seen_tokens[symbol]) >= 3:
                continue
            
            if pair_address:
                seen_pairs.add(pair_address)
                seen_tokens[symbol].append(pair)
                unique_pairs.append(pair)
        
        logger.info(f"🧹 Deduplicated: {len(pairs)} → {len(unique_pairs)} unique pairs")
        return unique_pairs
    
    def _process_token_data(self, pairs_data):
        """Enhanced token data processing"""
        processed_pairs = []
        
        for pair in pairs_data:
            try:
                base_token = pair.get('baseToken', {})
                quote_token = pair.get('quoteToken', {})
                volume_data = pair.get('volume', {})
                price_change = pair.get('priceChange', {})
                liquidity_data = pair.get('liquidity', {})
                
                processed_pair = {
                    'pair_address': pair.get('pairAddress', 'N/A'),
                    'base_token_address': base_token.get('address', 'N/A'),
                    'base_token_symbol': base_token.get('symbol', 'UNKNOWN'),
                    'base_token_name': base_token.get('name', 'Unknown Token'),
                    'quote_token_symbol': quote_token.get('symbol', 'ETH'),
                    'dex_id': pair.get('dexId', 'unknown'),
                    'chain_id': pair.get('chainId', 'ethereum'),
                    'price_native': self._safe_float(pair.get('priceNative', 0)),
                    'price_usd': self._safe_float(pair.get('priceUsd', 0)),
                    'volume_24h': self._safe_float(volume_data.get('h24', 0)),
                    'volume_6h': self._safe_float(volume_data.get('h6', 0)),
                    'volume_1h': self._safe_float(volume_data.get('h1', 0)),
                    'price_change_24h': self._safe_float(price_change.get('h24', 0)),
                    'price_change_6h': self._safe_float(price_change.get('h6', 0)),
                    'price_change_1h': self._safe_float(price_change.get('h1', 0)),
                    'liquidity': self._safe_float(liquidity_data.get('usd', 0)),
                    'fdv': self._safe_float(pair.get('fdv', 0)),
                    'market_cap': self._safe_float(pair.get('marketCap', 0)),
                    'pair_created_at': pair.get('pairCreatedAt', 0),
                    'timestamp': datetime.now().isoformat()
                }
                
                # Enhanced quality check
                if (processed_pair['price_usd'] > 0 and 
                    processed_pair['volume_24h'] > 5000 and
                    processed_pair['base_token_symbol'] != 'UNKNOWN' and
                    len(processed_pair['base_token_symbol']) >= 2):
                    processed_pairs.append(processed_pair)
                    
            except Exception as e:
                logger.warning(f"Error processing pair: {e}")
                continue
                
        logger.info(f"✅ Processed {len(processed_pairs)} high-quality pairs")
        return processed_pairs
    
    def _safe_float(self, value):
        """Safely convert value to float"""
        try:
            if value is None or value == '':
                return 0.0
            return float(value)
        except (ValueError, TypeError):
            return 0.0

class TokenScanner:
    def __init__(self):
        self.dex_api = DexscreenerAPI()
        
    def scan_for_opportunities(self):
        """🚀 ULTIMATE OPPORTUNITY SCANNER"""
        logger.info("🚀 Starting ULTIMATE MEGA SCAN...")
        start_time = time.time()
        
        # Get massive dynamic dataset
        all_pairs = self.dex_api.get_dynamic_trending_tokens(limit=200)
        logger.info(f"📊 Analyzing {len(all_pairs)} pairs from ALL sources...")
        
        # Enhanced opportunity analysis
        opportunities = self._analyze_ultimate_opportunities(all_pairs)
        
        # Smart ranking with diversity
        ranked_opportunities = self._ultimate_ranking(opportunities)
        
        scan_time = time.time() - start_time
        logger.info(f"🎯 SCAN COMPLETE: {len(ranked_opportunities)} opportunities found in {scan_time:.1f}s")
        
        return ranked_opportunities
    
    def _analyze_ultimate_opportunities(self, pairs):
        """🎯 ULTIMATE OPPORTUNITY ANALYSIS"""
        opportunities = []
        
        for pair in pairs:
            try:
                score = 0
                signals = []
                opportunity_type = 'standard'
                
                # 📊 Volume Analysis (0-4 points)
                volume = pair['volume_24h']
                if volume > 50000000:  # $50M+
                    score += 4
                    signals.append('🌊 Mega Volume')
                elif volume > 10000000:  # $10M+
                    score += 3
                    signals.append('💎 Massive Volume')
                elif volume > 1000000:  # $1M+
                    score += 2
                    signals.append('📈 High Volume')
                elif volume > 100000:  # $100K+
                    score += 1
                    signals.append('📊 Good Volume')
                
                # 🚀 Price Movement Analysis (0-4 points)
                change_24h = pair['price_change_24h']
                change_1h = pair['price_change_1h']
                change_6h = pair['price_change_6h']
                
                if change_24h > 1000:  # 1000%+ (like your 22,704% PEPE!)
                    score += 4
                    signals.append('🚀 EXPLOSIVE')
                    opportunity_type = 'explosive'
                elif change_24h > 100:  # 100%+
                    score += 3
                    signals.append('🔥 Moonshot')
                    opportunity_type = 'moonshot'
                elif change_24h > 20 and change_1h > 5:
                    score += 2
                    signals.append('⚡ Strong Momentum')
                    opportunity_type = 'momentum'
                elif change_24h > 5:
                    score += 1
                    signals.append('📈 Positive Trend')
                
                # 💧 Liquidity Analysis (0-2 points)
                liquidity = pair['liquidity']
                if liquidity > 5000000:  # $5M+
                    score += 2
                    signals.append('💎 Ultra Liquid')
                elif liquidity > 500000:  # $500K+
                    score += 1.5
                    signals.append('💧 High Liquidity')
                elif liquidity > 50000:  # $50K+
                    score += 1
                    signals.append('💧 Good Liquidity')
                
                # 🎯 Market Cap Sweet Spot (0-2 points)
                market_cap = pair['market_cap']
                if 500000 < market_cap < 10000000:  # $500K - $10M (explosive potential)
                    score += 2
                    signals.append('🎯 Optimal Cap')
                elif 10000000 < market_cap < 100000000:  # $10M - $100M
                    score += 1
                    signals.append('📊 Good Cap')
                
                # ✅ DEX Quality Bonus (0-1 points)
                quality_dexs = [
                    'uniswapv2', 'uniswapv3', 'pancakeswapv2', 'pancakeswapv3',
                    'sushiswap', 'quickswap', 'raydium', 'orca', 'traderjoe'
                ]
                if any(dex in pair['dex_id'].lower() for dex in quality_dexs):
                    score += 1
                    signals.append('✅ Top DEX')
                
                # 🔥 Momentum Bonus (0-1 points)
                if change_1h > 10 and change_6h > 15:
                    score += 1
                    signals.append('🔥 Hot Momentum')
                
                # 📱 Symbol Quality Bonus
                symbol = pair['base_token_symbol'].upper()
                if len(symbol) <= 6 and symbol.isalpha():  # Short, clean symbols
                    score += 0.5
                    signals.append('✨ Clean Symbol')
                
                # Only include high-quality opportunities
                if score >= 3.5:  # Lower threshold to catch more opportunities
                    opportunities.append({
                        'pair': pair,
                        'score': min(score, 10),  # Cap at 10
                        'signals': signals,
                        'opportunity_type': opportunity_type,
                        'rank': 0  # Will be set during ranking
                    })
                    
            except Exception as e:
                logger.warning(f"Error analyzing opportunity: {e}")
                continue
        
        logger.info(f"🎯 Found {len(opportunities)} qualifying opportunities")
        return opportunities
    
    def _ultimate_ranking(self, opportunities):
        """🏆 ULTIMATE SMART RANKING"""
        # Group by token for diversity
        token_groups = defaultdict(list)
        for opp in opportunities:
            symbol = opp['pair']['base_token_symbol']
            token_groups[symbol].append(opp)
        
        # Get best opportunities per token (max 2 per token for diversity)
        diverse_opportunities = []
        for symbol, token_opps in token_groups.items():
            # Sort by score within each token
            sorted_token_opps = sorted(token_opps, 
                key=lambda x: (x['score'], x['pair']['volume_24h']), 
                reverse=True)
            
            # Take top 2 per token
            diverse_opportunities.extend(sorted_token_opps[:2])
        
        # Final comprehensive ranking
        final_ranked = sorted(diverse_opportunities, 
            key=lambda x: (
                x['score'],                           # Primary: AI Score
                x['pair']['volume_24h'],              # Secondary: Volume
                abs(x['pair']['price_change_24h']),   # Tertiary: Price movement
                x['pair']['liquidity']                # Quaternary: Liquidity
            ), 
            reverse=True)
        
        # Assign final rankings with enhanced scoring
        for i, opp in enumerate(final_ranked):
            opp['rank'] = i + 1
            
            # Boost scores for exceptional performers
            if i < 3 and opp['pair']['volume_24h'] > 10000000:  # Top 3 with $10M+ volume
                opp['score'] = min(opp['score'] + 0.5, 10)
            
            if opp['pair']['price_change_24h'] > 500:  # 500%+ gainers get bonus
                opp['score'] = min(opp['score'] + 1, 10)
        
        # return final_ranked[:30]  # Top 30 diverse opportunities
        
        # Dynamic limit based on market conditions
        if len(final_ranked) > 80:
            return final_ranked[:50]  # Hot market - top 50
        elif len(final_ranked) > 40:
            return final_ranked[:35]  # Normal market - top 35
        else:
            return final_ranked  # Cold market - show all

# 🧪 Test the Ultimate Scanner
if __name__ == "__main__":
    print("🚀 CRYPTOQUANT AI - ULTIMATE DYNAMIC SCANNER")
    print("=" * 60)
    
    scanner = TokenScanner()
    opportunities = scanner.scan_for_opportunities()
    
    print(f"\n🎯 ULTIMATE RESULTS - {len(opportunities)} OPPORTUNITIES DISCOVERED")
    print(f"🕒 Scan completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    if opportunities:
        print("\n🔥 TOP 10 ULTIMATE OPPORTUNITIES:")
        print("=" * 80)
        
        for i, opp in enumerate(opportunities[:10]):
            pair = opp['pair']
            print(f"\n🏆 #{i+1} {pair['base_token_symbol']} ({pair['base_token_name']})")
            print(f"    🎯 AI Score: {opp['score']:.1f}/10")
            print(f"    💰 Price: ${pair['price_usd']:.8f}")
            print(f"    📈 Changes: 1h:{pair['price_change_1h']:+.1f}% | 24h:{pair['price_change_24h']:+.1f}%")
            print(f"    💎 Volume: ${pair['volume_24h']:,.0f}")
            print(f"    💧 Liquidity: ${pair['liquidity']:,.0f}")
            print(f"    🏪 DEX: {pair['dex_id']} ({pair['chain_id']})")
            print(f"    ⚡ Type: {opp['opportunity_type'].upper()}")
            print(f"    🔥 Signals: {' | '.join(opp['signals'])}")
            print("-" * 80)
        
        # Summary statistics
        total_volume = sum(opp['pair']['volume_24h'] for opp in opportunities)
        avg_score = sum(opp['score'] for opp in opportunities) / len(opportunities)
        explosive_count = len([opp for opp in opportunities if opp['opportunity_type'] == 'explosive'])
        
        print(f"\n📊 SCAN STATISTICS:")
        print(f"    💎 Total Volume Tracked: ${total_volume:,.0f}")
        print(f"    🎯 Average AI Score: {avg_score:.1f}/10")
        print(f"    🚀 Explosive Opportunities: {explosive_count}")
        print(f"    🌐 Unique Tokens Found: {len(set(opp['pair']['base_token_symbol'] for opp in opportunities))}")
        
    else:
        print("⚠️ No opportunities found - check API connection")
    
    print("\n" + "=" * 60)
    print("🚀 READY TO DOMINATE THE CRYPTO MARKET! 💎")