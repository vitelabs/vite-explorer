module.exports = {
  head: {
    title: '{{ name }}',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  loading: {color: '#7FB2FE'},
  plugins: ['plugins/element-ui.js']

}