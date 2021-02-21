import { useState, useEffect } from "react";
import { pick } from "lodash";
import { Container } from "react-bootstrap";

import { Lights } from "../common/Lights";
import { ClueStarts, findClueStarts } from "../common/ClueStarts";
import { Grid, displayGrid, renderCells } from "./Grid";
import { WrappedRow, StateSetter, ToggleButton } from "./Helpers";
import { ExportLights } from "./ExportLights";

type EditLightsLayoutProps = {
  toggleOnHover: boolean;
  toggleToggleOnHover: () => void;
  children: JSX.Element;
  export: JSX.Element;
};
const EditLightsLayout = (props: EditLightsLayoutProps) => (
  <Container>
    <WrappedRow>
      <header>
        <h1>Edit lights</h1>
      </header>
    </WrappedRow>
    <WrappedRow>{props.children}</WrappedRow>
    <WrappedRow>
      <ToggleButton
        value={props.toggleOnHover}
        toggle={props.toggleToggleOnHover}
      >
        Toggle on hover
      </ToggleButton>
    </WrappedRow>
    <WrappedRow>{props.export}</WrappedRow>
  </Container>
);

type EditLightsProps = {
  size: bigint;
  lights: Lights | null;
  setLights: StateSetter<Lights | null>;
  clueStarts: ClueStarts | null;
  setClueStarts: StateSetter<ClueStarts | null>;
};

const EditLights = (props: EditLightsProps) => {
  const { size, lights, setLights, clueStarts, setClueStarts } = props;

  useEffect(() => {
    setClueStarts(lights && findClueStarts(lights, size));
  }, [setClueStarts, lights, size]);

  const [toggleOnHover, setToggleOnHover] = useState<boolean>(false);
  const toggleToggleOnHover = () => setToggleOnHover((x) => !x);
  return (
    <EditLightsLayout
      {...{ toggleOnHover, toggleToggleOnHover }}
      export={<ExportLights {...{ lights, setLights, size }} />}
    >
      <Grid size={props.size}>
        {renderCells(
          props.setLights,
          displayGrid(size, lights, clueStarts),
          toggleOnHover
        )}
      </Grid>
    </EditLightsLayout>
  );
};

export { EditLights };
