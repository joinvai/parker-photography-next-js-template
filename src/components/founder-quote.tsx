"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function FounderQuote() {
  const [signatureLoaded, setSignatureLoaded] = useState(false);
  const [quoteLoaded, setQuoteLoaded] = useState(false);

  // Update loaded state when component mounts
  useEffect(() => {
    // If the image is already in cache, the onLoad might not trigger
    // This ensures we show the content in that case
    const timer = setTimeout(() => {
      setSignatureLoaded(true);
      setQuoteLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto transition-all duration-300 text-center"
      aria-labelledby="founder-quote-title"
    >
      {/* Hidden heading for screen readers */}
      <h2 id="founder-quote-title" className="sr-only">
        Founder's Philosophy
      </h2>

      <div
        className="relative mb-8"
        aria-live={!quoteLoaded ? "polite" : "off"}
        aria-busy={!quoteLoaded}
      >
        {/* Loading announcement for screen readers */}
        {!quoteLoaded && <div className="sr-only">Loading founder's quote</div>}

        <blockquote
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light italic max-w-4xl mx-auto text-gray-800 transition-opacity duration-300"
          style={{ opacity: quoteLoaded ? 1 : 0 }}
          onLoad={() => setQuoteLoaded(true)}
        >
          <span className="block mb-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            "
          </span>
          <p>
            We believe that luxury is about creating spaces that tell your
            story. Each detail matters, each material chosen with purpose, and
            each room designed to evoke an emotional response.
          </p>
        </blockquote>
      </div>

      <div
        className="flex justify-center h-24 sm:h-28 md:h-32 relative"
        aria-live={!signatureLoaded ? "polite" : "off"}
        aria-busy={!signatureLoaded}
      >
        {/* Loading announcement for screen readers */}
        {!signatureLoaded && (
          <div className="sr-only">Loading founder's signature</div>
        )}

        <div
          className="relative w-48 sm:w-56 md:w-64 h-full transition-opacity duration-300"
          style={{ opacity: signatureLoaded ? 1 : 0 }}
        >
          <Image
            src="/projects/founders-signature.png"
            alt="Eilyn Jiminez signature - Founder of Sire Design"
            fill
            sizes="(max-width: 640px) 12rem, (max-width: 768px) 14rem, 16rem"
            style={{ objectFit: "contain" }}
            className="transition-opacity duration-500"
            onLoad={() => setSignatureLoaded(true)}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
