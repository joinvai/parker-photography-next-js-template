import localFont from "next/font/local";

export const editorialNew = localFont({
  src: [
    {
      path: "../../public/fonts/Editorial New/PPEditorialNew-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Editorial New/PPEditorialNew-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Editorial New/PPEditorialNew-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Editorial New/PPEditorialNew-UltralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/Editorial New/PPEditorialNew-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Editorial New/PPEditorialNew-UltraboldItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-editorial-new",
});

export const beaufortLight = localFont({
  src: [
    {
      path: "../../public/fonts/Beaufort W01 Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Beaufort W01 Light Italic.woff2",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-beaufort-light",
});
