import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
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

          <div className="md:col-span-2 space-y-6">
            {project.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="border border-line rounded-lg p-4 text-center">
                    <div className="font-display text-xl font-semibold text-ink">{m.value}</div>
                    <div className="font-mono text-[11px] text-graphite mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {images.map((img) => (
              <div
                key={img.src}
                style={img.ratio < 1 ? { maxWidth: `${Math.round(img.ratio * 640)}px`, marginInline: "auto" } : undefined}
              >
                <AspectRatio
                  ratio={img.ratio}
                  className="bg-secondary rounded-lg overflow-hidden border border-line"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={`w-full h-full ${img.fit === "contain" ? "object-contain" : "object-cover"}`}
                  />
                </AspectRatio>
                {img.caption && (
                  <p className="font-mono text-[11px] text-graphite mt-2">{img.caption}</p>
                )}
              </div>
            ))}

            <div className="prose max-w-none">
              <p className="text-graphite leading-relaxed">{project.description}</p>
            </div>

            {project.report && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-mono text-xs uppercase tracking-wide text-signal">
                    {project.report.label}
                  </h3>
                  <a
                    href={project.report.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-graphite hover:text-signal transition-colors"
                  >
                    Open in new tab <ExternalLink size={12} />
                  </a>
                </div>
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
