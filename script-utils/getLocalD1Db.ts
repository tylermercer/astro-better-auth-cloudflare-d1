import { Miniflare } from 'miniflare';
import fs from 'fs';
import { parse } from 'smol-toml';

type Config = { d1_databases: { binding: string; database_id: string }[] };

const config = parse(fs.readFileSync('wrangler.toml', 'utf-8')) as Config;

const mf = new Miniflare({
    modules: true,
    // Script does nothing, but that's ok because it is not used
    script: `
        export default {
            async fetch(request, env, ctx) {
                return new Response("");
            }
        }
    `,
    d1Databases: Object.fromEntries(config.d1_databases.map(
        db => [db.binding, db.database_id]
    )),
    d1Persist: './.wrangler/state/v3/d1',
});

export const getLocalD1Db = async (binding: string) => {
    return await mf.getD1Database(binding);
};