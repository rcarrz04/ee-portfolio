import { ExternalLink } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { researchProjects } from "@/data/projects";
import { publications } from "@/data/profile";

const Research = () => {
  return (
    <div className="min-h-screen bg-paper pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">§ Research</p>
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-ink mb-2">Research</h1>
        <p className="text-graphite mb-12 max-w-lg">
          Undergraduate research in Prof. Vivian Feig's lab (
          <a
            href="https://feiglab.stanford.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line hover:text-signal transition-colors"
          >
            Feig Lab
          </a>
          ), Stanford Mechanical Engineering, April 2024 to January 2025.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Publications</h2>
          <ul className="space-y-4">
            {publications.map((pub) => (
              <li key={pub.doi} className="border border-line rounded-lg p-5">
                <p className="text-graphite text-sm leading-relaxed">
                  {pub.authors.map((author, i) => (
                    <span key={author}>
                      {author.startsWith("Carrazco") ? (
                        <strong className="text-ink font-medium">{author}</strong>
                      ) : (
                        author
                      )}
                      {i < pub.authors.length - 1 ? "; " : ""}
                    </span>
                  ))}
                </p>
                <p className="font-display text-base font-medium text-ink mt-2">{pub.title}</p>
                <p className="text-graphite text-sm mt-1">
                  <em>{pub.venue}</em> {pub.year}, {pub.details}
                </p>
                <div className="flex items-center justify-between gap-3 mt-3">
                  <span className="font-mono text-[11px] text-graphite border border-line rounded px-1.5 py-0.5">
                    {pub.type}
                  </span>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-graphite hover:text-signal transition-colors"
                  >
                    doi:{pub.doi} <ExternalLink size={12} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Research;
