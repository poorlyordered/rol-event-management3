import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import type { StaffRole } from '$lib/types/index.js'
import { StaffRole as StaffRoleEnum } from '$lib/types/index.js'
import { inheritsRole } from '$lib/permissions/utils.js'

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

const supabase: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    event.cookies.set(name, value, { ...options, path: '/' })
                })
            },
        },
    })

    event.locals.safeGetSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        if (!session) {
            return { session: null, user: null }
        }

        const {
            data: { user },
            error,
        } = await event.locals.supabase.auth.getUser()
        if (error) {
            // JWT validation has failed
            return { session: null, user: null }
        }

        // Fetch staff member data if user is authenticated
        if (user) {
            const { data: staffMember } = await event.locals.supabase
                .from('staff_members')
                .select('*')
                .eq('user_id', user.id)
                .single()

            event.locals.staffMember = staffMember
        } else {
            event.locals.staffMember = null
        }

        return { session, user }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version'
        },
    })
}

const authGuard: Handle = async ({ event, resolve }) => {
    const { session, user } = await event.locals.safeGetSession()
    event.locals.session = session
    event.locals.user = user

    // Check if route requires authentication
    const requiresAuth = event.url.pathname.startsWith('/private')
    const isAuthPage = event.url.pathname === '/auth'

    if (!event.locals.session && requiresAuth) {
        redirect(303, '/auth')
    }

    if (event.locals.session && isAuthPage) {
        redirect(303, '/private')
    }

    // Role-based route protection
    const routePatterns = [
        {
            pattern: /^\/admin\/.*/,
            roles: [StaffRoleEnum.Owner, StaffRoleEnum.PlatformAdmin]
        },
        {
            pattern: /^\/tournaments\/.*/,
            roles: [StaffRoleEnum.Owner, StaffRoleEnum.PlatformAdmin, StaffRoleEnum.TournamentDirector, StaffRoleEnum.TournamentCoordinator]
        },
        {
            pattern: /^\/leagues\/.*/,
            roles: [StaffRoleEnum.Owner, StaffRoleEnum.PlatformAdmin, StaffRoleEnum.LeagueDirector, StaffRoleEnum.LeagueCoordinator]
        },
        {
            pattern: /^\/staff\/.*/,
            roles: [StaffRoleEnum.Owner, StaffRoleEnum.PlatformAdmin]
        }
    ]

    // Check if current route matches any protected patterns
    const matchedRoute = routePatterns.find(route => route.pattern.test(event.url.pathname))
    if (matchedRoute) {
        const hasAccess = event.locals.staffMember && (
            // Check if user has one of the required roles
            matchedRoute.roles.some(role => 
                event.locals.staffMember!.role === role || 
                inheritsRole(event.locals.staffMember!.role, role)
            )
        )

        if (!hasAccess) {
            redirect(303, '/unauthorized')
        }
    }

    // Organization-specific routes
    const orgRouteMatch = event.url.pathname.match(/^\/organizations\/([^/]+)/)
    if (orgRouteMatch) {
        const orgId = orgRouteMatch[1]
        const hasOrgAccess = event.locals.staffMember && (
            // Owner and Platform Admin have access to all orgs
            [StaffRoleEnum.Owner, StaffRoleEnum.PlatformAdmin].includes(event.locals.staffMember.role) ||
            // Other staff members must belong to the org
            event.locals.staffMember.organization_id === orgId
        )

        if (!hasOrgAccess) {
            redirect(303, '/unauthorized')
        }
    }

    return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard)
