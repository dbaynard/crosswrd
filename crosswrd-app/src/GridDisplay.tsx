import { OrderedMap } from "immutable";

import { Cell, CellProps } from "./Cell";
import { CellMap, toggleCell } from "./Grid";
import { StateSetter } from "./Helpers";
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

export const renderCells = (
  setGrid: StateSetter<CellMap | null>,
  grid: GridDisplay,
  toggleOnHover: boolean
): JSX.Element[] =>
  [...grid].map(([r, props]) => (
    <Cell
      key={`${r.x},${r.y}`}
      {...{ ...props, toggleOnHover }}
      toggleCell={toggleCell(setGrid, r)}
    />
  ));
