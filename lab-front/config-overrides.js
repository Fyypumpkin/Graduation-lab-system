/**
 * react-app-rewired （一个对 create-react-app 进行自定义配置的社区解决方案）
 */

const { injectBabelPlugin } = require('react-app-rewired')

module.exports = (config, env) => {
  // 按需加载组件代码和样式
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config)
  // 添加 ES7 装饰器语法支持
  config = injectBabelPlugin('transform-decorators-legacy', config)

  return config
}
