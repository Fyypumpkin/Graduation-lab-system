/**
 * @author fyypumpkin on 2018/5/4.
 */
import React from 'react'
import ThesisInfo from '../../../pages/thesis-info'
import {Route} from 'mobx-router'
import ThesisDisplay from '../../../pages/thesis-display'
import PatentInfo from '../../../pages/patent-info';
import WinningInfo from '../../../pages/winning-info';
import OutputInfo from '../../../pages/output-info';

export default {
  ThesisInfo: new Route({
    path: '/page/thesisInfo',
    component: <ThesisInfo/>
  }),
  ThesisDisplay: new Route({
    path: '/page/thesisDisplay',
    component: <ThesisDisplay/>
  }),
  PatentInfo: new Route({
    path: '/page/patentInfo',
    component: <PatentInfo/>
  }),
  WinningInfo: new Route({
    path: '/page/winningInfo',
    component: <WinningInfo/>
  }),
  OutputInfo: new Route({
    path: '/page/output',
    component: <OutputInfo/>
  })
}
