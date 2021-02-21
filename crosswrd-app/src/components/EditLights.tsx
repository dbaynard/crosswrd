import { useState, useEffect } from "react";
import { pick } from "lodash";
import { Container } from "react-bootstrap";

import { Lights } from "../common/Lights";
import { ClueStarts, findClueStarts } from "../common/ClueStarts";
import { Grid, displayGrid, renderCells } from "./Grid";
import { WrappedRow, StateSetter, ToggleButton } from "./Helpers";
import { ExportLights } from "./ExportLights";

type EditLightsLayoutProps = Omit<EditLightsProps, "setClueStarts"> & {
  toggleOnHover: boolean;
  toggleToggleOnHover: () => void;
};
const EditLightsLayout = (props: EditLightsLayoutProps) => (
  <Container>
    <WrappedRow>
      <header>
        <h1>Edit lights</h1>
      </header>
    </WrappedRow>
    <WrappedRow>
      <Grid size={props.size}>
        {renderCells(
          props.setLights,
          displayGrid(props.size, props.lights, props.clueStarts),
          props.toggleOnHover
        )}
      </Grid>
    </WrappedRow>
    <WrappedRow>
      <ToggleButton
        value={props.toggleOnHover}
        toggle={props.toggleToggleOnHover}
      >
        Toggle on hover
      </ToggleButton>
    </WrappedRow>
    <WrappedRow>
      <ExportLights {...pick(props, ["lights", "setLights", "size"])} />
    </WrappedRow>
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
  const { size, lights, setClueStarts } = props;

  useEffect(() => {
    setClueStarts(lights && findClueStarts(lights, size));
  }, [setClueStarts, lights, size]);

  const [toggleOnHover, setToggleOnHover] = useState<boolean>(false);
  const toggleToggleOnHover = () => setToggleOnHover((x) => !x);

  return (
    <EditLightsLayout {...{ ...props, toggleOnHover, toggleToggleOnHover }} />
  );
};

export { EditLights };
