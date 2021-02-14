import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { Lights } from "./Lights";
import { ClueStarts, findClueStarts } from "./ClueStarts";
import { Grid, displayGrid, renderCells } from "./Grid";
import { WrappedRow, StateSetter, ToggleButton } from "./Helpers";
import { ExportLights } from "./ExportLights";

type EditLightsLayoutProps = {
  size: bigint;
  lights: Lights | null;
  setLights: StateSetter<Lights | null>;
  toggleOnHover: boolean;
  toggleToggleOnHover: () => void;
};
const EditLightsLayout = ({
  size,
  lights,
  setLights,
  toggleOnHover,
  toggleToggleOnHover,
}: EditLightsLayoutProps) => (
  <Container>
    <WrappedRow>
      <header>
        <h1>Edit lights</h1>
      </header>
    </WrappedRow>
    <WrappedRow>
      <Grid {...{ size }}>
        {renderCells(setLights, displayGrid(size, lights), toggleOnHover)}
      </Grid>
    </WrappedRow>
    <WrappedRow>
      <ToggleButton value={toggleOnHover} toggle={toggleToggleOnHover}>
        Toggle on hover
      </ToggleButton>
    </WrappedRow>
    <WrappedRow>
      <ExportLights {...{ lights, setLights, size }} />
    </WrappedRow>
  </Container>
);

const EditLights = () => {
  const size = 15n;
  const [lights, setLights] = useState<Lights | null>(null);
  const [clueStarts, setClueStarts] = useState<ClueStarts | null>(null);

  useEffect(() => setClueStarts(lights && findClueStarts(lights)), [lights]);

  const [toggleOnHover, setToggleOnHover] = useState<boolean>(false);
  const toggleToggleOnHover = () => setToggleOnHover((x) => !x);

  return (
    <EditLightsLayout
      {...{ size, lights, setLights, toggleOnHover, toggleToggleOnHover }}
    />
  );
};

export { EditLights };
