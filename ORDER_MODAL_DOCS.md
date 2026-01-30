# Game Builder - Order Modal and Unsaved Changes Update

## New Features Added

### 1. Order Button with Drag-and-Drop Modal

**Location**: Toolbar, between "Load Game" and "Save Game"

**Button Style**: Indigo background (#4F46E5)

**Modal Features**:
- Opens when user clicks "Order" button
- Displays all questions with their first line of text
- Text overflow is hidden (truncated)
- Drag-and-drop functionality to reorder questions
- Semi-transparent background (`bg-black bg-opacity-50`)

**Modal Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│                 Reorder Questions                            │
│                                                              │
│  Drag and drop questions to reorder them                    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 1. What is the capital of France?                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 2. Who wrote Romeo and Juliet?                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 3. What year did World War II end?                 │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│                                   [Cancel]  [OK]            │
└─────────────────────────────────────────────────────────────┘
```

**User Interaction**:
1. Click and hold on a question row
2. Drag to desired position
3. Drop to place question in new position
4. Order updates in real-time while dragging
5. Click "OK" to apply changes (marks as unsaved)
6. Click "Cancel" to discard changes and close modal

**Technical Details**:
- Uses HTML5 drag-and-drop API
- `draggable` attribute on question rows
- `onDragStart` captures the dragged item index
- `onDragOver` handles drop target and reordering
- Temporary state (`tempQuestionOrder`) for preview
- Changes applied to main state only on "OK"
- Triggers unsaved changes flag

### 2. Improved Unsaved Changes Modal

**Replaced**: Browser `confirm()` dialogs
**New Behavior**: Custom modal with two action buttons

**Modal Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│                 Unsaved Changes                              │
│                                                              │
│  You have unsaved changes. Would you like to save them      │
│  before continuing?                                          │
│                                                              │
│                    [Exit Without Saving]  [Save]            │
└─────────────────────────────────────────────────────────────┘
```

**Button Actions**:
- **Exit Without Saving** (Gray): Discards changes and proceeds with action
- **Save** (Orange): Saves changes first, then proceeds with action

**Triggered When**:
User attempts to:
- Start a new game (New Game button)
- Load a different game (clicking Load on a game)
- Any action that would lose unsaved work

**User Flow Example - Loading Game with Unsaved Changes**:
1. User edits questions
2. Unsaved changes indicator appears (orange dot)
3. User clicks "Load Game"
4. User selects a game to load
5. **Unsaved Changes Modal appears**
6. User chooses:
   - **Save**: Game saves, then new game loads
   - **Exit Without Saving**: Changes lost, new game loads

### 3. Modal Background Transparency

**All modals now have semi-transparent backgrounds**:
- Load Game Modal
- Save Game Modal  
- Order Modal (new)
- Unsaved Changes Modal (new)

**Implementation**: `bg-black bg-opacity-50`
- Black background at 50% opacity
- Darkens page content behind modal
- Maintains focus on modal content
- Clicking background closes modal

## Code Changes Summary

### New State Variables:
```typescript
const [showOrderModal, setShowOrderModal] = useState(false);
const [showUnsavedModal, setShowUnsavedModal] = useState(false);
const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
const [tempQuestionOrder, setTempQuestionOrder] = useState<Question[]>([]);
const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
```

### New Functions:
```typescript
// Check for unsaved changes and show modal if needed
checkUnsavedChanges(action: () => void)

// Handle save action from unsaved modal
handleUnsavedSave()

// Handle discard action from unsaved modal
handleUnsavedDiscard()

// Open order modal
openOrderModal()

// Handle drag start
handleDragStart(index: number)

// Handle drag over and reorder
handleDragOver(e: React.DragEvent, index: number)

// Apply new question order
applyQuestionOrder()

// Cancel reordering
cancelQuestionOrder()
```

### Modified Functions:
- `newGame()`: Now uses `checkUnsavedChanges()` instead of `confirm()`
- `loadGame()`: Now uses `checkUnsavedChanges()` instead of `confirm()`

## Testing Checklist

### Order Modal:
- [ ] Click "Order" button opens modal
- [ ] All questions appear with correct text
- [ ] Empty questions show "(Empty question)"
- [ ] Drag question to new position works
- [ ] Visual feedback during drag (opacity change)
- [ ] Drop updates order immediately
- [ ] "Cancel" discards changes and closes modal
- [ ] "OK" applies changes and marks as unsaved
- [ ] Order persists in editor after modal closes
- [ ] Order saved to database when "Save Game" clicked
- [ ] Background is semi-transparent

### Unsaved Changes Modal:
- [ ] Modal appears when starting new game with unsaved changes
- [ ] Modal appears when loading game with unsaved changes
- [ ] "Exit Without Saving" discards changes and proceeds
- [ ] "Save" button saves game first
- [ ] After save, pending action executes
- [ ] Modal doesn't appear if no unsaved changes
- [ ] Background is semi-transparent
- [ ] Clicking background closes modal

### Integration:
- [ ] Order changes don't trigger unsaved modal by themselves
- [ ] Order + edit changes trigger unsaved modal
- [ ] All four modals work independently
- [ ] No modal conflicts or z-index issues
- [ ] Keyboard navigation works (Escape to close)

## Visual Appearance

### Toolbar with New Order Button:
```
[New Game] [Load Game] [Order] [Save Game] [Shuffle Answers]
  Green      Blue     Indigo    Orange      Purple
```

### Modal Z-Index Stack (from back to front):
1. Page content (z-0)
2. Semi-transparent overlay (z-50)
3. Modal content (z-50, on top of overlay)

### Color Scheme:
- **Order Button**: Indigo (#4F46E5) - matches theme, distinct from other buttons
- **Order Modal OK Button**: Indigo (#4F46E5) - matches button
- **Unsaved Save Button**: Orange (#EA580C) - matches existing Save button
- **Unsaved Exit Button**: Gray (#4B5563) - neutral, non-primary action
- **Modal Overlays**: Black 50% opacity - consistent across all modals

## Benefits

### User Experience:
- **Visual Reordering**: See all questions at once while reordering
- **Drag-and-Drop**: Intuitive interaction pattern
- **Clear Choices**: No ambiguous "Yes/No" - explicit "Save" or "Exit Without Saving"
- **Undo Support**: Cancel button allows backing out of reorder
- **Consistent Behavior**: All modals have same look and feel

### Technical:
- **State Management**: Temporary state for preview before commit
- **No Accidental Loss**: Explicit confirmation for destructive actions
- **Performance**: Reorder happens client-side, only saves to DB on user request
- **Accessibility**: Keyboard and mouse support for drag-drop

## Future Enhancements (Out of Scope)

- Touch-friendly drag-and-drop for mobile devices
- Keyboard shortcuts for reordering (Alt+Up/Down)
- Multi-select and batch reorder
- Undo/redo stack for order changes
- Animation transitions during drag
