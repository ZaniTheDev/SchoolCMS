# SchoolCMS Developer Documentation

## Overview

SchoolCMS is a school content management system built with:

- Next.js 16 App Router
- Prisma ORM
- PostgreSQL (Neon)
- NextAuth credentials authentication with JWT sessions
- bcryptjs for password verification

The app is split into three main layers:

- Public website for school content
- Admin dashboard for content management
- API routes for CRUD and authentication

## Architecture

### Frontend

The frontend lives under `src/app` and `src/components`.

- Public pages:
  - `/` home page
  - `/news` news page
  - `/news/[slug]` post detail page (Next.js 16 async params)
  - `/login` login page
- Admin pages:
  - `/admin` dashboard
  - `/admin/posts` posts list
  - `/admin/posts/new` create post
  - `/admin/posts/[id]/edit` edit post

The public UI uses reusable components:

- `src/components/public/Navbar.jsx`
- `src/components/public/Hero.jsx`
- `src/components/public/About.jsx`
- `src/components/public/PostDetails.jsx`

The admin UI uses:

- `src/components/Admin/StatCard.jsx`
- `src/components/Admin/LogoutButton.jsx`
- `src/components/Admin/PostForm.jsx` — TipTap rich text editor form

### Backend

The backend uses Next.js route handlers in `src/app/api`.

Collections currently supported:

- posts
- teachers
- events
- gallery images
- auth
- settings

### Data Layer

Prisma is configured with a PostgreSQL datasource via Neon.

- Prisma schema: `prisma/schema.prisma`
- Prisma client (root): `lib/prisma.js` — uses `PrismaPg` adapter
- Prisma client re-export: `src/lib/prisma.js` — re-exports from root for `@/lib/prisma` alias compatibility
- Generated client output: `generated/prisma/`

## Folder Structure

```text
src/
  app/
    admin/
      layout.js
      page.jsx
      posts/
        page.jsx
        new/page.jsx
        [id]/edit/page.jsx
    api/
      auth/
        logout/route.ts
        [...nextauth]/route.js
      events/
        route.js
        [id]/route.js
      gallery/
        route.js
        [id]/route.js
      posts/
        route.js
        [id]/route.js
      settings/
        route.js
      teachers/
        route.js
        [id]/route.js
      [id]/route.js          # Legacy — should be removed
    login/
      page.jsx
      loginPage.jsx
    news/
      page.jsx
      News.jsx
      [slug]/page.jsx
    layout.js
    page.jsx
    globals.css
  components/
    SessionProvider.jsx
    Admin/
      LogoutButton.jsx
      PostForm.jsx
      StatCard.jsx
    public/
      About.jsx
      Hero.jsx
      Navbar.jsx
      PostDetails.jsx
  lib/
    auth.js
    prisma.js
lib/
  prisma.js
prisma/
  schema.prisma
  migrations/
generated/
  prisma/
public/
```

## Database Models

### User

- `id` String @id @default(cuid())
- `name` String
- `email` String @unique
- `password` String
- `role` String @default("USER")
- `createdAt` DateTime
- `updatedAt` DateTime

Relations: one user has many posts

### Post

- `id` String @id @default(cuid())
- `title` String
- `slug` String @unique
- `content` String
- `thumbnail` String?
- `publishedAt` DateTime?
- `authorId` String
- `author` User relation
- `createdAt` DateTime
- `updatedAt` DateTime

### Teacher

- `id` String
- `name` String
- `position` String
- `photo` String?
- `bio` String?
- `createdAt` DateTime
- `updatedAt` DateTime

### Event

- `id` String
- `title` String
- `description` String
- `date` DateTime
- `image` String?
- `createdAt` DateTime
- `updatedAt` DateTime

### GalleryImage

- `id` String
- `imageUrl` String
- `caption` String?
- `createdAt` DateTime
- `updatedAt` DateTime

## API Response Shape

All API responses follow this envelope:

```json
{ "success": true, "data": { ... } }
// or
{ "success": false, "message": "Error description" }
```

List endpoints nest data under `data.posts` (or `data.teachers`, etc.) with `data.pagination`:

```json
{ "success": true, "data": { "posts": [...], "pagination": { "page": 1, "limit": 10, "total": 5, "pages": 1 } } }
```

**Important:** Page components must read `response.data.posts`, NOT `response.posts`.

## API Routes

### Posts

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/posts` | public | List posts. Query: `published`, `slug`, `limit`, `page` |
| POST | `/api/posts` | admin | Create post |
| GET | `/api/posts/[id]` | public | Get single post by ID |
| PUT | `/api/posts/[id]` | admin | Update post |
| DELETE | `/api/posts/[id]` | admin | Delete post |

### Teachers

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/teachers` | public | List with pagination |
| POST | `/api/teachers` | admin | Create |
| GET/PUT/DELETE | `/api/teachers/[id]` | mixed | Single resource CRUD |

### Events

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/events` | public | List with pagination, `upcoming` filter |
| POST | `/api/events` | admin | Create |
| GET/PUT/DELETE | `/api/events/[id]` | mixed | Single resource CRUD |

### Gallery

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/gallery` | public | List with pagination |
| POST | `/api/gallery` | admin | Upload |
| DELETE | `/api/gallery/[id]` | admin | Delete |

