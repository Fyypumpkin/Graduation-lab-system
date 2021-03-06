/**
 * @author fyypumpkin on 2018/5/17.
 */
import React from 'react'
import {Tabs, Row, Col, Button, Input, Select, Upload, message} from 'antd'
import {observer} from 'mobx-react'
import axios from 'axios'

import DataStore from '../stores/store/project/project-setup-store'
import RoleStore from '../stores/store/common/role-store'
import '../themes/pages/project.css'
import Request from '../util/request'
import store from '../routers/store'

const SetupStore = new DataStore()

@observer
class ProjectSetupInfo extends React.Component {
  constructor() {
    super()
    SetupStore.reset()
    SetupStore.setActiveKey('1')
    const params = {...store.router.params}
    if (params.prjId && params.type === 'edit') {
      const prjId = params.prjId
      this.status = 'edit'
      Request.fetch({
        url: '/getPrjInfo/' + prjId,
        successFn(response) {
          const data = response.data.data
          const completeTime = new Date(data.completeTime)
          const doingTime = new Date(data.doingTime)
          SetupStore.setData({
            id: data.id,
            name: data.name,
            username: data.usage,
            intro: data.intro,
            headPeople: data.headPeople,
            labType: data.labType,
            money: data.money,
            moneyFrom: data.moneyFrom,
            dev: JSON.parse(data.dev),
            test: JSON.parse(data.test),
            file: data.file,
            completeTime: completeTime.getFullYear() + '-' + (completeTime.getMonth() + 1) + '-' + completeTime.getDate(),
            doingTime: doingTime.getFullYear() + '-' + (doingTime.getMonth() + 1) + '-' + doingTime.getDate(),
            status: data.status,
            rank: data.rank
          })
        }
      })
    }
  }

