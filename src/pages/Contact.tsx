
import { Mail, Linkedin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-left mb-8">Contact Me</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
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

            <div className="flex items-center space-x-4 group">
              <Phone size={24} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
              <a 
                href="tel:+1234567890"
                className="text-lg text-gray-600 group-hover:text-gray-900 transition-colors"
              >
                (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

