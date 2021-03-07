import { Record, Set } from "immutable";

export const Reference = Record<{ x: bigint; y: bigint }>(
  { x: 0n, y: 0n },
  "Reference" as string
);
const centre = Reference();
export type Reference = typeof centre;

export const rotate180 = ({ x, y }: Reference): Reference =>
  Reference({ x: -x, y: -y });

export const matchingRefs = (r: Reference): Set<Reference> =>
  Set([r, rotate180(r)]);

export type Trajectory = "Up" | "Down" | "Left" | "Right";

export const cellTo = (
  i: bigint,
  { x, y }: Reference,
  p: Trajectory
): Reference => {
  switch (p) {
    case "Right":
      return Reference({ x: x + i, y });
    case "Up":
      return Reference({ x, y: y + i });
    case "Left":
      return Reference({ x: x - i, y });
    case "Down":
      return Reference({ x, y: y - i });
  }
};

export const inGrid = (size: bigint) => (_: unknown, r: Reference): boolean =>
  [r.x, r.y].every((z) => Math.abs(Number(z)) <= size / 2n);
