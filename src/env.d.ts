/// <reference path="../.astro/types.d.ts" />
type Runtime = import('@astrojs/cloudflare').Runtime<Env>;
 
declare namespace App {
    // Note: 'import {} from ""' syntax does not work in .d.ts files.
    interface Locals {
        user: import("better-auth").User | null;
        session: import("better-auth").Session | null;
    }
    interface Locals extends Runtime {
    }
}