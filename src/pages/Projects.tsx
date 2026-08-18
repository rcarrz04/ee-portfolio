import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const Projects = () => {
  return (
    <div className="min-h-screen bg-paper pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">§ Projects</p>
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-ink mb-2">Projects</h1>
        <p className="text-graphite mb-12 max-w-lg">
          Hardware and software work from coursework and independent builds — circuits, FPGAs, VLSI, and VR.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
