/**
 * @author fyypumpkin on 2018/5/16.
 */
import {observable, action} from 'mobx'

class ProjectDetailStore {
  @observable detailData = {
    prjId: '',
    prjName: '',
    prjDesc: '',
    startTime: '',
    completeTime: '',
    status: '',
    setUpPeople: '',
    headPeople: '',
    dev: '',
    test: ''
  }

  @action.bound
  setDetailData(data) {
    this.detailData = {
      ...this.detailData,
      ...data
    }
  }

  get getDetailData() {
    return this.detailData
  }

  @action.bound
  reset() {
    this.detailData = {
      prjId: '',
      prjName: '',
      prjDesc: '',
      startTime: '',
      completeTime: '',
      status: '',
      setUpPeople: '',
      headPeople: '',
      dev: '',
      test: ''
    }
  }
}

export default ProjectDetailStore
