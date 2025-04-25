
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
    image: "/placeholder.svg",
    overview: "A sophisticated power management system designed for efficient energy distribution.",
    skills: ["PCB Design", "Power Electronics", "Embedded C"],
    description: "Detailed description of the Smart Power System project...",
    acknowledgements: "Special thanks to the Stanford Engineering Department"
  },
  "iot-sensor-network": {
    id: "iot-sensor-network",
    title: "IoT Sensor Network",
    image: "/placeholder.svg",
    overview: "A network of interconnected sensors for environmental monitoring.",
    skills: ["RF Design", "Arduino", "IoT Protocols"],
    description: "Detailed description of the IoT Sensor Network project...",
  },
  // ... Add other projects similarly
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
