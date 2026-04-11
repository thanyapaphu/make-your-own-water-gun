/**
 * Writes supabase-config.js from env (Netlify / Vercel / local CI).
 * Set SUPABASE_URL and SUPABASE_ANON_KEY in the host dashboard, or export them locally.
 */
const fs = require("fs");
const path = require("path");

const url = (process.env.SUPABASE_URL || "").trim().replace(/\/$/, "");
const key = (process.env.SUPABASE_ANON_KEY || "").trim();

if (!url || !key) {
  console.error(
    "write-supabase-config: Missing SUPABASE_URL or SUPABASE_ANON_KEY.\n" +
      "Netlify: Site settings → Environment variables\n" +
      "Vercel: Project → Settings → Environment Variables\n" +
      "Local: copy supabase-config.example.js to supabase-config.js, or run with vars set."
  );
  process.exit(1);
}

const out =
  "// Generated at build time — do not commit.\n" +
  `window.SUPABASE_URL = ${JSON.stringify(url)};\n` +
  `window.SUPABASE_ANON_KEY = ${JSON.stringify(key)};\n`;

const dest = path.join(__dirname, "..", "supabase-config.js");
fs.writeFileSync(dest, out, "utf8");
console.log("Wrote", dest);
