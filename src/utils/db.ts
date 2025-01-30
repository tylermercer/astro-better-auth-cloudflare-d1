import { Kysely, CamelCasePlugin } from "kysely";
import { D1Dialect } from "@noxharmonium/kysely-d1";
import type { D1Database } from '@cloudflare/workers-types'

export let db: ReturnType<typeof createDb>;

export function createDb(d1db: D1Database) {
    return new Kysely({
        dialect: new D1Dialect({
            database: d1db,
        }),
        plugins: [
            // Drizzle schema uses snake_case so this plugin is required for
            // better-auth to talk to the database
            // (From https://github.com/matthewlynch/better-auth-react-router-cloudflare-d1/blob/main/app/auth/auth.server.ts)
            new CamelCasePlugin(),
        ],
    })
}

export function initDb(d1db: D1Database) {
    db ??= createDb(d1db);
}