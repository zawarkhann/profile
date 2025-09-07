export const projects = [
{
  id: 1,
  title: "Pods 3D — Immersive Social Media Platform",
  description:
    "An immersive 3D social media platform where every post, profile, and brand lives inside a customizable 3D pod.",
  longDescription:
    "Pods 3D redefines digital interaction by transforming flat social feeds into explorable 3D worlds. Each user or business owns a Pod — a personalized 3D space built with PlayCanvas and Three.js — where they can showcase posts, portfolios, or products. Visitors can walk around, chat live inside posts, or attend virtual events, all running in the browser with real-time rendering. \n\nThe platform combines a React-powered frontend with a Node.js/Express backend and Redis for real-time data sync, ensuring smooth interactions even in multiplayer environments. Integrated WebRTC enables live voice and video calls directly within pods, while rich media embeds (images, videos, music, YouTube) let creators turn their space into a true digital hub. Pods 3D is more than social media — it’s a fully immersive social-commerce experience.",
  technologies: [
    "React",
    "PlayCanvas",
    "Three.js",
    "WebRTC",
    "Node.js",
    "Express",
    "Redis",
    "PostgreSQL",
    "Vanilla JS",
    "Tailwind CSS"
  ],
  images: [
    "/pods1.png",
    "/pods9.png",
    "/pods10.png",
    "/pods4.png",
    "/pods5.png",
    "/pods6.png",
    "/pods7.png",
    "/pods8.png"
  ],
  category: "featured",
  type: "iframe",
  embedUrl:
    "https://launch.pods.social/?userId=11&postId=785343980&iframe=true",
  githubUrl: "private", // Private project
  features: [
    "Real-time 3D rendering and navigation",
    "Customizable 3D pods for users and businesses",
    "Rich media integration (images, video, audio, YouTube)",
    "WebRTC-powered live voice & video chat",
    "3D editor with gizmos for placement, rotation & scaling",
    "Event hosting with guest invites & live demos",
    "Redis-backed real-time presence and messaging",
    "VRAM optimization for smooth performance",
      ]
}
,
 {
    id: 2,
    title: "Multiplayer Virtual Event Space — Pods Live",
    description:
      "Host live sessions in a 3D room: invite up to 5 friends, talk on voice/video, chat, and interact with the scene in real time.",
    longDescription:
      "Pods Live turns any pod into a multiplayer venue. Create a room, invite friends (up to 5 guests), and hang out inside an interactive 3D space. Attendees can move their avatars, talk over low-latency WebRTC audio/video, send live chat messages, react with emotes, and interact with media boards (images, videos, YouTube). A built-in scene editor (PlayCanvas + Three.js) lets hosts place assets, banners and stages on the fly. Real-time presence, messaging and room state are backed by Redis; React powers the UI and Express/Node orchestrates sessions, permissions and signaling. It’s lightweight, browser-based, and feels like a mini-metaverse meeting.",
    technologies: [
      "React",
      "PlayCanvas",
      "Three.js",
      "WebRTC",
      "Node.js",
      "Express",
      "Redis",
      "PeerJS",
      "Tailwind CSS"
    ],
    images: ["/event1.png", "/event2.png", "/event3.png", "/event4.png"],
    category: "featured",
    type: "iframe",
    embedUrl: "https://multiplayer-iota.vercel.app/",
    githubUrl: "private",
    features: [
      "Invite up to 5 guests per room",
      "Live voice & video inside the 3D space (WebRTC)",
      "Walk, look, and interact with 3D objects (WASD + mouse)",
      "Per-room chat with typing indicator & unread badges",
      "Emotes, reactions, and mini-interactions",
      "Host tools: show/hide UI, stage layout presets, asset placement",
      "Media boards: images, video, YouTube embeds",
      "Presence & state sync via Redis for smooth, low-latency updates",
      "Secure by design: tokenized room joins, end-to-end WebRTC media, and ephemeral Redis-backed state with minimal PII."
    ],
    // 👇 this flag controls "Invite / Share" visibility
    inviteEnabled: true
  },
,
  {
  id: 3,
  title: "Haryali Event Market Navigation — AI Voice Assistant & Smart Maps",
  description:
    "AI-powered stall navigation with voice assistant, interactive maps, and live search. Personalized recommendations and real-time directions enhance the visitor experience.",
  longDescription:
    "A custom-built event navigation system developed for the Haryali Market. Built with React and HTML Canvas, the solution integrates AI-driven voice guidance and avatar announcements to help visitors locate stalls effortlessly. The system features a large interactive screen and touchscreen kiosks where users can search stalls, receive directions, and view real-time updates, creating a futuristic, personalized event experience.",
  technologies: ["React", "HTML Canvas", "AI Voice", "JavaScript", "Graph Nodes"],
  images: ["/haryali2.png","/haryali1.png",], // add screenshots/renders
  category: "web",
  type: "demo",
  liveUrl: null, // replace with actual live demo if you have
  githubUrl: "https://github.com/zawarkha-n1/haryali-map", // set null or "private" if it's private
  features: [
    "Voice-guided stall navigation",
    "Interactive canvas-based maps",
    "Real-time stall search & updates",
    "AI avatar announcements with ads",
    "Personalized user experience",
  ],
},
  {
  id: 4,
  title: "Zeniva AI - Shopify App",
  description: "AI content and marketing automation generator for Shopify stores",
  longDescription:
    "Zeniva AI is a Shopify application that helps store owners effortlessly create engaging marketing content directly inside their Shopify dashboard. The app integrates AI-powered writing and video tools to simplify product storytelling and boost customer engagement. I implemented the app’s frontend in Vanilla JavaScript, Liquid, and custom HTML/CSS to ensure lightweight performance across different Shopify themes.",
  technologies: ["Vanilla JS", "Liquid", "HTML", "CSS", "Shopify API"],
  images: [
    "/zeniva.jpg",   // optional cover/thumbnail
    "/zeniva2.webp", // AI writing interface
    "/zeniva3.webp", // Avatar selection
    "/zeniva4.jpg"   // Content generator
  ],
  category: "Shopify App Theme",
  type: "app",
  liveUrl: "https://zeniva.ai/", // live site
 githubUrl: "private", // set null or "private" if it's private
  features: [
    "AI-powered text and content generation",
    "Shopify admin dashboard integration",
    "Custom Liquid + Vanilla JS frontend",
    "Lightweight & theme-compatible design",
    "Secure Shopify authentication",
  ],
},
{
  id: 5,
  title: "The Digital Bazaar",
  description: "Web3-powered 3D marketplace for assets, textures, and AI-driven 3D generation",
  longDescription:
    "The Digital Bazaar is an immersive marketplace built with a modern full-stack architecture (Express.js backend + React frontend). It leverages PostgreSQL for scalable data management and Three.js for real-time 3D product rendering. Beyond traditional shopping, the platform introduces advanced features such as AI-powered image-to-3D conversion, marketplace support for textures and 3D assets, and Web3 crypto wallet integration for secure, decentralized transactions. Strong encryption safeguards 3D files, while personalized AI recommendations enhance the user shopping experience, making it a next-generation digital commerce platform.",
  technologies: ["Express.js", "React", "PostgreSQL", "Three.js", "Web3.js", "AI"],
  image: "/images/bazaar.jpg",
  category: "web",
  type: "demo",
  liveUrl: "https://marketplace-frontend.tenant-7654b5-plat3.ord1.ingress.coreweave.cloud/",
   githubUrl: "private", // set null or "private" if it's private
  features: [
    "3D product and asset visualization with Three.js",
    "Marketplace for 3D models, textures, and digital assets",
    "AI-powered image-to-3D model conversion",
    "Web3 crypto wallet integration and decentralized payments",
    "Encrypted file security for 3D assets",
    "AI-driven product recommendations",
    "Immersive and interactive shopping environment"
  ],
  images: [
    "/marketplace1.png",
    "/marketplace2.png",
    "/marketplace3.png"
  ]
}
,
{
  id: 6,
  title: "ExaWorld — NFT Launch Platform Featuring 3D Immersion & AI Assistant",
  description:
    "A high-end 3D website that flies you through space as you scroll, with an AI voice bot that explains every NFT drop.",
  longDescription:
    "A premium, immersive NFT platform built with React, Three.js and PlayCanvas. The site delivers a scroll-driven 3D journey through space with cinematic transitions, while an on-page voice assistant answers questions about utilities, roadmaps, and token launches. The experience blends WebGL visuals, typed and voice input, and modular sections for drops, timelines, whitepaper, and minting. Optimized for smooth 60 FPS rendering, lazy asset streaming, and responsive layouts across devices.",
  technologies: [
    "React",
    "Three.js",
    "PlayCanvas",
    "WebGL",
    "Web Speech API",
    "GSAP / Scroll-driven Animations",
    "Node.js",
    "Express",
    "Tailwind CSS"
  ],
  images: [
    "/nft1.png",
    "/nft2.png",
    "/nft3.png",
    "/nft4.png",
    "/nft5.png"
  ],
  category: "featured",
  type: "iframe",
  // TODO: replace with your live URL
  embedUrl: "https://nft-frontend.tenant-7654b5-asrpods.ord1.ingress.coreweave.cloud/",
  githubUrl: "private", // Private repo
  features: [
    "Scroll-driven 3D space journey (parallax, depth, and scene swaps)",
    "AI voice assistant: ask about utilities, roadmap, pricing & minting",
    "Interactive timeline, whitepaper viewer, and drop showcases",
    "Cinematic UI with GPU-friendly post-processing and lazy assets",
    "Responsive, high-FPS WebGL rendering across desktop and mobile"
  ]
}

];
