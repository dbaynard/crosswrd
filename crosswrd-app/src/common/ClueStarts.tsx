import { OrderedMap, Set } from "immutable";
import { curry } from "lodash";

import { Lights } from "./Lights";
import { Reference } from "./Reference";
import { Tack } from "./Tack";
import { neighbourhood } from "./Utils";

export type ClueStart = { clueNumber: bigint; tacks: Set<Tack> };

export type ClueStarts = OrderedMap<Reference, ClueStart>;

const clueStart = (
  neighbours: (_: Reference) => (boolean | null)[],
  acc: [bigint, ClueStarts],
  v: boolean,
  r: Reference
): [bigint, ClueStarts] => {
  if (!v) return acc;
  const [left, up, right, down] = neighbours(r);
  const tacks = Set<Tack>(
    [!left && right && "A", !up && down && "D"].filter((x) => !!x) as Tack[]
  );
  if (!tacks.size) return acc;
  const [i, cs] = acc;
  return [i + 1n, cs.set(r, { clueNumber: i, tacks })];
};

const inGrid = (size: bigint) => (_: unknown, r: Reference): boolean =>
  [r.x, r.y].every((z) => Math.abs(Number(z)) <= size / 2n);

export const findClueStarts = (lights: Lights, size: bigint): ClueStarts => {
  const grid = lights.filter(inGrid(size));
  const neighbours = neighbourhood(grid);
  return grid.reduce(curry(clueStart)(neighbours), [
    1n,
    OrderedMap() as ClueStarts,
  ])[1];
};
