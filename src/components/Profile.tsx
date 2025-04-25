
import { Github, Mail, Linkedin } from "lucide-react";

const Profile = () => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray-100">
        <img
          src="/placeholder.svg"
          alt="Ruben Carrazco"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex space-x-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Github size={24} />
        </a>
        <a
          href="mailto:your.email@example.com"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Mail size={24} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Linkedin size={24} />
        </a>
      </div>
    </div>
  );
};

export default Profile;
