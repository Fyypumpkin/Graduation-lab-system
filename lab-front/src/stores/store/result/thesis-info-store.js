/**
 * @author fyypumpkin on 2018/5/4.
 */
import { observable, action } from 'mobx'

class ThesisInfoStore {
  @observable arrowDir = 'down'

  @observable advancedRetrieve = {
    all: true,
    sci: true,
    ei: true,
    core: true,
    mine: false
  }

  @observable showRetrieve = false

  @action.bound
  setShowRetrieve (showRetrieve) {
    this.showRetrieve = showRetrieve
  }

  get getShowRetrieve () {
    return this.showRetrieve
  }

  @action.bound
  setAdvancedRetrieve (data) {
    this.advancedRetrieve = {
      ...this.advancedRetrieve,
      ...data
    }
  }

  get getAdvancedRetrieve () {
    return this.advancedRetrieve
  }

  @action.bound
  setArrowDir (dir) {
    this.arrowDir = dir
  }

  get getArrowDir () {
    return this.arrowDir
  }
}

export default ThesisInfoStore
