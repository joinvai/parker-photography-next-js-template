"use client";

import { ProjectInquiryForm } from "@/components/project-inquiry-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCareersSheetOpen, setIsCareersSheetOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <main className="min-h-screen bg-eggshell text-black p-8 pt-24 md:p-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className="font-header text-5xl md:text-5xl mb-12 pt-24 tracking-tighter"
        >
          Let's Create
          <br />
          Something
          <br />
          Together
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16"
        >
          <div>
            <h2 className="text-2xl font-header mb-6">Get in Touch</h2>
            <Dialog>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <p>
                  If you have a new project, please complete our new project
                  form below.
                </p>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-base hover:text-black"
                  >
                    New Project Inquiry
                  </Button>
                </DialogTrigger>
              </motion.div>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Project Inquiry</DialogTitle>
                </DialogHeader>
                <ProjectInquiryForm />
              </DialogContent>
            </Dialog>
          </div>

          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="font-header text-2xl mb-4">Studio Location</h3>
              <p>
                7500 NE 4TH COURT, #103
                <br />
                MIAMI FL 33138
                <br />
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-header text-2xl mb-4">Connect</h3>
              <div className="space-y-2">
                <p>info@siredesign.com</p>
                <p>305-402-4202</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* NEW CAREERS SECTION START */}
        <motion.div variants={itemVariants} className="mt-16">
          <h2 className="text-2xl font-header mb-6">Careers</h2>
          <Sheet open={isCareersSheetOpen} onOpenChange={setIsCareersSheetOpen}>
            <Button
              variant="link"
              className="p-0 h-auto text-base hover:text-black"
              onClick={() => setIsCareersSheetOpen(true)}
            >
              View Job Availabilities
            </Button>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl font-header font-thin">
                  Current Openings
                </SheetTitle>
                <SheetDescription>
                  We don't currently have any roles available to fill within our
                  studio, however we are always on the lookout for talented
                  designers to join our team.
                  <br />
                  <br />
                  Please send through your resume and portfolio to{" "}
                  <a
                    href="mailto:info@siredesign.com"
                    className="underline transition-colors"
                  >
                    info@siredesign.com
                  </a>
                  .
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </motion.div>
        {/* NEW CAREERS SECTION END */}
      </motion.div>
    </main>
  );
}
