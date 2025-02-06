
import { initAuth } from "@utils/auth";
import { createDb } from "@utils/db";
import { getLocalD1Db } from "./script-utils/getLocalD1Db";

export const auth = initAuth(
    createDb(await getLocalD1Db("AUTH_DB")),
    import.meta.env.BETTER_AUTH_SECRET
)