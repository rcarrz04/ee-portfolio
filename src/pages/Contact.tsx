
import { Mail, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-64 h-64 rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 group">
              <Mail size={24} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
              <a 
                href="mailto:your.email@example.com"
                className="text-lg text-gray-600 group-hover:text-gray-900 transition-colors"
              >
                your.email@example.com
              </a>
            </div>
            
            <div className="flex items-center space-x-4 group">
              <Linkedin size={24} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-600 group-hover:text-gray-900 transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
