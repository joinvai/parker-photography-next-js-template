import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-2xl mb-2 font-header">THIS IS</h1>
      <h2 className="text-6xl mb-8 font-header">SIRE DESIGN</h2>

      <p className="max-w-3xl mb-8 text-lg">
        Sire Design's projects are based on strong design concepts and great
        attention to detail. With a design approach rooted in modernist
        principles of design and architecture, Sire Design takes an analytical
        approach to interiors while having an open-minded view of innovation.
      </p>

      <Link href="/studio">
        <button
          type="button"
          className="mt-[13px] py-3 px-[25px] rounded-none border border-green bg-transparent text-green text-xs leading-5 tracking-[2px] uppercase transition-all duration-400 ease-linear hover:italic focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-eggshell"
        >
          READ ABOUT US
        </button>
      </Link>
    </div>
  );
}
