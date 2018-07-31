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