import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

const CANDIDATES = [".env.local", ".env"];

for (const filename of CANDIDATES) {
  const envPath = path.join(process.cwd(), filename);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: false });
  }
}
