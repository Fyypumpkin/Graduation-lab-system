/**
 * @author fyypumpkin on 2018/5/3.
 */
import { observable, action } from 'mobx'

class PersonalStore {
  @observable modalVisible = false
  @observable modalData = []
  @observable editable = {
    info1: false,
    info2: false
  }
  @observable personalInfo = {
    name: '1',
    sex: '2',
    phone: '3',
    college: '4',
    team: 'team',
    direction: 'direction',
    userGroup: 'user-group'
  }

  @action.bound
  setPersonalInfo (personalInfo) {
    this.personalInfo = {
      ...this.personalInfo,
      ...personalInfo
    }
  }

  get getPersonalInfo () {
    return this.personalInfo
  }

  @action.bound
  setEditable (editable) {
    this.editable = {
      ...this.editable,
      ...editable
    }
  }

  get getEditable () {
    return this.editable
  }

  @action.bound
  setModalVisible (modalVisible) {
    this.modalVisible = modalVisible
  }

  get getModalVisible () {
    return this.modalVisible
  }

  @action.bound
  setModalData (modalData) {
    this.modalData = modalData
  }

  get getModalData () {
    return this.modalData
  }

  @action.bound
  reset () {
    this.modalData = []
    this.modalVisible = false
  }
}

export default new PersonalStore()
