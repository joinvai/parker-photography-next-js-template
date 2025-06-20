export interface ShowAppearance {
  tvNetwork: string; // e.g., "Nature Documentary Network", "Photography Channel"
  mainImage: string; // e.g., "/watch/tv-1.jpeg" (path relative to public dir)
  showName: string; // e.g., "Through the Lens", "Masters of Nature Photography"
  showDescription: string; // Full description text
  buttonText: string; // e.g., "WATCH ON MAX", "WATCH ON NETFLIX"
  watchUrl: string; // The target URL for the button, e.g., "https://www.netflix.com/title/..."
}

export const showData: ShowAppearance[] = [
  {
    tvNetwork: "Nature Documentary Network",
    mainImage: "/watch/tv-1.jpeg",
    showName: "Through the Lens",
    showDescription:
      "Follow our lead photographer as they venture into the wild to capture breathtaking nature photography, from majestic landscapes to intimate wildlife moments, showcasing the art and technique behind each stunning image.",
    buttonText: "WATCH NOW",
    watchUrl:
      "#", // Placeholder URL
  },
  {
    tvNetwork: "Photography Channel",
    mainImage: "/watch/tv-2.jpeg",
    showName: "Masters of Nature Photography",
    showDescription:
      "Join our team of talented photographers as they explore remote locations, overcome challenging conditions, and use cutting-edge techniques to create award-winning nature photography that inspires conservation and appreciation for the natural world.",
    buttonText: "STREAM EPISODES",
    watchUrl:
      "#", // Placeholder URL
  },
];
