import React from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import { CellMap } from "./Grid";
import { StateSetter } from "./Helpers";
import { serializeGridLights } from "./Spiral";

type ExportLightsProps = {
  grid: CellMap | null;
  setGrid: StateSetter<CellMap | null>;
  size: bigint;
};

const ExportInput = ({ grid, setGrid, size }: ExportLightsProps) => (
  <FormControl
    type="string"
    value={grid ? serializeGridLights(size)(grid) : ""}
    htmlSize={25}
    onClick={({ target }: React.MouseEvent) =>
      (target as HTMLInputElement).select()
    }
  />
);

export const ExportLights = ({ setGrid, ...rest }: ExportLightsProps) => (
  <InputGroup style={{ width: "fit-content", margin: "auto" }}>
    <InputGroup.Prepend>
      <InputGroup.Text>Import/Export</InputGroup.Text>
    </InputGroup.Prepend>
    <ExportInput {...{ setGrid, ...rest }} />
    <InputGroup.Append>
      <Button variant="outline-primary" onClick={() => setGrid(null)}>
        Reset
      </Button>
    </InputGroup.Append>
  </InputGroup>
);
