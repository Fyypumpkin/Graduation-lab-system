import {observable, action} from 'mobx'

class WinningStore {
  @observable searchValue = {
    name: '',
    rank: '',
    winner: null
  }

  @observable pageInfo = {
    page: 1,
    total: 22,
    pageSize: 10
  }

  @observable data = []

  @observable modalData = {
    visible: false,
    status: 'create',
    proveFile: [],
    url: ''
  }

  @observable url = 'http://www.gscat.cn:60/jxchg/jinshuyan/gs/pdf/%E8%8E%B7%E5%A5%96%E8%AF%81%E4%B9%A6%20.pdf'

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
      visible: false,
      status: 'create',
      proveFile: [],
      url: ''
    }
  }

  @action.bound
  reset() {
    this.searchValue = {
      name: '',
      rank: '',
      winner: null
    }

    this.pageInfo = {
      page: 1,
      total: 0,
      pageSize: 10
    }

    this.data = []
  }
}

export default WinningStore
