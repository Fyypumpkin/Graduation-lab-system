/**
 * 菜单测试路由配置
 *
 * @author 冰宁 on 2017/9/22.
 */
import React from 'react'
import { Route } from 'mobx-router'

import Test from '../../../pages/test/test'
import Test2 from '../../../pages/test/test2'

export default {
  Test: new Route({
    path: '/page/test1',
    component: <Test/>
  }),
  Test2: new Route({
    path: '/page/test2',
    component: <Test2/>
  })
}
