// import { useState } from "react";
// import { motion } from "framer-motion";

// const IframeEmbed = ({ url, title, height = "80vh" }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const loaderId = `loader-${Math.random().toString(36).substr(2, 9)}`;

//   return (
//     <div className="w-full">
//       <div
//         className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
//         style={{ height }}
//       >
//         {/* Loader */}
//         {isLoading && (
//           <div
//             id={loaderId}
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
//           >
//             <div className="w-12 h-12 border-4 border-gray-300 border-t-accent-600 rounded-full animate-spin"></div>
//           </div>
//         )}

//         {/* Iframe */}
//         <iframe
//           src={url}
//           title={title}
//           allow="autoplay *; fullscreen *; encrypted-media *; clipboard-write; accelerometer; gyroscope; picture-in-picture; camera; microphone; web-share"
//           allowFullScreen
//           onLoad={() => setIsLoading(false)}
//           className={`w-full h-full border-0 transition-opacity duration-500 ${
//             isLoading ? "opacity-0" : "opacity-100"
//           }`}
//           loading="lazy"
//           referrerPolicy="no-referrer"
//         />
//       </div>

//       {/* Fallback link */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//         className="mt-4 text-center"
//       >
//         <a
//           href={url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
//         >
//           Open in new tab ↗
//         </a>
//       </motion.div>
//     </div>
//   );
// };

// export default IframeEmbed;
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IframeEmbed = ({ 
  url, 
  title, 
  height = "80vh", 
  project,
  onClose 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  
  const loaderId = `loader-${Math.random().toString(36).substr(2, 9)}`;

  // Generate invite link for multiplayer projects
  const generateInviteLink = async () => {
    if (!project?.inviteEnabled) return;
    
    setIsGeneratingLink(true);
    try {
      // Simulate API call to generate room/invite link
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a unique room ID and create invite link
      const roomId = Math.random().toString(36).substr(2, 8);
      const baseUrl = project.embedUrl.split('?')[0];
      const newInviteLink = `${baseUrl}`;
      
      setInviteLink(newInviteLink);
    } catch (error) {
      console.error('Error generating invite link:', error);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  // Copy link to clipboard
  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      // You could add a toast notification here
      alert('Invite link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Share using device's native share API
  const shareInviteLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join me in ${title}`,
          text: `Come join me in this amazing 3D experience!`,
          url: inviteLink
        });
      } catch (err) {
        console.error('Error sharing:', err);
        // Fallback to copy
        copyInviteLink();
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      copyInviteLink();
    }
  };

  // Handle full screen toggle
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Prevent body scroll when in full screen
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullScreen]);

  // Handle escape key to exit full screen
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFullScreen]);

  const containerClasses = isFullScreen 
    ? "fixed inset-0 z-50 bg-black"
    : "w-[90%] mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl";

  const iframeHeight = isFullScreen ? "100vh" : height;

  return (
    <>
      <div className="w-full">
        <div
          className={`relative ${containerClasses}`}
          style={{ height: isFullScreen ? "100vh" : height }}
        >
          {/* Top Controls Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h3 className="text-white font-semibold text-lg">{title}</h3>
                {project?.inviteEnabled && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowInviteModal(true)}
                    className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white text-sm rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Invite Friends
                  </motion.button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullScreen}
                  className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors"
                  title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                >
                  {isFullScreen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M15 9V4.5M15 9h4.5M15 9l5.25-5.25M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 15v4.5M15 15h4.5m0 0l5.25 5.25" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  )}
                </motion.button>

                {(isFullScreen || onClose) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (isFullScreen) {
                        setIsFullScreen(false);
                      } else if (onClose) {
                        onClose();
                      }
                    }}
                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors"
                    title="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Loader */}
          {isLoading && (
            <div
              id={loaderId}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="w-12 h-12 border-4 border-gray-300 border-t-accent-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Iframe */}
          <iframe
            src={inviteLink || url}
            title={title}
            allow="autoplay *; fullscreen *; encrypted-media *; clipboard-write; accelerometer; gyroscope; picture-in-picture; camera; microphone; web-share"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            className={`w-full h-full border-0 transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            } ${isFullScreen ? 'rounded-none' : 'rounded-2xl'}`}
            style={{ height: iframeHeight }}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Fallback link (only show when not in full screen) */}
        {!isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
            >
              Open in new tab ↗
            </a>
          </motion.div>
        )}
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Invite Friends to Join
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Generate a link to invite up to 5 friends to join you in this 3D experience!
              </p>

              {!inviteLink ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateInviteLink}
                  disabled={isGeneratingLink}
                  className="w-full py-3 bg-accent-600 hover:bg-accent-700 disabled:bg-gray-400 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  {isGeneratingLink ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating Room...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Generate Invite Link
                    </>
                  )}
                </motion.button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Share this link with your friends:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inviteLink}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyInviteLink}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm"
                      >
                        Copy
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={shareInviteLink}
                      className="flex-1 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowInviteModal(false);
                        // Update the iframe with the new invite link
                      }}
                      className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    >
                      Join Room
                    </motion.button>
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowInviteModal(false)}
                className="w-full mt-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IframeEmbed;