import React from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import { CellMap } from "./Grid";
import { serializeGridLights } from "./Spiral";

type ExportLightsProps = {
  grid: CellMap | null;
  size: bigint;
};

const ExportInput = ({ grid, size }: ExportLightsProps) => (
  <FormControl
    type="string"
    value={grid ? serializeGridLights(size)(grid) : ""}
    htmlSize={25}
  />
);

export const ExportLights = (props: ExportLightsProps) => (
  <InputGroup style={{ width: "fit-content", margin: "auto" }}>
    <InputGroup.Prepend>
      <InputGroup.Text>Import/Export</InputGroup.Text>
    </InputGroup.Prepend>
    <ExportInput {...props} />
  </InputGroup>
);
