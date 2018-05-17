/**
 * @author fyypumpkin on 2018/5/16.
 */
import React from 'react'
import {Select, Input, Button, Table, Checkbox} from 'antd'
import {observer} from 'mobx-react'

import '../themes/pages/project.css'
import store from '../routers/store'
import router from '../routers/router/router-all'

@observer
class MyProject extends React.Component {
  columns = [{
    title: '项目名称',
    key: 'prjName',
    dataIndex: 'prjName'
  }, {
    title: '项目状态',
    key: 'prjStatus',
    dataIndex: 'prjStatus'
  }, {
    title: '立项时间',
    key: 'startTime',
    dataIndex: 'startTime'
  }, {
    title: '项目负责人',
    key: 'prjOwner',
    dataIndex: 'prjOwner'
  }, {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    render: (text, record) => {
      return (<div>
        <Button type='primary' onClick={() => {
          localStorage.setItem('prjId', record.prjId)
          store.router.goTo(router.ProjectDetail, {prjId: record.prjId})
        }}>查看</Button>
      </div>)
    }
  }]
  render () {
    return (<div className='project-info'>
      <div>
        <span>项目状态</span>
        <Select defaultValue='start' style={{width: '100px', marginLeft: '10px', marginRight: '10px'}}>
          <Select.Option value='start'>已启动</Select.Option>
          <Select.Option value='stop'>已结束</Select.Option>
          <Select.Option value='hang'>已挂起</Select.Option>
        </Select>
        <span>项目名称</span>
        <Input style={{width: '200px', marginLeft: '10px', marginRight: '10px'}}/>
        <Button icon='eye'>过滤</Button>
        <Checkbox style={{marginLeft: '10px'}} onChange={(e) => {
          console.log('')
          }
        }>仅查看我的</Checkbox>
        <Table bordered columns={this.columns} dataSource={[{}]} style={{marginTop: '20px'}}
               pagination={{
                 pageSize: 10,
                 total: 12,
                 onChange: (page) => console.log(page)
               }}/>
      </div>
    </div>)
  }
}

export default MyProject
