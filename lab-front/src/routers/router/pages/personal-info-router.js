/**
 * @author fyypumpkin on 2018/5/3.
 */
import React from 'react'
import PersonalInfo from '../../../pages/personal-info'
import { Route } from 'mobx-router'

export default {
  PersonalInfo: new Route({
    path: '/page/personalInfo',
    component: <PersonalInfo />
  })
}
