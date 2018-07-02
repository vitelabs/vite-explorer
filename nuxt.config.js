const locales = [
  {
    code: "en",
    name: "English",
    langFile: "en.js"
  },
  {
    code: "zh",
    name: "中文",
    langFile: "zh.js"
  }
];

const defaultLocale = "en";

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
    vendor: ["axios", "element-ui"]
  },
  router: {
    middleware: "i18n"
  },
  css: [
    "~/assets/css/main.scss"
  ],
  modules: [
    ["nuxt-i18n", {
      locales,
      defaultLocale,
      detectBrowserLanguage: true,
      redirectCookieKey: "redirected",
      useRedirectCookie: true,
      loadLanguagesAsync: true,
      langDir: "locales/",
      ignorePaths: [],
      vueI18n: {
        fallbackLocale: defaultLocale,
        messages: {
          /*
          * make the default locale can work in fallback in ssr.
          * */
          en: require("./locales/en.js")
        }
      }
    }]
  ]
};
