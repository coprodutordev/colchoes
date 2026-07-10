import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Validate session server-side
  const { data: { user } } = await supabase.auth.getUser()

  const isAdminRoute =
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login') &&
    !request.nextUrl.pathname.startsWith('/admin/esqueci-senha')

  // Dev mode: allow local cookie as fallback when Supabase is unreachable
  const devSession = process.env.NODE_ENV === "development" && request.cookies.get('__session_dev')?.value === 'admin@remvita.com.br'

  // Redirect unauthenticated users away from admin routes
  if (isAdminRoute && !user && !devSession) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin/login'
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from login page
  if (request.nextUrl.pathname === '/admin/login' && (user || devSession)) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin'
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match admin routes only.
     * Exclude static files, images, and public assets.
     */
    '/admin/:path*',
  ],
}
