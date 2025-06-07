require('dotenv').config()
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.PROJECT_URL
const supabaseKey = process.env.API_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const connection = async () => {
  try {
    const { data, error } = await supabase.from("tasks").select("*");
    if (data)
    {
        console.log('connection created')
    }
    if(error)
    {
        console.error(error.message)
    }
  } catch (err) {
    console.error(err.message);
  }
};
connection();
module.exports = supabase;