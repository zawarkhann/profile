import { motion } from "framer-motion";
import Section from "../components/Section";
import Badge from "../components/Badge";
import { siteData } from "../data/site";

/**
 * === Data shape additions (in siteData) ===
 * Add this to your siteData (../data/site):
 * education: {
 *   institution: "FAST NUCES",
 *   degree: "BS (Computer Science)", // or your exact degree
 *   period: "2020 – 2024",
 *   location: "Pakistan", // optional
 *   logoUrl: "/images/fast-nuces.png", // <-- set to the image you’ll provide
 * }
 *
 * Your experience periods can be flexible:
 *  - "Jan 2021 – Mar 2023"
 *  - "2021 – Present"
 *  - "Feb 2020 - Jul 2022"
 *  - "2020–2024" (en dash)
 */

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11,
};

const normalizeDash = (str) => str.replace(/–|—/g, "-");

function parseDateToken(token) {
  // token could be "Jan 2021" or "2021"
  const t = token.trim();
  if (/present/i.test(t)) return new Date(); // Present => now

  // Try "Mon YYYY"
  const monYear = t.match(/^([A-Za-z]{3,9})\s+(\d{4})$/);
  if (monYear) {
    const m = MONTHS[monYear[1].toLowerCase()];
    const y = parseInt(monYear[2], 10);
    if (!Number.isNaN(m) && !Number.isNaN(y)) {
      return new Date(y, m, 1);
    }
  }

  // Try "YYYY"
  const yearOnly = t.match(/^(\d{4})$/);
  if (yearOnly) {
    const y = parseInt(yearOnly[1], 10);
    return new Date(y, 0, 1);
  }

  // Fallback: Date parse (last resort)
  const d = new Date(t);
  if (!isNaN(d.getTime())) return d;

  // If unparseable, return null
  return null;
}

function monthsBetween(a, b) {
  // inclusive start, exclusive end (count whole months)
  const start = new Date(a.getFullYear(), a.getMonth(), 1);
  const end = new Date(b.getFullYear(), b.getMonth(), 1);
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  return Math.max(0, years * 12 + months);
}

function parsePeriodToMonths(periodStr) {
  if (!periodStr) return 0;
  const clean = normalizeDash(periodStr);
  const parts = clean.split("-").map((p) => p.trim()); // ["Jan 2021", "Mar 2023"] or ["2021", "Present"]

  const start = parseDateToken(parts[0] || "");
  const end = parseDateToken(parts[1] || "Present");

  if (!start || !end) return 0;
  return monthsBetween(start, end);
}

function formatMonthsAsYrsMos(totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const y = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const m = months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "";
  return [y, m].filter(Boolean).join(" ");
}

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // --- Compute per-experience & total durations ---
  const experiencesWithDurations = (siteData.experience || []).map((exp) => {
    const months = parsePeriodToMonths(exp.period);
    return { ...exp, _months: months, _pretty: formatMonthsAsYrsMos(months) };
  });

  const totalMonths = experiencesWithDurations.reduce((acc, e) => acc + (e._months || 0), 0);
  const totalPretty = formatMonthsAsYrsMos(totalMonths);

  const edu = siteData.education

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ====== Left/Main (2 cols) ====== */}
          <div className="lg:col-span-2">
            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {siteData.bio}
              </p>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 mb-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                Technical Skills
              </h2>

              {Object.entries(siteData.skills || {}).map(([category, skills]) => (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(skills || []).map((skill) => (
                      <Badge key={skill} text={skill} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                Experience
              </h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

                {experiencesWithDurations.map((exp, index) => (
                  <motion.div
                    key={`${exp.title}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="relative flex items-start mb-8"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-8 w-4 h-4 bg-accent-500 rounded-full -translate-x-1/2 mt-1.5"></div>

                    {/* Content */}
                    <div className="ml-16 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {exp.title}
                          </h3>
                          <p className="text-accent-600 dark:text-accent-400 font-medium">
                            {exp.company}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {exp.period}
                          </p>
                        </div>
                        {/* Small duration chip on the right of each item (optional, mirrors the summary) */}
                        <span className="text-xs font-medium bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 px-3 py-1 rounded-full">
                          {exp._pretty || "—"}
                        </span>
                      </div>

                      <ul className="list-disc list-inside mt-3 text-gray-600 dark:text-gray-300 space-y-1">
                        {Array.isArray(exp.description) ? (
                          exp.description.map((point, i) => <li key={i}>{point}</li>)
                        ) : (
                          <li>{exp.description}</li>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                Education
              </h2>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex items-center gap-4">
                {edu.logoUrl ? (
                  <img
                    src={edu.logoUrl}
                    alt={`${edu.institution} logo`}
                    className="w-16 h-16 rounded-xl object-contain border border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700" />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {edu.institution || "FAST NUCES"}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {edu.degree || "BS"}
                    {edu.location ? ` • ${edu.location}` : ""}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {edu.period || "2020 – 2024"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ====== Right Sidebar (1 col) ====== */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Experience Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Experience Summary
                </h3>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalPretty || "—"}
                  </div>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {experiencesWithDurations.map((exp, i) => (
                    <div key={`${exp.title}-summary-${i}`} className="py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {exp.company}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {exp.title}
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-accent-700 dark:text-accent-300 whitespace-nowrap">
                          {exp._pretty || "—"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

             
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
};

export default About;
