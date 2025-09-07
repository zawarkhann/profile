import Section from "../components/Section";
import ResumeViewer from "../components/ResumeViewer";

const Resume = () => {
  return (
    <Section className="pt-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Resume
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            View or download my professional resume
          </p>
        </div>

        <ResumeViewer />
      </div>
    </Section>
  );
};

export default Resume;
