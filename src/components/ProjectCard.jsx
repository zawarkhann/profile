import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Badge from "./Badge";

const SWIPE_THRESHOLD = 60;   // px needed to count as a swipe

const ProjectCard = ({ project, onClick, autoPlay = true, autoPlayMs = 3500 }) => {
  // Normalize images: support old `project.image` OR new `project.images`
  const images = useMemo(() => {
    if (Array.isArray(project?.images) && project.images.length > 0) return project.images;
    if (project?.image) return [project.image];
    return [];
  }, [project]);

  const hasCarousel = images.length > 1;

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);      // hover pause
  const [isInteracting, setIsInteracting] = useState(false); // touch/drag pause

  const goTo = useCallback(
    (idx) => {
      if (!hasCarousel) return;
      const len = images.length;
      setCurrent(((idx % len) + len) % len);
    },
    [hasCarousel, images.length]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay (paused on hover/touch/drag)
  useEffect(() => {
    if (!autoPlay || !hasCarousel || isPaused || isInteracting) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayMs, hasCarousel, isPaused, isInteracting, next]);

  // Keyboard nav (focusable card)
  const onKeyDown = (e) => {
    if (!hasCarousel) return;
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
  };

  // Prevent arrow/dot clicks from triggering parent onClick
  const stop = (e) => e.stopPropagation();

  // Drag/swipe handling (mobile + desktop)
  const handleDragStart = () => setIsInteracting(true);
  const handleDragEnd = (_e, info) => {
    const offsetX = info.offset.x;      // negative => dragged left
    const velocityX = info.velocity.x;

    // Decide using distance, with velocity as helper for snappy feel
    if (offsetX < -SWIPE_THRESHOLD || velocityX < -300) next();
    else if (offsetX > SWIPE_THRESHOLD || velocityX > 300) prev();

    setIsInteracting(false);
  };

  // Touch-only pause/resume (extra safety for non-drag taps)
  const onTouchStart = () => setIsInteracting(true);
  const onTouchEnd = () => setIsInteracting(false);

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group outline-none"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${project?.title ?? "Project"} card`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Media */}
      <motion.div
        className="relative h-48 sm:h-56 bg-gradient-to-br from-accent-400 to-purple-600 overflow-hidden"
        drag={hasCarousel ? "x" : false}
        dragElastic={0.12}
        dragMomentum={true}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={hasCarousel ? handleDragStart : undefined}
        onDragEnd={hasCarousel ? handleDragEnd : undefined}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {images.length > 0 ? (
          <img
            key={images[current]} // force transition when src changes
            src={images[current]}
            alt={project.title}
            className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/50 text-6xl font-bold">
              {project?.title?.[0] ?? "•"}
            </span>
          </div>
        )}

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Arrows (only if multiple images) */}
        {hasCarousel && (
          <>
            <button
              onClick={(e) => { stop(e); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 grid place-items-center backdrop-blur-sm"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={(e) => { stop(e); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 grid place-items-center backdrop-blur-sm"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { stop(e); goTo(i); }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? "w-5 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.technologies ?? []).slice(0, 3).map((tech, index) => (
            <Badge key={index} text={tech} />
          ))}
          {(project.technologies ?? []).length > 3 && (
            <Badge text={`+${project.technologies.length - 3}`} />
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between">
          <button
            className="text-accent-600 dark:text-accent-400 font-medium hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
            onClick={onClick}
            aria-label="View project details"
          >
            View Details →
          </button>
          <div className="flex gap-2">
            {project.type === "iframe" && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                Live Demo
              </span>
            )}
           
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
