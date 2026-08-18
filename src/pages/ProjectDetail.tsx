import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
    <div className="min-h-screen bg-paper pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-graphite hover:text-ink mb-10 transition-colors"
        >
          <ArrowLeft size={14} /> Projects
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1 space-y-8">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-graphite mb-3">
                <span>{project.tag}</span>
                {project.status === "in-progress" && <span className="text-signal">IN PROGRESS</span>}
              </div>
              <h1 className="font-display text-3xl font-semibold text-ink mb-2 leading-tight">
                {project.title}
              </h1>
              <p className="font-mono text-xs text-graphite">{project.date}</p>
            </div>

            <div>
              <h2 className="font-mono text-xs uppercase tracking-wide text-signal mb-2">Overview</h2>
              <p className="text-graphite leading-relaxed">{project.overview}</p>
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
          </div>

          <div className="md:col-span-2 space-y-6">
            {images.map((img) => (
              <AspectRatio
                key={img.src}
                ratio={img.ratio}
                className="bg-secondary rounded-lg overflow-hidden border border-line"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </AspectRatio>
            ))}

            <div className="prose max-w-none">
              <p className="text-graphite leading-relaxed">{project.description}</p>
            </div>

            {project.report && (
              <div className="mt-8">
                <h3 className="font-mono text-xs uppercase tracking-wide text-signal mb-3">
                  {project.report.label}
                </h3>
                <div className="w-full border border-line rounded-lg overflow-hidden" style={{ minHeight: "800px" }}>
                  <iframe
                    src={`${project.report.src}#toolbar=1&navpanes=1&scrollbar=1`}
                    className="w-full h-full"
                    style={{ minHeight: "800px" }}
                    title={project.report.label}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
