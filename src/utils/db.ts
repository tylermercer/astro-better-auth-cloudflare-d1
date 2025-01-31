import { Kysely } from "kysely";
import { D1Dialect } from "@noxharmonium/kysely-d1";
import type { D1Database } from '@cloudflare/workers-types'

export let db: ReturnType<typeof createDb>;

export function createDb(d1db: D1Database) {
    return new Kysely({
        dialect: new D1Dialect({
            database: d1db,
        }),
    })
}

export function initDb(d1db: D1Database) {
    db ??= createDb(d1db);
}