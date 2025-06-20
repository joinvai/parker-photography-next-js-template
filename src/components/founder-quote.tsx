"use client";

import { useEffect, useState } from "react";

export default function FounderQuote() {
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
          className="max-w-4xl mx-auto text-black transition-opacity duration-300"
          style={{ opacity: quoteLoaded ? 1 : 0 }}
          onLoad={() => setQuoteLoaded(true)}
        >
          <p className="font-header font-light text-base leading-6 not-italic tracking-[-0.25px] text-black sm:text-lg 2xl:text-2xl 2xl:leading-9">
            "our photography studio’s projects are based on strong compositional concepts and great attention to detail. With an approach rooted in capturing the raw beauty of nature and landscapes, <br />
            we take an artistic approach to photography while having an open-minded view of innovation."
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
