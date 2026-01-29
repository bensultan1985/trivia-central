# Game Builder Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser/Client                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         /game-builder (page.tsx)                   │    │
│  │                                                      │    │
│  │  State Management:                                  │    │
│  │  - questions: Question[]                            │    │
│  │  - currentGame: Game | null                         │    │
│  │  - hasUnsavedChanges: boolean                       │    │
│  │                                                      │    │
│  │  Components:                                        │    │
│  │  ├─ Header (Orange theme)                          │    │
│  │  ├─ Toolbar (New, Load, Save, Shuffle buttons)    │    │
│  │  ├─ Question Editor (Add/Remove, Radio buttons)   │    │
│  │  ├─ Load Modal (Saved games list)                 │    │
│  │  └─ Save Modal (Name input)                       │    │
│  │                                                      │    │
│  │  Hooks:                                             │    │
│  │  - useUser (Clerk authentication)                   │    │
│  │  - useEffect (beforeunload warning)                │    │
│  │  - useState (local state management)               │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          │ HTTP Fetch API                    │
│                          │ (GET, POST, PUT, DELETE)          │
└──────────────────────────┼───────────────────────────────────┘
                           │
                           │
┌──────────────────────────┼───────────────────────────────────┐
│                  Next.js Server/API                          │
├──────────────────────────┼───────────────────────────────────┤
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Middleware (middleware.ts)                  │    │
│  │         - Clerk authentication check                │    │
│  │         - Protects /game-builder route              │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │         /api/games (route.ts)                       │    │
│  │                                                      │    │
│  │  GET /api/games                                     │    │
│  │  ├─ isAuthenticated() check                         │    │
│  │  ├─ Fetch user's games from DB                      │    │
│  │  └─ Return games with questions                     │    │
│  │                                                      │    │
│  │  POST /api/games                                    │    │
│  │  ├─ isAuthenticated() check                         │    │
│  │  ├─ Validate: name, questions, correctAnswer       │    │
│  │  ├─ Create game with nested questions              │    │
│  │  └─ Return created game                             │    │
│  │                                                      │    │
│  │  PUT /api/games                                     │    │
│  │  ├─ isAuthenticated() check                         │    │
│  │  ├─ Validate: id, name, questions                  │    │
│  │  ├─ Check ownership                                 │    │
│  │  ├─ Delete old questions                            │    │
│  │  ├─ Create new questions                            │    │
│  │  └─ Return updated game                             │    │
│  │                                                      │    │
│  │  DELETE /api/games?id={id}                         │    │
│  │  ├─ isAuthenticated() check                         │    │
│  │  ├─ Check ownership                                 │    │
│  │  ├─ Delete game (cascade to questions)             │    │
│  │  └─ Return success                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          │ Prisma Client                     │
│                          ▼                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                           │
┌──────────────────────────┼───────────────────────────────────┐
│                    Database (PostgreSQL)                     │
├──────────────────────────┼───────────────────────────────────┤
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Game                                               │    │
│  │  ├─ id (PK)                                         │    │
│  │  ├─ clerkUserId (indexed)                           │    │
│  │  ├─ name                                            │    │
│  │  ├─ createdAt                                       │    │
│  │  └─ updatedAt                                       │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          │ One-to-Many                       │
│                          │ (Cascade Delete)                  │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │  GameQuestion                                       │    │
│  │  ├─ id (PK)                                         │    │
│  │  ├─ gameId (FK, indexed)                            │    │
│  │  ├─ question                                        │    │
│  │  ├─ answer1                                         │    │
│  │  ├─ answer2                                         │    │
│  │  ├─ answer3 (nullable)                              │    │
│  │  ├─ answer4 (nullable)                              │    │
│  │  ├─ correctAnswer (1-4)                             │    │
│  │  ├─ orderIndex                                      │    │
│  │  ├─ createdAt                                       │    │
│  │  └─ updatedAt                                       │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### Creating a New Game

```
1. User fills out questions in UI
   ↓
2. User clicks "Save Game"
   ↓
3. If new game: Modal prompts for name
   ↓
4. Frontend sends POST /api/games
   {
     name: "My Trivia Game",
     questions: [
       {
         question: "What is 2+2?",
         answer1: "4",
         answer2: "3",
         answer3: "5",
         answer4: "",
         correctAnswer: 1
       }
     ]
   }
   ↓
5. API validates:
   - User is authenticated
   - Name is not empty
   - At least 1 question
   - Max 50 questions
   - Required fields present
   - Selected correct answer has content
   ↓
6. API creates Game record
   ↓
7. API creates GameQuestion records (nested)
   ↓
8. API returns created game with ID
   ↓
9. Frontend updates state
   - Sets currentGame
   - Clears hasUnsavedChanges
   - Shows success message
```

