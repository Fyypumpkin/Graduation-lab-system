/**
 * @author fyypumpkin on 2018/5/3.
 */
import React from 'react'
import PersonalInfo from '../../../pages/personal-info'
import UserMng from '../../../pages/user-mng'
import { Route } from 'mobx-router'

export default {
  PersonalInfo: new Route({
    path: '/page/personalInfo',
    component: <PersonalInfo />
  }),
  UserMng: new Route({
    path: '/page/userMng',
    component: <UserMng />
  })
}
