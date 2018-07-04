import * as auth from "./auth";

const exportObj = {};
let services = {
  auth
};

Object.keys(services).forEach((item) => {
  Object.keys(services[item]).forEach((key) => {
    exportObj[key] = services[item][key];
  });
});

export default exportObj;
