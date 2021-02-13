import React from "react";
import { Button, Col, Row } from "react-bootstrap";

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type WrappedRowProps = { children: JSX.Element };
export const WrappedRow = (props: WrappedRowProps) => (
  <Row className="justify-content-center">
    <Col md="auto">{props.children}</Col>
  </Row>
);
