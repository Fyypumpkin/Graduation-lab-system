/**
 * @author fyypumpkin on 2018/5/17.
 */
import React from 'react'
import {Tabs, Row, Col, Button, Input, Select, Upload} from 'antd'
import {observer} from 'mobx-react'
import axios from 'axios'

import DataStore from '../stores/store/project/project-setup-store'
import '../themes/pages/project.css'

const SetupStore = new DataStore()
let timeout
let currentValue
@observer
class ProjectSetupInfo extends React.Component {
   fetch (value) {
     SetupStore.setSetupInfo({
       peopleSelected: value
     })
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    currentValue = value
    function fake () {
      if (currentValue === value) {
            let data = {
              key: value,
              value: value
            }
            SetupStore.setPeopleSelect([...SetupStore.getPeopleSelect, data])
         }
        }

    timeout = setTimeout(fake, 500)
  }

  handleChange = (value) => {
    this.fetch(value)
    console.log('jj')
  }

  handleUpload () {
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
  render () {
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
              <Col><Input style={{width: '200px'}}/></Col>
            </Row>

            <Row style={{marginBottom: '30px', marginTop: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>项目简介</h4>
              </Col>
              <Col><Input.TextArea rows={3} style={{width: '400px'}}/></Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>项目负责人</h4>
              </Col>
              <Col>  <Select
                mode="combobox"
                value={SetupStore.getSetupInfo.peopleSelected}
                placeholder={'负责人'}
                defaultActiveFirstOption={false}
                style={{width: '150px'}}
                showArrow={false}
                filterOption={false}
                onChange={this.handleChange}
              >
                {SetupStore.getPeopleSelect.slice().map((item) => {
                  return (<Select.Option key={item.key} >{item.value}</Select.Option>)
                })}
              </Select></Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>实验室类型</h4>
              </Col>
              <Col>
                <Select defaultValue={'basic'}>
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
                <Input style={{width: '100px'}}/>
              </Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>经费来源</h4>
              </Col>
              <Col>
                <Input style={{width: '150px'}}/>
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
          <Row style={{marginBottom: '30px', marginTop: '30px'}}>
            <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
              <h4>开发</h4>
            </Col>
            <Col>
              <Select
                mode="tags"
                style={{ width: '80%' }}
                placeholder="开发人员"
                onChange={(value) => {
                  console.log(value)
                 SetupStore.setSetupInfo({
                   dev: value
                 })
                }}
              >
                {SetupStore.getPrjMember.dev.slice().map(item => {
                  return <Select.Option key={item.username}>{item.name}</Select.Option>
                })}
              </Select>
            </Col>
          </Row>
          <Row style={{marginBottom: '30px'}}>
            <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
              <h4>测试</h4>
            </Col>
            <Col>
              <Select
                mode="tags"
                style={{width: '60%'}}
                placeholder="测试人员"
                onChange={(value) => {
                  SetupStore.setSetupInfo({
                    dev: value
                  })
                }}
              >
                {SetupStore.getPrjMember.test.slice().map(item => {
                  return <Select.Option key={item.username}>{item.name}</Select.Option>
                })}
              </Select>
            </Col>
          </Row>
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

        <Tabs.TabPane tab={'上传立项申请书'} key='3' disabled={SetupStore.getActiveKey !== '3'}>
          <Row>
            <Upload {...props}>
              <Button>选择文件</Button>
            </Upload>
              <Button style={{marginTop: '20px', marginBottom: '20px'}}type='primary'>上传</Button>
          </Row>
          <Row>
            <Button onClick={() => {
              SetupStore.setActiveKey('2')
            }}>上一步</Button>
          <Button style={{float: 'right'}} onClick={() => {

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
