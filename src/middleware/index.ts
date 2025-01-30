import { auth, initAuth } from "@utils/auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {    
    if (context.isPrerendered) {
        initAuth(
            import.meta.env.TURSO_DATABASE_URL,
            import.meta.env.TURSO_AUTH_TOKEN,
            import.meta.env.BETTER_AUTH_SECRET,
        )

        return next();
    }
    else {
        initAuth(
            context.locals.runtime.env.TURSO_DATABASE_URL,
            context.locals.runtime.env.TURSO_AUTH_TOKEN,
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
     
        return next();
    }
    
});
