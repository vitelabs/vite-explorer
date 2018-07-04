module.exports = function (data, code = 0, msg = "") {
  return {
    code, msg, data
  };
};