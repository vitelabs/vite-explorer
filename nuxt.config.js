const i18nConfig = require("./i18n/config.js");

module.exports = {
  head: {
    title: "Official Block Explorer of Vite",
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"}
    ]
  },
  loading: {color: "#7FB2FE"},
  plugins: ["~/plugins/element-ui.js"],
  build: {
    vendor: ["babel-polyfill", "axios", "element-ui"]
  },
  router: {
    middleware: "i18n"
  },
  css: [
    "~/assets/css/main.scss"
  ],
  modules: [
    ["nuxt-i18n", i18nConfig]
  ]
};
