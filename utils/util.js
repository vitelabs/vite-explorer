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

export function handleBigNum(str, decimals = 0, toFixed, isCMC) {
  if (!str || str === "null") return "";
  let format = {
    decimalSeparator: ".",
    groupSeparator: ",",
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: " ",
    fractionGroupSize: 0
  };
  BigNumber.config({ FORMAT: format });
  let y  = new BigNumber(str);
  let num;
  if (toFixed) {
    num = new BigNumber(y.shiftedBy(-decimals).toFixed(8)).toFormat();
  } else {
    if (isCMC) {
      num = y.toFormat();
    } else {
      num = y.shiftedBy(-decimals).toFormat();
    }
  }
  return num;
}

export function formatTx(num) {
  if (!num) return "";
  const Thousand = 1000;
  const Million = 1000000;
  num = +num;
  if (num >= Thousand && num < Million) {
    return parseFloat((num / Thousand).toFixed(3)) + "K";
  }
  if (num >= Million) {
    return parseFloat((num / Million).toFixed(3)) + "M";
  }
  return num;
}

let timeout = null;
export function debounce(fn, wait) {
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(fn, wait);
}