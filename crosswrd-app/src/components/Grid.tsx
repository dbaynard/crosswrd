import { useState } from "react";
import { OrderedMap } from "immutable";
import { pick } from "lodash";
import styled from "styled-components";

import { ClueStarts } from "../common/ClueStarts";
import { Letters } from "../common/Letter";
import { Lights, togglingLightPair } from "../common/Lights";
import { Reference } from "../common/Reference";
import { Cell, CellProps } from "./Cell";
import { StateSetter } from "./Helpers";

export type Grid = OrderedMap<Reference, CellProps>;

export type Mode = "lights";

export const newGrid = (size: bigint): Grid =>
  OrderedMap(
    new Array(Number(size) ** 2).fill(null).map((_, index) => {
      const i = BigInt(index);
      const y = size / 2n - i / size;
      const x = (i % size) - size / 2n;
      const r = Reference({ x, y });
      return [r, { r, light: false }];
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
    .map((light, r) => ({ r, light } as CellProps));
  if (!clueStarts) return g.merge(cells);
  const numberedCells = cells.merge(
    clueStarts?.map((p, r) => ({ r, light: true, ...p })) ??
      (OrderedMap() as Grid)
  );
  return g.merge(numberedCells);
};

type RawGridProps = {
  size: number;
  cellSize: string;
  cellSelected: boolean;
};

const RawGrid = styled.div<RawGridProps>`
  padding: calc(1px + 0.05vmin);
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
  column-gap: calc(0.6px + 0.05vmin);
  row-gap: calc(0.6px + 0.05vmin);
  margin: auto;
  &:focus {
    outline: ${(props) => (props.cellSelected ? "none" : "lightskyblue solid")};
  }
`;

export type GridProps = {
  size: bigint;
  grid: Grid;
  setLights: StateSetter<Lights | null>;
  letters: Letters | null;
  mode: Mode;
  toggleOnHover: boolean;
};

export const Grid = (props: GridProps) => {
  const { setLights, grid, letters, toggleOnHover } = props;
  const [selected] = useState<Reference | null>(null);

  const toggleCell = (r: Reference) => setLights(togglingLightPair(r));
  const lightsProps = (r: Reference) => ({
    onClick: () => toggleCell(r),
    onDragEnter: () => toggleCell(r),
    onMouseEnter: () => (toggleOnHover ? toggleCell(r) : {}),
  });

  return (
    <RawGrid
      size={Number(props.size)}
      cellSize="calc(7px + 3.5vmin)"
      cellSelected={!!selected}
      tabIndex={0}
      role="application"
    >
      {[...grid].map(([r, cellProps]) => (
        <Cell
          key={`${r.x},${r.y}`}
          selected={r.equals(selected)}
          letter={letters ? letters.get(r) : undefined}
          {...{ toggleOnHover, ...lightsProps(r) }}
          {...pick(cellProps, ["r", "light", "clueNumber"])}
        />
      ))}
    </RawGrid>
  );
};
