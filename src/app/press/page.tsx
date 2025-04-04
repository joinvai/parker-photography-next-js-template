'use client';

import { useState } from 'react';
import { pressItems } from '@/data/press';
import type { Press } from '@/types/press';

export default function PressPage() {
  const [hoveredItem, setHoveredItem] = useState<Press | null>(null);

  return (
    <main className="min-h-screen p-8 md:p-24">
      <h1 className="text-4xl mb-12 font-light tracking-tighter">Press</h1>
      
      <div className="w-full">
        <table className="w-full border-collapse">
          <tbody>
            {pressItems.map((item) => (
              <tr 
                key={`${item.name}-${item.publicationDate}`}
                className="group border-t border-neutral-300"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <td className="py-4 pr-8 relative w-full">
                  <a 
                    href={item.url}
                    className="font-heading text-[28px] leading-tight group-hover:italic transition-all"
                  >
                    {item.name}
                  </a>
                  {hoveredItem === item && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <img 
                        src={item.logo} 
                        alt={`${item.name} logo`}
                        className="w-24 h-auto opacity-50"
                      />
                    </div>
                  )}
                </td>
                <td className="py-4 pl-8 text-right whitespace-nowrap text-neutral-900">
                  {item.publicationDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
