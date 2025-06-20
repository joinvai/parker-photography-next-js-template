"use client";

import { useEffect, useState } from "react";

export default function StudioQuote() {
  const [quoteLoaded, setQuoteLoaded] = useState(false);

  // Update loaded state when component mounts
  useEffect(() => {
    // This ensures we show the content after mount
    const timer = setTimeout(() => {
      setQuoteLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="flex flex-col items-center text-center p-0 max-[479px]:max-w-[300px] max-[479px]:w-full max-[479px]:mx-auto pt-12 sm:pt-16 md:pt-24 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto transition-all duration-300"
      aria-labelledby="studio-quote-title"
    >
      {/* Hidden heading for screen readers */}
      <h2 id="studio-quote-title" className="sr-only">
        Studio Philosophy
      </h2>

      <div
        className="relative mb-8"
        aria-live={!quoteLoaded ? "polite" : "off"}
        aria-busy={!quoteLoaded}
      >
        {/* Loading announcement for screen readers */}
        {!quoteLoaded && <div className="sr-only">Loading studio quote</div>}

        <blockquote
          className="overflow-visible p-0 not-italic whitespace-normal break-normal font-header text-[18px] leading-[24px] text-center tracking-[-0.25px] min-[1920px]:text-[24px] min-[1920px]:leading-[36px] max-[479px]:text-[16px] max-[479px]:leading-[24px] max-w-4xl mx-auto text-black transition-opacity duration-300"
          style={{ opacity: quoteLoaded ? 1 : 0 }}
          onLoad={() => setQuoteLoaded(true)}
        >
          <p>
            "Nature photography is the art of capturing the natural world's raw beauty and power, <br />
            freezing moments that reveal the profound connection between light, landscape, and life itself."
          </p>
        </blockquote>
      </div>

      <div className="mt-8">
        <p 
          className="font-header font-light text-lg sm:text-xl tracking-wider text-black transition-opacity duration-300"
          style={{ opacity: quoteLoaded ? 1 : 0 }}
        >
          — Parker Photography
        </p>
      </div>
    </section>
  );
}
