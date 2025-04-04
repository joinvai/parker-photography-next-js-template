import Image from "next/image";
import { CustomCarousel } from "@/components/custom-carousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <CustomCarousel />
      </div>
    </main>
  );
}
