import styled from "styled-components";

import { Reference } from "../common/Reference";
import { Letter } from "../common/Letter";

export type CellProps = RawCellProps & {
  r: Reference;
  selected?: boolean;
  letter?: Letter;
  clueNumber?: bigint;
};

type RawCellProps = {
  light: boolean;
};

const RawCell = styled.div<RawCellProps>`
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: ${(props) => (props.light ? "white" : "black")};
  place-self: center center;
  &:hover {
    background-color: lightsteelblue;
    transition: all 0.1s ease 0s;
  }
  position: relative;
  &::before {
    content: attr(data-clue-number);
    z-index: 1;
    position: absolute;
    left: 0;
    top: -1px;
    padding-left: 2px;
    font-size: calc(0.2rem + 1vmin);
    line-height: normal;
  }
  text-transform: uppercase;
  font-size: calc(3px + 2.5vmin);
  text-align: center;
  line-height: 160%;
`;

export const Cell = (props: CellProps) => (
  <RawCell
    id={`${props.r.x},${props.r.y}`}
    data-clue-number={props.clueNumber}
    style={props.selected ? { backgroundColor: "lightskyblue" } : {}}
    {...props}
  >
    {props.letter ?? ""}
  </RawCell>
);
