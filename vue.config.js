module.exports = {
  css: {
    extract: false // 强制内联
  },
  devServer: {
    proxy: {
      '/': { // search为转发路径
        target: 'http://localhost:8002/', // 目标地址
        ws: true, // 是否代理
        changeOrigin: true // 设置同源  默认false，是否需要改变原始主机头为目标URL,
      }
    }
  },
  configureWebpack: {
    // 关闭 webpack 的性能提示
    performance: {
    //   hints: false
    // },
    // // 警告 webpack 的性能提示
    // performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    },
    resolve: {
      extensions: ['.vue', '.js', '.json', '.css'],
      alias: {
        // '@': 'src',
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  }
}
