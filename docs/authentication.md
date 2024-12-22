# Authentication Documentation

This document outlines the authentication implementation in the project using Supabase and SvelteKit.

## Overview

The project uses Supabase for authentication, implementing a secure server-side authentication guard with protected routes and proper session management. The implementation follows best practices for both server and client-side handling.

## Dependencies

```json
{
  "@supabase/auth-helpers-sveltekit": "^0.13.0",
  "@supabase/ssr": "^0.5.2",
  "@supabase/supabase-js": "^2.47.10"
}
```

## Implementation Components

### 1. Supabase Client Setup (`src/lib/supabase.ts`)

```typescript
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
```

This creates the base Supabase client using environment variables for configuration.

### 2. Server-Side Hooks (`src/hooks.server.ts`)

The server-side implementation consists of two main handlers:

#### Supabase Handler
- Creates a server-specific Supabase client for each request
- Manages cookie handling with proper path settings
- Implements secure session validation

```typescript
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
  // ... session validation logic
}
```

#### Auth Guard
- Protects routes under `/private`
- Handles redirects based on authentication state
- Validates JWT tokens

```typescript
const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession()
  event.locals.session = session
  event.locals.user = user

  if (!event.locals.session && event.url.pathname.startsWith('/private')) {
    redirect(303, '/auth')
  }

  if (event.locals.session && event.url.pathname === '/auth') {
    redirect(303, '/private')
  }

  return resolve(event)
}
```

### 3. Layout Handling

#### Server Layout (`src/routes/+layout.server.ts`)
Handles server-side session management and cookie access:

```typescript
export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session } = await safeGetSession()
  return {
    session,
    cookies: cookies.getAll(),
  }
}
```

#### Client Layout (`src/routes/+layout.ts`)
Manages client-side authentication state:

```typescript
export const load: LayoutLoad = async (event) => {
  event.depends('supabase:auth')

  const supabase = isBrowser()
    ? createBrowserClient(/*...*/)
    : createServerClient(/*...*/)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { session, supabase, user }
}
```

## Security Features

1. **JWT Validation**
   - Server-side validation of JWT tokens
   - Safe session retrieval with `safeGetSession()`

2. **Protected Routes**
   - Automatic redirects for unauthenticated users
   - Prevention of authenticated users accessing auth pages

3. **Cookie Security**
   - Explicit path settings
   - Secure cookie management
   - Cross-platform compatibility

4. **Session Management**
   - Proper invalidation
   - Dependency tracking for auth state changes
   - Type-safe implementation

## Best Practices

1. **Separation of Concerns**
   - Clear distinction between server and client code
   - Modular implementation with hooks and layouts

2. **Type Safety**
   - Full TypeScript implementation
   - Proper type definitions for all components

3. **Error Handling**
   - Proper validation of auth states
   - Secure fallbacks for failed authentications

4. **Performance**
   - Efficient session management
   - Proper caching of auth states

## Usage

To protect a route, place it under the `/private` directory. The auth guard will automatically:
1. Redirect unauthenticated users to `/auth`
2. Allow authenticated users to access the protected route
3. Redirect authenticated users away from `/auth` to `/private`

## Environment Variables

The following environment variables are required:
- `PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

These should be set in your `.env` file:

```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
