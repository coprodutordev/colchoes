import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Cliente Supabase com privilégios administrativos (Service Role).
 * ⚠️ NUNCA expor este cliente em Client Components ou rotas públicas.
 * Usar APENAS em Server Actions, Route Handlers e Server Components protegidos.
 */
export async function createAdminClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service Role - bypassa RLS
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Erro esperado em Server Components readonly
          }
        },
      },
    }
  )
}
