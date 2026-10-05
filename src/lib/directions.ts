// Phase 2 adds directions by appending entries to DIRECTIONS below — no other file needs to change.

export type DirectionId = "baseline";

export interface Direction {
  id: DirectionId;
  label: string;
}

export const DIRECTIONS: Direction[] = [{ id: "baseline", label: "Baseline" }];

export const DIRECTION_STORAGE_KEY = "ee-portfolio-direction";
