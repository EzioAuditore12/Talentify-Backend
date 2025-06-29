import { cleanupAllUploadedFiles } from "./src/utils/cleanup.js";

console.log("Starting cleanup of uploaded files...");
cleanupAllUploadedFiles()
    .then(() => {
        console.log("Cleanup completed successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Cleanup failed:", error);
        process.exit(1);
    });
