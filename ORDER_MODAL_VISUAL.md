# Game Builder UI - Visual Mockups

## Complete Interface with New Features

### Main Interface - Toolbar Section

```
┌────────────────────────────────────────────────────────────────────┐
│  🎮 Game Builder                                                   │
│     Create custom trivia games with your own questions             │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│  [New Game] [Load Game] [Order] [Save Game] [Shuffle Answers]    │
│                                          Editing: My Game ● Unsaved │
└────────────────────────────────────────────────────────────────────┘
         ↑          ↑        ↑         ↑            ↑
       Green      Blue    INDIGO    Orange       Purple
                        (NEW!)
```

## New Feature #1: Order Modal

### How to Access:
1. Click the **"Order"** button in the toolbar (indigo button)

### Modal Appearance:

```
┌───────────────────────────────────────────────────────────────────┐
│                  Semi-transparent Dark Overlay                     │
│                                                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Reorder Questions                                       │   │
│   │                                                           │   │
│   │  Drag and drop questions to reorder them                 │   │
│   │                                                           │   │
│   │  ┌────────────────────────────────────────────────────┐ │   │
│   │  │ 🟦 1. What is the capital of France?              │ │   │
│   │  │    (Drag cursor shown on hover)                   │ │   │
│   │  └────────────────────────────────────────────────────┘ │   │
│   │                                                           │   │
│   │  ┌────────────────────────────────────────────────────┐ │   │
│   │  │ 🟦 2. Who wrote Romeo and Juliet?                 │ │   │
│   │  │    (Hover state: bg-gray-50)                      │ │   │
│   │  └────────────────────────────────────────────────────┘ │   │
│   │                                                           │   │
│   │  ┌────────────────────────────────────────────────────┐ │   │
│   │  │ 🟦 3. What year did World War II end?             │ │   │
│   │  │    (Long text will be truncated...)               │ │   │
│   │  └────────────────────────────────────────────────────┘ │   │
│   │                                                           │   │
│   │  ┌────────────────────────────────────────────────────┐ │   │
│   │  │ 🟦 4. (Empty question)                             │ │   │
│   │  │    (Empty questions show placeholder)              │ │   │
│   │  └────────────────────────────────────────────────────┘ │   │
│   │                                                           │   │
│   │                                   [Cancel]  [OK]         │   │
│   │                                     Gray   Indigo        │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

### During Drag:

```
┌───────────────────────────────────────────────────────────────────┐
│                                                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Reorder Questions                                       │   │
│   │                                                           │   │
│   │  ┌────────────────────────────────────────────────────┐ │   │
│   │  │ 1. What is the capital of France?                  │ │   │
│   │  └────────────────────────────────────────────────────┘ │   │
│   │                                                           │   │
│   │  ┌────────────────────────────────────────────────────┐ │   │
│   │  │ 3. What year did World War II end?                 │ │   │
│   │  │ ⬆ Drop here to place dragged item                 │ │   │
│   │  └────────────────────────────────────────────────────┘ │   │
│   │                                                           │   │
│   │  ┌────────────────────────────────────────────────────┐ │   │
│   │  │ 👻 2. Who wrote Romeo and Juliet?                 │ │   │
│   │  │    (Being dragged - 50% opacity)                   │ │   │
│   │  └────────────────────────────────────────────────────┘ │   │
│   │                                                           │   │
│   │                                   [Cancel]  [OK]         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

### User Interaction Flow:

```
User clicks "Order" button
         ↓
Modal opens showing all questions
         ↓
User drags question #2 
         ↓
Question #2 becomes semi-transparent (opacity-50)
         ↓
User drops between questions #3 and #4
         ↓
Order updates: 1, 3, 2, 4
         ↓
User clicks "OK"
         ↓
Modal closes, questions reordered in editor
         ↓
Unsaved changes indicator appears (●)
         ↓
User clicks "Save Game" to persist
```

## New Feature #2: Improved Unsaved Changes Modal

### Old Behavior (Before):
```
Browser confirm dialog:
┌──────────────────────────────────────────┐
│  Confirm                                  │
│                                           │
│  You have unsaved changes. Are you sure  │
│  you want to start a new game?           │
│                                           │
│                        [Cancel]  [OK]    │
└──────────────────────────────────────────┘
❌ Generic browser dialog
❌ Unclear what happens to changes
❌ No option to save
```

### New Behavior (After):

```
┌───────────────────────────────────────────────────────────────────┐
│                  Semi-transparent Dark Overlay                     │
│                                                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Unsaved Changes                                         │   │
│   │                                                           │   │
│   │  You have unsaved changes. Would you like to save them   │   │
│   │  before continuing?                                       │   │
│   │                                                           │   │
│   │                 [Exit Without Saving]  [Save]            │   │
│   │                         Gray          Orange             │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

✅ Custom styled modal matching app theme
✅ Clear two options
✅ Can save before continuing
✅ Explicit "Exit Without Saving" label

### When Modal Appears:

**Scenario 1: User clicks "New Game" with unsaved changes**
```
[Current] → User edits questions → ● Unsaved indicator
                ↓
         User clicks "New Game"
                ↓
    Unsaved Changes Modal appears
                ↓
         ┌──────────┬──────────┐
         │          │          │
    Exit w/o       Save
     Saving      changes
         │          │
         ↓          ↓
    New game   Save, then
     starts    new game
