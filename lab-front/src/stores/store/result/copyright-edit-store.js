/**
 * @author fyypumpkin on 2018/5/15.
 */
import {observable, action} from 'mobx'

class CopyrightEditStore {
  @observable basicInfo = {
    allName: '全称',
    simpleName: 'simplename',
    version: 'version',
    sortNo: 'sortNo',
    completeTime: 'completeTime',
    publishTime: 'publishTime',
    type: 'one',
    typeDesc: 'one'
  }
  @observable originPowerInfo = [{
    country: 'china',
    name: 'fuyaoyao',
    address: '杭州电子科技大学'
  }, {
    country: 'hhhh',
    name: 'fuyaoyasssso',
    address: '杭州电子科sadasdfsa技大学'
  }]
  @observable extendPowerInfo = [{
    country: 'china',
    name: 'fuyaoyao',
    address: '杭州电子科技大学',
    type: 'extend'
  }]
  @observable powerRangeInfo = {
    range: 1,
    power: 'tese power'
  }
  @observable usageInfo = {
    desc: ' 软件用途和特点\n' +
    '              1、作为办理软件著作权变更、补充、软件让之必要条件的软件著作权查询，也就是说只有经过软件著作权查询后，才可以对已登记的软件著作权登记证书进行变更、转让、补充。因此，它是软件著作权登记变更、转让、补充的前置条件。\n' +
    '\n' +
    '              2、是指软件完成软件著作权登记后，在中国版权局官网可以查询到软件登记的主要内容，如软件全称、简称、版本号、软件著作权登记证书号、开发完成日期、首次发表日期、著作权人等必要的信息，这是一种信息的公示。\n' +
    ' '
  }
  @observable applyInfo = {
    name: 'fuyaoyao',
    idNo: '2637464758589696856',
    postcode: '129382437',
    address: 'hangzhoudianzikejidaxue',
    mail: '891ye43782679@qq.com',
    phone: '132738458567',
    fax: '123253456'
  }
  @observable proxyInfo = {
    name: 'fuyaoyao',
    idNo: '2637464758589696856',
    postcode: '129382437',
    address: 'hangzhoudianzikejidaxue',
    mail: '891ye43782679@qq.com',
    phone: '132738458567',
    fax: '123253456'
  }
  @observable originMax = 1
  @observable extendMax = 0

  @action.bound
  setBasicInfo (basicInfo) {
    this.basicInfo = {
      ...this.basicInfo,
      ...basicInfo
    }
  }

  get getBasicInfo () {
    return this.basicInfo
  }

  @action.bound
  setOriginPowerInfo (originPowerInfo, index) {
    this.originPowerInfo[index] = originPowerInfo
  }

  @action.bound
  removeOriginPowerInfo (index) {
   this.originPowerInfo.splice(index, 1)
  }

  get getOriginPowerInfo () {
    return this.originPowerInfo
  }

  @action.bound
  setExtendPowerInfo (extendPowerInfo, index) {
    this.extendPowerInfo[index] = extendPowerInfo
  }

  @action.bound
  removeExtendPowerInfo (index) {
    this.extendPowerInfo.splice(index, 1)
  }

  get getExtendPowerInfo () {
    return this.extendPowerInfo
  }

  @action.bound
  setUsageInfo (usageInfo) {
    this.usageInfo = {
      ...this.usageInfo,
      ...usageInfo
    }
  }

  get getUsageInfo () {
    return this.usageInfo
  }

  @action.bound
  setApplyInfo (applyInfo) {
    this.applyInfo = {
      ...this.applyInfo,
      ...applyInfo
    }
  }

  get getApplyInfo () {
    return this.applyInfo
  }

  @action.bound
  setProxyInfo (proxyInfo) {
    this.proxyInfo = {
      ...this.proxyInfo,
      ...proxyInfo
    }
  }

  get getProxyInfo () {
    return this.proxyInfo
  }

  @action.bound
  setPowerRangeInfo (powerRangeInfo) {
    this.powerRangeInfo = {
      ...this.powerRangeInfo,
      ...powerRangeInfo
    }
  }

  get getPowerRangeInfo () {
    return this.powerRangeInfo
  }

  @action.bound
  setOriginMax (max) {
    this.originMax = max
  }

  get getOriginMax () {
    return this.originMax
  }

  @action.bound
  setExtendMax (max) {
    this.extendMax = max
  }

  get getExtendMax () {
    return this.extendMax
  }
}

export default CopyrightEditStore
