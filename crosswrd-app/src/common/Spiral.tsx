import { chunk, flow, times } from "lodash";
import { OrderedMap } from "immutable";

import { Lights, sortLights } from "./Lights";
import { popCount } from "./Utils";
import { Reference, Trajectory, cellTo, matchingRefs } from "./Reference";

function* spiralSpans() {
  var index = 0n;
  while (true) {
    yield 1n + 2n * (index++ / 2n);
  }
}

const spiralDirection = (r: bigint): Trajectory =>
  new Map<bigint, Trajectory>([
    [0n, "Right"],
    [1n, "Up"],
    [2n, "Left"],
    [3n, "Down"],
  ]).get(r % 4n)!;

function* spiralIndices(end: bigint) {
  var index = 0n;
  var r = 0n;
  const chunks = spiralSpans();
  var c = (chunks.next().value || 1n) - 1n;
  var reference = Reference();
  while (c < (end ?? Infinity)) {
    yield reference;
    reference = cellTo(1n, reference, spiralDirection(r));
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

export const serializeGridLights = (size: bigint): ((_: Lights) => string) =>
  flow([gridLightsFromLights(size), stringFromGridLights]);

const stringFromGridLights = (gs: GridLights): string =>
  chunk(gs, 8)
    .reverse()
    .map((c) => c.reduceRight((acc, l) => (acc << 1) | +l, 0).toString(16))
    .join("");

const gridLightsFromLights = (size: bigint) => (lights: Lights): GridLights => {
  const indices = spiralIndices(size);
  return [...indices].map((r) => lights.get(r) ?? false);
};

export const deserializeGridLights = (s: string): Lights =>
  flow([gridLightsFromString, chunksFromLights, lightsFromChunks, sortLights])(
    s
  );

const gridLightsFromString = (s: string): GridLights | null =>
  s
    .split("")
    .flatMap((s) => times(4, (r) => !!((parseInt(s, 16) >>> (3 - r)) & 1)))
    .reverse();

const chunksFromLights = (gs: GridLights): boolean[][] => {
  const chunkSizes = spiralSpans();
  const chunks = [];
  var pos = 0;
  for (const size of chunkSizes) {
    if (pos > gs.length) break;
    chunks.push(gs.slice(pos, (pos += Number(size))));
  }
  return chunks;
};

const lightsFromChunks = (chunks: boolean[][]): Lights =>
  OrderedMap(
    chunks.flatMap((c, index): [Reference, boolean][] => {
      const r = BigInt(index);
      const xExp = Number(!(popCount(r & 3n) & 1n));
      const yExp = Number(!(r & 2n));
      const x = (BigInt((-1) ** xExp) * (r + 1n)) / 2n; // start
      const y = (BigInt((-1) ** yExp) * r) / 2n; // end
      const pos = (ind: number): Reference =>
        cellTo(BigInt(ind), Reference({ x, y }), spiralDirection(r));
      return c.flatMap((light, i): [Reference, boolean][] =>
        [...matchingRefs(pos(i))].map((p) => [p, light])
      );
    })
  );
