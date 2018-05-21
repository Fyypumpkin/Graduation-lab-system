/**
 * @author fyypumpkin on 2018/5/3.
 */
import {observable, action} from 'mobx'

class RoleStore {
  /**
   * 2 1 0 超级管理员，普通管理员，普通人员
   * @type {string}
   */
  @observable roleType = 0

  @observable username = ''

  @observable realname = ''

  @observable users = []

  @observable userMap = {}

  @action.bound
  setUserMap(userMap) {
    this.userMap = userMap
  }

  get getUserMap() {
    return this.userMap
  }

  @action.bound
  setUsers(users) {
    this.users = users
  }

  get getUsers() {
    return this.users
  }

  @action.bound
  setRealname(realname) {
    this.realname = realname
  }

  get getRealname() {
    return this.realname
  }

  @action.bound
  setUsername(username) {
    this.username = username
  }

  get getUsername() {
    return this.username
  }

  @action.bound
  setRoleType(type) {
    this.roleType = type
  }

  get getRoleType() {
    return this.roleType
  }
}

export default new RoleStore()
