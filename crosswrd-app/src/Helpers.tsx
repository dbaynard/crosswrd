import { Dispatch, SetStateAction } from "react";
import { Button, Col, Row } from "react-bootstrap";

export const popCount = (t: bigint): bigint => {
  var b = t;
  var c = 0n;
  while (b > 0n) {
    b &= b - 1n;
    c++;
  }
  return c;
};

export type StateSetter<T> = Dispatch<SetStateAction<T>>;

type WrappedRowProps = { children: JSX.Element };
export const WrappedRow = (props: WrappedRowProps) => (
  <Row className="justify-content-center">
    <Col md="auto">{props.children}</Col>
  </Row>
);

type ToggleButtonProps = {
  children: JSX.Element | string;
  value: boolean;
  toggle: () => void;
};

export const ToggleButton = (props: ToggleButtonProps) => (
  <Button variant="outline-primary" onClick={props.toggle} active={props.value}>
    {props.children}
  </Button>
);
