import { Button, Container } from "react-bootstrap";

import { Transits } from "../common/Transits";
import { Letters } from "../common/Letter";
import { Lights } from "../common/Lights";
import { Grid } from "./Grid";
import { StateSetter, WrappedRow } from "./Helpers";

type EditCluesProps = {
  size: bigint;
  grid: Grid;
  setLights: StateSetter<Lights | null>;
  letters: Letters | null;
  setLetters: StateSetter<Letters | null>;
  transits: Transits | null;
  setTransits: StateSetter<Transits | null>;
};

const EditClues = (props: EditCluesProps) => (
  <Container>
    <WrappedRow>
      <header>
        <h1>Edit clues</h1>
      </header>
    </WrappedRow>
    <WrappedRow>
      <Grid mode="clues" {...props} />
    </WrappedRow>
    <WrappedRow>
      <Button
        id="edit-clues-reset-button"
        variant="outline-primary"
        title="Reset"
        onClick={() => props.setLetters(null)}
      >
        Reset
      </Button>
    </WrappedRow>
  </Container>
);

export { EditClues };
