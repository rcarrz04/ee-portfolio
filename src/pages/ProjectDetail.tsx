import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import FigureViewer from "@/components/FigureViewer";
import { getProject } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = getProject(id || "");

  if (!project) {
    return (
      <div className="min-h-screen bg-paper pt-32 px-4 text-center text-graphite">
        Project not found.
      </div>
    );
  }

  const images = project.detailImages ?? [{ src: project.image, alt: project.title, ratio: 16 / 9 }];

  return (
    <div className="min-h-screen bg-paper pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={project.section === "research" ? "/research" : "/projects"}
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-graphite hover:text-ink mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> {project.section === "research" ? "Research" : "Projects"}
        </Link>

        <header className="mb-10 max-w-3xl">
          <div className="flex items-center gap-4 font-mono text-xs text-graphite mb-3">
            <span>{project.tag}</span>
            <span>{project.date}</span>
            {project.status === "in-progress" && <span className="text-signal">IN PROGRESS</span>}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-graphite leading-relaxed">{project.overview}</p>
        </header>

        {project.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {project.metrics.map((m) => (
              <div key={m.label} className="border border-line rounded-lg p-4 text-center">
                <div className="font-display text-xl font-semibold text-ink">{m.value}</div>
                <div className="font-mono text-[11px] text-graphite mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2 min-w-0 space-y-8">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-wide text-signal mb-2">Details</h2>
              <p className="text-graphite leading-relaxed">{project.description}</p>
            </div>

            <div>
              <h2 className="font-mono text-xs uppercase tracking-wide text-signal mb-2">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono text-graphite border border-line rounded px-1.5 py-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-mono text-xs uppercase tracking-wide text-signal mb-2">Course</h2>
              <p className="text-graphite text-sm">{project.course}</p>
            </div>

            {project.links && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-wide text-signal mb-2">Links</h2>
                <ul className="space-y-1">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-graphite hover:text-signal transition-colors"
                      >
                        {link.label} <ExternalLink size={12} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="md:col-span-3 min-w-0 md:sticky md:top-24">
            <FigureViewer key={project.id} images={images} report={project.report} reportFirst={project.reportFirst} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
