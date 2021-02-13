import React, { useState } from "react";
import { Container } from "react-bootstrap";

import { Grid, CellMap } from "./Grid";
import { displayGrid, renderCells } from "./GridDisplay";
import { WrappedRow, StateSetter, ToggleButton } from "./Helpers";

type LightsLayoutProps = {
  size: bigint;
  grid: CellMap | null;
  setGrid: StateSetter<CellMap | null>;
  toggleOnHover: boolean;
  toggleToggleOnHover: () => void;
};
const LightsLayout = ({
  size,
  grid,
  setGrid,
  toggleOnHover,
  toggleToggleOnHover,
}: LightsLayoutProps) => (
  <Container>
    <WrappedRow>
      <header>
        <h1>Edit lights</h1>
      </header>
    </WrappedRow>
    <WrappedRow>
      <Grid {...{ size }}>
        {renderCells(setGrid, displayGrid(size, grid), toggleOnHover)}
      </Grid>
    </WrappedRow>
    <WrappedRow>
      <ToggleButton value={toggleOnHover} toggle={toggleToggleOnHover}>
        Toggle on hover
      </ToggleButton>
    </WrappedRow>
  </Container>
);

const Lights = () => {
  const size = 15n;
  const [grid, setGrid] = useState<CellMap | null>(null);

  const [toggleOnHover, setToggleOnHover] = useState<boolean>(false);
  const toggleToggleOnHover = () => setToggleOnHover((x) => !x);

  return (
    <LightsLayout
      {...{ size, grid, setGrid, toggleOnHover, toggleToggleOnHover }}
    />
  );
};

export { Lights };
