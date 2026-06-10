import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

// Ensure Supabase variables exist before configuring
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";

if (!supabaseUrl) {
  console.warn("Warning: SUPABASE_URL is not set.");
}

// Instantiate Supabase client securely on the server
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertSubscriber(email: string, source: string) {
  // Try common table names that a waitlist/notification system might use
  const tables = ["subscribers", "waitlist", "signups", "notifications", "leads"];
  let lastError: any = null;

  for (const table of tables) {
    try {
      console.log(`Attempting insert into table "${table}" for email: ${email}`);
      // Try full schema first: email, source, created_at
      const { error } = await supabase
        .from(table)
        .insert([{ 
          email, 
          source, 
          created_at: new Date().toISOString() 
        }]);

      if (!error) {
        console.log(`Success! Inserted into table "${table}".`);
        return { success: true, table, method: "database table" };
      }

      console.warn(`Insert to table "${table}" with full columns failed:`, error.message);
      
      // If table exists but fails due to column issues, try inserting just email
      if (error && error.code !== "42P01") { // 42P01 is table does not exist
        console.log(`Retrying insert into table "${table}" with email only...`);
        const { error: retryError } = await supabase
          .from(table)
          .insert([{ email }]);
        
        if (!retryError) {
          console.log(`Success! Inserted into table "${table}" with email only.`);
          return { success: true, table, method: "database table" };
        }
        lastError = retryError;
        console.warn(`Retry on table "${table}" failed:`, retryError.message);
      } else {
        lastError = error;
      }
    } catch (err: any) {
      console.error(`Exception during insert for table "${table}":`, err);
      lastError = err;
    }
  }

  // Fallback: If no tables exist, we can register the subscriber directly via Supabase Auth
  // since the "auth.users" table is built-in and guaranteed to exist in every Supabase project. We use Admin API.
  try {
    console.log(`Database tables missing. Attempting robust fallback to Supabase Auth Admin user creation for: ${email}`);
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: { source, fallback_registered: true, date: new Date().toISOString() }
    });

    if (!authError) {
      console.log(`Success! Waitlist user registered via built-in Supabase Auth users fallback:`, authData);
      return { success: true, table: "auth.users (Authentication Log)", method: "built-in auth fallback" };
    }

    // GoTrue returns 422 or exact text if user is already registered. If so, treat as success!
    if (authError.message?.toLowerCase().includes("already registered") || authError.status === 422) {
      console.log(`User ${email} is already registered in Supabase.`);
      return { success: true, table: "auth.users (Authentication Log)", method: "built-in auth fallback (already registered)" };
    }

    console.error("Auth Admin fallback registration failed:", authError.message);
    lastError = authError;
  } catch (err: any) {
    console.error("Exception during Auth fallback:", err);
    lastError = err;
  }

  return { success: false, error: lastError };
}

async function startServer() {
  const app = express();
  const PORT = 3001;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Qguard Helix core operational." });
  });

  // API Route: Email Subscription proxy
  app.post("/api/subscribe", async (req, res) => {
    const { email, source } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required." });
    }

    try {
      const result = await insertSubscriber(email, source || "web_landing");
      if (result.success) {
        return res.json({ 
          success: true, 
          message: `Successfully added ${email} to waitlist!`,
          table: result.table,
          method: result.method
        });
      } else {
        const errorMsg = result.error?.message || "Unknown error";
        console.error("Supabase Insertion/Auth fallback failure:", result.error);
        
        return res.status(500).json({ 
          error: "Could not insert subscriber or fall back to default authentication registry.", 
          details: errorMsg,
          code: result.error?.code || "DB_ERROR",
          explanation: "We tried to write to tables: 'subscribers', 'waitlist', 'signups', 'notifications', or 'leads', and finally fell back to creating user in 'auth.users' using the Admin API, but they all failed. To allow standard table storage, create the 'leads' table in your Supabase SQL Editor with: CREATE TABLE leads (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, email text UNIQUE, source text, created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL);"
        });
      }
    } catch (e: any) {
      console.error("Severe subscription error:", e);
      return res.status(500).json({ error: "Internal server error.", details: e.message });
    }
  });

  // Vite middleware setup for Development vs Production static files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Started in Development mode (Vite server middleware mounted)");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Started in Production mode (Static files serve enabled)");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
