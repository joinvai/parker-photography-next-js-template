import Link from "next/link";
import type React from "react";
import SubscribeInput from "./subscribe-input";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-black text-black mt-auto py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href="/contact">
            <span className="font-header text-3xl lg:text-6xl hover:italic cursor-pointer transition-all">
              CONTACT
            </span>
          </Link>
        </div>
        <div className="w-full md:w-auto">
          <SubscribeInput />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
