import { Dispatch, SetStateAction } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ErrorBoundary } from "@sentry/react";

export type StateSetter<T> = Dispatch<SetStateAction<T>>;

type WrappedRowProps = { children: JSX.Element };
export const WrappedRow = (props: WrappedRowProps) => (
  <Row className="justify-content-center">
    <Col md="auto">
      <ErrorBoundary fallback={null}>{props.children}</ErrorBoundary>
    </Col>
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
