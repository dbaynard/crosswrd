export const popCount = (t: bigint): bigint => {
  var b = t;
  var c = 0n;
  while (b > 0n) {
    b &= b - 1n;
    c++;
  }
  return c;
};
