import { Download } from "lucide-react";

const Resume = () => {
  return (
    <div className="min-h-screen pt-16 pb-12 font-sfpro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-medium">Resume</h1>
            <a
              href="/ee-portfolio/Resume_Carrazco_Ruben_EE.pdf"
              download
              className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Download size={20} />
              <span>Download PDF</span>
            </a>
          </div>
          <div className="w-full min-h-[150vh] rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src="/ee-portfolio/Resume_Carrazco_Ruben_EE.pdf"
              className="w-full h-[150vh]"
              style={{ minHeight: '150vh' }}
              title="Ruben Carrazco's Resume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
