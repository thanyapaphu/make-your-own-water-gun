/**
 * Copies static assets into public/ for hosts that deploy that folder (e.g. Vercel outputDirectory "public").
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pub = path.join(root, "public");

fs.rmSync(pub, { recursive: true, force: true });
fs.mkdirSync(pub, { recursive: true });

const rootFiles = ["index.html", "script.js", "styles.css", "supabase-config.js"];
for (const name of rootFiles) {
  const from = path.join(root, name);
  if (!fs.existsSync(from)) {
    console.warn("prepare-public: skip missing", name);
    continue;
  }
  fs.copyFileSync(from, path.join(pub, name));
}

const illus = path.join(root, "illus");
if (fs.existsSync(illus)) {
  fs.cpSync(illus, path.join(pub, "illus"), { recursive: true });
} else {
  console.warn("prepare-public: illus/ not found");
}

const resultPic = path.join(root, "result pic");
if (fs.existsSync(resultPic)) {
  fs.cpSync(resultPic, path.join(pub, "result pic"), { recursive: true });
} else {
  console.warn("prepare-public: result pic/ not found (combined result images may 404)");
}

console.log("Prepared", pub);
