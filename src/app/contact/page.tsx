'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactPage() {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-16">
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
          Let's Create<br />Something<br />Together
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
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-black font-geist-mono hover:bg-white/90 transition-colors"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>

          <motion.div 
            variants={itemVariants}
            className="space-y-8"
          >
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative overflow-hidden"
            >
              <motion.div
                animate={{
                  x: isHovered ? [-2, 2] : 0,
                  y: isHovered ? [-2, 2] : 0
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.5
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
              />
              <div className="relative z-10 p-8 border border-white/20">
                <h3 className="text-xl font-geist-mono mb-4">Studio Location</h3>
                <p className="text-white/70">
                  123 Creative Avenue<br />
                  Design District<br />
                  Inspiration City, IC 12345
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-geist-mono">Connect</h3>
              <div className="space-y-2 text-white/70">
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
