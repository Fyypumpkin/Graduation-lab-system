/**
 * @author fyypumpkin on 2018/5/16.
 */
import {observable, action} from 'mobx'

const listData = []
for (let i = 0; i < 5; i++) {
  listData.push({
    title: `ant design part ${i}`,
    username: `fuyaoyao ${i}`
  })
}
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

  @observable data = listData

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
      sex: 'M',
      phone: '',
      username: '',
      realName: '',
      college: ''
    }
  }
}

export default UserMngStore
