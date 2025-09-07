import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useTheme } from "./hooks/useTheme";

// Lazy load routes for better performance
const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));
const Projects = lazy(() => import("./routes/Projects"));
const Resume = lazy(() => import("./routes/Resume"));
const Contact = lazy(() => import("./routes/Contact"));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-accent-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function App() {
  const location = useLocation();
  const { theme } = useTheme();
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent-600 text-white px-4 py-2 rounded-lg"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Suspense fallback={<Loading />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
