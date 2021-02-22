import styled from "styled-components";

export type CellProps = {
  light: boolean;
  clueNumber?: bigint;
};

export type CellEditProps = { toggleCell: () => void; toggleOnHover: boolean };

const RawCell = styled.div<CellProps>`
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  overflow: auto;
  background-color: ${(props) => (props.light ? "white" : "black")};
  place-self: center center;
  &:hover {
    background-color: lightsteelblue;
    transition: all 0.1s ease 0s;
  }
  position: relative;
  &::before {
    content: "${(props) => props.clueNumber?.toString() ?? ""}";
    z-index: 1;
    position: absolute;
    left: 0;
    top: -1px;
    padding-left: 2px;
    font-size: calc(0.2rem + 1vmin);
  }
`;

export const Cell = (props: CellProps & CellEditProps) => (
  <RawCell
    {...props}
    onClick={props.toggleCell}
    onDragEnter={props.toggleCell}
    onPointerEnter={() => (props.toggleOnHover ? props.toggleCell() : {})}
  />
);
