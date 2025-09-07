import React from "react";

const PhoneEmbed = ({
  src,
  title = "Mobile Preview",
  maxHeightVh = 80,
  className = "",
}) => {
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      {/* Phone frame wrapper */}
      <div
        className="
          relative
          w-[320px] sm:w-[360px] md:w-[400px] lg:w-[420px]
          aspect-[9/19.5]
          bg-black/90 rounded-[2.5rem]
          border border-black/30 dark:border-white/10
          shadow-2xl
          overflow-hidden
        "
        style={{ maxHeight: `${maxHeightVh}vh` }}
        aria-label={title}
        role="region"
      >
        {/* Top notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-28 bg-black/80 rounded-b-2xl z-20" />

        {/* Screen (inner) */}
        <div className="absolute inset-[10px] rounded-[2rem] overflow-hidden bg-gray-900">
          <iframe
            title={title}
            src={src}
            className="w-full h-full"
            allow="autoplay; clipboard-write; fullscreen; picture-in-picture; microphone; camera"
            // prevent the page behind from scrolling when interacting inside the phone
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{ overscrollBehavior: "contain", touchAction: "auto" }}
          />
        </div>

        {/* Subtle glare */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent" />
      </div>
    </div>
  );
};

export default PhoneEmbed;
