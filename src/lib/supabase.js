import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://cwduwrlckcdgaucjnunb.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3ZHV3cmxja2NkZ2F1Y2pudW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODIxODksImV4cCI6MjA2Njk1ODE4OX0.sXe-K4oEwsv35dc6Hep69I_YaRR059xr4wxfLerzIwA'

if(!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})