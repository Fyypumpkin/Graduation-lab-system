import {observable, action} from 'mobx'

class PatentStore {
  @observable searchValue = {
    name: '',
    username: null,
    patentNo: '',
    patentOriginNo: ''
  }

  @observable pageInfo = {
    page: 1,
    total: 0,
    pageSize: 10
  }

  @observable data = [{
    intro: 'aaa'
  }]

  @observable modalData = {
    status: 'create',
    visible: false,
    file: [],
    username: '',
    name: '',
    noticeNo: '',
    patentNo: '',
    ipc: '',
    intro: '',
    patentOriginNo: '',
    url: 'http://sist.ustc.edu.cn/_upload/article/files/44/3f/d0cf5e5746c095771de7d05e5347/P020160421357950637676.doc'
  }

  @observable url = 'http://sist.ustc.edu.cn/_upload/article/files/44/3f/d0cf5e5746c095771de7d05e5347/P020160421357950637676.doc'

  get getUrl() {
    return this.url
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
  resetModal() {
    this.modalData = {
      status: 'create',
      visible: false,
      file: [],
      applyName: '',
      name: '',
      noticeNo: '',
      patentNo: '',
      ipc: '',
      intro: '',
      patentOriginNo: '',
      url: 'http://sist.ustc.edu.cn/_upload/article/files/44/3f/d0cf5e5746c095771de7d05e5347/P020160421357950637676.doc'
    }
  }
}

export default PatentStore