### Settings

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/settings` | public | Placeholder data |
| PUT | `/api/settings` | admin | Placeholder, does not persist |

### Auth

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/logout` | Confirms logout (client-side signOut clears cookies) |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handler |

## Authentication Flow

Configured in `src/lib/auth.js`. Uses NextAuth v4 with JWT strategy and credentials provider.

Flow:

1. User submits email and password at `/login`.
2. `authorize` callback looks up user with Prisma, verifies password with bcryptjs.
3. Returns `{ id, email, name, role }` on success.
4. `jwt` callback stores `role`, `sub` (user id), and `email` in the JWT token.
5. `session` callback copies `role`, `id`, and `email` from token to session.
6. Admin pages check `session.user.role === "ADMIN"`.
7. API routes use `getToken` to read the raw JWT and check `token.role === "ADMIN"`.

**API route auth pattern** (used in `/api/posts` POST):

```js
const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
if (!token || token.role !== "ADMIN") { return 401; }
// authorId resolution: token.sub ?? lookup by email ?? fallback chain
```

### Middleware

`src/middleware.js` protects:

- `/admin/:path*`
- `/login`

Behavior:

- redirects admins away from `/login` to `/admin`
- redirects non-admins away from `/admin` to `/login`

## Known Issues

### 1. JWT `sub` field is empty at runtime — post creation uses a fallback chain

**Status: Active, with workaround**

The `authorize` callback returns `user.id` and the `jwt` callback sets `token.sub = user.id`. However, the encrypted JWT shows `"sub": ""` for session cookies issued before the callback fix.

**Current workaround in `src/app/api/posts/route.js`:** A multi-step fallback resolves `authorId`:

1. `token?.sub`
2. `prisma.user.findUnique({ where: { email: token.email } })`
3. Any ADMIN user in the database
4. Any user in the database
5. Create a dev fallback user (`dev-admin@localhost.local`) in non-production

Debug logs remain in `src/lib/auth.js` — check terminal after login to see the actual `user.id` and `token.sub` values. Remove debug logs once resolved.

### 2. Duplicate post-by-id route

`src/app/api/[id]/route.js` still exists alongside `src/app/api/posts/[id]/route.js`. Remove the legacy file.

### 3. Debug logging in production code

`src/lib/auth.js` contains `console.log` debug statements to remove after the JWT issue is resolved.

### 4. Settings API is a placeholder

Returns static data, does not persist to database.

### 5. Mixed file extensions

Most files use `.js`/`.jsx`, but `src/app/api/auth/logout/route.ts` uses `.ts`.

## Important Configuration Notes

### Prisma client path

The Prisma client lives at `lib/prisma.js` (project root). The file `src/lib/prisma.js` is a re-export shim:

```js
import prisma from "../../lib/prisma";
export default prisma;
export { prisma }; // named export for `import { prisma } from "@/lib/prisma"`
```

Both `import prisma from` and `import { prisma from` work.

### Next.js 16 async params

In Next.js 16, dynamic route `params` is a **Promise**. All `[slug]` and `[id]` pages must await it:

```js
const { slug } = await params;  // NOT params.slug
```

### TypeScript / JSX resolution

`tsconfig.json` includes `**/*.jsx` and `**/*.js` in its `include` array. Required for module resolution of `.jsx` files with path aliases.

### React Compiler

`next.config.mjs` has `reactCompiler: false`. Enabling it causes module resolution failures for `.jsx` files.

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Signs/encrypts JWT tokens |
| `NEXTAUTH_URL` | Base URL (http://localhost:3000) |
| `NEXT_PUBLIC_BASE_URL` | Public base URL for client-side fetches |

## Implemented Features

- Public home page
- Public news page with post listing
- Public post detail page at `/news/[slug]`
- Responsive public navigation
- Animated hero section
- Admin dashboard with real database stats (post, teacher, event, gallery counts)
- NextAuth credentials login
- JWT session role handling
- Role-based admin access control
- Admin post CRUD (list, create, edit pages with TipTap editor)
- CRUD APIs for posts, teachers, events, gallery images
- Pagination on list endpoints
- Published/upcoming filters on some endpoints
- Logout action in admin UI
- Server-side session validation in admin pages

## Missing Features

- Public pages for: `/events`, `/teachers`, `/gallery`, `/contact`
- Admin CRUD pages for: teachers, events, gallery
- Real settings storage
- File upload workflow for gallery/media
- User management screens
- Validation layer for API inputs (e.g., zod)
- Automated tests

## Recommended Next Steps

1. **Fix the JWT `sub` issue** — remove debug logs, ensure `token.sub` is populated so `authorId` resolves directly from the token.
2. Remove the legacy `src/app/api/[id]/route.js` file.
3. Implement the missing public pages and admin CRUD screens.
4. Add a real settings table and persist settings to the database.
5. Add input validation (e.g., zod) to all API routes.
6. Add automated tests.
7. Standardize file extensions.

## Development Notes

- Use `npm run dev` for local development.
- Use `npm run build` before deployment checks.
- Prisma client generation is expected after schema changes.
- Keep auth checks aligned between middleware, route handlers, and UI.
- The admin dashboard at `src/app/admin/page.jsx` fetches real data from the database.
- The post form at `src/components/Admin/PostForm.jsx` uses TipTap rich text editor.
- API error responses use `{ success: false, message: "..." }` — read `data.message` in catch blocks, not `data.error`.
