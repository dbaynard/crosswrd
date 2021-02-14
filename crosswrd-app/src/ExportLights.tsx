import { MouseEvent } from "react";
import {
  Dropdown,
  FormControl,
  InputGroup,
  SplitButton,
} from "react-bootstrap";

import { Lights } from "./Lights";
import { StateSetter } from "./Helpers";
import { serializeGridLights, deserializeGridLights } from "./Spiral";

type ResetLightsProps = {
  setLights: StateSetter<Lights | null>;
};

const grids = [
  {
    code: "00aaaaaabfffffeaaaabfffeaabfeb",
    description: "Chequerboard through centre",
  },
  {
    code: "015557ffffff555557ffff5557ff57",
    description: "Chequerboard through vertical centre",
  },
  {
    code: "01ffffffeaaaaabffffeaaabffeabe",
    description: "Chequerboard around centre",
  },
  {
    code: "01fffd555555fffffd5555fffd55fd",
    description: "Chequerboard through horizontal centre",
  },
];

export const ResetGrids = ({ setLights }: ResetLightsProps) => (
  <SplitButton
    id="edit-lights-reset-button"
    variant="outline-primary"
    title="Reset"
    onClick={() => setLights(null)}
  >
    {grids.map(({ code, description }) => (
      <Dropdown.Item
        key={code}
        onClick={() => setLights(deserializeGridLights(code))}
      >
        {description}
      </Dropdown.Item>
    ))}
  </SplitButton>
);

type ExportLightsProps = ResetLightsProps & {
  lights: Lights | null;
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
      <ResetGrids {...{ setLights }} />
    </InputGroup.Append>
  </InputGroup>
);
