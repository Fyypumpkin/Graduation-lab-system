import {observable, action} from 'mobx'

class WinningStore {
  @observable searchValue = {
    name: '',
    rank: '',
    winner: ''
  }

  @observable pageInfo = {
    page: 1,
    total: 22,
    pageSize: 10
  }

  @observable data = [{winner: '傅垚尧', name: 'haha', inst: 'hahahahahahhahahahaha', rank: '国家级别', time: '2018-1-1'}]

  @observable modalData = {
    visible: false,
    status: 'create'
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
      status: 'create'
    }
  }

  @action.bound
  reset() {
    this.searchValue = {
      name: '',
      rank: '',
      winner: ''
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
