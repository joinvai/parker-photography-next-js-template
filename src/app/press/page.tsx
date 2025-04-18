"use client";

import { pressItems } from "@/data/press";
import type { Press } from "@/types/press";
import { useState } from "react";

export default function PressPage() {
  const [hoveredItem, setHoveredItem] = useState<Press | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <main className="min-h-screen bg-eggshell text-black p-8 md:p-24">
      {" "}
      {/* Restore original padding */}
      <h1 className="text-4xl mb-12 font-header pt-24 tracking-tighter">
        Press
      </h1>
      <div className="w-full cursor-none">
        <table className="w-full border-collapse">
          <tbody>
            {pressItems.map((item) => (
              <tr
                key={`${item.name}-${item.publicationDate}`}
                className="group border-t border-black"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onMouseMove={handleMouseMove}
              >
                <td className="py-4 pr-8 relative w-full">
                  <div className="flex flex-col md:block">
                    {" "}
                    {/* Stack elements vertically by default, revert on md+ */}
                    <a
                      href={item.url}
                      className="font-header text-xl md:text-[36px] leading-tight group-hover:italic transition-all cursor-none"
                    >
                      {item.name}
                    </a>
                    {/* Date shown below name only on small screens */}
                    <span className="text-sm mt-1 md:hidden">
                      {item.publicationDate}
                    </span>
                  </div>
                </td>
                {/* Original date cell, hidden on small screens, shown as table-cell on md+ */}
                <td className="hidden md:table-cell py-4 pl-8 text-right whitespace-nowrap cursor-none text-sm md:text-[16px]">
                  {item.publicationDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hoveredItem && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            opacity: hoveredItem ? 1 : 0,
          }}
        >
          <img
            src={hoveredItem.logo}
            alt={`${hoveredItem.name} logo`}
            className="w-48 h-auto opacity-80"
          />
        </div>
      )}
    </main>
  );
}
