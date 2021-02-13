import { Record } from "immutable";

export const Reference = Record<{ x: bigint; y: bigint }>(
  { x: 0n, y: 0n },
  "Reference" as string
);
const centre = Reference();
export type Reference = typeof centre;
