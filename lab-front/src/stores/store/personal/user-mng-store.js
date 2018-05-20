/**
 * @author fyypumpkin on 2018/5/16.
 */
import {observable, action} from 'mobx'

class UserMngStore {
  @observable modalData = {
    visible: false,
    sex: '1',
    phone: '',
    username: '',
    realName: '',
    college: '',
    userType: '1'
  }

  @observable userInfo = {}

  @observable searchValue = {}

  @observable pageInfo = {
    page: 1,
    pageSize: 10,
    total: 0
  }

  @observable data = []

  @action.bound
  setUserInfo (userInfo) {
    this.userInfo = {
      ...this.userInfo,
      ...userInfo
    }
  }

  get getUserInfo () {
    return this.userInfo
  }

  @action.bound
  setData (data) {
    this.data = data
  }

  get getData () {
    return this.data
  }

  @action.bound
  setSearchValue (searchValue) {
    this.searchValue = {
      ...this.searchValue,
      ...searchValue
    }
  }

  get getSearchValue () {
    return this.searchValue
  }

  @action.bound
  setPageInfo (pageInfo) {
    this.pageInfo = {
      ...this.pageInfo,
      ...pageInfo
    }
  }

  get getPageInfo () {
    return this.pageInfo
  }

  @action.bound
  setModalData (modalData) {
    this.modalData = {
      ...this.modalData,
      ...modalData
    }
  }

  get getModalData () {
    return this.modalData
  }

  @action.bound
  resetModalData () {
    this.modalData = {
      visible: false,
      sex: '1',
      phone: '',
      username: '',
      realName: '',
      college: ''
    }
  }
}

export default UserMngStore
