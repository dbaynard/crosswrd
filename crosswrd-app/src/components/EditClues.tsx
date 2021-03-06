import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";

import { ClueSpans, findClueSpans } from "../common/ClueSpans";
import { ClueStarts } from "../common/ClueStarts";
import { Letters } from "../common/Letter";
import { Lights } from "../common/Lights";
import { Transits, findTransits } from "../common/Transits";

import { Grid } from "./Grid";
import { StateSetter, WrappedRow } from "./Helpers";

type EditCluesProps = {
  size: bigint;
  grid: Grid;
  lights: Lights | null;
  setLights: StateSetter<Lights | null>;
  letters: Letters | null;
  setLetters: StateSetter<Letters | null>;
  clueStarts: ClueStarts | null;
  transits: Transits | null;
  setTransits: StateSetter<Transits | null>;
  clueSpans: ClueSpans | null;
  setClueSpans: StateSetter<ClueSpans | null>;
};

const EditClues = (props: EditCluesProps) => {
  const { transits, setTransits, setClueSpans } = props;
  const { lights, clueStarts, size } = props;

  useEffect(() => {
    lights && clueStarts && setTransits(findTransits(lights, clueStarts, size));
  }, [setTransits, lights, clueStarts, size]);

  useEffect(() => {
    transits && setClueSpans(findClueSpans(transits));
  }, [transits, setClueSpans]);

  return (
    <Container>
      <WrappedRow>
        <header>
          <h1>Edit clues</h1>
        </header>
      </WrappedRow>
      <WrappedRow>
        <Grid mode="clues" {...props} />
      </WrappedRow>
      <Button
        id="edit-clues-reset-button"
        variant="outline-primary"
        title="Reset"
        onClick={() => props.setLetters(null)}
      >
        Reset
      </Button>
    </Container>
  );
};

export { EditClues };
