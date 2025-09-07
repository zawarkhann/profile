import React, { useMemo, useState } from "react";
import PhoneEmbed from "./PhoneEmbed";
import InviteShareButtons from "./Invite";

// Configure your three tabs here:
const randomUserId = Math.floor(Math.random() * 100000) + 1;

const TABS = [
  {
    key: "pod",
    label: "My Pod",
    url: `https://launch.pods.social/?userId=${randomUserId}&postId=785343980&iframe=true`,
    inviteEnabled: false,
    ctaLabel: "Open in new tab",
  },
  {
    key: "multiplayer",
    label: "Multiplayer",
    url: "https://multiplayer-iota.vercel.app/",
    inviteEnabled: true, // show Invite / Share
    ctaLabel: "Open Multiplayer in new tab",
  },
  {
    key: "nft",
    label: "NFT Site",
    url: "https://nft-frontend.tenant-7654b5-asrpods.ord1.ingress.coreweave.cloud/",
    inviteEnabled: false,
    ctaLabel: "Open NFT site in new tab",
  },
];

const MobileShowcase = ({ maxHeightVh = 90 }) => {
  const [active, setActive] = useState(TABS[0].key);

  const activeTab = useMemo(
    () => TABS.find((t) => t.key === active) ?? TABS[0],
    [active]
  );

  const openNewTab = () => {
    window.open(activeTab.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center justify-center mb-4">
        <div className="inline-flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-lg transition-all ${
                active === t.key
                  ? "bg-white dark:bg-gray-700 text-accent-600 dark:text-accent-400 shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top-right actions (only for Multiplayer) */}
      <div className="relative">
        {activeTab.inviteEnabled && (
          <div className="absolute top-2 right-2 z-10">
            <InviteShareButtons url={activeTab.url} />
          </div>
        )}

        {/* Phone frame with iframe */}
        <PhoneEmbed
          title={activeTab.label}
          src={activeTab.url}
          maxHeightVh={maxHeightVh}
          className="mx-auto"
        />
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <button
          onClick={openNewTab}
          className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          {activeTab.ctaLabel}
        </button>
      </div>
    </div>
  );
};

export default MobileShowcase;
