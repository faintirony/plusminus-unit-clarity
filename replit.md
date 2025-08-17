# ПлюсМинус MVP - Full-Stack SaaS Platform

## Overview

ПлюсМинус is a comprehensive SaaS platform designed to automate unit economics monitoring for marketplace sellers. The application helps Russian e-commerce sellers on platforms like Wildberries and OZON understand their true profitability by automatically calculating margins, commissions, and logistics costs through interactive tables similar to Airtable.

The system is built as a modern full-stack web application with full authentication and store management capabilities. Users can register, login, manage their Wildberries API tokens, and access real-time profitability analytics to make data-driven decisions about pricing and product assortment.

## Recent Changes (Aug 17, 2025)

- Implemented authentication system with registration and login pages
- Added store management functionality for Wildberries API integration
- Created navigation between Stores and Products sections
- Implemented secure token validation and management
- Enhanced user flow for new and existing users

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture
The application follows a unified monolithic architecture with clear separation between frontend and backend concerns:

**Frontend Architecture:**
- React-based SPA using Vite for development tooling
- TypeScript for type safety throughout the client application
- Component library built on Radix UI primitives with shadcn/ui components
- TailwindCSS for styling with CSS variables for theming
- Wouter for client-side routing
- TanStack React Query for server state management and caching

**Backend Architecture:**
- Express.js server with TypeScript
- RESTful API design with centralized route registration
- Memory-based storage abstraction with interface-driven design
- Modular storage system supporting future database implementations
- Hot module replacement in development via Vite integration

**Database Layer:**
- Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- Database schema includes users, products, and marketplace credentials
- Support for marketplace-specific data (Wildberries, OZON)
- Built-in audit fields (created_at, updated_at) for all entities

**Component Design System:**
- Comprehensive UI component library with 30+ reusable components
- Consistent design tokens through CSS custom properties
- Form handling with React Hook Form integration
- Data visualization components for charts and tables
- Responsive design patterns for mobile and desktop

**Development Architecture:**
- Monorepo structure with shared TypeScript schemas between client and server
- Path aliases for clean imports (@/ for client, @shared/ for shared code)
- ESM module system throughout the stack
- Development server with proxy setup for API routes

### Key Design Decisions

**Storage Abstraction:**
Implemented an interface-based storage system (IStorage) that currently uses in-memory storage but can be easily swapped for database implementations. This provides flexibility for different deployment scenarios while maintaining type safety.

**Shared Schema Design:**
Created a shared schema layer using Drizzle ORM that serves both as database schema and TypeScript types, ensuring consistency between frontend and backend data models.

**Component Architecture:**
Built a layered component system with base UI components, feature-specific components, and layout components. This promotes reusability and maintainability while providing a consistent user experience.

**Development Workflow:**
Configured Vite for both client bundling and server-side development with hot reload, enabling rapid iteration during development while maintaining production-ready build processes.

## External Dependencies

**Core Framework Dependencies:**
- React 18 for UI rendering and component lifecycle
- Express.js for server-side API handling
- Vite for development tooling and client bundling
- TypeScript for type safety across the entire stack

**Database & ORM:**
- Drizzle ORM for type-safe database operations
- PostgreSQL via Neon Database serverless architecture
- Database migrations handled through Drizzle Kit

**UI & Styling:**
- Radix UI for accessible primitive components
- TailwindCSS for utility-first styling
- Lucide React for consistent iconography
- CSS custom properties for dynamic theming

**State Management:**
- TanStack React Query for server state and caching
- React Hook Form for form state management
- Wouter for client-side routing

**Development Tools:**
- TSX for TypeScript execution in development
- ESBuild for production server bundling
- Various Radix UI components for complex UI patterns

**Marketplace Integrations (Planned):**
- Wildberries API for product and sales data
- OZON API for cross-platform analytics
- API key encryption for secure credential storage

**Production Infrastructure:**
- Vercel for hosting and deployment
- PostgreSQL for persistent data storage
- Redis for caching and session management
- Email service integration for notifications