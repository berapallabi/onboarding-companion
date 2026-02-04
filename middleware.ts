
import { auth } from "@/auth"

export default auth((req) => {
    const protectedPaths = ['/dashboard', '/companion', '/assessment', '/docs', '/connect', '/challenges'];
    const isProtected = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

    if (!req.auth && isProtected) {
        const newUrl = new URL("/api/auth/signin", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
