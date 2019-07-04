export function strToHex(str) {
  let buf = Buffer.from(str, "utf-8");
  return buf.toString("hex");
}

export function hexToStr(hexStr) {
  let buf = Buffer.from(hexStr, "hex");
  return buf.toString("utf-8");
}