/**
 * @author fyypumpkin on 2018/5/15.
 */
import {observable, action} from 'mobx'

class CopyrightEditStore {
  @observable basicInfo = {
    allName: '',
    simpleName: '',
    version: '',
    sortNo: '',
    completeTime: '',
    publishTime: '',
    type: 'one',
    typeDesc: '个人开发'
  }
  @observable originPowerInfo = []
  @observable extendPowerInfo = []
  @observable powerRangeInfo = {
    range: 'all',
    power: 'tese power'
  }
  @observable usageInfo = {
    desc: ''
  }
  @observable applyInfo = {
    name: '',
    idNo: '',
    postcode: '',
    address: '',
    mail: '',
    phone: '',
    fax: ''
  }
  @observable proxyInfo = {
    name: '',
    idNo: '',
    postcode: '',
    address: '',
    mail: '',
    phone: '',
    fax: ''
  }
  @observable originMax = -1
  @observable extendMax = -1

  @observable url

  @observable upUrl = 'http://www.cup.edu.cn/kjc/docs/20100407091053469893.doc'

  @observable file = []

  @action.bound
  setFile(file) {
    this.file = file
  }

  get getFile() {
    return this.file
  }

  get getUpUrl() {
    return this.upUrl
  }

  @action.bound
  setUrl(url) {
    this.url = url
  }

  get getUrl() {
    return this.url
  }

  @action.bound
  setBasicInfo(basicInfo) {
    this.basicInfo = {
      ...this.basicInfo,
      ...basicInfo
    }
  }

  get getBasicInfo() {
    return this.basicInfo
  }

  @action.bound
  setOriginPowerInfo(originPowerInfo, index) {
    this.originPowerInfo[index] = originPowerInfo
  }

  @action.bound
  setOriginPowerInfoAll(originPowerInfo) {
    this.originPowerInfo = originPowerInfo
  }

  @action.bound
  removeOriginPowerInfo(index) {
    this.originPowerInfo.splice(index, 1)
  }

  get getOriginPowerInfo() {
    return this.originPowerInfo
  }

  @action.bound
  setExtendPowerInfo(extendPowerInfo, index) {
    this.extendPowerInfo[index] = extendPowerInfo
  }

  @action.bound
  setExtendPowerInfoAll(extendPowerInfo) {
    this.extendPowerInfo = extendPowerInfo
  }


  @action.bound
  removeExtendPowerInfo(index) {
    this.extendPowerInfo.splice(index, 1)
  }

  get getExtendPowerInfo() {
    return this.extendPowerInfo
  }

  @action.bound
  setUsageInfo(usageInfo) {
    this.usageInfo = {
      ...this.usageInfo,
      ...usageInfo
    }
  }

  get getUsageInfo() {
    return this.usageInfo
  }

  @action.bound
  setApplyInfo(applyInfo) {
    this.applyInfo = {
      ...this.applyInfo,
      ...applyInfo
    }
  }

  get getApplyInfo() {
    return this.applyInfo
  }

  @action.bound
  setProxyInfo(proxyInfo) {
    this.proxyInfo = {
      ...this.proxyInfo,
      ...proxyInfo
    }
  }

  get getProxyInfo() {
    return this.proxyInfo
  }

  @action.bound
  setPowerRangeInfo(powerRangeInfo) {
    this.powerRangeInfo = {
      ...this.powerRangeInfo,
      ...powerRangeInfo
    }
  }

  get getPowerRangeInfo() {
    return this.powerRangeInfo
  }

  @action.bound
  setOriginMax(max) {
    this.originMax = max
  }

  get getOriginMax() {
    return this.originMax
  }

  @action.bound
  setExtendMax(max) {
    this.extendMax = max
  }

  get getExtendMax() {
    return this.extendMax
  }

  @action.bound
  reset() {
    this.basicInfo = {
      allName: '',
      simpleName: '',
      version: '',
      sortNo: '',
      completeTime: '',
      publishTime: '',
      type: 'one',
      typeDesc: '个人开发'
    }
    this.originPowerInfo = []
    this.extendPowerInfo = []
    this.powerRangeInfo = {
      range: 'all',
      power: 'tese power'
    }
    this.usageInfo = {
      desc: ''
    }
    this.applyInfo = {
      name: '',
      idNo: '',
      postcode: '',
      address: '',
      mail: '',
      phone: '',
      fax: ''
    }
    this.proxyInfo = {
      name: '',
      idNo: '',
      postcode: '',
      address: '',
      mail: '',
      phone: '',
      fax: ''
    }
    this.originMax = -1
    this.extendMax = -1
    this.file = []
  }
}

export default CopyrightEditStore
