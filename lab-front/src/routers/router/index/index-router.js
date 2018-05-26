/**
 * @author fyypumpkin on 2018/5/1.
 */
import React from 'react'
import Test from '../../../pages/test/test'
import { Route } from 'mobx-router'
import Welcome from "../../../pages/welcome";

export default {
  Index: new Route({
    path: '/',
    component: <Welcome />
  })
}
