import React from "react";
import { Container } from "react-bootstrap";

import { WrappedRow } from "./Helpers";

const LightsLayout = () => (
  <Container>
    <WrappedRow>
      <header>
        <h1>Edit lights</h1>
      </header>
    </WrappedRow>
  </Container>
);

const Lights = () => {
  return <LightsLayout />;
};

export { Lights };
