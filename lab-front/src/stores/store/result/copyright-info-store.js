import {observable, action} from 'mobx/lib/mobx'

class Store {
  @observable data = []

  @observable searchValue = {}

  @observable pageInfo = {
    page: 1,
    pageSize: 10,
    total: 0
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
