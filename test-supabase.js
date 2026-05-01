import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

console.log('Testing Supabase connection...')
console.log('URL:', process.env.VITE_SUPABASE_URL)
console.log('Key:', process.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set')

async function test() {
  try {
    console.log('\nFetching messages...')
    const { data, error } = await supabase
      .from('messages')
      .select('*')
    
    if (error) {
      console.error('Error:', error.message)
      console.error('Details:', error)
    } else {
      console.log('Success! Found', data?.length || 0, 'messages')
      if (data) console.log('Messages:', data)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

test()