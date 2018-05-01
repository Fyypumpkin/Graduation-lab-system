/**
 * @author fyypumpkin on 2018/5/1.
 */
import React from 'react'
import Index from '../../../App'
import { Route } from 'mobx-router'

export default {
  Index: new Route({
    path: '/',
    components: <Index />
  })
}
