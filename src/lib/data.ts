import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';

// Promisify fs functions for async/await usage
const readdir = promisify(fs.readdir);
// const stat = promisify(fs.stat); // Not strictly needed for this logic, but useful for more complex scenarios

export interface Project {
id: string; // URL-friendly slug, e.g., "no-491-2023"
name: string; // Display name, e.g., "No. 491"
year: number; // Year, e.g., 2023
folderName: string; // Original folder name, e.g., "No. 491-2023"
photos: string[]; // Array of image paths relative to /public, e.g., "/projects/No. 491-2023/image.jpg"
description?: string; // Optional: Add description if needed later
technologies?: string[]; // Optional: Add technologies if needed later
}

// Helper function to generate slug
const generateSlug = (folderName: string): string => {
return folderName
.toLowerCase()
.replace(/[^a-z0-9\s-]/g, '') // Remove special characters except space and hyphen
.replace(/\s+/g, '-') // Replace spaces with hyphens
.replace(/-+/g, '-') // Remove duplicate hyphens
.trim() // Trim leading/trailing hyphens/spaces
.replace(/-$/, ''); // Remove trailing hyphen if any
};

// Helper function to parse project name and year from folder name
const parseProjectMeta = (folderName: string): { name: string; year: number } => {
// Handle "No. XXX-YYYY" or "No.XXX-YYYY" format
const matchStandard = folderName.match(/^No.?\s*([\d-]+)-(\d{4})/i);
if (matchStandard) {
return {
name: `No. ${matchStandard[1]}`,
year: Number.parseInt(matchStandard[2], 10),
};
}

// Handle "Text-YYYY" format
const matchOther = folderName.match(/^([a-zA-Z]+)-(\d{4})/i);
if (matchOther) {
return {
name: matchOther[1], // Use the text part as name
year: Number.parseInt(matchOther[2], 10),
};
}

// Fallback if no pattern matches
console.warn(`Could not parse name/year from folder: ${folderName}`);
return {
name: folderName.replace(/-\d{4}$/, '').replace(/-?\s*$/, '').trim(), // Basic fallback name
year: Number.parseInt(folderName.slice(-4), 10) || new Date().getFullYear(), // Guess year or use current
};
};

// --- Core Data Fetching Function ---
// This function needs to run in a Node.js environment (e.g., during build)
let projectsCache: Project[] | null = null; // Basic in-memory cache

export async function getAllProjects(): Promise<Project[]> {
// If cache exists, return it to avoid re-reading the file system
if (projectsCache) {
// console.log('Returning cached projects');
return projectsCache;
}
// console.log('Fetching projects from filesystem...');

const projectsDirectory = path.join(process.cwd(), 'public', 'projects');
const projectFolders: Project[] = [];

try {
const dirents = await readdir(projectsDirectory, { withFileTypes: true });

for (const dirent of dirents) {
  // Only process directories, ignore 'featured' and files starting with '.'
  if (dirent.isDirectory() && dirent.name !== 'featured' && !dirent.name.startsWith('.')) {
    const folderName = dirent.name.trim(); // Trim potential trailing spaces
    const projectPath = path.join(projectsDirectory, folderName);
    let photoFiles: string[] = [];

    try {
      // Read files within the project directory
      const projectDirents = await readdir(projectPath, { withFileTypes: true });
      photoFiles = projectDirents
        .filter(
          (projectDirent) =>
            projectDirent.isFile() &&
            /\.(jpg|jpeg|png|webp|gif)$/i.test(projectDirent.name), // Added gif
        )
        .sort() // Ensure consistent order
        .map((projectDirent) => `/projects/${folderName}/${projectDirent.name}`); // Create web-accessible path

    } catch (error) {
      console.error(`Error reading photos in directory ${projectPath}:`, error);
      // Continue without photos for this project if reading fails
    }

    const { name, year } = parseProjectMeta(folderName);
    const id = generateSlug(folderName);

    projectFolders.push({
      id,
      name,
      year,
      folderName, // Keep original folder name if needed
      photos: photoFiles,
      // description and technologies would need to come from another source (e.g., separate JSON/MD file per project)
    });
  }
}
} catch (error) {
console.error("Error reading projects directory:", projectsDirectory, error);
return []; // Return empty array on error
}

// Optional: Sort projects, e.g., by year descending then name ascending
projectFolders.sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));

// Cache the result
projectsCache = projectFolders;

return projectsCache;
}

// --- Function to get a single project by slug ---
// Relies on getAllProjects caching mechanism
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
try {
const projects = await getAllProjects(); // Will return cached data if available
return projects.find((project) => project.id === slug);
} catch (error) {
console.error(`Error fetching project by slug "${slug}":`, error);
return undefined;
}
}