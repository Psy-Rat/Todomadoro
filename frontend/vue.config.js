module.exports = {
  outputDir: '../static',

  pwa: {
    name: 'Todomodoro',
    shortName: 'Todomodoro',
    themeColor: '#1976d2',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // настройки манифеста
    manifestOptions: {
      name: 'todomodoro',
      short_name: 'Todomodoro',
      display: 'standalone',
      background_color: '#1976d2'
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
