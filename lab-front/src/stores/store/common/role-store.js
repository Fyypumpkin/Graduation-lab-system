/**
 * @author fyypumpkin on 2018/5/3.
 */
import {observable, action} from 'mobx'

class RoleStore {
  /**
   * SA CP CA 超级管理员，普通人员，普通管理员
   * @type {string}
   */
  @observable roleType = ''

  @action.bound
  setRoleType (type) {
    this.roleType = type
  }

  get getRoleType () {
    return this.roleType
  }
}

export default new RoleStore()
