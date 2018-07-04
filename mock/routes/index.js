const fs = require("fs");
const path = require("path");
const Router = require("koa-trie-router");
const config = require("../config");

const router = new Router();

module.exports = function (cb) {
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      return console.error(err);
    }

    // listen on completing
    const time = files.length;
    let succes = 0;
    function addSuccess() {
      succes++;
      if(succes === time) {
        cb && cb(router);
      }
    }

    // set router
    files.forEach((file) => {
      try {
        if (file === "index.js") {
          addSuccess();
          return;
        }
        
        readFile(file, addSuccess);
      } catch(err) {
        console.error(err);
      }
    });
  });
};

function readFile(file, cb) {
  let filePath = path.join(__dirname, file);

  fs.stat(filePath, (err, stats)=>{
    if (err) {
      console.error(err);
      cb && cb();
      return;
    }

    if (!stats.isFile()) {
      cb && cb();
      return;
    }

    const urlPrefix = `/${config.apiPrefix}/${file.split(".")[0]}`;
    const routeData = require(filePath);

    for (let key in routeData) {
      let method = routeData[key].method || "post";
      let body = routeData[key].body || {};

      key = (key === "/") ? "" : key;
      let url = (urlPrefix + key).replace(/(\/+)/, "/");

      router[method](url, (ctx) => {
        ctx.type = "json";
        ctx.body = body;
      });
    }
    cb && cb();
  });
}