import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/lib/env";
import * as schema from "./schema";

if (typeof window !== "undefined") {
  throw new Error("db/index.ts must only be imported on the server.");
}

const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql, { schema });
