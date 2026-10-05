import { useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { projects, asset } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

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
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {project.links && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Links</h2>
                  <ul className="space-y-1">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 underline"
                        >
                          {link.label}
                          <ExternalLink size={14} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
              {project.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg bg-gray-50 border border-gray-100 p-4 text-center">
                      <div className="text-2xl font-semibold text-gray-900">{m.value}</div>
                      <div className="text-sm text-gray-600 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={asset(project.image)}
                  alt={project.title}
                  className={`w-full h-full ${project.imageFit === "contain" ? "object-contain" : "object-cover"}`}
                />
              </AspectRatio>

              {project.gallery?.map((img) => (
                <AspectRatio key={img.src} ratio={img.ratio} className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={asset(img.src)}
                    alt={img.alt}
                    className={`w-full h-full ${img.fit === "contain" ? "object-contain" : "object-cover"}`}
                  />
                </AspectRatio>
              ))}

              <div className="prose max-w-none">
                <p className="text-gray-600">{project.description}</p>
              </div>

              {project.reports?.map((report) => (
                <div key={report.src} className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{report.title}</h3>
                    <a
                      href={asset(report.src)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 underline"
                    >
                      Open in new tab
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <div className="w-full h-[100vh] border border-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src={`${asset(report.src)}#toolbar=1&navpanes=1&scrollbar=1`}
                      className="w-full h-full"
                      title={`${project.title} ${report.title}`}
                      style={{ minHeight: "800px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