  handleUpload() {
    const fileList = SetupStore.getUploadFileList.slice()
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('file', file)
    })
    let url = 'http://upload.qbox.me/?token=' + SetupStore.getUploadToken
    axios.post(url, formData)
      .then(function (response) {
        console.log(response)
        if (response.data && response.data.msg === 'ok') {
          const downUrl = response.data.data.attachmentPath
          console.log(downUrl)
          if (downUrl !== undefined) {
            // 拿到了上传七牛云后的链接
          }
        } else {
          // 失败
        }
      })
      .catch(function () {
      })
  }

  render() {
    const props = {
      action: '',
      headers: {
        'X-Requested-With': null
      },
      onRemove: (file) => {
        const fileList = SetupStore.getUploadFileList.slice()
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        SetupStore.setUploadFileList(newFileList)
      },
      beforeUpload: (file) => {
        SetupStore.setUploadFileList([...SetupStore.getUploadFileList.slice(), file])
        return false
      },
      fileList: SetupStore.getUploadFileList.slice()
    }
    return (<div className='project-info'>
      <Tabs activeKey={SetupStore.getActiveKey}>
        <Tabs.TabPane tab='立项基础信息' key='1' disabled={SetupStore.getActiveKey !== '1'}>
          <div>
            <Row style={{marginBottom: '30px', marginTop: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>项目名称</h4>
              </Col>
              <Col><Input value={SetupStore.getData.name} placeholder={'项目的名称'} onChange={(e) => {
                SetupStore.setData({
                  name: e.target.value
                })
              }} style={{width: '200px'}}/></Col>
            </Row>

            <Row style={{marginBottom: '30px', marginTop: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>项目简介</h4>
              </Col>
              <Col><Input.TextArea value={SetupStore.getData.intro} placeholder={'项目的简介'} onChange={(e) => {
                SetupStore.setData({
                  intro: e.target.value
                })
              }} rows={3} style={{width: '400px'}}/></Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>项目级别</h4>
              </Col>
              <Col span={3}>
                <Select
                  value={SetupStore.getData.rank}
                  onSelect={(value) => {
                    SetupStore.setData({
                      rank: value
                    })
                  }}
                >
                  <Select.Option value='college'>院级</Select.Option>
                  <Select.Option value='school'>校级</Select.Option>
                  <Select.Option value='city'>市级</Select.Option>
                  <Select.Option value='province'>省级</Select.Option>
                  <Select.Option value='country'>国家级</Select.Option>
                </Select>
              </Col>
              <Col span={3} offset={1} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>项目状态</h4>
              </Col>
              <Col span={3}>
                <Select
                  value={SetupStore.getData.status}
                  onSelect={(value) => {
                    SetupStore.setData({
                      status: value
                    })
                  }}
                >
                  <Select.Option value='start'>已立项</Select.Option>
                  <Select.Option value='done'>已验收</Select.Option>
                  <Select.Option value='stop'>已截止</Select.Option>
                  <Select.Option value='doing'>在研</Select.Option>
                  <Select.Option value='hang'>延期</Select.Option>
                </Select>
              </Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>项目负责人</h4>
              </Col>
              <Col>
                <Select
                  showSearch
                  placeholder={'负责人'}
                  style={{width: '150px'}}
                  showArrow={false}
                  filterOption={true}
                  value={SetupStore.getData.headPeople}
                  onSelect={(value) => {
                    SetupStore.setData({
                      headPeople: value
                    })
                  }}
                >
                  {RoleStore.getUsers.slice().map((item) => {
                    return (<Select.Option key={item.username}>{item.realName}</Select.Option>)
                  })}
                </Select></Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>实验室类型</h4>
              </Col>
              <Col>
                <Select value={SetupStore.getData.labType} onChange={(e) => {
                  SetupStore.setData({
                    labType: e
                  })
                }}>
                  <Select.Option value={'basic'}>基础</Select.Option>
                  <Select.Option value={'proBasic'}>专业基础</Select.Option>
                  <Select.Option value={'pro'}>专业</Select.Option>
                  <Select.Option value={'other'}>其他</Select.Option>
                </Select>
              </Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>预估项目经费</h4>
              </Col>
              <Col>
                <Input value={SetupStore.getData.money} placeholder={'预估经费'} onChange={(e) => {
                  SetupStore.setData({
                    money: e.target.value
                  })
                }} style={{width: '100px'}}/>
              </Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>经费来源</h4>
              </Col>
              <Col>
                <Input value={SetupStore.getData.moneyFrom} placeholder={'经费的来源'} onChange={(e) => {
                  SetupStore.setData({
                    moneyFrom: e.target.value
                  })
                }} style={{width: '150px'}}/>
              </Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>开始时间</h4>
              </Col>
              <Col>
                <Input value={SetupStore.getData.doingTime} placeholder={'项目开始时间'} onChange={(e) => {
                  SetupStore.setData({
                    doingTime: e.target.value
                  })
                }} style={{width: '150px'}}/>
              </Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>截止时间</h4>
              </Col>
              <Col>
                <Input value={SetupStore.getData.completeTime} placeholder={'项目截止时间'} onChange={(e) => {
                  SetupStore.setData({
                    completeTime: e.target.value
                  })
                }} style={{width: '150px'}}/>
              </Col>
            </Row>
            <Row>
              <Button style={{float: 'right'}} onClick={() => {
                SetupStore.setActiveKey('2')
              }}>下一步</Button>
            </Row>
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab={'项目成员'} key='2' disabled={SetupStore.getActiveKey !== '2'}>
          <div>
            <Row style={{marginBottom: '30px'}}>
              <Col span={6}>
                成员姓名
              </Col>
              <Col span={10}>
                成员负责事项
              </Col>
              <Col span={8}>
                <Button style={{float: 'right'}} type={'primary'} onClick={() => {
                  let temp = SetupStore.getData.dev
                  temp.push({
                    people: '',
                    desc: ''
                  })
                  SetupStore.setData({
                    dev: temp
                  })
                  console.log(SetupStore.getData.dev.slice())
                }}>新增成员</Button>
              </Col>
            </Row>
            {SetupStore.getData.dev.map((item, index) => {
              return <Row style={{marginBottom: '30px', marginTop: '30px'}} key={index}>
                <Col span={6}>
                  <Select
                    showSearch
                    style={{width: '80%'}}
                    filterOption={true}
                    placeholder="人员"
                    value={item.people}
                    onChange={(value) => {
                      console.log(value)
                      let temp = SetupStore.getData.dev.slice()
                      temp[index].people = value
                      SetupStore.setData({
                        dev: temp
                      })
                    }}
                  >
                    {RoleStore.getUsers.slice().map((item) => {
                      return (<Select.Option key={item.username}>{item.realName}</Select.Option>)
                    })}
                  </Select>
                </Col>
                <Col span={10}>
                  <Input value={item.desc} onChange={(e) => {
                    let temp = SetupStore.getData.dev.slice()
                    temp[index].desc = e.target.value
                    SetupStore.setData({
                      dev: temp
                    })
                  }
                  } placeholder={'填写项目中负责的事情'}/>
                </Col>
                <Col span={8}>
                  <Button style={{float: 'right'}} icon={'delete'} type={'danger'} onClick={() => {
                    let temp = SetupStore.getData.dev
                    temp.splice(index, 1)
                    SetupStore.setData({
                      dev: temp
                    })
                  }}/>
                </Col>
              </Row>
            })}

            {/*<Row style={{marginBottom: '30px'}}>*/}
            {/*<Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>*/}
            {/*<h4>测试</h4>*/}
            {/*</Col>*/}
            {/*<Col>*/}
            {/*<Select*/}
            {/*mode="tags"*/}
            {/*style={{width: '60%'}}*/}
            {/*placeholder="测试人员"*/}
            {/*value={SetupStore.getData.test.slice()}*/}
            {/*filterOption={true}*/}
            {/*onChange={(value) => {*/}
            {/*SetupStore.setData({*/}
            {/*test: value*/}
            {/*})*/}
            {/*console.log(value)*/}
            {/*}}*/}
            {/*>*/}
            {/*{RoleStore.getUsers.slice().map((item) => {*/}
            {/*return (<Select.Option key={item.username}>{item.realName}</Select.Option>)*/}
            {/*})}*/}
            {/*</Select>*/}
            {/*</Col>*/}
            {/*</Row>*/}
            <Row>
              <Button onClick={() => {
                SetupStore.setActiveKey('1')
              }}>上一步</Button>
              <Button style={{float: 'right'}} onClick={() => {
                SetupStore.setActiveKey('3')
              }}>下一步</Button>
            </Row>
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab={'上传立项申请书(可为空)'} key='3' disabled={SetupStore.getActiveKey !== '3'}>
          <Row style={{display: 'flex', marginBottom: '20px'}}>
            <Upload {...props}>
              <Button style={{marginBottom: '20px', marginRight: '20px'}}>选择文件</Button>
            </Upload>
          </Row>
          {SetupStore.getData.file && <Row style={{marginBottom: '20px'}}>
            <a onClick={() => {
              window.location.href = SetupStore.getData.file
            }}>下载原申请书</a>
          </Row>}
          <Row>
            <Button onClick={() => {
              SetupStore.setActiveKey('2')
            }}>上一步</Button>
            <Button style={{float: 'right'}} onClick={() => {
              !SetupStore.getData.username && SetupStore.setData({
                username: localStorage.getItem('username')
              })
              const data = SetupStore.getData
              const today = new Date()
              const startTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
              !(this.status === 'edit') && Request.fetch({
                url: '/createPrj',
                sentData: {
                  labType: data.labType,
                  name: data.name,
                  status: data.status,
                  username: data.username,
                  intro: data.intro,
                  completeTime: new Date(Date.parse(data.completeTime.replace(/-/g, '/'))),
                  startTime: new Date(Date.parse(startTime.replace(/-/g, '/'))),
                  doingTime: new Date(Date.parse(data.doingTime.replace(/-/g, '/'))),
                  headPeople: data.headPeople,
                  dev: JSON.stringify(data.dev),
                  test: JSON.stringify(data.test),
                  file: data.file,
                  money: data.money,
                  moneyFrom: data.moneyFrom,
                  rank: data.rank
                },
                successFn(response) {
                  message.success('新增完成')
                  SetupStore.setActiveKey('1')
                  SetupStore.reset()
                }
              })
              this.status === 'edit' && Request.fetch({
                url: '/modifyPrj',
                sentData: {
                  id: data.id,
                  labType: data.labType,
                  name: data.name,
                  status: data.status,
                  username: data.username,
                  intro: data.intro,
                  completeTime: new Date(Date.parse(data.completeTime.replace(/-/g, '/'))),
                  doingTime: new Date(Date.parse(data.doingTime.replace(/-/g, '/'))),
                  startTime: null,
                  headPeople: data.headPeople,
                  dev: JSON.stringify(data.dev),
                  test: JSON.stringify(data.test),
                  file: data.file,
                  money: data.money,
                  moneyFrom: data.moneyFrom,
                  rank: data.rank
                },
                successFn(response) {
                  message.success('修改成功')
                  SetupStore.setActiveKey('1')
                  SetupStore.reset()
                }
              })
            }}>
              完成提交
            </Button>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </div>)
  }
}

export default ProjectSetupInfo
