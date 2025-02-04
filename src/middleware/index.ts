import { auth, initAuth } from "@utils/auth";
import { db, initDb } from "@utils/db";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    initDb(context.locals.runtime.env.AUTH_DB);

    if (context.isPrerendered) return next();

    initAuth(
        db,
        context.locals.runtime.env.BETTER_AUTH_SECRET,
    )

    const isAuthed = await auth.api
        .getSession({
            headers: context.request.headers,
        })

    if (isAuthed) {
        context.locals.user = isAuthed.user;
        context.locals.session = isAuthed.session;
    } else {
        context.locals.user = null;
        context.locals.session = null;
    }

    if (new URL(context.request.url).pathname.startsWith('/app') && !context.locals.session) {
        // Redirect to login page if the user is not authenticated
        return context.redirect(
            // `/login?returnUrl=${encodeURIComponent(Astro.url.pathname)}`,
            `/login`,
        );
    }

    return next();
});
