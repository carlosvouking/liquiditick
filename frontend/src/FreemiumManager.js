// FreemiumManager.js - Handle free tier limits without authentication (COMPLETE FIXED VERSION)
class FreemiumManager {
  constructor() {
    this.storageKey = 'cryptoquant_usage';
    this.dailyLimit = 10;
    this.resetHour = 0; // Reset at midnight UTC
  }

  // Get today's usage data
  getTodayUsage() {
    const stored = localStorage.getItem(this.storageKey);
    const today = new Date().toDateString();
    
    if (!stored) {
      const newUsage = { date: today, count: 0, lastReset: Date.now() };
      localStorage.setItem(this.storageKey, JSON.stringify(newUsage));
      console.log('🔒 FreemiumManager: Created new usage tracking:', newUsage);
      return newUsage;
    }
    
    const usage = JSON.parse(stored);
    
    // Reset if it's a new day
    if (usage.date !== today) {
      const newUsage = { date: today, count: 0, lastReset: Date.now() };
      localStorage.setItem(this.storageKey, JSON.stringify(newUsage));
      console.log('🔒 FreemiumManager: New day detected, reset usage:', newUsage);
      return newUsage;
    }
    
    return usage;
  }

  // Check if user can access more opportunities
  canAccess() {
    const usage = this.getTodayUsage();
    const canAccess = usage.count < this.dailyLimit;
    console.log(`🔒 FreemiumManager: canAccess() = ${canAccess} (${usage.count}/${this.dailyLimit})`);
    return canAccess;
  }

  // Get remaining opportunities
  getRemainingCount() {
    const usage = this.getTodayUsage();
    const remaining = Math.max(0, this.dailyLimit - usage.count);
    console.log(`🔒 FreemiumManager: getRemainingCount() = ${remaining}`);
    return remaining;
  }

  // Record opportunity view (only when user explicitly refreshes)
  recordUsage() {
    const usage = this.getTodayUsage();
    
    // Don't record if already at limit
    if (usage.count >= this.dailyLimit) {
      console.log('🔒 FreemiumManager: Already at limit, not recording usage');
      return usage;
    }
    
    usage.count += 1;
    localStorage.setItem(this.storageKey, JSON.stringify(usage));
    console.log(`🔒 FreemiumManager: Usage recorded: ${usage.count}/${this.dailyLimit}`);
    return usage;
  }

  // Reset usage (for testing)
  resetUsage() {
    const today = new Date().toDateString();
    const newUsage = { date: today, count: 0, lastReset: Date.now() };
    localStorage.setItem(this.storageKey, JSON.stringify(newUsage));
    console.log('🔒 FreemiumManager: Usage reset to 10/10 for testing');
    return newUsage;
  }

  // Get upgrade prompt data
  getUpgradePrompt() {
    const remaining = this.getRemainingCount();
    
    if (remaining === 0) {
      return {
        show: true,
        type: 'limit_reached',
        title: '🚀 Upgrade to Pro',
        message: 'You\'ve reached your daily limit of 10 opportunities. Upgrade to access 100+ daily!',
        ctaText: 'Upgrade to Pro - $29/month'
      };
    }
    
    if (remaining <= 2) {
      return {
        show: true,
        type: 'limit_warning',
        title: '⚡ Almost at your limit',
        message: `Only ${remaining} opportunities left today. Upgrade for unlimited access!`,
        ctaText: 'Upgrade Now'
      };
    }
    
    return { show: false };
  }

  // Email capture for reports (simplified - no longer used)
  saveEmailForReports(email) {
    // Keeping method for compatibility but not actively used
    if (!email || !email.includes('@')) {
      console.log('🔒 FreemiumManager: Invalid email provided');
      return false;
    }
    
    const emails = JSON.parse(localStorage.getItem('cryptoquant_emails') || '[]');
    if (!emails.includes(email)) {
      emails.push(email);
      localStorage.setItem('cryptoquant_emails', JSON.stringify(emails));
      console.log('🔒 FreemiumManager: Email saved for reports:', email);
    } else {
      console.log('🔒 FreemiumManager: Email already exists:', email);
    }
    return true;
  }

  // Get user preference for email reports (simplified - no longer used)
  getEmailPreference() {
    return localStorage.getItem('cryptoquant_email_reports') || '';
  }

  // Get debug info for troubleshooting
  getDebugInfo() {
    const usage = this.getTodayUsage();
    return {
      currentUsage: usage,
      canAccess: this.canAccess(),
      remaining: this.getRemainingCount(),
      dailyLimit: this.dailyLimit,
      today: new Date().toDateString(),
      storageKey: this.storageKey,
      allEmails: JSON.parse(localStorage.getItem('cryptoquant_emails') || '[]')
    };
  }

  // Clear all data (for complete reset)
  clearAllData() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('cryptoquant_emails');
    localStorage.removeItem('cryptoquant_email_reports');
    localStorage.removeItem('cryptoquant_user_tier');
    console.log('🔒 FreemiumManager: All data cleared');
  }
}

export default FreemiumManager;