### Loading an Existing Game

```
1. User clicks "Load Game"
   ↓
2. Frontend fetches GET /api/games
   ↓
3. API validates user is authenticated
   ↓
4. API queries games where clerkUserId = user.id
   ↓
5. API includes related questions (ordered)
   ↓
6. Frontend displays in modal:
   - Game name
   - Question count
   - Last updated date
   - Load & Delete buttons
   ↓
7. User clicks "Load" on a game
   ↓
8. If unsaved changes: Confirmation prompt
   ↓
9. Frontend loads game into editor:
   - Sets currentGame
   - Populates questions array
   - Clears hasUnsavedChanges
   - Closes modal
```

### Shuffling Answers

```
1. User clicks "Shuffle Answers"
   ↓
2. For each question:
   a. Build array of non-empty answers
   b. If < 2 answers: skip
   c. If correct answer empty: skip
   d. Shuffle array (Fisher-Yates)
   e. Find new position of correct answer
   f. Update question with shuffled answers
   ↓
3. Update state with shuffled questions
   ↓
4. Mark hasUnsavedChanges = true
   ↓
5. User must save to persist changes
```

### Deleting a Game

```
1. User clicks "Load Game"
   ↓
2. User clicks "Delete" on a game
   ↓
3. Browser confirmation dialog
   ↓
4. Frontend sends DELETE /api/games?id={gameId}
   ↓
5. API validates:
   - User is authenticated
   - Game exists
   - User owns the game
   ↓
6. API deletes game
   ↓
7. Database cascade deletes related questions
   ↓
8. Frontend refreshes game list
   ↓
9. If deleted game was loaded:
   - Reset to blank state
   - Clear currentGame
   - Add blank question
```

## Security Model

```
┌─────────────────────────────────────────────────────────────┐
│                     Security Layers                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Layer 1: Middleware (Clerk)                                │
│  - Blocks unauthenticated access to /game-builder           │
│  - Validates session token                                  │
│  - Provides user context                                    │
│                                                              │
│  Layer 2: API Authentication                                │
│  - isAuthenticated() check on every endpoint                │
│  - Returns 401 if not authenticated                         │
│                                                              │
│  Layer 3: Ownership Validation                              │
│  - Filters queries by clerkUserId                           │
│  - Verifies game belongs to user before update/delete       │
│  - Returns 404 if not owned                                 │
│                                                              │
│  Layer 4: Input Validation                                  │
│  - Validates all required fields                            │
│  - Sanitizes strings (trim)                                 │
│  - Enforces constraints (min/max)                           │
│  - Validates correct answer has content                     │
│  - Returns 400 with descriptive error                       │
│                                                              │
│  Layer 5: Database (Prisma ORM)                             │
│  - Parameterized queries (SQL injection prevention)         │
│  - Type safety                                               │
│  - Foreign key constraints                                  │
│  - Cascade delete rules                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## State Management

```
Client State (React useState):
┌─────────────────────────────────────────────┐
│ questions: Question[]                        │
│ - Current working set of questions           │
│ - Modified in real-time as user types        │
│ - Source of truth for editor                 │
│                                              │
│ currentGame: Game | null                     │
│ - Loaded game metadata                       │
│ - null = new game, not null = editing        │
│ - Used to determine save vs update           │
│                                              │
│ hasUnsavedChanges: boolean                   │
│ - Tracks if state differs from saved         │
│ - Triggers warnings on navigation            │
│ - Resets after successful save               │
│                                              │
│ savedGames: Game[]                           │
│ - Cached list from server                    │
│ - Fetched when load modal opens              │
│ - Refreshed after delete                     │
│                                              │
│ gameName: string                             │
│ - Temporary storage for name input           │
│ - Used in save modal                         │
│ - Synced with currentGame.name               │
└─────────────────────────────────────────────┘

Server State (PostgreSQL):
┌─────────────────────────────────────────────┐
│ Game + GameQuestion records                  │
│ - Persistent storage                         │
│ - Single source of truth                     │
│ - Indexed by clerkUserId for fast queries   │
└─────────────────────────────────────────────┘
```
