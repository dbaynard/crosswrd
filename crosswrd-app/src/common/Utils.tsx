export const popCount = (t: bigint): bigint => {
  let b = t;
  let c = 0n;
  while (b > 0n) {
    b &= b - 1n;
    c++;
  }
  return c;
};
