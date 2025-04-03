'use client';

import { motion } from 'framer-motion';

export default function StudioPage() {
  const teamMembers = [
    {
      name: "Alexandra Wright",
      role: "Principal Architect & Founder",
      image: "/team/alexandra.jpg",
      description: "With over 25 years of experience in sustainable architecture, Alexandra has led groundbreaking projects across five continents. Her innovative approach to biophilic design has earned her numerous international awards."
    },
    {
      name: "Marcus Chen",
      role: "Senior Design Director",
      image: "/team/marcus.jpg", 
      description: "Marcus brings a unique perspective to urban architecture, blending Eastern and Western design philosophies. His work on the Singapore Eco-Tower established new standards for sustainable high-rise buildings."
    },
    // Add 15 more team members here with similar structure
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <main className="min-h-screen bg-white p-8 md:p-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div 
            variants={itemVariants}
            className="relative aspect-[3/4] md:col-span-1"
          >
            <img
              src="/studio/hero-1.jpg"
              alt="Studio workspace"
              className="object-cover w-full h-full"
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 flex flex-col justify-center"
          >
            <h1 className="font-geist-mono text-4xl md:text-6xl mb-8 tracking-tighter">
              Shaping Tomorrow's Spaces
            </h1>
            <p className="text-lg mb-6 leading-relaxed">
              Founded in 1995, Wright & Associates has consistently pushed the boundaries of architectural innovation. Our team of visionary architects and designers works at the intersection of sustainability, technology, and human-centered design.
            </p>
            <p className="text-lg leading-relaxed">
              With projects spanning from intimate residential spaces to landmark public institutions, we bring a deep commitment to environmental stewardship and cultural resonance to every endeavor.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative aspect-[3/4] md:col-span-1"
          >
            <img
              src="/studio/hero-2.jpg"
              alt="Architectural design process"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* Team Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col"
            >
              <div className="relative aspect-[3/4] mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-geist-mono text-2xl mb-2">{member.name}</h3>
              <h4 className="text-gray-600 mb-4">{member.role}</h4>
              <p className="text-gray-800 leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
