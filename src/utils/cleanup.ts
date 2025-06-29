import { readdirSync, unlinkSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Clean up old files in the public directory
 * @param maxAgeInMinutes - Files older than this will be deleted (default: 60 minutes)
 */
export const cleanupOldFiles = async (maxAgeInMinutes = 60): Promise<void> => {
    try {
        const publicDir = "./public";
        const files = readdirSync(publicDir);
        const now = Date.now();
        const maxAge = maxAgeInMinutes * 60 * 1000; // Convert to milliseconds

        let deletedCount = 0;

        for (const file of files) {
            // Skip directories and temp folder
            if (file === 'temp') continue;
            
            const filePath = join(publicDir, file);
            
            try {
                const stats = statSync(filePath);
                
                // Skip if it's a directory
                if (stats.isDirectory()) continue;
                
                const fileAge = now - stats.mtime.getTime();
                
                if (fileAge > maxAge) {
                    unlinkSync(filePath);
                    console.log(`Deleted old file: ${file}`);
                    deletedCount++;
                }
            } catch (fileError) {
                console.error(`Error processing file ${file}:`, fileError);
            }
        }

        console.log(`Cleanup completed. Deleted ${deletedCount} files.`);
    } catch (error) {
        console.error("Error during cleanup:", error);
    }
};

/**
 * Delete all uploaded files in public directory (except temp folder)
 */
export const cleanupAllUploadedFiles = async (): Promise<void> => {
    try {
        const publicDir = "./public";
        const files = readdirSync(publicDir);
        let deletedCount = 0;

        for (const file of files) {
            // Skip temp directory
            if (file === 'temp') continue;
            
            const filePath = join(publicDir, file);
            
            try {
                const stats = statSync(filePath);
                
                // Skip if it's a directory
                if (stats.isDirectory()) continue;
                
                unlinkSync(filePath);
                console.log(`Deleted file: ${file}`);
                deletedCount++;
            } catch (fileError) {
                console.error(`Error deleting file ${file}:`, fileError);
            }
        }

        console.log(`Deleted ${deletedCount} files from public directory.`);
    } catch (error) {
        console.error("Error during cleanup:", error);
    }
};
