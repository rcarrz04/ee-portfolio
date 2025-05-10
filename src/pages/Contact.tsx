import { Mail, Phone, Linkedin, Github } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen pt-16 pb-12 font-sfpro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-12">
          <h1 className="text-4xl font-medium mb-8">Contact Me</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-gray-600" />
                <a href="mailto:ruben04@stanford.edu" className="text-lg text-gray-600 hover:text-gray-900">
                  ruben04@stanford.edu
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-gray-600" />
                <a href="tel:+13232303022" className="text-lg text-gray-600 hover:text-gray-900">
                  +1 (323) 230-3022
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Linkedin className="w-6 h-6 text-gray-600" />
                <a 
                  href="https://www.linkedin.com/in/ruben-carrazco-368b6a263/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg text-gray-600 hover:text-gray-900"
                >
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Github className="w-6 h-6 text-gray-600" />
                <a 
                  href="https://github.com/rcarrz04" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg text-gray-600 hover:text-gray-900"
                >
                  GitHub Profile
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-medium mb-4">Location</h2>
                <p className="text-gray-600">Stanford University, CA</p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/ee-portfolio/skydiving.jpg"
                  alt="Skydiving"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

