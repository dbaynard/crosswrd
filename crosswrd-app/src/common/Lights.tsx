import { flow } from "lodash";
import { OrderedMap } from "immutable";

import { Reference, matchingRefs } from "./Reference";

export const togglingLightPair = (r: Reference) => (l: Lights | null): Lights =>
  flow([toggleLightPair(r), sortLights])(l ?? OrderedMap());

const toggleLightPair = (r: Reference): ((_: Lights) => Lights) =>
  flow([...matchingRefs(r)].map((p) => (x) => x.update(p, toggleLight)));

const toggleLight = (light = false): boolean => !light;

export const sortLights = (l: Lights): Lights =>
  l.sortBy(
    (_: boolean, r: Reference) => r,
    (a: Reference, b: Reference) =>
      a.y > b.y ? -1 : a.y < b.y ? 1 : a.x < b.x ? -1 : 1
  );

export type Lights = OrderedMap<Reference, boolean>;
