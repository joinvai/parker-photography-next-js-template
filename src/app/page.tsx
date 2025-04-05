// src/app/page.tsx (or relevant Server Component)

import { promises as fs } from 'node:fs';
import path from 'node:path';
import FullPageCarousel from '@/components/full-page-carousel'; // Adjust path if needed

// Function to recursively get all image file paths from a directory
async function getImagePaths(dir: string): Promise<string[]> {
    let imagePaths: string[] = [];
    try {
        const dirents = await fs.readdir(dir, { withFileTypes: true });
        for (const dirent of dirents) {
            const res = path.resolve(dir, dirent.name);
            if (dirent.isDirectory()) {
                imagePaths = imagePaths.concat(await getImagePaths(res));
            } else {
                // Check if the file is an image (common extensions)
                if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(res)) {
                    // Convert filesystem path to URL path relative to /public
                    const relativePath = path.relative(path.join(process.cwd(), 'public'), res);
                    // Ensure paths use forward slashes for URL compatibility
                    imagePaths.push(`/${relativePath.replace(/\\/g, '/')}`);
                }
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
        // Return empty array or handle error as needed
    }
    return imagePaths;
}


export default async function HomePage() {
    // Get image paths from the public/projects directory
    const projectsDir = path.join(process.cwd(), 'public', 'projects');
    const imagePaths = await getImagePaths(projectsDir);

    // Shuffle the image array for variety (optional)
    // function shuffleArray(array: any[]) {
    //   for (let i = array.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [array[i], array[j]] = [array[j], array[i]];
    //   }
    // }
    // shuffleArray(imagePaths);


    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            {/* Render the Full Page Carousel at the top */}
            <FullPageCarousel imagePaths={imagePaths} />

            {/* Rest of the page content */}
            <div className="z-10 relative p-8 bg-white bg-opacity-70">
                <h1 className="text-4xl font-bold">Welcome</h1>
                {/* Add other page content here */}
            </div>
        </main>
    );
}
