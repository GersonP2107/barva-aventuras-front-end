import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Define which paths are protected (require authentication)
  const isProtectedPath = path.startsWith("/admin") && !path.startsWith("/admin/login")
  
  if (isProtectedPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })
    
    // If the user is not logged in, redirect to the login page
    if (!token) {
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.url))
      return NextResponse.redirect(url)
    }
    
    // Check if the user has the admin role
    if (token.role !== "admin") {
      // Redirect to unauthorized page or homepage
      return NextResponse.redirect(new URL("/", request.url))
    }
  }
  
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/admin/:path*"],
}