# The Tech Crew - Multi-Service Business Platform

## Overview

A full-stack web application for "The Tech Crew," a Dubai-based company offering multiple business services including real estate listings, property management, company formation, digital marketing, and car rentals. The platform features a public-facing website with service pages, a contact/enquiry system, and an admin dashboard for managing properties, cars, and customer enquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router alternative to React Router)
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom design tokens defined via CSS variables in `client/src/index.css`
- **UI Components**: shadcn/ui component library built on Radix UI primitives, located in `client/src/components/ui/`
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Build Tool**: Vite with hot module replacement

The frontend follows a page-based architecture. Pages are in `client/src/pages/` (Home, RealEstate, PropertyDetails, CompanyFormation, DigitalMarketing, CarRentals, Contact, Admin, Login). Reusable components are in `client/src/components/` (Navbar, Footer, PropertyCard, CarCard, ServiceCard). Custom data-fetching hooks are in `client/src/hooks/` wrapping React Query for properties, cars, enquiries, and auth.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: Passport.js with local strategy and express-session for session management
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple
- **API Design**: RESTful endpoints with type-safe route definitions in `shared/routes.ts` using Zod schemas

Server entry point is `server/index.ts`. Routes are registered in `server/routes.ts` with endpoints for properties, cars, enquiries, and auth. Database operations are handled through a storage abstraction layer in `server/storage.ts` implementing the `IStorage` interface. Password hashing uses Node.js crypto scrypt with timing-safe comparison in `server/auth.ts`.

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` with tables for:
  - `users` - Admin accounts with username/password
  - `properties` - Real estate listings with specs (bedrooms, bathrooms, area) stored as JSONB
  - `cars` - Car rental inventory with categories (economy, luxury, 4x4)
  - `enquiries` - Contact form submissions with type categorization
- **Migrations**: Managed via drizzle-kit with output to `./migrations`
- **Connection**: Uses `DATABASE_URL` environment variable, configured in `server/db.ts`

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Drizzle table definitions, TypeScript types, and Zod insert schemas generated via drizzle-zod
- `routes.ts`: API route definitions with paths, HTTP methods, input validation schemas, and response schemas for type-safe API contracts

### Build System
- **Development**: Vite dev server integrated with Express via middleware in `server/vite.ts`
- **Production**: Custom build script in `script/build.ts` using esbuild for server bundling (with dependency allowlist for cold start optimization) and Vite for client
- **Output**: Server bundle to `dist/index.cjs`, client assets to `dist/public/`

### Key Design Decisions
1. **Wouter over React Router**: Chosen for smaller bundle size since routing needs are simple
2. **Drizzle over Prisma**: Provides better TypeScript inference and lighter runtime
3. **shadcn/ui pattern**: Components are copied into the project (not imported from npm) allowing full customization
4. **Shared route definitions**: Single source of truth for API contracts ensures frontend and backend stay in sync
5. **JSONB for property specs**: Allows flexible nested data without additional tables

## External Dependencies

### Database
- **PostgreSQL**: Primary database for all application data and session storage
- **Environment Variable**: `DATABASE_URL` must be set with PostgreSQL connection string

### Third-Party Services
- **WhatsApp Business**: Enquiry submissions and car booking buttons redirect to WhatsApp with pre-filled messages (phone numbers: +971565740835, +971547976886)
- **Google Fonts**: Inter and Outfit font families loaded via CDN

### Key NPM Dependencies
- `drizzle-orm` + `drizzle-kit`: Database ORM and migration tooling
- `express` + `express-session`: Web server and session management
- `passport` + `passport-local`: Authentication
- `connect-pg-simple`: PostgreSQL session store
- `@tanstack/react-query`: Client-side data fetching and caching
- `zod` + `drizzle-zod`: Schema validation and type generation
- `@radix-ui/*`: Accessible UI primitives for shadcn/ui components
- `tailwindcss`: Utility-first CSS framework