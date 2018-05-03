/**
 * @author fyypumpkin on 2018/5/3.
 */
import { observable, action } from 'mobx'

class PersonalStore {
  @observable modalVisible = false
  @observable modalData = []

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
