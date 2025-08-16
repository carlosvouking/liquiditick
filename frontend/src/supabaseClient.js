import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Only create Supabase client if we have real credentials
// export const supabase = (supabaseUrl && supabaseKey && supabaseUrl !== 'your-project-id.supabase.co') 
//   ? createClient(supabaseUrl, supabaseKey)
//   : null;

// // Export demo mode flag
// export const isDemoMode = !supabase;

// console.log(isDemoMode ? '🔄 Running in DEMO mode' : '✅ Connected to Supabase');


// Only create Supabase client if we have real credentials
export const supabase = (supabaseUrl && supabaseKey && 
                        supabaseUrl !== 'your-project-id.supabase.co' &&
                        supabaseKey !== 'your-supabase-anon-key-here') 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Export demo mode flag
export const isDemoMode = !supabase;

// Enhanced logging for deployment debugging
if (isDemoMode) {
  console.log('🔄 Running in DEMO mode - using mock data');
  console.log('Missing:', !supabaseUrl ? 'SUPABASE_URL' : !supabaseKey ? 'SUPABASE_KEY' : 'Valid credentials');
} else {
  console.log('✅ Connected to Supabase');
}