require("dotenv").config(); // Load .env vars

const fs = require("fs");
const { sendMessageToTelegram } = require("./sendMessageToTelegram");

// Absolute path to the file we care about
const targetFile = "path-of-project-i-want-to-watch/cursor.lock";
const targetDir = "path-of-project-i-want-to-watch/";

// Function to clear cursor.lock file
const clearCursorFile = () => {
  try {
    fs.writeFileSync(targetFile, "", "utf8");
    console.log("Cursor file cleared");
  } catch (error) {
    console.error("Error clearing cursor file:", error);
  }
};

// Function to update cursor.lock with summary (Telegram send is optional)
const updateCursorWithSummary = async (summary) => {
  try {
    fs.writeFileSync(targetFile, summary, "utf8");
    console.log("Cursor file updated with summary");
    try {
      await sendMessageToTelegram(`🤖 Task Completed:\n${summary}`);
      console.log("Summary sent to Telegram");
    } catch (e) {
      // Ignore sending errors to keep watcher working under ESM/CJS mismatches
      console.log("Telegram send skipped (module not ESM-compatible)");
    }
  } catch (error) {
    console.error("Error updating cursor file:", error);
  }
};
let lastContent = null;
// Watch the directory that contains the file so we get create/delete events
const watcher = fs.watch(targetDir, (eventType, filename) => {
  if (eventType === "change") {
    try {
      const content = fs.readFileSync(targetFile, "utf8");
      console.log("Cursor content updated:", content);
      // check if content is different from the last time it was updated
      if (!content || content.trim() === "") {
        return;
      }

      if (content !== lastContent) {
        lastContent = content;
        console.log("content updated");
        updateCursorWithSummary(content);
      }
      // updateCursorWithSummary(content);
    } catch (error) {
      console.error("Error reading cursor file:", error);
    }
  } else if (!fs.existsSync(targetFile)) {
    console.log("Cursor file deleted!");
  }
});

// Create directories if they don't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
