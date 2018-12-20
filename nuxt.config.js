const i18nConfig = require("./i18n/config.js");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const LRU = require("lru-cache");

module.exports = {
  cache: true,
  vue: {
    config: {
      productionTip: true,
      devtools: true
    }
  },
  render: {
    bundleRenderer: {
      cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    }
  },
  head: {
    title: "Official Block Explorer of Vite",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/icon.png" }
    ]
  },
  loading: { color: "#7FB2FE" },
  plugins: [{ src: "~/plugins/element-ui.js", ssr: true }],
  build: {
    vendor: ["babel-polyfill", "axios", "~/plugins/element-ui.js", "moment"],
    babel: {
      "plugins": [["component", {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }]]
    },
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ["en", "zh-cn"],
      })
    ],
    uglify: true
  },
  router: {
    middleware: "i18n",
    fallback: true
  },
  css: [
    "~/assets/css/main.scss",
    "node_modules/animate.css/source/_base.css",
    "node_modules/animate.css/source/fading_entrances/fadeIn.css",
    "node_modules/animate.css/source/rotating_entrances/rotateIn.css"
  ],
  modules: [
    ["@nuxtjs/google-analytics"],
    ["nuxt-i18n", i18nConfig],
    ["@nuxtjs/pwa", {
      workbox: false,
      manifest: false
    }]
  ],
  "google-analytics": {
    id: "UA-123121621-1"
  },
  analyze: true
};
