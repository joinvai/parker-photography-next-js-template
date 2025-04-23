import Link from "next/link";
import type React from "react";
import { ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto">
      {/* Match the studio page padding structure */}
      <div className="p-8 md:p-16">
        {/* Footer Wrapper - matches .footer-wrapper with studio page width constraints */}
        <div className="flex flex-col justify-end items-center pt-[71px] pb-0 max-w-[min(100%,_calc(100vh_-_200px))] mx-auto">
          {/* Div Block - matches .div-block-19 */}
          <div className="flex w-full justify-between max-[767px]:flex-col max-[479px]:px-[10px] max-[479px]:flex-col max-[479px]:items-start max-[479px]:self-start max-[479px]:gap-[17px]">
            {/* Contact Link - matches .gigantic-words.caps */}
            <div className="mb-4 md:mb-0">
              <Link href="/contact">
                <span className="font-header text-[65px] leading-[75px] uppercase hover:italic cursor-pointer transition-all tracking-[3px] font-light max-[991px]:text-[80px] max-[991px]:leading-[90px] max-[767px]:text-[65px] max-[767px]:leading-[70px] max-[479px]:text-[55px] max-[479px]:leading-[65px]">
                  CONTACT
                </span>
              </Link>
            </div>
            {/* Links Container */}
            <div className="flex flex-col justify-center self-start gap-[16px] md:flex-row md:justify-start md:items-center md:self-auto md:gap-6">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
