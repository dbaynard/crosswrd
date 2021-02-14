import styled from "styled-components";

export type CellProps = { light: boolean };

export type CellEditProps = { toggleCell: () => void; toggleOnHover: boolean };

const RawCell = styled.div<CellProps>`
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  overflow: auto;
  background-color: ${(props) => (props.light ? "white" : "black")};
  place-self: center center;
  &:empty {
    height: 30px;
  }
  &:hover {
    background-color: lightsteelblue;
    transition: all 0.1s ease 0s;
  }
`;

export const Cell = (props: CellProps & CellEditProps) => (
  <RawCell
    {...props}
    onClick={props.toggleCell}
    onMouseEnter={() => (props.toggleOnHover ? props.toggleCell() : {})}
  />
);
