# MonoTeam Gaming Website

A modern, responsive gaming community website built with SvelteKit and Tailwind CSS.

## Tech Stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

```
src/
  components/           # Reusable components
    layout/            # Layout components (Header, Footer)
    sections/          # Page sections (Hero, About, News, Contact)
    ui/               # UI components (Cards, Buttons)
  routes/             # SvelteKit routes
  lib/                # Shared utilities and types
  static/            # Static assets (images, fonts)
```

## Components

### Layout Components

- **Header.svelte**: Main navigation component with mobile responsiveness
- **Footer.svelte**: Site footer with copyright information

### Section Components

- **Hero.svelte**: Landing page hero section with background image and CTA
- **About.svelte**: Team information section
- **News.svelte**: News grid using card components
- **Contact.svelte**: Contact information and email link

### UI Components

- **NewsCard.svelte**: Card component for displaying news items

## Features

- Responsive design for all screen sizes
- Mobile-first navigation with hamburger menu
- Smooth scrolling to sections
- Intersection Observer animations
- Image optimization
- Accessible UI components

## Styling

The project uses Tailwind CSS with custom configuration:

- Custom color palette
- Responsive breakpoints
- Typography system using Raleway and Open Sans fonts
- Custom animations and transitions

### Tailwind Plugins

- @tailwindcss/aspect-ratio: For image aspect ratios
- @tailwindcss/forms: For form styling

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

3. **Assets**
   - Place images in static/assets/img
   - Optimize images before committing
   - Use appropriate image formats (WebP where possible)

4. **Performance**
   - Lazy load images where appropriate
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
4. Submit a pull request

## License

All rights reserved. MonoTeam Gaming © 2024
