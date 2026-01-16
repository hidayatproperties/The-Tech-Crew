# The Tech Crew - Multi-Service Business Platform

## Overview

This is a full-stack web application for "The Tech Crew," a Dubai-based company offering multiple business services including real estate listings, property management, company formation, digital marketing, and car rentals. The platform features a public-facing marketing website with service pages, a contact/enquiry system, and an admin dashboard for managing properties, cars, and customer enquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with hot module replacement

The frontend follows a page-based architecture with reusable components. Pages are located in `client/src/pages/` and shared components in `client/src/components/`. Custom hooks in `client/src/hooks/` abstract API interactions using React Query.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: Passport.js with local strategy and express-session
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response validation

The server entry point is `server/index.ts`. Routes are registered in `server/routes.ts`, and database operations are abstracted through a storage layer in `server/storage.ts`.

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` with tables for users, properties, cars, and enquiries
- **Migrations**: Managed via drizzle-kit with output to `./migrations`
- **Connection**: Uses `DATABASE_URL` environment variable

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Drizzle table definitions and Zod insert schemas
- `routes.ts`: API route definitions with paths, methods, and validation schemas

### Build System
- Development: Vite dev server with Express middleware integration (`server/vite.ts`)
- Production: Custom build script (`script/build.ts`) using esbuild for server and Vite for client
- Output: Server bundle to `dist/index.cjs`, client assets to `dist/public/`

### Authentication Flow
Password hashing uses Node.js crypto scrypt with timing-safe comparison. Sessions are stored in PostgreSQL and managed via express-session. Protected routes check `req.isAuthenticated()` before allowing mutations.

## External Dependencies

### Database
- **PostgreSQL**: Primary database for all data storage including sessions
- **Connection**: Configured via `DATABASE_URL` environment variable

### Frontend Libraries
- **Radix UI**: Accessible primitive components (dialogs, dropdowns, forms, etc.)
- **TanStack React Query**: Data fetching and caching
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **date-fns**: Date formatting utilities

### Backend Libraries
- **Passport.js**: Authentication middleware
- **connect-pg-simple**: PostgreSQL session store
- **drizzle-orm**: Database ORM
- **zod**: Runtime validation

### External Services
- **WhatsApp Business**: Contact form submissions redirect to WhatsApp for direct communication (hardcoded phone numbers in components)
- **Google Fonts**: Outfit and Inter font families loaded via CDN
- **Unsplash**: Placeholder images sourced externally

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **TypeScript**: Full type checking across all code
- **drizzle-kit**: Database migration tooling