import React, { useState } from "react";
import { Container } from "react-bootstrap";

import { Grid, CellMap } from "./Grid";
import { displayGrid, renderCells } from "./GridDisplay";
import { WrappedRow, StateSetter } from "./Helpers";

type LightsLayoutProps = {
  size: bigint;
  grid: CellMap | null;
  setGrid: StateSetter<CellMap | null>;
};
const LightsLayout = ({ size, grid, setGrid }: LightsLayoutProps) => (
  <Container>
    <WrappedRow>
      <header>
        <h1>Edit lights</h1>
      </header>
    </WrappedRow>
    <WrappedRow>
      <Grid {...{ size }}>{renderCells(setGrid, displayGrid(size, grid))}</Grid>
    </WrappedRow>
  </Container>
);

const Lights = () => {
  const size = 15n;
  const [grid, setGrid] = useState<CellMap | null>(null);

  return <LightsLayout {...{ size, grid, setGrid }} />;
};

export { Lights };
