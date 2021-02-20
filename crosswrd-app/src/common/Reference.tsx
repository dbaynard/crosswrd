import { Record, Set } from "immutable";

export const Reference = Record<{ x: bigint; y: bigint }>(
  { x: 0n, y: 0n },
  "Reference" as string
);
const centre = Reference();
export type Reference = typeof centre;

export const rotate180 = (r: Reference): Reference =>
  Reference({ x: -r.x, y: -r.y });

export const matchingRefs = (r: Reference): Set<Reference> =>
  Set([r, rotate180(r)]);
