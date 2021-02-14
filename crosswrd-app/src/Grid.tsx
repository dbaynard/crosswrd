import { OrderedMap } from "immutable";
import styled from "styled-components";

import { Cell, CellProps } from "./Cell";
import { ClueStarts } from "./ClueStarts";
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

export const displayGrid = (
  size: bigint,
  lights: Lights | null,
  clueStarts: ClueStarts | null
): Grid => {
  const g = newGrid(size);
  if (!lights) return g;
  const cells = lights
    .filter((_, k) => g.has(k))
    .map((light) => ({ light } as CellProps));
  if (!clueStarts) return g.merge(cells);
  const numberedCells = cells.merge(
    clueStarts?.map((p) => ({ light: true, ...p })) ?? (OrderedMap() as Grid)
  );
  return g.merge(numberedCells);
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

type RawGridProps = {
  size: number;
  cellSize: string;
};

const RawGrid = styled.div<RawGridProps>`
  padding: 1px;
  display: grid;
  place-content: start center;
  grid-template-columns: repeat(
    ${(props) => props.size},
    ${(props) => props.cellSize}
  );
  grid-template-rows: repeat(
    ${(props) => props.size},
    ${(props) => props.cellSize}
  );
  border: 1px black;
  width: fit-content;
  background-color: black;
  column-gap: 1px;
  row-gap: 1px;
  margin: auto;
`;

export type GridProps = {
  size: bigint;
  children: JSX.Element[];
};

export const Grid = ({ size, children }: GridProps) => (
  <RawGrid size={Number(size)} cellSize="30px">
    {children}
  </RawGrid>
);
