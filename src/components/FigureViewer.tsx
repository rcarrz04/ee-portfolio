import { useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

type Figure = NonNullable<Project["detailImages"]>[number];
type Tab = { kind: "image"; figure: Figure } | { kind: "report"; report: NonNullable<Project["report"]> };

type FigureViewerProps = {
  images: NonNullable<Project["detailImages"]>;
  report?: Project["report"];
  reportFirst?: boolean;
};

const FigureViewer = ({ images, report, reportFirst }: FigureViewerProps) => {
  const [index, setIndex] = useState(0);

  const imageTabs: Tab[] = images.map((figure) => ({ kind: "image", figure }));
  const reportTabs: Tab[] = report ? [{ kind: "report", report }] : [];
  const tabs = reportFirst ? [...reportTabs, ...imageTabs] : [...imageTabs, ...reportTabs];
  const current = tabs[Math.min(index, tabs.length - 1)];

  return (
    <div className="min-w-0 space-y-3">
      <div
        className={cn(
          "relative border border-line rounded-lg overflow-hidden bg-secondary",
          current.kind === "report" ? "h-[460px] sm:h-[620px]" : "h-[340px] sm:h-[440px]"
        )}
      >
        {current.kind === "report" ? (
          <iframe
            src={`${current.report.src}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-full"
            title={current.report.label}
          />
        ) : (
          <a href={current.figure.src} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <img
              src={current.figure.src}
              alt={current.figure.alt}
              className={cn("w-full h-full", current.figure.fit === "contain" ? "object-contain" : "object-cover")}
            />
          </a>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 min-h-[2.5rem]">
        <p className="font-mono text-[11px] text-graphite leading-relaxed">
          {current.kind === "report" ? current.report.label : current.figure.caption ?? current.figure.alt}
        </p>
        <a
          href={current.kind === "report" ? current.report.src : current.figure.src}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 font-mono text-[11px] text-graphite hover:text-signal transition-colors"
        >
          {current.kind === "report" ? "Open in new tab" : "Full size"} <ExternalLink size={12} />
        </a>
      </div>

      {tabs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Project figures">
          {tabs.map((tab, i) => {
            const selected = tab === current;
            return tab.kind === "report" ? (
              <button
                key="report"
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={tab.report.label}
                onClick={() => setIndex(i)}
                className={cn(
                  "shrink-0 w-[72px] h-[54px] rounded border flex flex-col items-center justify-center gap-1 font-mono text-[10px] text-graphite transition-colors",
                  selected ? "border-signal text-signal" : "border-line hover:border-graphite"
                )}
              >
                <FileText size={16} />
                PDF
              </button>
            ) : (
              <button
                key={tab.figure.src}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={tab.figure.alt}
                onClick={() => setIndex(i)}
                className={cn(
                  "shrink-0 w-[72px] h-[54px] rounded border overflow-hidden bg-secondary transition-colors",
                  selected ? "border-signal" : "border-line hover:border-graphite"
                )}
              >
                <img src={tab.figure.src} alt="" className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FigureViewer;
