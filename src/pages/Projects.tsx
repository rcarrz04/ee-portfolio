import { Link } from "react-router-dom";
import Profile from "../components/Profile";

const projects = [
  {
    id: "smart-power-system",
    title: "Smart Power System",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["PCB Design", "Power Electronics", "Embedded C"],
  },
  {
    id: "iot-sensor-network",
    title: "IoT Sensor Network",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["RF Design", "Arduino", "IoT Protocols"],
  },
  {
    id: "motor-controller",
    title: "Motor Controller",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["Control Systems", "Power Electronics", "DSP"],
  },
  {
    id: "energy-monitor",
    title: "Energy Monitor",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["Analog Design", "Python", "Data Analysis"],
  },
  {
    id: "battery-management",
    title: "Battery Management",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["Power Systems", "C++", "Hardware Design"],
  },
  {
    id: "led-matrix-display",
    title: "LED Matrix Display",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["FPGA", "Verilog", "LED Drivers"],
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen pt-16 pb-12 font-sfpro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-1">
            <Profile />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-medium mb-12">Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link 
                  key={project.id} 
                  to={`/projects/${project.id}`} 
                  className="group hover:scale-105 transition-transform duration-200"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-center mb-2 group-hover:text-gray-600">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
