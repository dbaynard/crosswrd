import { flow } from "lodash";
import { OrderedMap } from "immutable";

import { StateSetter } from "./Helpers";
import { Reference, matchingRefs } from "./Reference";

const toggleLight = (light = false): boolean => !light;

const togglePair = (r: Reference) =>
  flow([...matchingRefs(r)].map((p) => (x) => x.update(p, toggleLight)));

export const toggleCell = (
  setLights: StateSetter<Lights | null>,
  r: Reference
) => (): void =>
  setLights((l) => flow([togglePair(r), sortLights])(l ?? OrderedMap()));

export const sortLights = (l: Lights): Lights =>
  l.sortBy(
    (_: boolean, r: Reference) => r,
    (a: Reference, b: Reference) =>
      a.y > b.y ? -1 : a.y < b.y ? 1 : a.x < b.x ? -1 : 1
  );

export type Lights = OrderedMap<Reference, boolean>;
