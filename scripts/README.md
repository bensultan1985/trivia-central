# Trivia Question Generator

This directory contains scripts for generating trivia questions using AI.

## Files

- **triviaCategories.ts**: Defines the category tree structure for trivia topics
- **generateTrivia.ts**: Main script that generates trivia questions using OpenAI API

## Usage

### Prerequisites

1. Set up your environment variables:

   ```bash
   OPENAI_API_KEY=your_openai_api_key
   DATABASE_URL=your_database_connection_string
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

### Generate Trivia Questions

Generate 100 trivia questions (default):

```bash
npm run generate-trivia
```

Generate a custom number of questions:

```bash
npx tsx scripts/generateTrivia.ts 50
```

## Category Structure

The trivia categories are organized in a hierarchical tree structure:

```
geography/
  water/
    oceans/
    seas/
    rivers/
    topic-extremes/
  continents/
    North America/
      countries/
      states/
      cities/
      topic-extremes/
sports/
  team-sports/
    football/
    basketball/
  individual-sports/
media/
  movies/
  television/
  music/
history/
science/
literature/
food-and-drink/
pop-culture/
```

### Topic-Extremes Category

The `topic-extremes` subcategory contains trivia about superlatives such as:

- Biggest/smallest
- Tallest/shortest
- Longest/shortest
- Most/least
- Oldest/newest
- etc.

## Database Schema

Each generated trivia question includes:

- **question**: The trivia question text
- **correctAnswer**: The correct answer
- **wrongAnswer1-3**: Three incorrect answers
- **category**: Top-level category
- **categoryPath**: Full path (e.g., "geography/water/Pacific Ocean")
- **citations**: Array of sources for the answer
- **engagement**: Count of how many times answered (default: 0)
- **choice1-4Count**: Counts of how many users selected each choice (default: 0)
- **upvotes/downvotes**: Community feedback (default: 0)
- **questionContext**: Additional context about the question
- **answerContext**: Additional context about the answer
- **tags**: Keywords associated with the trivia
- **importance**: Rating 1-10 for likelihood of appearing on a trivia show
- **commonKnowledgeUserDateRange**: Birth-year range most likely to know the answer: `null`, `[earliestBirthYear]` (implies "present"), or `[earliestBirthYear, latestBirthYear]`

## How It Works

1. The script runs a loop for the specified number of iterations (default: 100)
2. Each iteration:
   - Randomly selects a leaf category from the tree
   - Sends a prompt to OpenAI's GPT-4 model
   - Parses the AI-generated trivia question
   - Saves the question to the database with all metadata
3. Progress is logged to the console
4. Final statistics are displayed at the end

## API Rate Limiting

The script includes a 1-second delay between API calls to avoid rate limiting.
Adjust the delay in `generateTrivia.ts` if needed.

## Error Handling

- If OpenAI API fails, the question is skipped
- If database save fails, the error is logged
- Final statistics show success/failure counts

## Customization

You can customize:

1. **Categories**: Edit `triviaCategories.ts` to add/modify categories
2. **AI Model**: Change the model in `generateTrivia.ts` (default: gpt-4)
3. **Prompt**: Modify the prompt to adjust question style/difficulty
4. **Iterations**: Pass a number as argument to the script

## Example Output

```
[1/100] Generating trivia question...
Category: geography/water/oceans -> Pacific Ocean
Question: What is the deepest point in the Pacific Ocean called?
✓ Successfully saved to database

[2/100] Generating trivia question...
Category: sports/team-sports/basketball -> NBA teams
Question: Which NBA team has won the most championships?
✓ Successfully saved to database

...

==================================================
Trivia generation complete!
Successfully generated: 98
Failed: 2
==================================================
```
