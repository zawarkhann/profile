import { Link } from "react-router-dom";
import { siteData } from "../data/site";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold gradient-text mb-4">
              {"</>"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Building innovative digital solutions that push the boundaries of
              web technology.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              <a
                href={siteData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={siteData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={`mailto:${siteData.email}`}
                className="text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                aria-label="Email"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
              <a
               href="https://wa.me/923364318959?text=Hello%20I%20visited%20your%20website"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                aria-label="Whatsapp"
              >
                <svg
        className="w-6 h-6 "
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M16.004 3c-7.167 0-13 5.833-13 13 0 2.289.619 4.528 1.791 6.5L3 29l6.667-1.75c1.9 1.041 4.058 1.583 6.337 1.583h.001c7.167 0 13-5.833 13-13s-5.833-13-13-13zm0 23.75c-1.9 0-3.767-.5-5.4-1.458l-.387-.229-3.967 1.042 1.062-3.875-.25-.396a10.66 10.66 0 01-1.646-5.709c0-5.883 4.783-10.667 10.667-10.667 2.851 0 5.531 1.104 7.541 3.104s3.126 4.69 3.126 7.563c0 5.884-4.783 10.667-10.667 10.667zm5.858-8.017c-.321-.162-1.9-.938-2.192-1.042-.293-.108-.505-.162-.717.162-.213.321-.824 1.042-1.012 1.25-.183.213-.375.24-.696.081-.321-.162-1.354-.5-2.58-1.604-.954-.85-1.604-1.896-1.791-2.217-.188-.321-.021-.495.141-.657.146-.145.321-.375.48-.562.162-.188.216-.321.321-.534.108-.213.054-.4-.027-.562-.081-.162-.717-1.75-.983-2.396-.259-.625-.525-.54-.717-.55-.188-.009-.4-.009-.613-.009s-.562.081-.857.4c-.293.321-1.125 1.1-1.125 2.688s1.15 3.125 1.312 3.333c.162.213 2.263 3.458 5.479 4.854.767.333 1.363.531 1.833.678.767.242 1.463.208 2.017.125.615-.092 1.9-.775 2.167-1.521.267-.746.267-1.384.188-1.521-.08-.133-.293-.213-.614-.375z" />
      </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/resume"
                  className="text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  Resume
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>{siteData.email}</li>
              <li>{siteData.location}</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {currentYear} {siteData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
