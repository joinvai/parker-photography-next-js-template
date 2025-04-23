"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function StudioQuote() {
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
            "Interior design is the art of crafting spaces that harmonize
            functionality with aesthetic appeal, <br />
            transforming houses into homes that reflect the soul of their
            inhabitants."
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
