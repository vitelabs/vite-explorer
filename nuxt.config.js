const i18nConfig = require("./i18n/config.js");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  head: {
    title: "Official Block Explorer of Vite",
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=no"},
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "https://vite.org/icon.png"}
    ]
  },
  loading: {color: "#7FB2FE"},
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
    ]
  },
  router: {
    middleware: "i18n"
  },
  css: [
    "~/assets/css/main.scss"
  ],
  modules: [
    ["nuxt-i18n", i18nConfig],
    ["@nuxtjs/pwa", {
      workbox: false,
      manifest: false
    }]
  ],
  analyze: true
};
