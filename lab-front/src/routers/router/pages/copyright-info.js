/**
 * @author fyypumpkin on 2018/5/8.
 */
import React from 'react'
import { Route } from 'mobx-router'
import CopyRightInfo from '../../../pages/copyright-info'
import CopyrightEdit from '../../../pages/copyright-edit'

export default {
  CopyrightInfo: new Route({
    path: '/page/copyrightInfo',
    component: <CopyRightInfo />
  }),
  CopyrightEdit: new Route({
    path: '/page/copyrightEdit',
    component: <CopyrightEdit/>
  })
}
