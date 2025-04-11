export interface ShowAppearance {
  tvNetwork: string; // e.g., "HGTV", "Netflix"
  mainImage: string; // e.g., "/watch/tv-1.jpeg" (path relative to public dir)
  showName: string; // e.g., "Divided by Design", "Designing Miami"
  showDescription: string; // Full description text
  buttonText: string; // e.g., "WATCH ON MAX", "WATCH ON NETFLIX"
  watchUrl: string; // The target URL for the button, e.g., "https://www.netflix.com/title/..."
}

export const showData: ShowAppearance[] = [
  {
    tvNetwork: "Designing Miami",
    mainImage: "/watch/tv-1.jpeg",
    showName: "Designing Miami",
    showDescription:
      "Husband and wife designers Ray and Eilyn Jimenez run their separate design firms and battle against each other in the very competitive Miami market, but no matter who lands the bid, their client always comes out a winner.",
    buttonText: "WATCH ON MAX",
    watchUrl:
      "https://www.max.com/shows/divided-by-design/e79f719c-8https://www.netflix.com/title/81425251", // Placeholder URL - Update with actual link
  },
  {
    tvNetwork: "Netflix",
    mainImage: "/watch/tv-2.jpeg",
    showName: "Divided by Design",
    showDescription:
      "For Ray and Eilyn Jimenez, marriage and business are a perfect match as their respective interior design firms remodel homes for high-end Miami clients.",
    buttonText: "WATCH ON NETFLIX",
    watchUrl:
      "https://www.max.com/shows/divided-by-design/e79f719c-8651-4b2e-b0f8-4f075f7760e5", // Placeholder URL - Update with actual link
  },
];
