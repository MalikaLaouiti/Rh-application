// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/login')

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(
          token.role === 'Admin' ? '/Admin/Administration' : '/User/Account',
          req.url
        ))
      }
      return null
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Handle route protection based on user role
    if (token.role !== 'Admin' && req.nextUrl.pathname.startsWith('/Admin')) {
      return NextResponse.redirect(new URL('/User/Account', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

// Specify protected routes
export const config = {
  matcher: ['/Admin/:path*', '/User/:path*', '/login']
}
