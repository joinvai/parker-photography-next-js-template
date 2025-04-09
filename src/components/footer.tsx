import type React from "react";
import SubscribeInput from "./subscribe-input";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side content - e.g., Copyright */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
          © {new Date().getFullYear()} Sire Design. All rights reserved.
        </div>

        {/* Right side content - Add SubscribeInput */}
        <div className="w-full md:w-auto">
          <SubscribeInput />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
