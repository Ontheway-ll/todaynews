// 导出一个对象
module.exports = {
// 更改less中变量的配置
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        // lessOptions: {
        modifyVars: { // modifyVars是lessloader的一个变量，可以改变变量的值
          // 直接覆盖变量，不需要加@blue，改动配置，重启服务
          blue: '#3296fa'
        //   'border-color': '#eee',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
        //   hack: 'true; @import "your-less-file-path.less";'
        }
        // }
      }
    }
  }
}
