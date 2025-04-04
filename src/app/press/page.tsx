'use client';

import { useState } from 'react';
import { pressItems } from '@/data/press';
import type { Press } from '@/types/press';

export default function PressPage() {
  const [hoveredItem, setHoveredItem] = useState<Press | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <main className="min-h-screen p-8 md:p-24">
      <h1 className="text-4xl mb-12 font-light tracking-tighter">Press</h1>
      
      <div className="w-full cursor-none">
        <table className="w-full border-collapse">
          <tbody>
            {pressItems.map((item) => (
              <tr 
                key={`${item.name}-${item.publicationDate}`}
                className="group border-t border-neutral-300"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onMouseMove={handleMouseMove}
              >
                <td className="py-4 pr-8 relative w-full">
                  <a 
                    href={item.url}
                    className="font-heading text-[28px] leading-tight group-hover:italic transition-all cursor-none"
                  >
                    {item.name}
                  </a>
                </td>
                <td className="py-4 pl-8 text-right whitespace-nowrap text-neutral-900 cursor-none">
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
            opacity: hoveredItem ? 1 : 0
          }}
        >
          <img 
            src={hoveredItem.logo} 
            alt={`${hoveredItem.name} logo`}
            className="w-24 h-auto opacity-50"
          />
        </div>
      )}
    </main>
  );
}
