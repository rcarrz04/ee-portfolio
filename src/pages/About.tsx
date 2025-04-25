
import Profile from "../components/Profile";

const About = () => {
  return (
    <div className="min-h-screen pt-16 pb-12 font-sfpro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-1">
            <Profile />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-medium mb-6">About Me</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm an Electrical Engineer passionate about creating innovative solutions. 
              With expertise in circuit design, embedded systems, and power electronics, 
              I strive to contribute to cutting-edge technology developments. My experience 
              spans from PCB design to system integration, always focusing on efficiency 
              and reliability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
