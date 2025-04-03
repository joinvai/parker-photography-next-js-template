import { motion } from "framer-motion";

export default function WatchPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-16">
      <motion.h1 className="text-4xl md:text-6xl font-geist-mono tracking-tighter mb-12 text-center">
        Watch Our Shows
      </motion.h1>
      <div className="space-y-16">
        {/* HGTV Appearance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            src="/shows/hgtv-show.jpg"
            alt="HGTV Show Appearance"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-geist-mono mb-4">HGTV Show Appearance</h2>
            <p className="mb-4">
              Catch our client on the hit HGTV show where innovative design meets practical execution in transforming spaces.
            </p>
            <a
              href="https://www.hgtv.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition-colors"
            >
              Watch on HGTV
            </a>
          </div>
        </motion.div>

        {/* Netflix Appearance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            src="/shows/netflix-show.jpg"
            alt="Netflix Show Appearance"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-geist-mono mb-4">Netflix Show Appearance</h2>
            <p className="mb-4">
              Don’t miss our client’s feature on Netflix, showcasing their unique approach to modern design in a groundbreaking series.
            </p>
            <a
              href="https://www.netflix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition-colors"
            >
              Watch on Netflix
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
