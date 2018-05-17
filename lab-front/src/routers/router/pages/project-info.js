/**
 * @author fyypumpkin on 2018/5/16.
 */
import React from 'react'
import { Route } from 'mobx-router'
import ProjectGroupInfo from '../../../pages/project-group-info'
import MyProject from '../../../pages/my-project-info'
import ProjectDetail from '../../../pages/project-detail'
import ProjectSetupInfo from '../../../pages/project-setup-info'

export default {
  ProjectGroupInfo: new Route({
    path: '/page/groupInfo',
    component: <ProjectGroupInfo/>
  }),
  MyProject: new Route({
    path: '/page/myProject',
    component: <MyProject/>
  }),
  ProjectDetail: new Route({
    path: '/page/projectDetail',
    component: <ProjectDetail/>
  }),
  ProjectSetup: new Route({
    path: '/page/projectSetup',
    component: <ProjectSetupInfo/>
  })
}
