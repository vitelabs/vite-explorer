var timeWorker = {};
let mySetInterval= function(fn, time) {
  let key = Symbol();
  var execute = function(fn, time) {
    timeWorker[key] = setTimeout(function(){
      fn();
      execute(fn, time);
    }, time);
  };
  execute(fn, time);
  return key;
};
var myClearInterval = function(key) {
  if (key in timeWorker) {
    clearTimeout(timeWorker[key]);
    delete timeWorker[key];
  }
};



export { mySetInterval, myClearInterval };