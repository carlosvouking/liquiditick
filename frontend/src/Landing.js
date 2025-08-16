import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
          : 'bg-white/90 backdrop-blur-xl'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LiquidiTick
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Pricing
              </button>
              <button onClick={() => scrollToSection('comparison')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Compare
              </button>
              <button 
                onClick={navigateToDashboard}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Dashboard
              </button>
            </div>
            
            <button 
              onClick={navigateToDashboard}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
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
                  onClick={navigateToDashboard}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Start Free Trial
                </button>
                <button 
                  onClick={() => scrollToSection('demo')}
                  className="bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
                >
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why LiquidiTick Dominates</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Professional-grade features that give you an unfair advantage in crypto markets</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Scoring',
                description: 'Our proprietary AI analyzes 7+ factors in real-time to score every opportunity 0-10. Find explosive plays before they explode.'
              },
              {
                icon: '⚡',
                title: 'Real-Time Scanning',
                description: 'Continuous 5-minute scans across 6+ blockchains. Never miss a moonshot opportunity again.'
              },
              {
                icon: '📊',
                title: 'Professional Reports',
                description: 'Automated email reports with AI insights, CSV exports, and white-label options for institutions.'
              },
              {
                icon: '🔍',
                title: 'Advanced Filtering',
                description: 'Filter by AI score, volume, liquidity, opportunity type, and specific tokens. Find exactly what you\'re looking for.'
              },
              {
                icon: '🌐',
                title: 'Multi-Chain Coverage',
                description: 'Ethereum, BSC, Polygon, Arbitrum, Solana, Avalanche - all major chains in one platform.'
              },
              {
                icon: '💎',
                title: 'Opportunity Classification',
                description: 'Explosive, Moonshot, Momentum, or Standard - know exactly what type of opportunity you\'re looking at.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Stack Against Competition</h2>
            <p className="text-xl text-gray-600">Professional features at a fraction of enterprise costs</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <th className="p-4 text-left font-bold">Feature</th>
                    <th className="p-4 text-left font-bold bg-gradient-to-r from-purple-600 to-pink-600">LiquidiTick</th>
                    <th className="p-4 text-left font-bold">DexScreener</th>
                    <th className="p-4 text-left font-bold">DexTools</th>
                    <th className="p-4 text-left font-bold">TokenMetrics</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['AI Opportunity Scoring', '✓ Real-time 0-10', '✗', '✗', '✓ Limited'],
                    ['Professional Email Reports', '✓ Automated', '✗', '✓ Basic', '✗'],
                    ['CSV Data Export', '✓ Full data', '✗', '✓ Premium only', '✗'],
                    ['Multi-chain Coverage', '✓ 6+ chains', '✓ 40+ chains', '✓ 15+ chains', '✓ 20+ chains'],
                    ['Starting Price', '$29/month', 'Free (limited)', '$50/month', '$49/month']
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 font-semibold text-gray-900">{row[0]}</td>
                      <td className="p-4 text-green-600 font-semibold">{row[1]}</td>
                      <td className="p-4 text-gray-600">{row[2]}</td>
                      <td className="p-4 text-gray-600">{row[3]}</td>
                      <td className="p-4 text-gray-600">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Professional-grade features at prices that make sense</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Free',
                price: '$0',
                period: 'Forever free',
                features: ['10 opportunities per day', 'Basic filtering', 'View AI scores', 'Community support'],
                buttonText: 'Get Started Free',
                popular: false
              },
              {
                title: 'Pro',
                price: '$29',
                period: 'per month',
                features: ['100 opportunities per day', 'Advanced filtering', 'CSV data exports', 'Email reports', 'Priority support', 'Remove watermarks'],
                buttonText: 'Start Pro Trial',
                popular: true
              },
              {
                title: 'Enterprise',
                price: '$99',
                period: 'per month',
                features: ['Unlimited opportunities', 'API access (coming soon)', 'White-label reports', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
                buttonText: 'Contact Sales',
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`relative bg-white border-2 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                plan.popular ? 'border-blue-500 transform scale-105 shadow-lg' : 'border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.title}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                <div className="text-gray-600 mb-8">{plan.period}</div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <span className="text-green-500 font-bold mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={navigateToDashboard}
                  className={`w-full py-3 px-6 rounded-full font-bold text-lg transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-1' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Smart Money</h2>
            <p className="text-xl text-gray-600">Join thousands of traders finding explosive opportunities daily</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: '@trader_mike',
                role: 'Professional Trader',
                testimonial: 'Found a 400% gainer in my first week using LiquidiTick. The AI scoring is incredibly accurate.',
                avatar: 'TM'
              },
              {
                name: '@crypto_sarah',
                role: 'Fund Manager',
                testimonial: 'Finally, an affordable alternative to expensive enterprise tools. Saves our team hours daily.',
                avatar: 'CS'
              },
              {
                name: '@defi_hunter',
                role: 'DeFi Specialist',
                testimonial: 'The automated reports are a game changer. Professional quality insights delivered daily.',
                avatar: 'DH'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-8">
            {[
              {
                question: 'How accurate is the AI scoring?',
                answer: 'Our AI analyzes 7+ factors including volume, liquidity, price momentum, market cap, and DEX quality. Historical testing shows strong correlation with high-performing tokens, but remember - this is not financial advice.'
              },
              {
                question: 'Which blockchains do you support?',
                answer: 'Currently: Ethereum, Binance Smart Chain, Polygon, Arbitrum, Solana, and Avalanche. We\'re constantly adding new chains based on user demand.'
              },
              {
                question: 'How often is data updated?',
                answer: 'Our system scans all supported chains every 5 minutes, ensuring you get the freshest opportunities as they emerge.'
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Yes! No long-term contracts. Cancel your subscription anytime and keep access until the end of your billing period.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Find Your Next 100x?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of traders using AI to find explosive crypto opportunities</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={navigateToDashboard}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
            >
              Watch Demo
            </button>
          </div>
          
          <div className="mt-8 text-blue-200">
            <small>✓ No credit card required • ✓ 10 free opportunities daily • ✓ Cancel anytime</small>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LiquidiTick</h3>
              <p className="text-gray-400 mb-4">Professional crypto intelligence platform powered by AI</p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-400 hover:text-blue-300">🐦 Twitter</a>
                <a href="#" className="text-blue-400 hover:text-blue-300">💬 Discord</a>
                <a href="#" className="text-blue-400 hover:text-blue-300">📱 Telegram</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <button onClick={() => scrollToSection('features')} className="block hover:text-white">Features</button>
                <button onClick={() => scrollToSection('pricing')} className="block hover:text-white">Pricing</button>
                <button onClick={navigateToDashboard} className="block hover:text-white">Dashboard</button>
                <a href="#" className="block hover:text-white">API (Coming Soon)</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white">About</a>
                <a href="#" className="block hover:text-white">Blog</a>
                <a href="#" className="block hover:text-white">Careers</a>
                <a href="#" className="block hover:text-white">Press</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white">Help Center</a>
                <a href="#" className="block hover:text-white">Contact</a>
                <a href="#" className="block hover:text-white">Privacy Policy</a>
                <a href="#" className="block hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LiquidiTick. All rights reserved. • Not financial advice. Trade responsibly.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;