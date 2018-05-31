/**
 * @author fyypumpkin on 2018/5/4.
 */
import {observable, action} from 'mobx'

class ThesisInfoStore {
  @observable modalAttr = {
    visible: false
  }

  @observable modalData = {
    name: '',
    firstAuthor: '',
    teleAuthor: '',
    journalName: '',
    publishTime: '',
    journalType: 'core',
    journalFrom: 'none',
    prove: '',
    proveFile: [],
    sourceFile: [],
    otherAuthor: '',
    journalPage: '',
    journalYear: ''
  }
  @observable arrowDir = 'down'

  @observable URL = {
    proveUrl: 'http://gs.dhu.edu.cn/_upload/article/a9/ae/0a335aee42af9ad1c452269325e0/1d9f5d3f-1387-4e6b-a61e-80a19de47e10.pdf',
    sourceUrl: 'http://www.cup.edu.cn/kjc/docs/20110706161811223040.doc'
  }

  @observable advancedRetrieve = {
    all: true,
    sci: true,
    ei: true,
    ssci: true,
    cssci: true,
    core: true,
    mine: false
  }

  @observable showRetrieve = false

  @observable searchValue = {
    name: ''
  }

  @observable pageInfo = {
    page: 1,
    total: 0,
    pageSize: 10
  }

  @observable data = []

  get getUrl() {
    return this.URL
  }

  @action.bound
  setData(data) {
    this.data = data
  }

  get getData() {
    return this.data
  }

  @action.bound
  setSearchValue(searchValue) {
    this.searchValue = {
      ...this.searchValue,
      ...searchValue
    }
  }

  get getSearchValue() {
    return this.searchValue
  }

  @action.bound
  setPageInfo(pageInfo) {
    this.pageInfo = {
      ...this.pageInfo,
      ...pageInfo
    }
  }

  get getPageInfo() {
    return this.pageInfo
  }

  @action.bound
  setModalData(modalData) {
    this.modalData = {
      ...this.modalData,
      ...modalData
    }
  }

  get getModalData() {
    return this.modalData
  }

  @action.bound
  setModalAttr(modalAttr) {
    this.modalAttr = {
      ...this.modalAttr,
      ...modalAttr
    }
  }

  get getModalAttr() {
    return this.modalAttr
  }

  @action.bound
  setShowRetrieve(showRetrieve) {
    this.showRetrieve = showRetrieve
  }

  get getShowRetrieve() {
    return this.showRetrieve
  }

  @action.bound
  setAdvancedRetrieve(data) {
    this.advancedRetrieve = {
      ...this.advancedRetrieve,
      ...data
    }
  }

  get getAdvancedRetrieve() {
    return this.advancedRetrieve
  }

  @action.bound
  setArrowDir(dir) {
    this.arrowDir = dir
  }

  get getArrowDir() {
    return this.arrowDir
  }

  @action.bound
  resetModal() {
    this.modalAttr = {
      visible: false,
      status: ''
    }
    this.modalData = {
      name: '',
      firstAuthor: '',
      teleAuthor: '',
      journalName: '',
      publishTime: '',
      journalType: 'core',
      journalFrom: 'none',
      prove: '',
      proveFile: [],
      sourceFile: [],
      otherAuthor: '',
      journalPage: '',
      journalYear: ''
    }
  }
}

export default ThesisInfoStore
