export interface Project {
  id: string;            // Unique identifier/slug
  name: string;          // Project name (e.g., "NO. 503")
  year: string;          // Completion year
  mainImage: string;     // Path to main display image
  hoverImage: string;    // Path to hover state image
  photos: string[];      // All project images for detail page
  description?: string;  // Optional project description
}

/**
 * Helper function to get all projects
 * @returns Array of all projects
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Helper function to get a project by ID
 * @param id Project ID to find
 * @returns Project if found, undefined if not
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

// Project data based on the folders in public/projects
const projects: Project[] = [
  {
    id: "no-503",
    name: "NO. 503",
    year: "2024",
    mainImage: "/projects/No.503-2024/main.jpg",
    hoverImage: "/projects/No.503-2024/row-2.jpg",
    photos: [
      "/projects/No.503-2024/main.jpg",
      "/projects/No.503-2024/row-1-L.jpg",
      "/projects/No.503-2024/row-1-R.jpg",
      "/projects/No.503-2024/row-2.jpg",
      "/projects/No.503-2024/row-3-L.jpg",
      "/projects/No.503-2024/row-3-R.jpg",
      "/projects/No.503-2024/row-4.jpg",
      "/projects/No.503-2024/row-5-L.jpg",
      "/projects/No.503-2024/row-5-R.jpg",
      "/projects/No.503-2024/row-6.jpg"
    ]
  },
  {
    id: "no-491",
    name: "NO. 491",
    year: "2023",
    mainImage: "/projects/No. 491-2023/main.jpg",
    hoverImage: "/projects/No. 491-2023/row-2.jpg",
    photos: [
      "/projects/No. 491-2023/main.jpg",
      "/projects/No. 491-2023/row-1-L.jpg",
      "/projects/No. 491-2023/row-1-R.jpg",
      "/projects/No. 491-2023/row-2.jpg"
    ]
  },
  {
    id: "no-550",
    name: "NO. 550",
    year: "2025",
    mainImage: "/projects/No.550-2025/main.jpg",
    hoverImage: "/projects/No.550-2025/row-2.jpg",
    photos: [
      "/projects/No.550-2025/main.jpg",
      "/projects/No.550-2025/row-1-L.jpg",
      "/projects/No.550-2025/row-1-R.jpg",
      "/projects/No.550-2025/row-2.jpg"
    ]
  },
  {
    id: "no-808",
    name: "NO. 808",
    year: "2025",
    mainImage: "/projects/No.808-2025/main.jpg",
    hoverImage: "/projects/No.808-2025/row-2.jpg",
    photos: [
      "/projects/No.808-2025/main.jpg",
      "/projects/No.808-2025/row-1-L.jpg",
      "/projects/No.808-2025/row-1-R.jpg",
      "/projects/No.808-2025/row-2.jpg"
    ]
  },
  {
    id: "no-217",
    name: "NO. 217",
    year: "2023",
    mainImage: "/projects/No.217-2023/main.jpg",
    hoverImage: "/projects/No.217-2023/row-2.jpg",
    photos: [
      "/projects/No.217-2023/main.jpg",
      "/projects/No.217-2023/row-1-L.jpg",
      "/projects/No.217-2023/row-1-R.jpg",
      "/projects/No.217-2023/row-2.jpg"
    ]
  },
  {
    id: "no-5401",
    name: "NO. 5401",
    year: "2024",
    mainImage: "/projects/No.5401-2024/main.jpg",
    hoverImage: "/projects/No.5401-2024/row-2.jpg",
    photos: [
      "/projects/No.5401-2024/main.jpg",
      "/projects/No.5401-2024/row-1-L.jpg",
      "/projects/No.5401-2024/row-1-R.jpg",
      "/projects/No.5401-2024/row-2.jpg"
    ]
  },
  {
    id: "no-1602",
    name: "NO. 1602",
    year: "2024",
    mainImage: "/projects/No.1602-2024/main.jpg",
    hoverImage: "/projects/No.1602-2024/row-2.jpg",
    photos: [
      "/projects/No.1602-2024/main.jpg",
      "/projects/No.1602-2024/row-1-L.jpg",
      "/projects/No.1602-2024/row-1-R.jpg",
      "/projects/No.1602-2024/row-2.jpg"
    ]
  },
  {
    id: "no-707",
    name: "NO. 707",
    year: "2024",
    mainImage: "/projects/No.707-2024/main.jpg",
    hoverImage: "/projects/No.707-2024/row-2.jpg",
    photos: [
      "/projects/No.707-2024/main.jpg",
      "/projects/No.707-2024/row-1-L.jpg",
      "/projects/No.707-2024/row-1-R.jpg",
      "/projects/No.707-2024/row-2.jpg"
    ]
  },
  {
    id: "no-2201",
    name: "NO. 2201",
    year: "2024",
    mainImage: "/projects/No.2201-2024/main.jpg",
    hoverImage: "/projects/No.2201-2024/row-2.jpg",
    photos: [
      "/projects/No.2201-2024/main.jpg",
      "/projects/No.2201-2024/row-1-L.jpg",
      "/projects/No.2201-2024/row-1-R.jpg",
      "/projects/No.2201-2024/row-2.jpg"
    ]
  },
  {
    id: "no-206-210",
    name: "NO. 206-210",
    year: "2023",
    mainImage: "/projects/No.206-210-2023/main.jpg",
    hoverImage: "/projects/No.206-210-2023/row-2.jpg",
    photos: [
      "/projects/No.206-210-2023/main.jpg",
      "/projects/No.206-210-2023/row-1-L.jpg",
      "/projects/No.206-210-2023/row-1-R.jpg",
      "/projects/No.206-210-2023/row-2.jpg"
    ]
  },
  {
    id: "no-2831",
    name: "NO. 2831",
    year: "2022",
    mainImage: "/projects/No.2831-2022/main.jpg",
    hoverImage: "/projects/No.2831-2022/row-2.jpg",
    photos: [
      "/projects/No.2831-2022/main.jpg",
      "/projects/No.2831-2022/row-1-L.jpg",
      "/projects/No.2831-2022/row-1-R.jpg",
      "/projects/No.2831-2022/row-2.jpg"
    ]
  },
  {
    id: "no-4605",
    name: "NO. 4605",
    year: "2021",
    mainImage: "/projects/No.4605-2021/main.jpg",
    hoverImage: "/projects/No.4605-2021/row-2.jpg",
    photos: [
      "/projects/No.4605-2021/main.jpg",
      "/projects/No.4605-2021/row-1-L.jpg",
      "/projects/No.4605-2021/row-1-R.jpg",
      "/projects/No.4605-2021/row-2.jpg"
    ]
  },
  {
    id: "no-10151",
    name: "NO. 10151",
    year: "2021",
    mainImage: "/projects/No.10151-2021/main.jpg",
    hoverImage: "/projects/No.10151-2021/row-2.jpg",
    photos: [
      "/projects/No.10151-2021/main.jpg",
      "/projects/No.10151-2021/row-1-L.jpg",
      "/projects/No.10151-2021/row-1-R.jpg",
      "/projects/No.10151-2021/row-2.jpg"
    ]
  },
  {
    id: "no-1307",
    name: "NO. 1307",
    year: "2021",
    mainImage: "/projects/No.1307-2021/main.jpg",
    hoverImage: "/projects/No.1307-2021/row-2.jpg",
    photos: [
      "/projects/No.1307-2021/main.jpg",
      "/projects/No.1307-2021/row-1-L.jpg",
      "/projects/No.1307-2021/row-1-R.jpg",
      "/projects/No.1307-2021/row-2.jpg"
    ]
  },
  {
    id: "no-4706",
    name: "NO. 4706",
    year: "2022",
    mainImage: "/projects/No.4706-2022 /main.jpg",
    hoverImage: "/projects/No.4706-2022 /row-2.jpg",
    photos: [
      "/projects/No.4706-2022 /main.jpg",
      "/projects/No.4706-2022 /row-1-L.jpg",
      "/projects/No.4706-2022 /row-1-R.jpg",
      "/projects/No.4706-2022 /row-2.jpg"
    ]
  },
  {
    id: "no-719",
    name: "NO. 719",
    year: "2023",
    mainImage: "/projects/No.719-2023/main.jpg",
    hoverImage: "/projects/No.719-2023/row-2.jpg",
    photos: [
      "/projects/No.719-2023/main.jpg",
      "/projects/No.719-2023/row-1-L.jpg",
      "/projects/No.719-2023/row-1-R.jpg",
      "/projects/No.719-2023/row-2.jpg"
    ]
  },
  {
    id: "o-caudalie",
    name: "O CAUDALIE",
    year: "2020",
    mainImage: "/projects/OCaudalie-2020/main.jpg",
    hoverImage: "/projects/OCaudalie-2020/row-2.jpg",
    photos: [
      "/projects/OCaudalie-2020/main.jpg",
      "/projects/OCaudalie-2020/row-1-L.jpg",
      "/projects/OCaudalie-2020/row-1-R.jpg",
      "/projects/OCaudalie-2020/row-2.jpg"
    ]
  }
]; 