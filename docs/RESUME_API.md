# Resume PDF Generation API

This module provides dynamic PDF generation for ATS-friendly resumes from NeonDB.

## Setup

### 1. Configure NeonDB

1. Create a database in [NeonDB Console](https://console.neon.tech)
2. Copy your connection string
3. Add it to your `.env` file:

```bash
DATABASE_URL="postgresql://username:password@your-neon-host.neon.tech/your-database?sslmode=require"
```

### 2. Push Schema to Database

```bash
npm run db:push
```

### 3. Seed the Database

```bash
npm run db:seed
```

### 4. Test the API

Start the dev server:

```bash
npm run dev
```

Then visit:

- **English resume**: [http://localhost:3000/api/resume?locale=en](http://localhost:3000/api/resume?locale=en)
- **Spanish resume**: [http://localhost:3000/api/resume?locale=es](http://localhost:3000/api/resume?locale=es)
- **View in browser** (not download): [http://localhost:3000/api/resume?locale=en&download=false](http://localhost:3000/api/resume?locale=en&download=false)

## API Reference

### GET `/api/resume`

Generates and returns an ATS-friendly PDF resume.

**Query Parameters:**

| Parameter  | Type     | Default | Description                             |
| ---------- | -------- | ------- | --------------------------------------- |
| `locale`   | `string` | `"en"`  | Language: `"en"` or `"es"`              |
| `download` | `string` | `true`  | If `"false"`, opens in browser (inline) |

**Response:**

- `200 OK`: PDF file with appropriate headers
- `400 Bad Request`: Invalid locale
- `404 Not Found`: No active resume for the given locale
- `500 Internal Server Error`: PDF generation failed

## Database Schema

The resume data is stored across these tables:

- **Resume**: Main record linking all resume components
- **Person**: Personal info (name, role, contact, bio)
- **Highlight**: Key metrics (years, projects, focus areas)
- **Skill**: Technical skills by category (primary/secondary/tooling)
- **Experience**: Work history with bullets and tech stack
- **Project**: Portfolio projects with highlights
- **Education**: Educational background

### Visual Schema

```
Resume (1) ─────┬──── (1) Person
                ├──── (*) Highlight
                ├──── (*) Skill
                ├──── (*) Experience
                ├──── (*) Project
                └──── (*) Education
```

## ATS-Friendly Features

The generated PDF is optimized for Applicant Tracking Systems:

✅ **Single column layout** - Easy to parse  
✅ **Selectable text** - Not images  
✅ **Standard section titles** - Experience, Skills, Education  
✅ **Unicode font** (Inter) - Proper support for accents (á, é, ñ)  
✅ **No graphics or icons** - Pure text content  
✅ **Clear hierarchy** - Bold headers, consistent spacing

## Development

### Database Commands

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema to database (no migration history)
npm run db:push

# Create migration (production recommended)
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Open Prisma Studio to view/edit data
npm run db:studio
```

### Project Structure

```
lib/
├── prisma.ts              # Prisma client singleton
├── generated/prisma/      # Generated Prisma client
└── resume/
    ├── index.ts           # Module exports
    ├── types.ts           # TypeScript types
    ├── repository.ts      # Database queries
    ├── pdf-document.tsx   # React PDF component
    └── pdf-service.tsx    # PDF generation service

prisma/
├── schema.prisma          # Database schema
└── seed.ts                # Seed script

app/api/resume/
└── route.ts               # API endpoint
```

## Vercel Deployment

The API runs on **Node.js runtime** (not Edge) for PDF generation compatibility.

1. Add `DATABASE_URL` to Vercel Environment Variables
2. The build script (`npm run build`) automatically generates the Prisma client
3. Deploy normally

### Important Notes

- PDF generation happens on the server
- Files are cached for 1 hour via Cache-Control headers
- The Neon adapter is serverless-compatible
