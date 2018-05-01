/**
 * @author fyypumpkin on 2018/5/1.
 */
import {observable, action} from 'mobx'

class LoginStore {
  @observable userInfo = {
    username: '',
    passWd: ''
  }

  @observable loginStatus = false

  @action.bound
  setUserInfo (info) {
    this.userInfo = {
      ...this.userInfo,
      ...info
    }
  }

  get getUserInfo () {
    return this.userInfo
  }

  @action.bound
  setLoginStatus (status) {
    this.loginStatus = status
  }

  get getLoginStatus () {
    return this.loginStatus
  }
}

export default new LoginStore()
