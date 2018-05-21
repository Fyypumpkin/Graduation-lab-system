/**
 * @author fyypumpkin on 2018/5/16.
 */
import React from 'react'
import {observer} from 'mobx-react'
import {Button, Tabs, Row, Col, Collapse, Spin} from 'antd'

import '../themes/pages/project.css'
import store from '../routers/store'

import DataStore from '../stores/store/project/project-detail-store'
import Request from '../util/request'
import RoleStore from '../stores/store/common/role-store'
import CommonStore from '../stores/store/common/common-store'

const Panel = Collapse.Panel
const TabPane = Tabs.TabPane
const DetailStore = new DataStore()
const statusEnums = {
  start: '进行中',
  stop: '已结束',
  hang: '已挂起'
}

@observer
class ProjectDetail extends React.Component {
  constructor() {
    super()
    CommonStore.setNodeSpin({
      prjDetail: true
    })
    DetailStore.reset()
    const params = {...store.router.params}
    const prjId = params.prjId ? params.prjId : localStorage.getItem('prjId')
    const prjName = params.prjName ? params.prjName : localStorage.getItem('prjName')
    DetailStore.setDetailData({
      prjId: prjId,
      prjName: prjName
    })
    Request.fetch({
      url: '/getPrjInfo/' + prjId,
      successFn(response) {
        const data = response.data.data
        const dev = JSON.parse(data.dev)
        const test = JSON.parse(data.test)
        let devDesc = ''
        let testDesc = ''
        dev instanceof Array && dev.map(item => {
          devDesc = devDesc + RoleStore.getUserMap[item] + ','
        })
        test instanceof Array && test.map(item => {
          testDesc = testDesc + RoleStore.getUserMap[item] + ','
        })
        DetailStore.setDetailData({
          prjId: data.id,
          prjName: data.name,
          prjDesc: data.intro,
          startTime: data.startTime,
          completeTime: data.completeTime,
          status: statusEnums[data.status],
          setUpPeople: RoleStore.getUserMap[data.username],
          headPeople: RoleStore.getUserMap[data.headPeople],
          dev: devDesc,
          test: testDesc
        })
        CommonStore.setNodeSpin({
          prjDetail: false
        })
      }
    })
  }

  render() {
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden'
    }
    return (<div className='project-info'>
      <Spin spinning={CommonStore.getNodeSpin.prjDetail}>
        <h2>{DetailStore.getDetailData.prjName}</h2>
        <Tabs onChange={() => {
          console.log('change tabs')
        }} type="card">
          <TabPane tab="基本信息" key="1">
            <div>
              <Row style={{marginBottom: '30px', marginTop: '30px'}}>
                <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                  <h4>项目名称</h4>
                </Col>
                <Col>{DetailStore.getDetailData.prjName}</Col>
              </Row>

              <Row style={{marginBottom: '30px'}}>
                <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                  <h4>项目简介</h4>
                </Col>
                <Col>{DetailStore.getDetailData.prjDesc}</Col>
              </Row>

              <Row style={{marginBottom: '30px'}}>
                <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                  <h4>项目立项时间</h4>
                </Col>
                <Col>{DetailStore.getDetailData.startTime}</Col>
              </Row>

              <Row style={{marginBottom: '30px'}}>
                <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                  <h4>项目交付时间</h4>
                </Col>
                <Col>{DetailStore.getDetailData.completeTime}</Col>
              </Row>

              <Row style={{marginBottom: '30px'}}>
                <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                  <h4>当前状态</h4>
                </Col>
                <Col>{DetailStore.getDetailData.status}</Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tab="人员信息" key="2">
            <div>
              <Collapse bordered={false} defaultActiveKey={['1', '2', '3', '4']}>
                <Panel header="立项人" key="1" style={customPanelStyle}>
                  <p>{DetailStore.getDetailData.setUpPeople}</p>
                </Panel>
                <Panel header="技术负责人" key="4" style={customPanelStyle}>
                  <p>{DetailStore.getDetailData.headPeople}</p>
                </Panel>
                <Panel header="开发" key="2" style={customPanelStyle}>
                  <p>{DetailStore.getDetailData.dev}</p>
                </Panel>
                <Panel header="测试" key="3" style={customPanelStyle}>
                  <p>{DetailStore.getDetailData.test}</p>
                </Panel>
              </Collapse>
            </div>
          </TabPane>
        </Tabs>
      </Spin>
    </div>)
  }
}

export default ProjectDetail
