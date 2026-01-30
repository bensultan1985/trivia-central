# Game Builder UI Documentation

## Overview
The Game Builder provides a comprehensive interface for creating, editing, and managing custom trivia games. The UI follows the existing design patterns in the application with an orange theme for the "Host" section.

## Page Structure

### Header Section
```
┌─────────────────────────────────────────────────────────┐
│ 🎮 Game Builder                                         │
│    Create custom trivia games with your own questions   │
└─────────────────────────────────────────────────────────┘
Orange background (#ff9800), white text
```

### Toolbar Section
```
┌─────────────────────────────────────────────────────────┐
│ [New Game] [Load Game] [Save Game] [Shuffle Answers]   │
│                          Editing: My Game ● Unsaved     │
└─────────────────────────────────────────────────────────┘
White background with shadow, buttons in various colors
```

### Question Editor
```
┌─────────────────────────────────────────────────────────┐
│ Question 1                                    [Remove]  │
│                                                          │
│ Question                                                 │
│ [______________________________________]                 │
│                                                          │
│ Answer 1 * (Required)                                   │
│ (•) [______________________________________]             │
│                                                          │
│ Answer 2 * (Required)                                   │
│ ( ) [______________________________________]             │
│                                                          │
│ Answer 3 (Optional)                                     │
│ ( ) [______________________________________]             │
│                                                          │
│ Answer 4 (Optional)                                     │
│ ( ) [______________________________________]             │
└─────────────────────────────────────────────────────────┘
White card with shadow, radio buttons for correct answer
```

### Add Question Button
```
┌─────────────────────────────────────────────────────────┐
│            + Add Question (5/50)                        │
└─────────────────────────────────────────────────────────┘
Full width button, blue background, shows current count
```

## Modals

### Load Game Modal
```
┌─────────────────────────────────────────────────────────┐
│ Load Game                                               │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ My First Game                        [Load] [Delete]│ │
│ │ 10 questions · Updated Jan 29, 2026                 │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Science Quiz                         [Load] [Delete]│ │
│ │ 25 questions · Updated Jan 28, 2026                 │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│                                            [Close]      │
└─────────────────────────────────────────────────────────┘
Centered modal with semi-transparent backdrop
```

### Save Game Modal (New Games)
```
┌─────────────────────────────────────────────────────────┐
│ Save Game                                               │
│                                                          │
│ Game Name                                               │
│ [______________________________________]                 │
│                                                          │
│                               [Cancel]  [Save]          │
└─────────────────────────────────────────────────────────┘
Simple modal for entering game name
```

### Unsaved Changes Prompt (Browser Native)
```
┌─────────────────────────────────────────────────────────┐
│ ⚠ Leave site?                                           │
│                                                          │
│ Changes you made may not be saved.                     │
│                                                          │
│                               [Cancel]  [Leave]         │
└─────────────────────────────────────────────────────────┘
Browser's native beforeunload dialog
```

## Color Scheme

### Primary Colors
- **Orange (#ff9800)**: Host section theme, Save button
- **Blue (#2563eb)**: Load button, Add Question button
- **Green (#16a34a)**: New Game button
- **Purple (#9333ea)**: Shuffle Answers button
- **Red (#dc2626)**: Delete button, Remove button
- **Gray (#6b7280)**: Close button, disabled states

### States
- **Disabled**: Gray (#9ca3af)
- **Hover**: Slightly darker shade of base color
- **Active/Focus**: Ring outline in theme color

## Responsive Design
- **Desktop**: Full layout with side-by-side answer fields
- **Tablet**: Stacked answer fields, smaller buttons
- **Mobile**: Hamburger menu for toolbar, stacked layout

## Authentication Flow
```
Not Signed In:
┌─────────────────────────────────────────────────────────┐
│                     Game Builder                         │
│                                                          │
│  Please sign in to create and manage your trivia games. │
│                                                          │
│                     [Sign In]                           │
└─────────────────────────────────────────────────────────┘

Signed In:
Full game builder interface as described above
```

## User Interactions

### Creating a New Game
1. User clicks "New Game" button
2. If unsaved changes exist, confirmation prompt appears
3. Editor resets to single blank question
4. User fills in questions and answers
5. User clicks "Save Game"
6. Modal appears asking for game name
7. User enters name and clicks "Save"
8. Success message appears

### Loading an Existing Game
1. User clicks "Load Game" button
2. Modal opens showing saved games list
3. User clicks "Load" on desired game
4. If unsaved changes exist, confirmation prompt appears
5. Game loads into editor
6. Modal closes

### Editing Questions
1. User types in question and answer fields
2. Unsaved indicator appears in toolbar
3. User selects correct answer via radio button
4. Changes are tracked but not saved

### Shuffling Answers
1. User clicks "Shuffle Answers" button
2. All questions have their answers randomly reordered
3. Correct answer radio button follows the correct answer
4. Unsaved indicator appears

### Saving Changes
1. User clicks "Save Game"
2. For new games: name modal appears
3. For existing games: saves immediately
4. Success alert appears
5. Unsaved indicator disappears

## Accessibility Features
- Radio buttons for correct answer selection
- Keyboard navigation support
- Focus indicators on all interactive elements
- Clear labels for all form fields
- Required field indicators
- Disabled state styling
- Confirmation dialogs for destructive actions

## Performance Considerations
- Questions are rendered client-side
- No auto-save (intentional UX choice)
- Lazy loading of saved games list
- Optimistic UI updates
- Debounced change detection

## Future Enhancements (Not in Scope)
- Drag-and-drop question reordering
- Rich text editor for questions
- Image/media upload support
- Question preview mode
- Duplicate question detection
- Import/export functionality
- Question templates
- Collaborative editing
