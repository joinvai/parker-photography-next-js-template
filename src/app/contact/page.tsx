"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [isHovered, setIsHovered] = useState(false);

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
    <main className="min-h-screen bg-white text-neutral-800 p-8 md:p-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className="font-geist-mono text-6xl md:text-8xl mb-12 tracking-tighter"
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
            <h2 className="text-2xl font-geist-mono mb-6">Get in Touch</h2>
            <motion.form
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-600 transition-colors text-neutral-800 placeholder-neutral-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-600 transition-colors text-neutral-800 placeholder-neutral-400"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-600 transition-colors text-neutral-800 placeholder-neutral-400"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-neutral-900 text-white font-geist-mono hover:bg-neutral-800 transition-colors"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>

          <motion.div variants={itemVariants} className="space-y-8">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative overflow-hidden"
            >
              <div className="relative z-10 p-8 border border-neutral-300">
                <h3 className="text-xl font-geist-mono mb-4">
                  Studio Location
                </h3>
                <p className="text-neutral-600">
                  123 Creative Avenue
                  <br />
                  Design District
                  <br />
                  Inspiration City, IC 12345
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-geist-mono">Connect</h3>
              <div className="space-y-2 text-neutral-600">
                <p>hello@studio.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
