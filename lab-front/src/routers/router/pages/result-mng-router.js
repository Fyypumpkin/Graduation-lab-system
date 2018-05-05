/**
 * @author fyypumpkin on 2018/5/4.
 */
import React from 'react'
import ThesisInfo from '../../../pages/thesis-info'
import { Route } from 'mobx-router'
import ThesisDisplay from '../../../pages/thesis-display'

export default {
  ThesisInfo: new Route({
    path: '/page/thesisInfo',
    component: <ThesisInfo />
  }),
  ThesisDisplay: new Route({
    path: '/page/thesisDisplay',
    component: <ThesisDisplay/>
  })
}
