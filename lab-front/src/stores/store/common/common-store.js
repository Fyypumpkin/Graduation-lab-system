/**
 * @author fyypumpkin on 2018/5/1.
 */
import {observable, action} from 'mobx'

class CommonStore {
  @observable nodeSpin = {

  }

  @action.bound
  setNodeSpin (spin) {
    this.nodeSpin = {
      ...this.nodeSpin,
      ...spin
    }
  }

  get getNodeSpin () {
    return this.nodeSpin
  }
}

export default new CommonStore()
