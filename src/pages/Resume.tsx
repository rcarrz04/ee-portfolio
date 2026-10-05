import { Download, ExternalLink } from "lucide-react";
import { asset } from "@/data/projects";

const RESUME_PDF = asset("Resume_Ruben_Carrazco.pdf");

const Resume = () => {
  return (
    <div className="min-h-screen bg-paper pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">§ Résumé</p>
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-ink">Résumé</h1>
          </div>
          <div className="flex gap-3">
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide border border-line text-ink px-4 py-2.5 rounded hover:border-signal hover:text-signal transition-colors"
            >
              <ExternalLink size={16} />
              Open in new tab
            </a>
            <a
              href={RESUME_PDF}
              download
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide bg-ink text-paper px-4 py-2.5 rounded hover:bg-signal transition-colors"
            >
              <Download size={16} />
              Download PDF
            </a>
          </div>
        </div>
        <div className="w-full min-h-[150vh] rounded-lg overflow-hidden border border-line">
          <iframe src={RESUME_PDF} className="w-full h-[150vh]" style={{ minHeight: "150vh" }} title="Ruben Carrazco's Resume" />
        </div>
      </div>
    </div>
  );
};

export default Resume;
