import Link from "next/link";
import type React from "react";
import { ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-black text-black mt-auto py-8">
      <div
        className="container mx-auto flex flex-col items-start self-start gap-[17px] px-[10px] md:flex-row md:justify-between md:items-center md:self-auto md:gap-0 md:px-4"
      >
        <div className="mb-4 md:mb-0">
          <Link href="/contact">
            <span className="font-header text-3xl lg:text-6xl hover:italic cursor-pointer transition-all">
              CONTACT
            </span>
          </Link>
        </div>
        <div
          className="flex flex-col justify-center self-start gap-[16px] md:flex-row md:justify-start md:items-center md:self-auto md:gap-6"
        >
          <a
            href="mailto:info@siredesign.com"
            className="flex items-center font-sans text-xs leading-5 uppercase hover:italic"
          >
            E-MAIL
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
          <Link
            href="/contact"
            className="flex items-center font-sans text-xs leading-5 uppercase hover:italic"
          >
            FORM
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
