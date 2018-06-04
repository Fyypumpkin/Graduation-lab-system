import {observable, action} from 'mobx'

class OutputStore {
  @observable searchValue = {
    user: {},
    prj: {
      name: '',
      status: null,
      timeType: null,
      headPeople: null,
      time: ['2010-1-1', '2020-12-31'],
      disable: false
    },
    patent: {
      name: '',
      disable: false,
      time: ['2010-1-1', '2020-12-31'],
      people: []
    },
    win: {
      name: '',
      disable: false,
      time: ['2010-1-1', '2020-12-31'],
      people: []
    },
    thesis: {
      name: '',
      author: '',
      time: ['2010-1-1', '2020-12-31'],
      disable: false
    }
  }

  @observable outputType = 'thesis'

  @action.bound
  setOutputType(type) {
    this.outputType = type
  }

  get getOutputType() {
    return this.outputType
  }

  @action.bound
  setSearchValue(value) {
    this.searchValue = {
      ...this.searchValue,
      ...value
    }
  }

  get getSearchValue() {
    return this.searchValue
  }

  @action.bound
  resetSearchValue() {
    this.searchValue = {
      user: {},
      prj: {
        name: '',
        status: null,
        timeType: null,
        headPeople: null,
        time: ['2010-1-1', '2020-12-31'],
        disable: false
      },
      patent: {
        name: '',
        disable: false,
        time: ['2010-1-1', '2020-12-31'],
        people: []
      },
      win: {
        name: '',
        disable: false,
        time: ['2010-1-1', '2020-12-31'],
        people: []
      },
      thesis: {
        name: '',
        author: '',
        time: ['2010-1-1', '2020-12-31'],
        disable: false
      }
    }
  }
}

export default OutputStore
