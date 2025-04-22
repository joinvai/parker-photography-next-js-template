import type React from "react";
import { motion } from "framer-motion"; // Import motion for animation
// Import Icons if necessary, or define SVG inline
// import { Icons } from "./icons";

const ScrollIndicator: React.FC = () => {
  // Basic structure with text and placeholder for arrow
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-white z-30 cursor-pointer group">
      <span className="font-header text-[22px] tracking-widest font-light text-white group-hover:[font-style:italic] transition-all duration-200">
        SCROLL
      </span>
      {/* Placeholder for Arrow SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3.5} // Increased stroke width for bolder arrow
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="square"
          strokeLinejoin="miter"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 20V8"
        />
      </svg>
    </div>
  );
};

export default ScrollIndicator;
