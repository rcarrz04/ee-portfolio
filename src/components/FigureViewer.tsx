import { useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

type FigureViewerProps = {
  images: NonNullable<Project["detailImages"]>;
  report?: Project["report"];
};

const FigureViewer = ({ images, report }: FigureViewerProps) => {
  const [index, setIndex] = useState(0);
  const total = images.length + (report ? 1 : 0);
  const active = Math.min(index, total - 1);
  const showingReport = report !== undefined && active === images.length;
  const image = showingReport ? undefined : images[active];

  return (
    <div className="min-w-0 space-y-3">
      <div className="relative h-[340px] sm:h-[440px] border border-line rounded-lg overflow-hidden bg-secondary">
        {showingReport ? (
          <iframe
            src={`${report.src}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-full"
            title={report.label}
          />
        ) : (
          <a href={image.src} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <img
              src={image.src}
              alt={image.alt}
              className={cn("w-full h-full", image.fit === "contain" ? "object-contain" : "object-cover")}
            />
          </a>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 min-h-[2.5rem]">
        <p className="font-mono text-[11px] text-graphite leading-relaxed">
          {showingReport ? report.label : image.caption ?? image.alt}
        </p>
        <a
          href={showingReport ? report.src : image.src}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 font-mono text-[11px] text-graphite hover:text-signal transition-colors"
        >
          {showingReport ? "Open in new tab" : "Full size"} <ExternalLink size={12} />
        </a>
      </div>

      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Project figures">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={img.alt}
              onClick={() => setIndex(i)}
              className={cn(
                "shrink-0 w-[72px] h-[54px] rounded border overflow-hidden bg-secondary transition-colors",
                active === i ? "border-signal" : "border-line hover:border-graphite"
              )}
            >
              <img src={img.src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
          {report && (
            <button
              type="button"
              role="tab"
              aria-selected={showingReport}
              aria-label={report.label}
              onClick={() => setIndex(images.length)}
              className={cn(
                "shrink-0 w-[72px] h-[54px] rounded border flex flex-col items-center justify-center gap-1 font-mono text-[10px] text-graphite transition-colors",
                showingReport ? "border-signal text-signal" : "border-line hover:border-graphite"
              )}
            >
              <FileText size={16} />
              PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FigureViewer;
