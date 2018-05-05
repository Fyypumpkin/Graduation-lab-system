/**
 * @author fyypumpkin on 2018/5/4.
 */
import { observable, action } from 'mobx'

class ThesisDispalyStore {
  @observable pdfPageInfo = {
    numPages: null,
    pageNumber: 1
  }

  @action.bound
  setPdfPageInfo (info) {
    this.pdfPageInfo = {
      ...this.pdfPageInfo,
      ...info
    }
  }

  get getPageInfo () {
    return this.pdfPageInfo
  }
}

export default ThesisDispalyStore
