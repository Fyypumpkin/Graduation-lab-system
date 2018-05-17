/**
 * @author fyypumpkin on 2018/5/17.
 */
import {observable, action} from 'mobx'

class ProjectSetupStore {
  @observable activeKey = '1'

  @observable peopleSelect = []

  @observable setupInfo = {
    peopleSelected: '',
    dev: [],
    test: []
  }

  @observable prjMember = {
    dev: [{
      username: 1,
      name: '福哟啊要'
    }, {
      username: 2,
      name: 'dshaiu'
    }],
    test: []
  }

  @observable uploadFileList = []

  @observable uploadToken = ''

  @action.bound
  setUploadToken (token) {
    this.uploadToken = token
  }

  get getUploadToken () {
    return this.uploadToken
  }

  @action.bound
  setUploadFileList (list) {
    this.uploadFileList = list
  }

  get getUploadFileList () {
    return this.uploadFileList
  }

  @action.bound
  setPrjMember (prjMember) {
    this.prjMember = prjMember
  }

  get getPrjMember () {
    return this.prjMember
  }

  @action.bound
  setActiveKey (activeKey) {
    this.activeKey = activeKey
  }

  get getActiveKey () {
    return this.activeKey
  }

 @action.bound
  setPeopleSelect (select) {
    this.peopleSelect = select
  }

  get getPeopleSelect () {
    return this.peopleSelect
  }

  @action.bound
  setSetupInfo (select) {
    this.setupInfo = {
      ...this.setupInfo,
      ...select
    }
  }

  get getSetupInfo () {
    return this.setupInfo
  }
}

export default ProjectSetupStore
