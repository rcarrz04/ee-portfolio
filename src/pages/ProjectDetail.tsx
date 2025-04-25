import { useParams } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Project {
  id: string;
  title: string;
  image: string;
  skills: string[];
  overview: string;
  description: string;
  acknowledgements?: string;
}

const projects: Record<string, Project> = {
  "smart-power-system": {
    id: "smart-power-system",
    title: "Smart Power System",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    overview: "A sophisticated power management system designed for efficient energy distribution.",
    skills: ["PCB Design", "Power Electronics", "Embedded C"],
    description: "Detailed description of the Smart Power System project...",
    acknowledgements: "Special thanks to the Stanford Engineering Department"
  },
  "iot-sensor-network": {
    id: "iot-sensor-network",
    title: "IoT Sensor Network",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    overview: "A network of interconnected sensors for environmental monitoring and data collection.",
    skills: ["RF Design", "Arduino", "IoT Protocols"],
    description: "An advanced IoT sensor network implementation that collects and processes environmental data in real-time. The system utilizes cutting-edge RF technology and Arduino-based sensor nodes to create a robust and scalable monitoring solution.",
  },
  "motor-controller": {
    id: "motor-controller",
    title: "Motor Controller",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    overview: "Advanced motor control system with precise speed and position regulation.",
    skills: ["Control Systems", "Power Electronics", "DSP"],
    description: "Development of a sophisticated motor control system incorporating DSP technology for precise speed and position control. The project involved implementing advanced control algorithms and power electronics design.",
    acknowledgements: "In collaboration with the Robotics Lab"
  },
  "energy-monitor": {
    id: "energy-monitor",
    title: "Energy Monitor",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    overview: "Real-time energy consumption monitoring and analysis system.",
    skills: ["Analog Design", "Python", "Data Analysis"],
    description: "Created a comprehensive energy monitoring solution that tracks and analyzes power consumption patterns in real-time. The system provides detailed analytics and recommendations for energy optimization.",
  },
  "battery-management": {
    id: "battery-management",
    title: "Battery Management",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    overview: "Smart battery management system for optimal charging and lifetime.",
    skills: ["Power Systems", "C++", "Hardware Design"],
    description: "Designed and implemented a sophisticated battery management system that optimizes charging cycles and extends battery life through intelligent monitoring and control algorithms.",
    acknowledgements: "Supported by the Energy Research Institute"
  },
  "led-matrix-display": {
    id: "led-matrix-display",
    title: "LED Matrix Display",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    overview: "High-resolution LED matrix display with dynamic content capability.",
    skills: ["FPGA", "Verilog", "LED Drivers"],
    description: "Developed a high-resolution LED matrix display system using FPGA technology. The project involved custom LED driver design and implementation of complex display control logic in Verilog.",
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects[id || ""];

  if (!project) {
    return <div className="min-h-screen pt-16">Project not found</div>;
  }

  return (
    <div className="min-h-screen pt-16 pb-12 font-sfpro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-1">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-gray-600">{project.overview}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {project.acknowledgements && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Acknowledgements</h2>
                  <p className="text-gray-600">{project.acknowledgements}</p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-6">
              <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="prose max-w-none">
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
