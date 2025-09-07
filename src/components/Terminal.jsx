import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { projects } from "../data/projects";
import { siteData } from "../data/site";

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Terminal data
  const terminalData = {
    about: {
      name: siteData.name,
      role: siteData.role,
      location: siteData.location,
      skills: [
        ...siteData.skills.frontend,
        ...siteData.skills.backend,
        ...siteData.skills.tools,
      ],
      specialization: "Web3, 3D web, immersive apps, and AI integration",
      experiences: siteData.experience.map(
        (exp) => `• ${exp.title} at ${exp.company} (${exp.period})`
      ),
    },
    projects: projects.map((p) => ({
      name: p.title,
      description: p.description,
      tech: p.technologies,
      status: p.category === "featured" ? "Featured Project" : "In Portfolio",
    })),
    contact: {
      email: siteData.email,
      linkedin: siteData.social.linkedin,
      github: siteData.social.github,
      portfolio: "yourportfolio.com",
    },
  };

  const commands = {
    help: () => [
      "Available commands:",
      "  help          - Show this help message",
      "  about         - Display personal information",
      "  projects      - List all projects",
      "  project <name> - Show specific project details",
      "  skills        - Display technical skills",
      "  contact       - Show contact information",
      "  experience    - Display work experience",
      "  clear         - Clear terminal",
      "  whoami        - Display current user info",
      "  ls            - List available information",
      "  cat <file>    - Display file contents",
      "  pwd           - Show current directory",
      "",
      "Type any command to get started!",
    ],

    about: () => [
      "=== About Me ===",
      `Name: ${terminalData.about.name}`,
      `Role: ${terminalData.about.role}`,
      `Location: ${terminalData.about.location}`,
      "",
      siteData.bio,
      "",
      "Experience:",
      ...terminalData.about.experiences,
      "",
      "All projects shown are intellectual property of Exarta Labs / Exarta.com.",
    ],

    projects: () => {
      const output = ["=== Projects Portfolio ===", ""];
      terminalData.projects.forEach((project, index) => {
        output.push(`${index + 1}. ${project.name}`);
        output.push(`   ${project.description}`);
        output.push(`   Status: ${project.status}`);
        output.push(`   Tech: ${project.tech.join(', ')}`);
        output.push("");
      });
      output.push("Use 'project <name>' for detailed information");
      return output;
    },

    project: (args) => {
      const projectName = args.join(' ').toLowerCase();
      const project = terminalData.projects.find((p) =>
        p.name.toLowerCase().includes(projectName)
      );

      if (!project) {
        return [`Project '${args.join(' ')}' not found. Use 'projects' to see all projects.`];
      }

      return [
        `=== ${project.name} ===`,
        "",
        `Description: ${project.description}`,
        `Status: ${project.status}`,
        `Technologies: ${project.tech.join(', ')}`,
        "",
        "This project showcases cutting-edge web technologies",
        "and innovative user experiences.",
      ];
    },

    skills: () => [
      "=== Technical Skills ===",
      "",
      "Frontend:",
      ...siteData.skills.frontend.map((s) => `  • ${s}`),
      "",
      "Backend & Real-time:",
      ...siteData.skills.backend.map((s) => `  • ${s}`),
      "",
      "Tools & Platforms:",
      ...siteData.skills.tools.map((s) => `  • ${s}`),
    ],

    contact: () => [
      "=== Contact Information ===",
      "",
      `Email: ${terminalData.contact.email}`,
      `Portfolio: ${terminalData.contact.portfolio}`,
      `LinkedIn: ${terminalData.contact.linkedin}`,
      `GitHub: ${terminalData.contact.github}`,
      "",
      "Feel free to reach out for collaboration opportunities!",
      "",
      "Note: All projects are property of Exarta Labs / Exarta.com",
    ],

    experience: () => [
      "=== Work Experience ===",
      "",
      ...siteData.experience.map(
        (exp) =>
          `${exp.title} - ${exp.company} (${exp.period})\n• ${exp.description.join(
            "\n• "
          )}\n`
      ),
    ],

    whoami: () => ["frontend-developer@exarta-labs"],

    pwd: () => ["/home/portfolio/projects"],

    ls: () => [
      "about.txt",
      "projects/",
      "skills.md",
      "contact.info",
      "experience.log",
      "README.md",
    ],

    cat: (args) => {
      const file = args[0];
      switch (file) {
        case "about.txt":
          return commands.about();
        case "skills.md":
          return commands.skills();
        case "contact.info":
          return commands.contact();
        case "experience.log":
          return commands.experience();
        case "README.md":
          return [
            "# Portfolio Terminal",
            "",
            "Welcome to my interactive portfolio terminal!",
            "",
            "This terminal provides information about my projects,",
            "skills, and experience in frontend development.",
            "",
            "Type 'help' to see available commands.",
            "",
            "All projects are property of Exarta Labs.",
          ];
        default:
          return [`cat: ${file}: No such file or directory`];
      }
    },

    clear: () => null,
  };

  // Welcome Message
  useEffect(() => {
    const welcomeMessage = [
      "Welcome to Zawar's Portfolio Terminal v1.0.0",
      "",
      "Connected to portfolio-server...",
      "System initialized successfully.",
      "",
      "Type 'help' to see available commands or 'about' to learn more about me.",
      "All projects are property of Exarta Labs / Exarta.com",
      "",
    ];

    setHistory([{ type: 'output', content: welcomeMessage }]);
  }, []);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Execute Command
  const executeCommand = (command) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setHistory((prev) => [...prev, { type: 'command', content: trimmed }]);

    const [cmd, ...args] = trimmed.split(' ');
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'clear') {
      setHistory([]);
      return;
    }

    let output;
    if (commands[lowerCmd]) {
      output =
        typeof commands[lowerCmd] === 'function'
          ? commands[lowerCmd](args)
          : commands[lowerCmd];
    } else {
      output = [
        `Command '${cmd}' not found.`,
        "Type 'help' to see available commands.",
      ];
    }

    if (output) {
      setHistory((prev) => [...prev, { type: 'output', content: output }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const demoCommands = ['about', 'projects', 'skills', 'contact'];
  const runDemo = (cmd) => {
    executeCommand(cmd);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto mt-16 mb-16"
    >
      {/* Header */}
      <div className="bg-gray-800 rounded-t-lg p-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-300 text-sm ml-4">
          portfolio-terminal ~ frontend-developer
        </span>
      </div>

      {/* Quick Demo */}
      <div className="bg-gray-700 px-4 py-2 flex flex-wrap gap-2 border-b border-gray-600">
        <span className="text-gray-400 text-sm mr-2">Quick demo:</span>
        {demoCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => runDemo(cmd)}
            className="text-xs bg-gray-600 hover:bg-gray-500 text-gray-200 px-2 py-1 rounded transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Body */}
      <div
        ref={terminalRef}
        className="bg-black text-green-400 font-mono text-sm p-4 h-96 overflow-y-auto rounded-b-lg"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, index) => (
          <div key={index} className="mb-2">
            {entry.type === 'command' ? (
              <div className="text-blue-400">
                <span className="text-green-400">$</span> {entry.content}
              </div>
            ) : (
              <div className="text-gray-300 whitespace-pre-line">
                {Array.isArray(entry.content)
                  ? entry.content.map((line, i) => <div key={i}>{line}</div>)
                  : entry.content}
              </div>
            )}
          </div>
        ))}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 outline-none font-mono"
            placeholder="Type a command... (try 'help')"
            disabled={isTyping}
          />
        </form>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
       
        <p className="mt-1">
          All projects are intellectual property of{' '}
          <a
            href="https://exarta.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 underline"
          >
            Exarta Labs
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Terminal;
