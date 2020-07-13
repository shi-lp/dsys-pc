module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.vue', '.js', '.json', '.css'],
      alias: {
        '@': 'src',
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  }
}
