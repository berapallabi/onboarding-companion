
import { auth } from "@/auth"

export default auth((req) => {
    if (!req.auth && (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/companion') || req.nextUrl.pathname.startsWith('/assessment'))) {
        const newUrl = new URL("/api/auth/signin", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
