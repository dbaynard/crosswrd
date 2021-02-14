import { MouseEvent } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import { Lights } from "./Lights";
import { StateSetter } from "./Helpers";
import { serializeGridLights, deserializeGridLights } from "./Spiral";

type ExportLightsProps = {
  lights: Lights | null;
  setLights: StateSetter<Lights | null>;
  size: bigint;
};

const ExportInput = ({ lights, setLights, size }: ExportLightsProps) => (
  <FormControl
    type="string"
    value={lights ? serializeGridLights(size)(lights) : ""}
    htmlSize={25}
    onClick={({ target }: MouseEvent) => (target as HTMLInputElement).select()}
    onChange={({ target }) =>
      setLights(target?.value ? deserializeGridLights(target?.value) : null)
    }
  />
);

export const ExportLights = ({ setLights, ...rest }: ExportLightsProps) => (
  <InputGroup style={{ width: "fit-content", margin: "auto" }}>
    <InputGroup.Prepend>
      <InputGroup.Text>Import/Export</InputGroup.Text>
    </InputGroup.Prepend>
    <ExportInput {...{ setLights, ...rest }} />
    <InputGroup.Append>
      <Button variant="outline-primary" onClick={() => setLights(null)}>
        Reset
      </Button>
    </InputGroup.Append>
  </InputGroup>
);
