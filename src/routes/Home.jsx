import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import Badge from "../components/Badge";
import MobileShowcase from "../components/MobileShow";
import { siteData } from "../data/site";
import Terminal from "../components/Terminal";
import { useEffect } from "react";
const Home = () => {
  const techStack = [
    "React",
    "Node.js",
    "Express.js",
    "JavaScript",
    "Python",
    "Three.js",
    "PlayCanvas",
    "PostgreSQL",
    "MongoDB",
    "AWS",
  ];

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Name */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-gray-900 dark:text-white">Hi, I'm </span>
              <span className="gradient-text">{siteData.name}</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {siteData.role}
            </motion.p>

            {/* Bio */}
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Passionate full-stack developer specializing in Web3, 3D web, and mobile-friendly experiences.
              Skilled in React, Node.js, and modern frameworks to build immersive, scalable, and innovative digital solutions
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/projects" className="btn-primary">
                View Projects
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Me
              </Link>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  >
                    <Badge text={tech} variant="primary" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔁 REPLACEMENT FOR THE FEATURED PROJECTS SLIDER */}
      <Section
        title="Mobile Previews"
        subtitle="Switch between my Pod, Multiplayer, and NFT site — all inside a phone frame"
        className="bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="flex items-center justify-center py-6">
          <MobileShowcase maxHeightVh={90} />
        </div>
      </Section>

      <Section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Interactive Portfolio Terminal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Explore my projects, skills, and experience through this interactive terminal interface. 
            Type commands to discover more about my work.
          </motion.p>
        </div>

        {/* Terminal Component */}
        <Terminal />
      </Section>

    </>
  );
};

export default Home;
