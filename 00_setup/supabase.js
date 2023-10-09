console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://warietsusovoitlkwodf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhcmlldHN1c292b2l0bGt3b2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMTY3NjEsImV4cCI6MjAxMTg5Mjc2MX0.7DYXOdTZSxea5NNQh7bldKvzpkKOuaHgFaoiQF--54k'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }