import Image from "next/image";
import ImageCarousel from '@/components/ImageCarousel';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <ImageCarousel />
      </div>
    </main>
  );
}
