import { createClient } from "@supabase/supabase-js";

export async function onRequestPost(context) {
  try {
    const request = context.request;
    const env = context.env;

    const { email, source } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email parameter is required." }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
       return new Response(JSON.stringify({ error: "Supabase credentials missing in environment variables." }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Try common table names that a waitlist/notification system might use
    const tables = ["subscribers", "waitlist", "signups", "notifications", "leads"];
    let lastError = null;
    let success = false;
    let tableUsed = null;
    let methodUsed = null;

    for (const table of tables) {
      try {
        const { error } = await supabase
          .from(table)
          .insert([{ 
            email, 
            source: source || "web_landing", 
            created_at: new Date().toISOString() 
          }]);

        if (!error) {
          success = true;
          tableUsed = table;
          methodUsed = "database table";
          break;
        }

        if (error && error.code !== "42P01") { // 42P01 is table does not exist
          const { error: retryError } = await supabase
            .from(table)
            .insert([{ email }]);
          
          if (!retryError) {
            success = true;
            tableUsed = table;
            methodUsed = "database table email only";
            break;
          }
          lastError = retryError;
        } else {
          lastError = error;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!success) {
      // Fallback: If no tables exist, we can register the subscriber directly via Supabase Auth
      try {
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: { source: source || "web_landing", fallback_registered: true, date: new Date().toISOString() }
        });

        if (!authError || authError.message?.toLowerCase().includes("already registered") || authError.status === 422) {
          success = true;
          tableUsed = "auth.users (Authentication Log)";
          methodUsed = "built-in auth fallback";
        } else {
           lastError = authError;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (success) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: `Successfully added ${email} to waitlist!`,
        table: tableUsed,
        method: methodUsed
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
       return new Response(JSON.stringify({ 
        error: "Could not insert subscriber or fall back to default authentication registry.", 
        details: lastError?.message || "Unknown error",
        code: lastError?.code || "DB_ERROR"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error.", details: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
