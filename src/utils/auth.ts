import { betterAuth } from "better-auth";
import { LibsqlDialect } from "@libsql/kysely-libsql";

function constructAuth(url: string, authToken: string, betterAuthSecret: string) {
  const dialect = new LibsqlDialect({
    url,
    authToken,
})

  return betterAuth({
    secret: betterAuthSecret,
    database: {
      dialect,
      type: "sqlite"
    },
    emailAndPassword: {  
        enabled: true
    },
  });
}

export let auth: ReturnType<typeof constructAuth>; 

export function initAuth(url: string, authToken: string, betterAuthSecret: string) {
  auth = constructAuth(url, authToken, betterAuthSecret);
}