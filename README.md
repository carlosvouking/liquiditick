🚀 LiquidiTick - Professional Trading Intelligence Platform
A comprehensive crypto trading platform that scans 6+ blockchains in real-time, scoring opportunities 0-10 using advanced AI algorithms.
🌟 Features

Real-time Scanning: Monitor 10,000+ tokens across multiple blockchains
AI Scoring System: 0-10 intelligent scoring for every opportunity
Freemium Model: 10 free opportunities daily, upgrade for unlimited access
Multi-chain Support: Ethereum, BSC, Polygon, Arbitrum, Solana, Avalanche
Professional Reports: CSV exports and email alerts
Live Dashboard: Real-time updates with advanced filtering

🛠️ Tech Stack
Frontend

React 18 with Hooks
Tailwind CSS for styling
Supabase for database (with demo mode fallback)
Responsive Design for all devices

Backend

Python Flask API
SQLite database with migration support
Real-time crypto scanning via DexScreener API
Email reporting with SMTP integration
Rate limiting and security features

🚀 Quick Start
Prerequisites

Node.js 16+ and npm
Python 3.8+ and pip
Git

1. Clone Repository
bashgit clone https://github.com/carlosvouking/liquiditick.git
cd liquiditick
2. Setup Environment Variables
bash# Copy the template
cp .env.example .env

# Edit .env with your actual values
# - Supabase URL and API key
# - Email configuration
# - Other API keys
3. Frontend Setup
bashcd frontend
npm install
npm start
Frontend runs on http://localhost:3000
4. Backend Setup (Optional - for full features)
bashcd backend
pip install -r requirements.txt
python simple_app.py
Backend runs on http://localhost:5000
🌐 Demo Mode
The app includes a demo mode that works without any API keys:

Shows 5 mock opportunities
Demonstrates all UI features
Perfect for testing and showcasing

To enable demo mode, simply don't provide Supabase credentials.
🔒 Security

✅ Environment variables protected with .gitignore
✅ No sensitive data in repository
✅ Secure deployment configuration
✅ Rate limiting and input validation

📦 Deployment
Cloudflare Pages (Recommended)

Push to GitHub (no sensitive data)
Connect repository to Cloudflare Pages
Set environment variables in dashboard:

REACT_APP_SUPABASE_URL
REACT_APP_SUPABASE_ANON_KEY


Deploy automatically

Environment Variables Needed
bash# Production environment variables
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX (optional)
🎯 Architecture
liquiditick/
├── frontend/          # React application
│   ├── src/
│   │   ├── App.js           # Main app component
│   │   ├── supabaseClient.js # Database connection
│   │   ├── FreemiumManager.js # Usage tracking
│   │   └── components/      # UI components
│   ├── public/
│   └── package.json
├── backend/           # Python Flask API
│   ├── simple_app.py        # Main API server
│   ├── simple_scanner.py    # Crypto scanning logic
│   └── requirements.txt
└── README.md
🔧 Configuration
Supabase Tables
sql-- opportunities table
CREATE TABLE opportunities (
  id SERIAL PRIMARY KEY,
  rank INTEGER,
  base_token_symbol VARCHAR(20),
  base_token_name VARCHAR(100),
  score DECIMAL(3,1),
  price_usd DECIMAL(20,10),
  price_change_1h DECIMAL(10,2),
  price_change_24h DECIMAL(10,2),
  volume_24h BIGINT,
  liquidity BIGINT,
  market_cap BIGINT,
  dex_id VARCHAR(50),
  chain_id VARCHAR(50),
  opportunity_type VARCHAR(20),
  signals TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- platform_stats table
CREATE TABLE platform_stats (
  id SERIAL PRIMARY KEY,
  total_opportunities INTEGER,
  win_rate DECIMAL(5,2),
  avg_return DECIMAL(10,2),
  subscribers INTEGER,
  monthly_revenue INTEGER,
  updated_at TIMESTAMP DEFAULT NOW()
);
🚀 Live Demo

Demo Mode: liquiditick.pages.dev (mock data)
Production: liquiditick.com (live data)

📈 Roadmap

 Advanced charting integration
 Portfolio tracking
 Mobile app (React Native)
 API for developers
 Machine learning improvements
 More blockchain integrations

🤝 Contributing

Fork the repository
Create feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🆘 Support

Issues: GitHub Issues
Discord: Join our community
Email: support@liquiditick.com


Made with ❤️ by Carlos Vouking
⚠️ Disclaimer: This is not financial advice. Always do your own research before making investment decisions.