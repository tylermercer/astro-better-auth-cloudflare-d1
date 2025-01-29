import { betterAuth } from "better-auth";
import { LibsqlDialect } from "@libsql/kysely-libsql";
 
const dialect = new LibsqlDialect({
    url: import.meta.env.TURSO_DATABASE_URL || "",
    authToken: import.meta.env.TURSO_AUTH_TOKEN || "",
})
 
export const auth = betterAuth({
  secret: import.meta.env.BETTER_AUTH_SECRET,
  database: {
    dialect,
    type: "sqlite"
  },
  emailAndPassword: {  
      enabled: true
  },
})