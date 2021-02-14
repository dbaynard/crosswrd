import { flow } from "lodash";
import { OrderedMap } from "immutable";
import styled from "styled-components";

import { CellProps, toggleLight } from "./Cell";
import { StateSetter } from "./Helpers";
import { Reference, matchingRefs } from "./Reference";

export const toggleCell = (
  setGrid: StateSetter<CellMap | null>,
  reference: Reference
) => (): void =>
  setGrid((g) =>
    flow(
      [...matchingRefs(reference)].map((r) => (x) => x.update(r, toggleLight))
    )(g ?? OrderedMap())
  );

export type CellMap = OrderedMap<Reference, CellProps>;

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
  grid-template-columns: repeat(
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
