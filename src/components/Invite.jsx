import React from "react";

export default function InviteShareButtons({ url }) {
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join my live multiplayer demo",
          text: "Jump into this 3D multiplayer session with me",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch {
      // user cancelled or share not available
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={share}
        className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-white"
        title="Invite a friend"
      >
        Invite / Share
      </button>
      <button
        onClick={copy}
        className="px-3 py-1.5 rounded-full bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 text-sm hover:bg-white"
        title="Copy link"
      >
        Copy Link
      </button>
    </div>
  );
}
