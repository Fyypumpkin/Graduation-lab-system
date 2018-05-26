/**
 * @author fyypumpkin on 2018/5/15.
 */
import React from 'react'
import {Collapse, Row, Col, Button, Radio, Input, Select, Spin, Upload, message} from 'antd'
import {observer} from 'mobx-react'

import DataStore from '../stores/store/result/copyright-edit-store'
import store from '../routers/store'
import router from '../routers/router/router-all'
import Request from '../util/request'
import CommonStore from '../stores/store/common/common-store'

const RadioGroup = Radio.Group
const EditStore = new DataStore()
const programTypeEnum = {
  'one': '独立开发',
  'dele': '委托开发',
  'cope': '合作开发',
  'task': '下达任务开发'
}
const extendTypeEnum = {
  transfer: '承让',
  extend: '继承',
  bear: '承受'
}
const powerRangeEnum = {
  'all': '全部',
  'part': '部分'
}

const devTypeEnum = {
  'one': '独立开发',
  'cope': '合作开发',
  'dele': '委托开发',
  'task': '下达任务开发'
}

@observer
class CopyrightEdit extends React.Component {
  constructor() {
    super()
    CommonStore.setNodeSpin({
      copyrightEdit: false
    })
    const params = {...store.router.params}
    // create modify watch null
    const copyEditId = params.copyEditId ? params.copyEditId : localStorage.getItem('copyEditId') ? localStorage.getItem('copyEditId') : 'null'
    const status = params.status ? params.status : localStorage.getItem('copyEditstatus') ? localStorage.getItem('copyEditstatus') : 'null'
    this.status = status
    localStorage.setItem('copyEditId', copyEditId)
    localStorage.setItem('copyEditstatus', status)
    console.log(status, copyEditId)
    status !== 'create' && CommonStore.setNodeSpin({
      copyrightEdit: true
    })
    status !== 'create' && Request.fetch({
      url: '/getCopyrightInfo',
      sentData: {
        id: copyEditId
      },
      successFn(response) {
        const data = response.data.data
        EditStore.setApplyInfo({
          name: data.applyUsername,
          idNo: data.applyIdNo,
          postcode: data.applyPostcode,
          address: data.applyAddress,
          mail: data.applyMail,
          phone: data.applyPhone,
          fax: data.applyFax
        })
        EditStore.setProxyInfo({
          name: data.extendUsername,
          idNo: data.extendIdNo,
          postcode: data.extendPostcode,
          address: data.extendAddress,
          mail: data.extendMail,
          phone: data.extendPhone,
          fax: data.extendFax
        })
        EditStore.setPowerRangeInfo({
          range: data.range,
          power: data.power
        })
        EditStore.setBasicInfo({
          allName: data.allName,
          simpleName: data.simpleName,
          version: data.version,
          sortNo: data.sortNo,
          completeTime: data.completeTime,
          publishTime: data.publishTime,
          type: data.devType,
          typeDesc: devTypeEnum[data.devType]
        })
        EditStore.setUsageInfo({
          desc: data.usage
        })
        EditStore.setOriginPowerInfoAll(data.origin)
        EditStore.setExtendPowerInfoAll(data.extend)
        EditStore.setExtendMax(data.extend.length - 1)
        EditStore.setOriginMax(data.origin.length - 1)
        EditStore.setUrl(data.attUrl)
        CommonStore.setNodeSpin({
          copyrightEdit: false
        })
      }
    })
  }

  componentWillUnmount() {
    EditStore.reset()
  }

  render() {
    const props = {
      action: '',
      headers: {
        'X-Requested-With': null
      },
      onRemove: (file) => {
        const fileList = EditStore.getFile.slice()
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        EditStore.setFile(newFileList)
      },
      beforeUpload: (file) => {
        EditStore.setFile([...EditStore.getFile.slice(), file])
        return false
      },
      fileList: EditStore.getFile.slice()
    }
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden'
    }

