import React from 'react';

const UpgradeModal = ({ isOpen, onClose, promptData, onUpgrade }) => {
  if (!isOpen) return null;

  const handleDemoUpgrade = () => {
    // For demo purposes only - simulate Pro access
    onUpgrade();
  };

  const getModalIcon = () => {
    if (promptData.type === 'limit_reached') return '🚫';
    if (promptData.type === 'feature_locked') return '🔒';
    return '⚡';
  };

  const getModalTitle = () => {
    if (promptData.type === 'limit_reached') return 'Daily Limit Reached';
    if (promptData.type === 'feature_locked') return 'Premium Feature';
    return 'Upgrade to Pro';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl animate-in">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          ×
        </button>

        {/* Modal content */}
        <div className="text-center">
          <div className="text-5xl mb-6">
            {getModalIcon()}
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {getModalTitle()}
          </h2>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-md mx-auto">
            {promptData.message || 'Unlock unlimited access and premium features to dominate crypto markets!'}
          </p>

          {/* Value Proposition */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 mb-8">
            <h3 className="font-bold text-gray-900 mb-6 text-xl">🚀 What You Get with Pro</h3>
            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Unlimited daily opportunities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Advanced CSV data exports</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Professional daily reports</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Priority customer support</span>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white mb-8 relative overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 text-sm font-bold rounded-bl-lg">
              Most Popular
            </div>
            <div className="flex justify-between items-center">
              <div className="text-left">
                <div className="text-xl font-bold">Pro Plan</div>
                <div className="text-blue-100">Everything you need to succeed</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">$29</div>
                <div className="text-blue-100">/month</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button 
              onClick={handleDemoUpgrade}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
            >
              🎮 Try Pro Demo Now
            </button>

            <div className="text-center space-y-3">
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium underline"
              >
                Continue with Free Plan
              </button>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="text-sm text-green-700 font-medium">
                  💡 <strong>Demo Mode:</strong> Try all Pro features instantly!<br/>
                  <span className="text-green-600">No payment required • Full feature preview • Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;