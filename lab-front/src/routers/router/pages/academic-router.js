/**
 * @author fyypumpkin on 2018/5/4.
 */
import React from 'react'
import { Route } from 'mobx-router'
import AcademicConference from '../../../pages/academic-conference'
import ThesisCommunication from '../../../pages/thesis-communication'
import AcademicMng from '../../../pages/academic-mng'

export default {
  AcademicConference: new Route({
    path: '/page/academicCon',
    component: <AcademicConference />
  }),
  ThesisCommunication: new Route({
    path: '/page/thesisCom',
    component: <ThesisCommunication/>
  }),
  AcademicMng: new Route({
    path: '/page/academicMng',
    component: <AcademicMng/>
  })
}
