import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

const accessTokenSecret = generateRandomString(32);
const refreshTokenSecret = generateRandomString(32);
const verifyTokenSecret = generateRandomString(32);

const envFilePath = path.resolve(__dirname, "../../.env");

let envContent = "";
if (fs.existsSync(envFilePath)) {
  envContent = fs.readFileSync(envFilePath, "utf8");
}

const envLines = envContent.split("\n").filter((line) => line.trim() !== "");
const envVariables = {};
envLines.forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match != null) {
    envVariables[match[1]] = match[2];
  }
});

envVariables.ACCESS_TOKEN_SECRET = accessTokenSecret;
envVariables.REFRESH_TOKEN_SECRET = refreshTokenSecret;
envVariables.VERIFY_TOKEN_SECRET = verifyTokenSecret;

const updatedEnvContent = Object.keys(envVariables)
  .map((key) => `${key}=${envVariables[key]}`)
  .join("\n");

fs.writeFileSync(envFilePath, updatedEnvContent);

console.log("✅ Secrets have been generated and saved to .env file.");
