# Ranking Of Legends Website

A modern, responsive gaming community website built with SvelteKit and Tailwind CSS.

## Tech Stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm
- **Authentication**: Supabase
- **Code Quality**: ESLint, Prettier, Husky

## Project Structure

```
src/
  components/           # Reusable components
    layout/            # Layout components (Header, Footer)
    sections/          # Page sections (Hero, About, News, Contact)
    ui/               # UI components (Cards, Buttons)
  routes/             # SvelteKit routes
  lib/                # Shared utilities and types
    permissions/      # Role-based access control
    stores/          # Svelte stores for state management
    types/           # TypeScript types and enums
  static/            # Static assets (images, fonts)
```

## Authentication & Authorization

The project uses a comprehensive role-based authentication system:

### Authentication Flow

- Secure server-side authentication using Supabase
- JWT token validation
- Protected routes with role-based access
- Organization-specific access control

### Role System

```typescript
enum StaffRole {
	Owner = 'owner',
	PlatformAdmin = 'platform_admin',
	CustomerService = 'customer_service',
	TournamentDirector = 'tournament_director',
	TournamentCoordinator = 'tournament_coordinator',
	LeagueDirector = 'league_director',
	LeagueCoordinator = 'league_coordinator'
}
```

### Protected Routes

- `/admin/*` - Owner and Platform Admin only
- `/tournaments/*` - Tournament staff and above
- `/leagues/*` - League staff and above
- `/staff/*` - Owner and Platform Admin only
- `/organizations/:id/*` - Organization-specific access

### Usage Example

```svelte
<RoleGuard roles={[StaffRoleEnum.TournamentDirector]}>
	<TournamentManagement />
</RoleGuard>
```

## Code Quality

### ESLint

- TypeScript-aware linting
- Svelte-specific rules
- Integration with Prettier

Run linting:

```bash
npm run lint        # Check code style
npm run lint:fix    # Fix code style issues
```

### Prettier

- Consistent code formatting
- Svelte template formatting
- Customized configuration

Format code:

```bash
npm run format      # Format all files
npm run format:check # Check formatting
```

### Pre-commit Hooks

The project uses Husky and lint-staged to ensure code quality:

- Automatically formats staged files before commit
- Runs ESLint on staged files
- Prevents badly formatted code from being committed

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

### Environment Variables

Required environment variables:

```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build

To create a production build:

```bash
npm run build
```

The built files will be in the `build` directory.

### Development Guidelines

1. **Component Structure**

   - Keep components focused and single-responsibility
   - Use TypeScript for type safety
   - Document component props and events

2. **Styling**

   - Use Tailwind utility classes
   - Keep custom CSS minimal
   - Follow mobile-first approach

3. **Code Quality**

   - Follow ESLint rules
   - Format code with Prettier
   - Write type-safe code
   - Use role-based access control where needed

4. **Performance**
   - Lazy load components where appropriate
   - Use intersection observer for animations
   - Keep bundle size minimal

## Deployment

The site can be deployed to any platform that supports SvelteKit applications. Common options include:

- Vercel
- Netlify
- Cloudflare Pages

## Maintenance

### Regular Updates

- Keep dependencies updated
- Review and update content regularly
- Monitor performance metrics
- Update documentation as needed

### Performance Monitoring

- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Regular accessibility checks

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Ensure code passes linting and formatting checks
5. Submit a pull request

## License

All rights reserved. Ranking Of Legends © 2024
