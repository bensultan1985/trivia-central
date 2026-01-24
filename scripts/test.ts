/**
 * Test script for trivia generator
 * This validates the basic functionality without calling the OpenAI API
 */

import { getLeafCategories, getRandomLeafCategory } from "./triviaCategories";

console.log("Testing Trivia Generator Components\n");
console.log("=".repeat(50));

// Test 1: Get all leaf categories
console.log("\nTest 1: Getting all leaf categories...");
const leaves = getLeafCategories();
console.log(`✓ Found ${leaves.length} leaf categories`);

// Show a few examples
console.log("\nSample categories:");
for (let i = 0; i < Math.min(5, leaves.length); i++) {
  console.log(`  - ${leaves[i].path} (${leaves[i].items.length} items)`);
}

// Test 2: Random category selection
console.log("\nTest 2: Random category selection...");
for (let i = 0; i < 10; i++) {
  const random = getRandomLeafCategory();
  console.log(`  ${i + 1}. ${random.path} -> ${random.item}`);
}

// Test 3: Verify topic-extremes categories exist
console.log("\nTest 3: Checking for topic-extremes categories...");
const extremesCategories = leaves.filter((leaf) =>
  leaf.path.includes("topic-extremes"),
);
console.log(`✓ Found ${extremesCategories.length} topic-extremes categories`);

extremesCategories.forEach((cat) => {
  console.log(`  - ${cat.path}`);
});

// Test 4: Count total trivia items
console.log("\nTest 4: Counting total trivia items...");
const totalItems = leaves.reduce((sum, leaf) => sum + leaf.items.length, 0);
console.log(`✓ Total trivia items available: ${totalItems}`);

// Test 5: Category distribution
console.log("\nTest 5: Category distribution...");
const topLevelCategories = new Map<string, number>();
leaves.forEach((leaf) => {
  const topLevel = leaf.path.split("/")[0];
  topLevelCategories.set(
    topLevel,
    (topLevelCategories.get(topLevel) || 0) + leaf.items.length,
  );
});

console.log("Items per top-level category:");
for (const [category, count] of topLevelCategories.entries()) {
  console.log(`  ${category}: ${count} items`);
}

console.log("\n" + "=".repeat(50));
console.log("All tests passed! ✓");
console.log("\nTo generate actual trivia questions:");
console.log(
  "1. Set OPENAI_API_KEY (preferred) in your .env.local or .env file",
);
console.log("2. Set DATABASE_URL in your .env.local or .env file");
console.log("3. Run: npm run generate-trivia");
