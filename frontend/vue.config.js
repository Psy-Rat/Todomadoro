module.exports = {
  outputDir: '../static',
  
  pwa: {
    name: 'todomodoro-pwa-frontend',
    shortName: 'todomodoro',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // настройки манифеста
    manifestOptions: {
      name: 'todomodoro-pwa-frontend',
      short_name: 'todomodoro',
      display: 'standalone',
      background_color: '#42B883',
      // ...другие настройки манифеста...
    },

    // настройка workbox-плагина
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc необходимо в режиме InjectManifest
      swSrc: './src/service-worker.js'
      // ...другие настройки Workbox...
    }
  }
}