    return (<div className="copyright-info">
      <Spin spinning={CommonStore.getNodeSpin.copyrightEdit}>
        <div className="copyright-edit">
          <h3 className='copyright-common'>著作权基本信息：</h3>
          <Collapse bordered={false} defaultActiveKey={['1', '2', '3', '4', '5']}>
            <Collapse.Panel header="软件基础信息" key="1" style={customPanelStyle}>
              <Row>
                <Col span={3} style={{textAlign: 'right'}}>
                  <span>软件全称：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getBasicInfo.allName}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input placeholder='全称' value={EditStore.getBasicInfo.allName} onChange={(e) => {
                    EditStore.setBasicInfo({
                      allName: e.target.value
                    })
                  }}/>}
                </Col>
                <Col span={3} offset={2} style={{textAlign: 'right'}}>
                  <span>分类号：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getBasicInfo.sortNo}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{marginBottom: '10px', width: '100px'}} placeholder='分类号'
                         value={EditStore.getBasicInfo.sortNo} onChange={(e) => {
                    EditStore.setBasicInfo({
                      sortNo: e.target.value
                    })
                  }}/>}
                </Col>

                <Col span={3} style={{textAlign: 'right'}}>
                  <span>简称：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') &&
                  <span>{EditStore.getBasicInfo.simpleName}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{width: '150px'}} placeholder='简称' value={EditStore.getBasicInfo.simpleName}
                         onChange={(e) => {
                           EditStore.setBasicInfo({
                             simpleName: e.target.value
                           })
                         }}/>}
                </Col>
                <Col span={3} offset={2} style={{textAlign: 'right'}}>
                  <span>版本号：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getBasicInfo.version}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{marginBottom: '10px', width: '100px'}} placeholder='版本号'
                         value={EditStore.getBasicInfo.version} onChange={(e) => {
                    EditStore.setBasicInfo({
                      version: e.target.value
                    })
                  }}/>}
                </Col>

                <Col span={3} style={{textAlign: 'right'}}>
                  <span>开发完成日期：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') &&
                  <span>{EditStore.getBasicInfo.completeTime}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{width: '200px'}} placeholder='完成日期' value={EditStore.getBasicInfo.completeTime}
                         onChange={(e) => {
                           EditStore.setBasicInfo({
                             completeTime: e.target.value
                           })
                         }}/>}
                </Col>
                <Col span={3} offset={2} style={{textAlign: 'right'}}>
                  <span>首次发表日期：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') &&
                  <span>{EditStore.getBasicInfo.publishTime}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{width: '200px', marginBottom: '10px'}} placeholder='发表日期'
                         value={EditStore.getBasicInfo.publishTime} onChange={(e) => {
                    EditStore.setBasicInfo({
                      publishTime: e.target.value
                    })
                  }}/>}
                </Col>

                <Col span={3} style={{textAlign: 'right'}}>
                  <span>开发类型：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') &&
                  <span>{programTypeEnum[EditStore.getBasicInfo.type]}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Select value={EditStore.getBasicInfo.type} onSelect={(value) => {
                    EditStore.setBasicInfo({
                      type: value
                    })
                  }}>
                    <Select.Option value='one'>独立开发</Select.Option>
                    <Select.Option value='cope'>合作开发</Select.Option>
                    <Select.Option value='dele'>委托开发</Select.Option>
                    <Select.Option value='task'>下达任务开发</Select.Option>
                  </Select>}
                </Col>
              </Row>
            </Collapse.Panel>
            <Collapse.Panel header='原始取得权利信息' key="2" style={customPanelStyle}>
              <Row>
                {(this.status === 'create' || this.status === 'modify') &&
                <Button shape='circle' icon='plus' onClick={() => {
                  EditStore.setOriginMax(EditStore.getOriginMax + 1)
                  console.log(EditStore.getOriginMax)
                  EditStore.setOriginPowerInfo({
                    realName: '',
                    country: '',
                    address: ''
                  }, EditStore.getOriginMax)
                }}/>}
              </Row>
              {EditStore.getOriginPowerInfo.map((item, index) => {
                return <Row key={index}>
                  <Col span={3} style={{textAlign: 'right'}}>
                    <span>名称(姓名)：</span>
                  </Col>
                  <Col span={2}>
                    {(this.status === 'watch' || this.status === 'null') && <span>{item.realName}</span>}
                    {(this.status === 'create' || this.status === 'modify') &&
                    <Input style={{marginBottom: '10px'}} placeholder='姓名' value={item.realName} onChange={(e) => {
                      EditStore.setOriginPowerInfo({
                        ...EditStore.getOriginPowerInfo[index],
                        realName: e.target.value
                      }, index)
                    }}/>}
                  </Col>

                  <Col span={2} style={{textAlign: 'right'}}>
                    <span>国籍：</span>
                  </Col>
                  <Col span={2}>
                    {(this.status === 'watch' || this.status === 'null') && <span>{item.country}</span>}
                    {(this.status === 'create' || this.status === 'modify') &&
                    <Input placeholder='国籍' value={item.country} onChange={(e) => {
                      EditStore.setOriginPowerInfo({
                        ...EditStore.getOriginPowerInfo[index],
                        country: e.target.value
                      }, index)
                    }}/>}
                  </Col>
                  <Col span={2} offset={1} style={{textAlign: 'right'}}>
                    <span>地址：</span>
                  </Col>
                  <Col span={6} style={{display: 'flex'}}>
                    {(this.status === 'watch' || this.status === 'null') && <span>{item.address}</span>}
                    {(this.status === 'create' || this.status === 'modify') &&
                    <Input style={{marginBottom: '10px'}} placeholder='地址' value={item.address} onChange={(e) => {
                      EditStore.setOriginPowerInfo({
                        ...EditStore.getOriginPowerInfo[index],
                        address: e.target.value
                      }, index)
                    }}/>}
                    {(this.status === 'create' || this.status === 'modify') && <Button shape='circle' icon='delete'
                                                                                       style={{
                                                                                         marginLeft: '10px',
                                                                                         fontSize: '17px',
                                                                                         background: 'none',
                                                                                         border: 'none'
                                                                                       }}
                                                                                       onClick={() => {
                                                                                         console.log(index)
                                                                                         EditStore.removeOriginPowerInfo(index)
                                                                                         EditStore.setOriginMax(EditStore.getOriginMax - 1)
                                                                                         console.log(EditStore.getOriginPowerInfo.slice())
                                                                                       }}/>}
                  </Col>
                </Row>
              })}
            </Collapse.Panel>
            <Collapse.Panel header="继受取得权利信息" key="3" style={customPanelStyle}>
              <Row>
                {(this.status === 'create' || this.status === 'modify') &&
                <Button shape='circle' icon='plus' onClick={() => {
                  EditStore.setExtendMax(EditStore.getExtendMax + 1)
                  console.log(EditStore.getExtendMax)
                  EditStore.setExtendPowerInfo({
                    realName: '',
                    country: '',
                    address: '',
                    type: 'extend'
                  }, EditStore.getExtendMax)
                }}/>}
              </Row>
              {EditStore.getExtendPowerInfo.map((item, index) => {
                return <Row key={index}>
                  <Col span={3} style={{textAlign: 'right'}}>
                    <span>类型：</span>
                  </Col>
                  <Col span={2}>
                    {(this.status === 'watch' || this.status === 'null') && <span>{extendTypeEnum[item.type]}</span>}
                    {(this.status === 'create' || this.status === 'modify') &&
                    <Select value={item.type} onSelect={(value) => {
                      EditStore.setExtendPowerInfo({
                        ...EditStore.getExtendPowerInfo[index],
                        type: value
                      }, index)
                    }}>
                      <Select.Option value='extend'>继承</Select.Option>
                      <Select.Option value='transfer'>受让</Select.Option>
                      <Select.Option value='bear'>承受</Select.Option>
                    </Select>}
                  </Col>
                  <Col span={3} offset={1} style={{textAlign: 'right'}}>
                    <span>名称（姓名）：</span>
                  </Col>
                  <Col span={2}>
                    {(this.status === 'watch' || this.status === 'null') && <span>{item.realName}</span>}
                    {(this.status === 'create' || this.status === 'modify') &&
                    <Input style={{marginBottom: '10px'}} placeholder='姓名' value={item.realName} onChange={(e) => {
                      EditStore.setExtendPowerInfo({
                        ...EditStore.getExtendPowerInfo[index],
                        realName: e.target.value
                      }, index)
                    }}/>}
                  </Col>

                  <Col span={2} style={{textAlign: 'right'}}>
                    <span>国籍：</span>
                  </Col>
                  <Col span={2}>
                    {(this.status === 'watch' || this.status === 'null') && <span>{item.country}</span>}
                    {(this.status === 'create' || this.status === 'modify') &&
                    <Input placeholder='国籍' value={item.country} onChange={(e) => {
                      EditStore.setExtendPowerInfo({
                        ...EditStore.getExtendPowerInfo[index],
                        country: e.target.value
                      }, index)
                    }}/>}
                  </Col>
                  <Col span={2} offset={1} style={{textAlign: 'right'}}>
                    <span>地址：</span>
                  </Col>
                  <Col span={5} style={{display: 'flex'}}>
                    {(this.status === 'watch' || this.status === 'null') && <span>{item.address}</span>}
                    {(this.status === 'create' || this.status === 'modify') &&
                    <Input style={{marginBottom: '10px'}} placeholder='地址' value={item.address} onChange={(e) => {
                      EditStore.setExtendPowerInfo({
                        ...EditStore.getExtendPowerInfo[index],
                        address: e.target.value
                      }, index)
                    }}/>}
                    {(this.status === 'create' || this.status === 'modify') && <Button shape='circle' icon='delete'
                                                                                       style={{
                                                                                         marginLeft: '10px',
                                                                                         fontSize: '17px',
                                                                                         background: 'none',
                                                                                         border: 'none'
                                                                                       }}
                                                                                       onClick={() => {
                                                                                         EditStore.setExtendMax(EditStore.getExtendMax - 1)
                                                                                         EditStore.removeExtendPowerInfo(index)
                                                                                         console.log(EditStore.getExtendPowerInfo.slice())
                                                                                       }}
                    />}
                  </Col>
                </Row>
              })}
            </Collapse.Panel>
            <Collapse.Panel header="权利范围信息" key="4" style={customPanelStyle}>
              <Row>
                <Col span={3} style={{textAlign: 'right'}}>
                  <span>范围：</span>
                </Col>
                <Col span={15}>
                  {(this.status === 'watch' || this.status === 'null') &&
                  <span>{powerRangeEnum[EditStore.getPowerRangeInfo.range]}{EditStore.getPowerRangeInfo.range === 'part' && '->' + EditStore.getPowerRangeInfo.power}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <div style={{display: 'flex'}}><RadioGroup value={EditStore.getPowerRangeInfo.range}
                                                             onChange={(e) => {
                                                               EditStore.setPowerRangeInfo({
                                                                 range: e.target.value
                                                               })
                                                             }}>
                    <Radio value={'all'}>全部</Radio>
                    <Radio value={'part'}>部分</Radio>
                  </RadioGroup>
                    {EditStore.getPowerRangeInfo.range !== 'all' &&
                    <Input disabled={EditStore.getPowerRangeInfo.range === 1} placeholder='部分权利'
                           value={EditStore.getPowerRangeInfo.power} onChange={(e) => {
                      EditStore.setPowerRangeInfo({
                        power: e.target.value
                      })
                    }
                    }/>}</div>}
                </Col>
              </Row>
            </Collapse.Panel>
            <Collapse.Panel header="软件用途和技术特点" key="5" style={customPanelStyle}>
              {(this.status === 'watch' || this.status === 'null') && <Row>{EditStore.getUsageInfo.desc}</Row>}
              {(this.status === 'create' || this.status === 'modify') &&
              <Input.TextArea rows={5} style={{marginBottom: '10px'}} placeholder='描述软件用途和特点'
                              value={EditStore.getUsageInfo.desc} onChange={(e) => {
                EditStore.setUsageInfo({
                  desc: e.target.value
                })
              }}/>}
            </Collapse.Panel>
            <Collapse.Panel header="申请者信息" key="6" style={customPanelStyle}>
              <Row>
                <Col span={3} style={{textAlign: 'right'}}>
                  <span>姓名：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getApplyInfo.name}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{width: '150px'}} placeholder='姓名' value={EditStore.getApplyInfo.name}
                         onChange={(e) => {
                           EditStore.setApplyInfo({
                             name: e.target.value
                           })
                         }}/>}
                </Col>
                <Col span={3} offset={2} style={{textAlign: 'right'}}>
                  <span>电话：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getApplyInfo.phone}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{marginBottom: '10px', width: '150px'}} placeholder='电话'
                         value={EditStore.getApplyInfo.phone} onChange={(e) => {
                    EditStore.setApplyInfo({
                      phone: e.target.value
                    })
                  }}/>}
                </Col>

                <Col span={3} style={{textAlign: 'right'}}>
                  <span>地址：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getApplyInfo.address}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input placeholder='地址' value={EditStore.getApplyInfo.address} onChange={(e) => {
                    EditStore.setApplyInfo({
                      address: e.target.value
                    })
                  }}/>}
                </Col>
                <Col span={3} offset={2} style={{textAlign: 'right'}}>
                  <span>邮编：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') &&
                  <span>{EditStore.getApplyInfo.postcode}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{marginBottom: '10px', width: '90px'}} placeholder='邮编'
                         value={EditStore.getApplyInfo.postcode} onChange={(e) => {
                    EditStore.setApplyInfo({
                      postcode: e.target.value
                    })
                  }}/>}
                </Col>

                <Col span={3} style={{textAlign: 'right'}}>
                  <span>身份证号：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getApplyInfo.idNo}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{width: '200px'}} placeholder='身份证' value={EditStore.getApplyInfo.idNo}
                         onChange={(e) => {
                           EditStore.setApplyInfo({
                             idNo: e.target.value
                           })
                         }}/>}
                </Col>
                <Col span={3} offset={2} style={{textAlign: 'right'}}>
                  <span>E-Mail：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getApplyInfo.mail}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{marginBottom: '10px', width: '150px'}} placeholder='邮箱'
                         value={EditStore.getApplyInfo.mail} onChange={(e) => {
                    EditStore.setApplyInfo({
                      mail: e.target.value
                    })
                  }}/>}
                </Col>

                <Col span={3} style={{textAlign: 'right'}}>
                  <span>传真：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getApplyInfo.fax}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{width: '150px'}} placeholder='传真' value={EditStore.getApplyInfo.fax} onChange={(e) => {
                    EditStore.setApplyInfo({
                      fax: e.target.value
                    })
                  }}/>}
                </Col>
              </Row>
            </Collapse.Panel>
            <Collapse.Panel header="代理者信息" key="7" style={customPanelStyle}>
              <Row>
                <Col span={3} style={{textAlign: 'right'}}>
                  <span>姓名：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getProxyInfo.name}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{width: '150px'}} placeholder='姓名' value={EditStore.getProxyInfo.name}
                         onChange={(e) => {
                           EditStore.setProxyInfo({
                             name: e.target.value
                           })
                         }}/>}
                </Col>
                <Col span={3} offset={2} style={{textAlign: 'right'}}>
                  <span>电话：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getProxyInfo.phone}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{marginBottom: '10px', width: '150px'}} placeholder='电话'
                         value={EditStore.getProxyInfo.phone} onChange={(e) => {
                    EditStore.setProxyInfo({
                      phone: e.target.value
                    })
                  }}/>}
                </Col>

                <Col span={3} style={{textAlign: 'right'}}>
                  <span>地址：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getProxyInfo.address}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input placeholder='地址' value={EditStore.getProxyInfo.address} onChange={(e) => {
                    EditStore.setProxyInfo({
                      address: e.target.value
                    })
                  }}/>}
                </Col>
                <Col span={3} offset={2} style={{textAlign: 'right'}}>
                  <span>邮编：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') &&
                  <span>{EditStore.getProxyInfo.postcode}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{marginBottom: '10px', width: '90px'}} placeholder='邮编'
                         value={EditStore.getProxyInfo.postcode} onChange={(e) => {
                    EditStore.setProxyInfo({
                      postcode: e.target.value
                    })
                  }}/>}
                </Col>

                <Col span={3} style={{textAlign: 'right'}}>
                  <span>身份证号：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getProxyInfo.idNo}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{width: '200px'}} placeholder='身份证' value={EditStore.getProxyInfo.idNo}
                         onChange={(e) => {
                           EditStore.setProxyInfo({
                             idNo: e.target.value
                           })
                         }}/>}
                </Col>
                <Col span={3} offset={2} style={{textAlign: 'right'}}>
                  <span>E-Mail：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getProxyInfo.mail}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{marginBottom: '10px', width: '150px'}} placeholder='邮箱'
                         value={EditStore.getProxyInfo.mail} onChange={(e) => {
                    EditStore.setProxyInfo({
                      mail: e.target.value
                    })
                  }}/>}
                </Col>

                <Col span={3} style={{textAlign: 'right'}}>
                  <span>传真：</span>
                </Col>
                <Col span={8}>
                  {(this.status === 'watch' || this.status === 'null') && <span>{EditStore.getProxyInfo.fax}</span>}
                  {(this.status === 'create' || this.status === 'modify') &&
                  <Input style={{width: '150px'}} placeholder='传真' value={EditStore.getProxyInfo.fax} onChange={(e) => {
                    EditStore.setProxyInfo({
                      fax: e.target.value
                    })
                  }}/>}
                </Col>
              </Row> </Collapse.Panel>
          </Collapse>
          <div style={{textAlign: 'right', marginBottom: '20px', marginTop: '20px'}}>
            {(this.status === 'modify') &&
            <Upload {...props}><Button icon="upload" style={{marginTop: '20px'}}>重新上传著作权附件</Button></Upload>}
            {(this.status === 'create') &&
            <Upload {...props}><Button icon="upload" style={{marginTop: '20px'}}>上传著作权附件</Button></Upload>}
            {(this.status === 'watch' || this.status === 'modify') &&
            <Button icon="file-text" style={{marginLeft: '10px'}} onClick={() => {
              window.location.href = EditStore.getUrl
            }}>下载原始附件</Button>}
            {(this.status === 'create' || this.status === 'modify') &&
            <Button loading={CommonStore.getNodeSpin.copyEditBtn} type={'primary'}
                    style={{marginLeft: '20px', marginTop: '20px'}} onClick={() => {
              if (this.status === 'modify') {
                CommonStore.setNodeSpin({
                  copyEditBtn: true
                })
                setTimeout(function () {
                  message.success('修改成功')
                  CommonStore.setNodeSpin({
                    copyEditBtn: false
                  })
                  store.router.goTo(router.CopyrightInfo)
                }, 2000)
              } else {

              }
            }}>提交</Button>}
          </div>
        </div>
      </Spin>
    </div>)
  }
}

export default CopyrightEdit