```

**Scenario 2: User loads different game with unsaved changes**
```
[Game A] → User edits questions → ● Unsaved
                ↓
    User clicks "Load Game"
                ↓
    Load modal shows saved games
                ↓
    User clicks "Load" on Game B
                ↓
    Unsaved Changes Modal appears
                ↓
         ┌──────────┬──────────┐
         │          │          │
    Exit w/o       Save
     Saving      changes
         │          │
         ↓          ↓
    Load       Save Game A,
   Game B      then load B
```

## Feature #3: Semi-Transparent Modal Backgrounds

### All Four Modals:

```
1. Load Game Modal
   bg-black bg-opacity-50 ✓

2. Save Game Modal  
   bg-black bg-opacity-50 ✓

3. Order Modal (NEW)
   bg-black bg-opacity-50 ✓

4. Unsaved Changes Modal (NEW)
   bg-black bg-opacity-50 ✓
```

### Visual Effect:

```
Behind Modal (50% visible):
┌────────────────────────────────────┐
│  🎮 Game Builder                   │
│                                     │
│  [New] [Load] [Order] [Save]       │
│                                     │
│  Question 1                         │
│  ┌──────────────────────────────┐ │
│  │ What is...                   │ │ ← Dimmed, partially visible
│  └──────────────────────────────┘ │
│                                     │
└────────────────────────────────────┘

In Front (Modal - 100% visible):
┌────────────────────────────────────┐
│  Reorder Questions                 │
│                                     │
│  Drag and drop questions...        │ ← Bright, fully visible
│                                     │
│  [Cancel]  [OK]                    │
└────────────────────────────────────┘
```

## Complete User Journey Example

### Creating and Reordering a Game:

```
1. User logs in
         ↓
2. Clicks "New Game" (or already on builder)
         ↓
3. Adds 5 questions
         ↓
4. Realizes question order is wrong
         ↓
5. Clicks "Order" button (indigo)
         ↓
6. Order modal opens with semi-transparent bg
         ↓
7. User drags question 5 to position 2
         ↓
8. User drags question 1 to position 4  
         ↓
9. New order: 2, 5, 3, 4, 1
         ↓
10. User clicks "OK"
         ↓
11. Modal closes, questions reordered
         ↓
12. ● Unsaved changes indicator appears
         ↓
13. User clicks "Save Game"
         ↓
14. If new: name prompt appears
         ↓
15. User enters name, clicks Save
         ↓
16. Game saved with new question order
         ↓
17. Success! ✓
```

### Handling Unsaved Changes:

```
1. User has edited 3 questions
         ↓
2. ● Unsaved changes indicator visible
         ↓
3. User clicks "Load Game"
         ↓
4. Load modal appears (semi-transparent bg)
         ↓
5. User clicks "Load" on "Science Quiz"
         ↓
6. Load modal closes
         ↓
7. Unsaved Changes Modal appears
         ↓
    ┌─────────────────────┬────────────────┐
    │ Exit Without Saving │     Save       │
    └─────────────────────┴────────────────┘
              ↓                    ↓
         Discard              Save first
         changes              then load
              ↓                    ↓
         Load Science         Save current
         Quiz instantly       game, then
                             load Science Quiz
```

## Button Reference

### Toolbar Buttons (Left to Right):

| Button | Color | Function | Modal Opens? |
|--------|-------|----------|--------------|
| New Game | Green | Start fresh game | Yes (if unsaved) |
| Load Game | Blue | Browse saved games | Yes |
| **Order** | **Indigo** | **Reorder questions** | **Yes (NEW!)** |
| Save Game | Orange | Save to database | Yes (if new game) |
| Shuffle Answers | Purple | Randomize answers | No |

### Modal Buttons:

| Modal | Buttons | Colors |
|-------|---------|--------|
| Load Game | Load, Delete, Close | Blue, Red, Gray |
| Save Game | Cancel, Save | Gray, Orange |
| **Order (NEW)** | **Cancel, OK** | **Gray, Indigo** |
| **Unsaved (NEW)** | **Exit Without Saving, Save** | **Gray, Orange** |

## Key Improvements Summary

✅ **Order Modal**: Visual drag-and-drop interface for reordering questions
✅ **Better UX**: Clear "Save" vs "Exit Without Saving" choices
✅ **Consistent Design**: All modals use same semi-transparent overlay
✅ **Local Preview**: Order changes preview before saving to DB
✅ **No Data Loss**: Explicit confirmation before losing work

## Technical Notes

- All modals use z-50 for consistent stacking
- Drag-and-drop uses HTML5 API (draggable attribute)
- Semi-transparent overlays: `bg-black bg-opacity-50`
- Click overlay to close (stopPropagation on modal content)
- State management: temporary state for preview, main state on confirm
