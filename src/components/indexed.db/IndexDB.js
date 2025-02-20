import { openDB } from "idb";

const DB_NAME = "QuizApp";
const DB_VERSION = 2; // Update version if schema changes
const ATTEMPTS_STORE = "attempts"; // Store for quiz attempts

// Open or upgrade the IndexedDB database
const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(ATTEMPTS_STORE)) {
      db.createObjectStore(ATTEMPTS_STORE, { keyPath: "attemptNumber", autoIncrement: true });
    }
  },
});

/**
 * Save a quiz attempt to IndexedDB
 * @param {Object} attempt - The attempt data
 * @param {number} attempt.attemptNumber - Attempt number
 * @param {number} attempt.score - Score achieved
 */
export const saveAttempt = async ({ attemptNumber, score }) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(ATTEMPTS_STORE, "readwrite");
    const store = tx.objectStore(ATTEMPTS_STORE);

    const timestamp = new Date().toISOString(); // Store timestamp

    await store.add({ attemptNumber, score, timestamp });

    await tx.done;
    console.log("✅ Attempt Saved:", { attemptNumber, score, timestamp });
  } catch (error) {
    console.error("❌ Error saving attempt:", error);
  }
};

/**
 * Load all quiz attempts from IndexedDB
 * @returns {Promise<Array>} - Array of attempt objects
 */
export const loadAttempts = async () => {
  try {
    const db = await dbPromise;
    return await db.getAll(ATTEMPTS_STORE); // Fetch all stored attempts
  } catch (error) {
    console.error("❌ Error loading attempts:", error);
    return [];
  }
};

/**
 * Clear all saved quiz attempts
 */
export const clearAttempts = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(ATTEMPTS_STORE, "readwrite");
    const store = tx.objectStore(ATTEMPTS_STORE);
    await store.clear(); // Clear all attempts
    await tx.done;
    console.log("✅ All attempts cleared.");
  } catch (error) {
    console.error("❌ Error clearing attempts:", error);
  }
};
