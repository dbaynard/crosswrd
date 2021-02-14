import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { Lights } from "../common/Lights";
import { ClueStarts, findClueStarts } from "../common/ClueStarts";
import { Grid, displayGrid, renderCells } from "./Grid";
import { WrappedRow, StateSetter, ToggleButton } from "./Helpers";
import { ExportLights } from "./ExportLights";

type EditLightsLayoutProps = EditLightsProps & {
  size: bigint;
  clueStarts: ClueStarts | null;
  toggleOnHover: boolean;
  toggleToggleOnHover: () => void;
};
const EditLightsLayout = ({
  size,
  lights,
  setLights,
  clueStarts,
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
        {renderCells(
          setLights,
          displayGrid(size, lights, clueStarts),
          toggleOnHover
        )}
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

type EditLightsProps = {
  lights: Lights | null;
  setLights: StateSetter<Lights | null>;
};

const EditLights = ({ lights, setLights }: EditLightsProps) => {
  const size = 15n;
  const [clueStarts, setClueStarts] = useState<ClueStarts | null>(null);

  useEffect(() => {
    setClueStarts(lights && findClueStarts(lights, size));
  }, [lights, size]);

  const [toggleOnHover, setToggleOnHover] = useState<boolean>(false);
  const toggleToggleOnHover = () => setToggleOnHover((x) => !x);

  return (
    <EditLightsLayout
      {...{
        size,
        lights,
        setLights,
        clueStarts,
        toggleOnHover,
        toggleToggleOnHover,
      }}
    />
  );
};

export { EditLights };
