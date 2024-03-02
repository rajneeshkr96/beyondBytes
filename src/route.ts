// these routes does not require authentication

export const publicRoutes = [
    "/",
]


// these routes require authentication

export const authRoutes = [
    "/",
]

/* the prefix api authentication routes 
routes that starts with prefisx are used for api
@type {string}

 */

export const apiAuthPrefix = "/api/auth"


/*
the default redirect url after login
 */

export const defaultRedirectUrl = "/"