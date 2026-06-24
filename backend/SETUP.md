# Backend Development Setup - Bitcoin Land Bond

## Technology Stack
- **Runtime:** Node.js 20.x
- **Framework:** Express.js 4.x
- **ORM:** Prisma 5.x
- **Database:** PostgreSQL 15+
- **Authentication:** JWT + bcrypt
- **Validation:** Zod
- **Testing:** Jest + Supertest

## Prerequisites
- Node.js 20+ and npm
- PostgreSQL 15+ installed locally or via Docker
- Docker & Docker Compose (optional)

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in values:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/blb_phase0"
JWT_SECRET="your-super-secret-key-change-in-prod"
JWT_EXPIRE="7d"
API_PORT=3001
NODE_ENV="development"
DIGNIFI_API_KEY="your-dignifi-key"
DIGNIFI_API_URL="https://api.dignifi.com"
```

### 3. Database Setup with Docker
```bash
docker-compose up -d
```

Runs PostgreSQL 15 on localhost:5432

### 4. Initialize Database
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

Server runs on http://localhost:3001

## Project Structure
```
backend/
├── src/
│   ├── routes/          # Express route handlers
│   ├── controllers/      # Business logic
│   ├── services/         # Database & external APIs
│   ├── middleware/       # Auth, validation, error handling
│   ├── models/           # Prisma schema
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Helpers (hashing, jwt, etc)
│   └── app.js           # Express app setup
├── prisma/
│   ├── schema.prisma    # Prisma schema
│   └── seed.js          # Seed data
├── .env.example         # Environment template
├── docker-compose.yml   # Local PostgreSQL
└── package.json
```

## Database Migrations
```bash
# Create new migration
npx prisma migrate dev --name add_new_field

# Apply pending migrations
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset
```

## Scripts
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Compile TypeScript
npm run start        # Run production build
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Watch mode
npm run seed         # Populate seed data
```

## Testing
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# Coverage report
npm run test:coverage
```

## API Documentation
- Swagger/OpenAPI: http://localhost:3001/api-docs (after setup)
- Postman Collection: `backend/postman-collection.json`

## Troubleshooting
- **Port 5432 in use:** `docker-compose down && docker-compose up -d`
- **Migration errors:** `npx prisma migrate reset` (dev only)
- **Module not found:** `npm install && npx prisma generate`
