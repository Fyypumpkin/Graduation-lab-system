/**
 * Footer
 * @author fyy on 9/4/17.
 */
import React from 'react'
import { Layout } from 'antd'

const {Footer} = Layout
const copyright = '2012-' + new Date().getFullYear() + '科研管理系统'

/**
 * 页脚文字
 */
export default () => (
    <Footer style={{textAlign: 'center'}}>
      {copyright}
    </Footer>
)
