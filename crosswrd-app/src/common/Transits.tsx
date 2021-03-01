import { OrderedMap } from "immutable";
import { curry } from "lodash";

import { ClueStarts } from "./ClueStarts";
import { Lights } from "./Lights";
import { Reference, inGrid } from "./Reference";
import { neighbourhood } from "./Utils";

export type Transit = { A?: bigint; D?: bigint };

export type Transits = OrderedMap<Reference, Transit>;

const transit = (
  css: ClueStarts,
  acc: Transits,
  v: boolean,
  r: Reference
): Transits => {
  if (!v) return acc;
  const [left, up] = neighbourhood(acc)(r);
  const cs = css.get(r);
  return acc.set(r, {
    A: cs?.tacks.has("A") ? cs?.clueNumber : left?.A ?? undefined,
    D: cs?.tacks.has("D") ? cs?.clueNumber : up?.D ?? undefined,
  });
};

export const findTransits = (
  lights: Lights,
  css: ClueStarts,
  size: bigint
): Transits =>
  lights
    .filter(inGrid(size))
    .reduce(curry(transit)(css), OrderedMap() as Transits);
