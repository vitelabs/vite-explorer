import * as auth from './auth';

let keys = {};
const exportObj = {};
let services = {
  auth
};

Object.keys(services).forEach((item) => {
  Object.keys(services[item]).forEach((key) => {
    if (keys[key]) {
      throw new Error(`Service 名称重复: ${item}下的名称${key}和${keys[key]}下的${key}重复`);
    }
    exportObj[key] = services[item][key];
    keys[key] = item;
  });
});

export default exportObj;
