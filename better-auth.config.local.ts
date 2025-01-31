import type { D1Database } from '@cloudflare/workers-types';
import { D1DatabaseAPI, D1Database as D1DatabaseCtor } from '@miniflare/d1';
import { createSQLiteDB } from '@miniflare/shared';
import { D1Dialect } from "@noxharmonium/kysely-d1";
import { initAuth } from "@utils/auth";
import { Kysely } from "kysely";

const local_db = await createSQLiteDB(
    `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/${import.meta.env.MINIFLARE_DB_FILENAME}`
)
const d1db = new D1DatabaseCtor(new D1DatabaseAPI(local_db)) as unknown as D1Database;

export const auth = initAuth(
    new Kysely({
            dialect: new D1Dialect({
                database: d1db,
            }),
        }),
    import.meta.env.BETTER_AUTH_SECRET
)