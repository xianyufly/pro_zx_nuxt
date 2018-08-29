module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '一起搜模板网_Bootstrap模板,后台模板,前端模板,html5模板,淘宝商城模板',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'keywords', name: 'keywords', content: 'Bootstrap模板,后台模板,前端模板,html5模板,淘宝商城模板' },
      { hid: 'description', name: 'description', content: '免费下载Bootstrap模板,后台模板,前端模板,html5模板,淘宝商城模板' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    PATH_TYPE: process.env.PATH_TYPE||'local'
  },
  css: [
    // 项目中的 CSS 文件
    '~static/theme/element_#E67E22/index.css',
    '~static/css/screen.css',
    '~static/css/viewer.css',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  //映入插件
  plugins: [
    //element-ui
    {src:'~/plugins/vue-element-ui'}
  ],
  /*
  ** Build configuration
  */
  build: {
    // extractCSS: { allChunks: true },
    //引入公用模块
    vendor: [
      //http请求模块
      'axios',
      'babel-polyfill',
      //element-ui
      '~/plugins/vue-element-ui'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
