import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DIRECTIONS, DIRECTION_STORAGE_KEY, type DirectionId } from "@/lib/directions";

const DirectionSwitcher = () => {
  const [active, setActive] = useState<DirectionId>(DIRECTIONS[0].id);

  useEffect(() => {
    const stored = sessionStorage.getItem(DIRECTION_STORAGE_KEY);
    const resolvedId = DIRECTIONS.some((d) => d.id === stored)
      ? (stored as DirectionId)
      : DIRECTIONS[0].id;

    setActive(resolvedId);
    document.documentElement.setAttribute("data-direction", resolvedId);
  }, []);

  const handleSelect = (id: DirectionId) => {
    document.documentElement.setAttribute("data-direction", id);
    sessionStorage.setItem(DIRECTION_STORAGE_KEY, id);
    setActive(id);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card border border-border rounded-md shadow-md p-2">
      <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2">
        Direction
      </p>
      <div className="flex gap-2">
        {DIRECTIONS.map((d) => (
          <Button
            key={d.id}
            size="sm"
            variant={active === d.id ? "default" : "outline"}
            aria-pressed={active === d.id}
            onClick={() => handleSelect(d.id)}
          >
            {d.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DirectionSwitcher;
