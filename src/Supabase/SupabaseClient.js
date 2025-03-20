
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://lyvdnkpngfcdqdynjdgi.supabase.co"; // Corrected variable name
const supabaseKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dmRua3BuZ2ZjZHFkeW5qZGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzOTE0MzEsImV4cCI6MjA1Nzk2NzQzMX0.YTjNdCzALn1eQOm0o62_IAVDbBgSPVK-0seUj8kP0yo"; // Ensure this matches your .env file

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;