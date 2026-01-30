# Game Builder Testing Guide

## Prerequisites
- Database must be migrated with the new Game and GameQuestion models
- Clerk authentication must be configured
- User must be signed in to access the Game Builder

## Running the Migration
```bash
npx prisma migrate dev --name add_game_models
```

## Features to Test

### 1. Authentication
- [ ] Navigate to `/game-builder` while not signed in
- [ ] Verify you see a login prompt with "Sign In" button
- [ ] Sign in and verify you can access the game builder

### 2. Creating a New Game
- [ ] Click "New Game" button
- [ ] Verify you get a blank question form
- [ ] Fill out question text, answer 1, and answer 2
- [ ] Select the correct answer using radio button
- [ ] Click "Save Game"
- [ ] Verify you're prompted to enter a game name
- [ ] Enter a name and save
- [ ] Verify you see "Game saved successfully!" message

### 3. Adding Questions
- [ ] Click "+ Add Question" button
- [ ] Verify a new blank question form appears
- [ ] Verify the counter updates (e.g., "1/50" -> "2/50")
- [ ] Add up to 50 questions
- [ ] Verify you cannot add more than 50 questions

### 4. Removing Questions
- [ ] Click "Remove" on any question
- [ ] Verify the question is removed
- [ ] Try to remove the last remaining question
- [ ] Verify you cannot remove it (minimum 1 question)

### 5. Optional Answers
- [ ] Fill out Answer 3 and Answer 4 fields (optional)
- [ ] Verify you can select Answer 3 or Answer 4 as the correct answer
- [ ] Save the game
- [ ] Reload and verify optional answers are preserved

### 6. Loading Existing Games
- [ ] Click "Load Game" button
- [ ] Verify you see a modal with your saved games
- [ ] Verify each game shows:
  - Game name
  - Number of questions
  - Last updated date
  - "Load" and "Delete" buttons
- [ ] Click "Load" on a game
- [ ] Verify the game loads with all questions intact

### 7. Updating Existing Games
- [ ] Load an existing game
- [ ] Make changes to questions
- [ ] Click "Save Game"
- [ ] Verify the game updates without asking for a name
- [ ] Reload the game and verify changes persisted

### 8. Deleting Games
- [ ] Click "Load Game"
- [ ] Click "Delete" on a game
- [ ] Verify you get a confirmation prompt
- [ ] Confirm deletion
- [ ] Verify the game is removed from the list

### 9. Shuffle Answers
- [ ] Create a game with 4 answers per question
- [ ] Note the order of answers
- [ ] Click "Shuffle Answers"
- [ ] Verify:
  - Answer order changes for all questions
  - Correct answer radio button moves to the new position
  - All answer text is preserved
- [ ] Save and reload
- [ ] Verify shuffled order persists

### 10. Unsaved Changes Warning
- [ ] Make changes to a game
- [ ] Try to navigate away (click browser back button)
- [ ] Verify you get a browser warning about unsaved changes
- [ ] Try to click "New Game"
- [ ] Verify you get a confirmation modal
- [ ] Try to load another game
- [ ] Verify you get a confirmation modal

### 11. Save Validation
- [ ] Try to save with all questions empty
- [ ] Verify "Save Game" button is disabled
- [ ] Fill out at least one complete question (question text + 2 answers)
- [ ] Verify "Save Game" button becomes enabled
- [ ] Try to save without selecting a correct answer
- [ ] Verify you get an error

### 12. Visual Indicators
- [ ] Verify "Editing: [Game Name]" appears when editing an existing game
- [ ] Make changes and verify "● Unsaved changes" indicator appears
- [ ] Save and verify the indicator disappears

## API Endpoint Tests

### GET /api/games
```bash
# Should return list of user's games
curl http://localhost:3000/api/games \
  -H "Cookie: __session=<clerk-session-token>"
```

### POST /api/games
```bash
# Create a new game
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -H "Cookie: __session=<clerk-session-token>" \
  -d '{
    "name": "Test Game",
    "questions": [
      {
        "question": "What is 2+2?",
        "answer1": "4",
        "answer2": "3",
        "answer3": "5",
        "answer4": "",
        "correctAnswer": 1
      }
    ]
  }'
```

### PUT /api/games
```bash
# Update an existing game
curl -X PUT http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -H "Cookie: __session=<clerk-session-token>" \
  -d '{
    "id": "<game-id>",
    "name": "Updated Game",
    "questions": [
      {
        "question": "What is 3+3?",
        "answer1": "6",
        "answer2": "5",
        "correctAnswer": 1
      }
    ]
  }'
```

### DELETE /api/games
```bash
# Delete a game
curl -X DELETE "http://localhost:3000/api/games?id=<game-id>" \
  -H "Cookie: __session=<clerk-session-token>"
```

## Known Limitations
1. This is the editor/builder only - gameplay functionality is planned for a future ticket
2. No drag-and-drop reordering of questions (uses array order)
3. No rich text editing for questions
4. No image support for questions/answers
5. No preview mode before saving

## Success Criteria
All the above tests should pass without errors. The game builder should:
- Only be accessible to authenticated users
- Allow CRUD operations on games
- Enforce constraints (min 1, max 50 questions)
- Warn before losing unsaved changes
- Shuffle answers while maintaining correctness
- Persist data across sessions
