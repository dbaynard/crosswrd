import { OrderedMap, OrderedSet, Seq } from "immutable";

import { Reference } from "./Reference";
import { Tack } from "./Tack";
import { Transit, Transits } from "./Transits";

export class ClueId {
  readonly n: bigint;
  readonly t: Tack;

  constructor(n: bigint, t: Tack) {
    this.n = n;
    this.t = t;
  }
  equals(other: ClueId) {
    return this.hashCode() === other.hashCode();
  }
  hashCode() {
    return Number((this.n << 1n) | (this.t === "A" ? 0n : 1n));
  }
}

export type ClueSpan = OrderedSet<Reference>;
export type ClueSpans = OrderedMap<ClueId, ClueSpan>;

export const findClueSpans = (tss: Transits): ClueSpans =>
  OrderedMap<ClueId, ClueSpan>(
    tss
      .toKeyedSeq()
      .map((ts: Transit, r: Reference) =>
        Seq.Keyed(ts)
          .filter((n, t) => !!n)
          .map((n, t) => [new ClueId(n!, t as Tack), r])
          .valueSeq()
          .fromEntrySeq()
      )
      .flatten(true)
      .groupBy((_, c) => c)
      .map((s) => s.valueSeq().toOrderedSet())
  );
