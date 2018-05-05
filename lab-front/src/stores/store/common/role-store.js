/**
 * @author fyypumpkin on 2018/5/3.
 */
import {observable, action} from 'mobx'

class RoleStore {
  /**
   * 3 2 1 超级管理员，普通管理员，普通人员
   * @type {string}
   */
  @observable roleType = 2

  @action.bound
  setRoleType (type) {
    this.roleType = type
  }

  get getRoleType () {
    return this.roleType
  }
}

export default new RoleStore()
