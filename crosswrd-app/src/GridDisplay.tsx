import { OrderedMap } from "immutable";

import { CellProps } from "./Cell";
import { CellMap } from "./Grid";
import { Reference } from "./Reference";

export type GridDisplay = OrderedMap<Reference, CellProps>;

export const newGrid = (size: bigint): GridDisplay =>
  OrderedMap(
    new Array(Number(size) ** 2).fill(null).map((_, index) => {
      const i = BigInt(index);
      const y = size / 2n - i / size;
      const x = (i % size) - size / 2n;
      return [Reference({ x, y }), { light: false }];
    })
  );

export const displayGrid = (
  size: bigint,
  grid: CellMap | null
): GridDisplay => {
  const g = newGrid(size);
  return grid ? g.merge(grid.filter((_, k) => g.has(k))) : g;
};
