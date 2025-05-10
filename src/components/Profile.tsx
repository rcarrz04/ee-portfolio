import { Github, Mail, Linkedin, MapPin } from "lucide-react";

const Profile = () => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray-100">
        <img
          src="/ee-portfolio/headshot_Carrazco.JPEG"
          alt="Ruben Carrazco"
          className="w-full h-full object-cover object-[center_30%]"
        />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Ruben Carrazco</h2>
        <p className="text-gray-600">B.S. Electrical Engineering</p>
        <div className="flex items-center space-x-1">
          <MapPin size={16} className="text-gray-600 mr-1" />
          <p className="text-gray-600">Stanford University, CA</p>
        </div>
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
          href="mailto:ruben04@stanford.edu"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Mail size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/ruben-carrazco-368b6a263/"
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

