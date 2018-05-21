/**
 * @author fyypumpkin on 2018/5/17.
 */
import {observable, action} from 'mobx'

class ProjectSetupStore {
  @observable activeKey = '1'

  @observable data = {
    name: '',
    username: '',
    intro: '',
    headPeople: '',
    labType: 'basic',
    money: '',
    moneyFrom: '',
    dev: [],
    test: [],
    file: '',
    completeTime: '',
    status: 'start'
  }

  @observable uploadFileList = []

  @observable uploadToken = ''

  @action.bound
  setData(data) {
    this.data = {
      ...this.data,
      ...data
    }
  }

  get getData() {
    return this.data
  }


  @action.bound
  setUploadToken(token) {
    this.uploadToken = token
  }

  get getUploadToken() {
    return this.uploadToken
  }

  @action.bound
  setUploadFileList(list) {
    this.uploadFileList = list
  }

  get getUploadFileList() {
    return this.uploadFileList
  }

  @action.bound
  setActiveKey(activeKey) {
    this.activeKey = activeKey
  }

  get getActiveKey() {
    return this.activeKey
  }

  @action.bound
  reset() {
    this.data = {
      name: '',
      username: '',
      intro: '',
      headPeople: '',
      labType: 'basic',
      money: '',
      moneyFrom: '',
      dev: [],
      test: [],
      file: '',
      completeTime: '',
      status: 'start'
    }
  }

}

export default ProjectSetupStore
