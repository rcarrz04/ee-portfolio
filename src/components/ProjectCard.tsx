import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link to={`/projects/${project.id}`} className="group block">
      <div className="border border-line rounded-lg overflow-hidden bg-paper transition-colors duration-200 hover:border-signal/50">
        <div className="aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale-[15%] transition-all duration-300 group-hover:grayscale-0 group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-graphite">
            <span className="tracking-wide">{project.tag}</span>
            {project.status === "in-progress" && (
              <span className="text-signal">IN PROGRESS</span>
            )}
          </div>
          <h3 className="font-display text-lg font-medium text-ink leading-snug group-hover:text-signal transition-colors">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-mono text-graphite border border-line rounded px-1.5 py-0.5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
