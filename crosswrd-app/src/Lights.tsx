import { flow } from "lodash";
import { OrderedMap } from "immutable";

import { StateSetter } from "./Helpers";
import { Reference, matchingRefs } from "./Reference";

const toggleLight = (light = false): boolean => !light;

export const toggleCell = (
  setLights: StateSetter<Lights | null>,
  reference: Reference
) => (): void =>
  setLights((g) =>
    flow(
      [...matchingRefs(reference)].map((r) => (x) => x.update(r, toggleLight))
    )(g ?? OrderedMap())
  );

export type Lights = OrderedMap<Reference, boolean>;
