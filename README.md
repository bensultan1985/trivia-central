# trivia-train

A game show and trivia training app for people who want to win.

## Features

- **User Authentication**: Secure authentication powered by Clerk with support for email, username/password, phone number, Google, and X (Twitter)
- **Responsive Design**: Mobile-friendly with collapsible navigation
- **Training Modes**: Three different training types to improve your trivia skills
  - ⚡ Speed Training: Rapid-fire questions for quick thinking
  - 🎯 Accuracy Training: Focus on precision and correctness
  - 📚 Category Training: Master specific trivia categories

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Database**: Prisma ORM with PostgreSQL
- **Styling**: Tailwind CSS (v4)
- **Authentication**: Clerk (email, username/password, phone, Google, X)

> **Note:** The project still includes `bcrypt` and `jsonwebtoken` dependencies for backward compatibility with legacy auth routes. These can be removed in a future update once all users have migrated to Clerk.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk account (free at https://clerk.com)

### Quick Start

**New to this project?** Follow the [Quick Start Guide](QUICK_START.md) for a step-by-step setup (15-20 minutes).

### Detailed Setup

### Tailwind note

This project uses Tailwind v4. Global styles are loaded via `@import "tailwindcss";` in `app/globals.css` (not the older `@tailwind base/components/utilities` directives).

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk account (free at https://clerk.com)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bensultan1985/trivia-train.git
cd trivia-train
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:
   Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/trivia_train"
OPENAI_API_KEY="your-openai-api-key-here"  # Required for trivia generation

# Clerk authentication keys (get these from https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
```

   **Need help?** See [CLERK_SETUP.md](CLERK_SETUP.md) for detailed Clerk configuration.

4. Set up the database:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

7. Test authentication:
   - Click **Register** to create an account
   - See [TESTING_AUTH.md](TESTING_AUTH.md) for comprehensive testing instructions

## Documentation

- **[QUICK_START.md](QUICK_START.md)** - Fast setup guide (15-20 minutes)
- **[CLERK_SETUP.md](CLERK_SETUP.md)** - Detailed Clerk configuration
- **[TESTING_AUTH.md](TESTING_AUTH.md)** - Testing instructions
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical details

## Database Schema

The app includes models for:

- **User**: User accounts with email, username, and encrypted passwords
- **Session**: Authentication session management
- **TriviaQuestion**: Questions with multiple choice answers and categories
- **TrainingSession**: Track user training progress and scores

## Project Structure

```
trivia-train/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   ├── sign-in/             # Clerk sign-in page
│   ├── sign-up/             # Clerk sign-up page
│   ├── training/            # Training mode pages
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── Header.tsx           # App header with user info
│   └── Sidebar.tsx          # Collapsible navigation
├── lib/                     # Utility functions
│   └── prisma.ts            # Prisma client
├── prisma/                  # Database schema
│   └── schema.prisma        # Prisma models
└── middleware.ts            # Clerk middleware
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run generate-trivia` - Generate trivia questions using AI (see [scripts/README.md](scripts/README.md))
- `npx prisma studio` - Open Prisma Studio to view/edit data

## Trivia Question Generator

The app includes an AI-powered trivia question generator that can seed the database with high-quality trivia questions. See [scripts/README.md](scripts/README.md) for detailed usage instructions.

Quick start:
```bash
# Set up your OpenAI API key in .env
OPENAI_API_KEY=your_api_key

# Generate 100 trivia questions
npm run generate-trivia
```

## License

ISC
