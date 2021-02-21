import { OrderedMap, Set } from "immutable";

import { Lights } from "./Lights";
import { Reference } from "./Reference";

export enum Direction {
  A = "A",
  D = "D",
}

export type ClueStart = { clueNumber: bigint; directions: Set<Direction> };

export type ClueStarts = OrderedMap<Reference, ClueStart>;

const experiment = (f: (_: Reference) => Reference[]) => <V,>(
  w: OrderedMap<Reference, V | null>
) => (r: Reference): (V | null)[] => f(r).map((x) => w.get(x, null));

const neighbourhood = experiment(({ x, y }) => [
  Reference({ x: x - 1n, y }),
  Reference({ x, y: y + 1n }),
  Reference({ x: x + 1n, y }),
  Reference({ x, y: y - 1n }),
]);

const clueStart = (neighbours: (_: Reference) => (boolean | null)[]) => (
  acc: [bigint, ClueStarts],
  v: boolean,
  r: Reference
): [bigint, ClueStarts] => {
  if (!v) return acc;
  const [left, up, right, down] = neighbours(r);
  const directions = Set<Direction>(
    [!left && right && Direction.A, !up && down && Direction.D].filter(
      (x) => !!x
    ) as Direction[]
  );
  if (!directions.size) return acc;
  const [i, cs] = acc;
  return [i + 1n, cs.set(r, { clueNumber: i, directions })];
};

const inGrid = (size: bigint) => (_: unknown, r: Reference): boolean =>
  [r.x, r.y].every((z) => Math.abs(Number(z)) <= size / 2n);

export const findClueStarts = (lights: Lights, size: bigint): ClueStarts => {
  const grid = lights.filter(inGrid(size));
  const neighbours = neighbourhood(grid);
  return grid.reduce(clueStart(neighbours), [
    1n,
    OrderedMap() as ClueStarts,
  ])[1];
};
