/**
 * @author fyypumpkin on 2018/5/16.
 */
import { observable, action } from 'mobx'

class ProjectDetailStore {
 @observable detailData = {
   prjId: '',
   prjName: '',
   prjDesc: ''
 }

 @action.bound
  setDetailData (data) {
   this.detailData = {
     ...this.detailData,
     ...data
   }
 }

 get getDetailData () {
   return this.detailData
 }
}

export default ProjectDetailStore
