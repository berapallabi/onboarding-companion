import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { nextUrl } = req;
    const protectedPaths = ['/dashboard', '/companion', '/assessment', '/docs', '/connect', '/challenges'];
    const isProtected = protectedPaths.some(path => nextUrl.pathname.startsWith(path));

    if (isProtected && !req.auth) {
        return NextResponse.redirect(new URL("/api/auth/signin", nextUrl.origin));
    }
    return NextResponse.next();
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
