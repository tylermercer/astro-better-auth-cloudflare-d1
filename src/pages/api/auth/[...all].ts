import { auth } from "@utils/auth";
import type { APIRoute } from "astro";
 
export const ALL: APIRoute = async (ctx) => {
	return auth.handler(ctx.request);
};

export const prerender = false;