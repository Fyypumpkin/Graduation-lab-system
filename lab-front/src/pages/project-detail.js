/**
 * @author fyypumpkin on 2018/5/16.
 */
import React from 'react'
import {observer} from 'mobx-react'
import {Button, Tabs, Row, Col, Collapse} from 'antd'

import '../themes/pages/project.css'
import store from '../routers/store'

import DataStore from '../stores/store/project/project-detail-store'
import Request from '../util/request'

const Panel = Collapse.Panel
const TabPane = Tabs.TabPane
const DetailStore = new DataStore()
@observer
class ProjectDetail extends React.Component {
  constructor () {
    super()
    const params = {...store.router.params}
    const prjId = params.prjId ? params.prjId : localStorage.getItem('prjId')
    DetailStore.setDetailData({
      prjId: prjId,
      prjName: '测试'
    })
    Request.fetch({
      url: '',
      sentData: {
        prjId: prjId
      },
      successFn (response) {}
    })
  }
  render () {
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden'
    }
    return (<div className='project-info'>
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
              <Col>实时开发监控</Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>项目简介</h4>
              </Col>
              <Col>实时抓取期望的业务数据，运行用户编写的核对规则sql，与预期不符的规则进行预警</Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>项目立项时间</h4>
              </Col>
              <Col>2018-05-03</Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>项目交付时间</h4>
              </Col>
              <Col>2018-05-03</Col>
            </Row>

            <Row style={{marginBottom: '30px'}}>
              <Col span={3} style={{marginRight: '20px', textAlign: 'right'}}>
                <h4>当前状态</h4>
              </Col>
              <Col>正常进行中</Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tab="人员信息" key="2">
          <div>
            <Collapse bordered={false} defaultActiveKey={['1', '2', '3', '4']}>
              <Panel header="立项人" key="1" style={customPanelStyle}>
              <p>{'立项人'}</p>
            </Panel>
              <Panel header="技术负责人" key="4" style={customPanelStyle}>
                <p>{'技术负责人'}</p>
              </Panel>
              <Panel header="开发" key="2" style={customPanelStyle}>
                <p>{'开发'}</p>
              </Panel>
              <Panel header="测试" key="3" style={customPanelStyle}>
                <p>{'测试'}</p>
              </Panel>
            </Collapse>
          </div>
        </TabPane>
      </Tabs>
    </div>)
  }
}

export default ProjectDetail
