module.exports = {
  pwa: {
    name: 'My Application',
    themeColor: '#4169E1',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js', // サービスワーカーの登録を行うファイルを指定
    }
  },
  
}