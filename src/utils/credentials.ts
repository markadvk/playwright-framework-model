import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load .env only for local
const envFile = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envFile)) {
  dotenv.config();
}

const u = process.env.MY_USERNAME;
const p = process.env.MY_PASSWORD;

if (!u || !p) {
  throw new Error("❌ Missing MY_USERNAME or MY_PASSWORD in environment variables");
}

export const username: string = u;
export const password: string = p;
