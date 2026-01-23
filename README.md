# trivia-train

A game show and trivia training app for people who want to win.

## Features

- **User Authentication**: Secure register/login system with JWT session tokens
- **Responsive Design**: Mobile-friendly with collapsible navigation
- **Training Modes**: Three different training types to improve your trivia skills
  - ⚡ Speed Training: Rapid-fire questions for quick thinking
  - 🎯 Accuracy Training: Focus on precision and correctness
  - 📚 Category Training: Master specific trivia categories

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Database**: Prisma ORM with PostgreSQL
- **Styling**: Tailwind CSS (v4)
- **Authentication**: bcrypt + JWT tokens

## Getting Started

### Tailwind note

This project uses Tailwind v4. Global styles are loaded via `@import "tailwindcss";` in `app/globals.css` (not the older `@tailwind base/components/utilities` directives).

### Prerequisites

- Node.js 18+
- PostgreSQL database

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
   Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/trivia_train"
JWT_SECRET="your-secure-secret-key-here"
```

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
│   ├── api/auth/            # Authentication API routes
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── training/            # Training mode pages
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── Header.tsx           # App header with user info
│   └── Sidebar.tsx          # Collapsible navigation
├── lib/                     # Utility functions
│   ├── auth.ts              # Authentication helpers
│   └── prisma.ts            # Prisma client
├── prisma/                  # Database schema
│   └── schema.prisma        # Prisma models
└── public/                  # Static assets
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio to view/edit data

## License

ISC
