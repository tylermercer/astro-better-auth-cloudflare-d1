import { betterAuth } from "better-auth";
import type { Kysely } from "kysely";

function constructAuth(db: Kysely<unknown>, betterAuthSecret: string) {
  return betterAuth({
    secret: betterAuthSecret,
    database: {
      db,
      type: "sqlite",
    },
    emailAndPassword: {
      enabled: true
    },
  });
}

export let auth: ReturnType<typeof constructAuth>;

export function initAuth(db: Kysely<unknown>, betterAuthSecret: string): ReturnType<typeof constructAuth> {
  auth = constructAuth(db, betterAuthSecret);
  return auth;
}