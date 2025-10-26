# Next Gen Clicks - OTT Subscription Platform

## Overview

Next Gen Clicks is a modern web application that provides discounted OTT (Over-The-Top) streaming subscriptions for platforms like Netflix, Amazon Prime, Disney+ Hotstar, and more. The platform features a marketing-focused landing page with subscription browsing, search functionality, and WhatsApp-based order placement. Built with a focus on conversion optimization and premium user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18+ with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library (Radix UI primitives)
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite

**Design System:**
- Custom color palette with primary orange accent
- Typography based on Inter font family
- Component-based architecture using shadcn/ui
- Responsive mobile-first design with glassmorphism effects
- Design guidelines documented in `design_guidelines.md` inspired by Apple, Stripe, and Linear

**Key Frontend Features:**
- Single-page application with home page and 404 handling
- Hero carousel showcasing platform benefits
- Subscription card grid with search/filter functionality
- WhatsApp integration for customer contact and purchases
- FAQ accordion, testimonials, and feature highlights
- Fully responsive navigation with mobile menu

**Component Structure:**
- Reusable UI components in `client/src/components/ui/`
- Feature components (Navbar, HeroCarousel, SubscriptionsSection, etc.) in `client/src/components/`
- Example components for development reference
- Custom hooks for mobile detection and toast notifications

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (via Neon serverless)
- **Session Management**: connect-pg-simple

**Server Structure:**
- Minimal API surface (currently template-level implementation)
- Storage abstraction layer with in-memory implementation (MemStorage)
- Prepared for database-backed user management
- Request/response logging middleware
- Raw body capture for webhook support

**Build & Development:**
- Development: tsx with hot reload
- Production: esbuild bundling for server code
- Vite dev server integration for frontend in development
- Static file serving in production

**Data Layer:**
- Drizzle ORM with PostgreSQL dialect
- Schema definitions in `shared/schema.ts`
- User model with username/password fields
- Product model with multi-duration pricing (1, 3, 6, 12 months) and category fields
- Migration support via drizzle-kit
- Storage interface abstraction for easy swapping between in-memory and database implementations

**Telegram Bot Integration:**
- Automated product management via Telegram bot
- `/newpost` command workflow for adding new subscription products
- Interactive flow: category selection → product name → description → image (URL or photo) → pricing for 4 durations
- Pricing format: actualPrice_sellingPrice (e.g., 649_149)
- Supported categories: Netflix, Prime, Hotstar, Sony LIV, YouTube Premium, Spotify, Others
- Direct integration with backend storage via API

### Design Patterns

**Monorepo Structure:**
- `client/`: Frontend React application
- `server/`: Backend Express server
- `shared/`: Shared TypeScript types and schemas
- Path aliases configured for clean imports (@/, @shared/, @assets/)

**Separation of Concerns:**
- UI components separated from business logic
- Storage interface pattern for data layer abstraction
- Route registration separated from server setup
- Shared validation schemas using Zod and drizzle-zod

**Development Experience:**
- TypeScript strict mode enabled
- Hot module replacement in development
- Error overlay for runtime errors (Replit plugin)
- Incremental TypeScript compilation

## External Dependencies

### Core Services
- **Database**: Neon Serverless PostgreSQL (configured via DATABASE_URL environment variable)
- **ORM**: Drizzle ORM for type-safe database queries

### UI & Styling
- **Component Library**: Radix UI primitives (@radix-ui/*)
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React icons, React Icons (WhatsApp icon)
- **Typography**: Google Fonts (Inter, Poppins, Space Grotesk)

### Data Management
- **Client State**: TanStack Query (React Query) for API data fetching and caching
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Validation**: Zod for schema validation

### Development Tools
- **Build Tool**: Vite with React plugin
- **TypeScript Compiler**: tsx for development, esbuild for production
- **Replit Integrations**: 
  - vite-plugin-runtime-error-modal
  - vite-plugin-cartographer (dev only)
  - vite-plugin-dev-banner (dev only)

### Additional Libraries
- **Carousels**: Embla Carousel React
- **Date Handling**: date-fns
- **Utility**: clsx, tailwind-merge (via cn utility), nanoid
- **Command Palette**: cmdk

### Assets
- Images stored in `attached_assets/generated_images/` for logos and hero banners
- Favicon at `/favicon.png`