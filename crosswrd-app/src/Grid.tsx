import { OrderedMap } from "immutable";

import { Cell, CellProps } from "./Cell";
import { Lights, toggleCell } from "./Lights";
import { StateSetter } from "./Helpers";
import { Reference } from "./Reference";

export type Grid = OrderedMap<Reference, CellProps>;

export const newGrid = (size: bigint): Grid =>
  OrderedMap(
    new Array(Number(size) ** 2).fill(null).map((_, index) => {
      const i = BigInt(index);
      const y = size / 2n - i / size;
      const x = (i % size) - size / 2n;
      return [Reference({ x, y }), { light: false }];
    })
  );

export const displayGrid = (size: bigint, lights: Lights | null): Grid => {
  const g = newGrid(size);
  return lights
    ? g.merge(lights.filter((_, k) => g.has(k)).map((light) => ({ light })))
    : g;
};

export const renderCells = (
  setLights: StateSetter<Lights | null>,
  grid: Grid,
  toggleOnHover: boolean
): JSX.Element[] =>
  [...grid].map(([r, props]) => (
    <Cell
      key={`${r.x},${r.y}`}
      {...{ ...props, toggleOnHover }}
      toggleCell={toggleCell(setLights, r)}
    />
  ));
