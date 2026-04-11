/**
 * Writes supabase-config.js from env (Vercel / Netlify / local).
 * If env is missing, copies supabase-config.example.js so the build still passes;
 * the app skips Supabase until you add variables and redeploy.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dest = path.join(root, "supabase-config.js");
const examplePath = path.join(root, "supabase-config.example.js");

const url = (process.env.SUPABASE_URL || "").trim().replace(/\/$/, "");
const key = (process.env.SUPABASE_ANON_KEY || "").trim();

if (!url || !key) {
  console.warn(
    "\nwrite-supabase-config: SUPABASE_URL and/or SUPABASE_ANON_KEY is missing at build time.\n\n" +
      "Vercel fix:\n" +
      "  1. Open your project → Settings → Environment Variables\n" +
      "  2. Add SUPABASE_URL (e.g. https://xxxxx.supabase.co)\n" +
      "  3. Add SUPABASE_ANON_KEY (anon public key from Supabase → Settings → API)\n" +
      "  4. Enable them for Production (and Preview if you use preview deploys)\n" +
      "  5. Deployments → … on latest → Redeploy (env is only read on build)\n\n" +
      "Writing placeholder supabase-config.js so this build can finish. Analytics stay off until you redeploy with env set.\n"
  );
  fs.copyFileSync(examplePath, dest);
  process.exit(0);
}

const out =
  "// Generated at build time — do not commit.\n" +
  `window.SUPABASE_URL = ${JSON.stringify(url)};\n` +
  `window.SUPABASE_ANON_KEY = ${JSON.stringify(key)};\n`;

fs.writeFileSync(dest, out, "utf8");
console.log("Wrote", dest);
