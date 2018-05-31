import {observable, action} from 'mobx'

class Store {
  @observable data = []

  @observable pageInfo = {
    page: 1,
    total: 0,
    pageSize: 10
  }

  @observable searchValue = {
    status: null,
    name: '',
    headPeople: null,
    mine: false
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
}

export default Store
