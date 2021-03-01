import { OrderedMap } from "immutable";
import { Reference, cellTo } from "./Reference";

export const popCount = (t: bigint): bigint => {
  let b = t;
  let c = 0n;
  while (b > 0n) {
    b &= b - 1n;
    c++;
  }
  return c;
};

export const experiment = (f: (_: Reference) => Reference[]) => <V,>(
  w: OrderedMap<Reference, V | null>
) => (r: Reference): (V | null)[] => f(r).map((x) => w.get(x, null));

export const neighbourhood = experiment((r) => [
  cellTo(1n, r, "Left"),
  cellTo(1n, r, "Up"),
  cellTo(1n, r, "Right"),
  cellTo(1n, r, "Down"),
]);
