export type Tack = "A" | "D";

export const turn = (t: Tack): Tack =>
  new Map([
    ["A", "D"],
    ["D", "A"],
  ]).get(t)! as Tack;
