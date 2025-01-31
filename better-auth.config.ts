import { initAuth } from "@utils/auth";
import { Kysely } from "kysely";
import { D1ExternalDialect } from './lib/kysely-d1-external/D1ExternalDialect';

export const auth = initAuth(
    new Kysely({
        dialect: new D1ExternalDialect({
          accountId: import.meta.env.CLOUDFLARE_ACCOUNT_ID,
          apiKey: import.meta.env.CLOUDFLARE_D1_API_KEY,
          databaseUuid: import.meta.env.CLOUDFLARE_DATABASE_ID,
        }),
      }),
    import.meta.env.BETTER_AUTH_SECRET
)