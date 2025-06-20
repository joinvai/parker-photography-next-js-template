import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-2xl mb-2 font-header">THIS IS</h1>
      <h2 className="text-6xl mb-8 font-header">OUR PHOTOGRAPHY STUDIO</h2>

      <p className="max-w-3xl mb-8 text-lg">
        Our photography projects are based on strong compositional concepts and great
        attention to detail. With an approach rooted in capturing the raw beauty
        of nature and landscapes, we take an artistic
        approach to photography while having an open-minded view of innovation.
      </p>

      <Link href="/studio">
        <button
          type="button"
          className="mt-[13px] py-3 px-[25px] rounded-none border border-black bg-transparent text-black text-xs leading-5 tracking-[2px] uppercase transition-all duration-400 ease-linear hover:italic focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
        >
          READ ABOUT US
        </button>
      </Link>
    </div>
  );
}
