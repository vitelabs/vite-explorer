import { BigNumber } from "bignumber.js";

function middleEllipse(str) {
  return str.substr(0, 6) + "..." + str.substr(str.length - 6, str.length);
}

export function toShort(str) {
  if (str && str.length > 20) {
    if (/vite_[A-Za-z0-9]+/.test(str)) {
      str = str.slice(5);
      return "vite_" + middleEllipse(str);
    }
    if (/tti_[A-Za-z0-9]+/.test(str)) {
      str = str.slice(4);
      return "tti_" + middleEllipse(str);
    }
    return middleEllipse(str);
  } else {
    return str;
  }
}

export function handleBigNum(str, toFixed) {
  if (!str) return "";
  let y  = new BigNumber(str);
  let num;
  if (toFixed) {

    num = y.shiftedBy(-18).toFixed(8);
  } else {
    num = y.shiftedBy(-18).toFormat();
  }
  return num;
}
