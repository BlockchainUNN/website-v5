import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

// PM2 starts the service with its working directory set to the deploy folder.
// Vercel injects environment variables itself and has no .env file.
if (existsSync(".env")) loadEnvFile(".env");
