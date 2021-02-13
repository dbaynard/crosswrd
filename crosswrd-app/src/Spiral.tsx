import { chunk, flow } from "lodash";

import { CellMap } from "./Grid";
import { Reference } from "./Reference";

function* spiralSpans() {
  var index = 0n;
  while (true) {
    yield 1n + 2n * (index++ / 2n);
  }
}

function* spiralIndices(end: bigint) {
  var index = 0n;
  var r = 0n;
  const chunks = spiralSpans();
  var c = (chunks.next().value || 1n) - 1n;
  var reference = Reference();
  while (c < (end ?? Infinity)) {
    yield reference;
    const { x, y } = reference;
    switch (r % 4n) {
      case 0n:
        reference = Reference({ x: x + 1n, y });
        break;
      case 1n:
        reference = Reference({ x, y: y + 1n });
        break;
      case 2n:
        reference = Reference({ x: x - 1n, y });
        break;
      default:
        reference = Reference({ x, y: y - 1n });
        break;
    }
    if (c) {
      c--;
    } else {
      r++;
      c = (chunks.next().value || 1n) - 1n;
    }
    index++;
  }
  return index;
}

type GridLights = boolean[];

export const serializeGridLights = (size: bigint): ((_: CellMap) => string) =>
  flow([gridLightsFromCellMap(size), stringFromGridLights]);

const stringFromGridLights = (gs: GridLights): string =>
  chunk(gs, 8)
    .reverse()
    .map((c) => c.reduceRight((acc, l) => (acc << 1) | +l, 0).toString(16))
    .join("");

const gridLightsFromCellMap = (size: bigint) => (grid: CellMap): GridLights => {
  const indices = spiralIndices(size);
  return [...indices].map((r) => grid.get(r)?.light ?? false);
};
