/**
 * @author fyypumpkin on 2018/5/16.
 */
import React from 'react'
import {Select, Input, Button, Table, Checkbox, Spin} from 'antd'
import {observer} from 'mobx-react'

import '../themes/pages/project.css'
import store from '../routers/store'
import router from '../routers/router/router-all'
import Request from '../util/request'
import DataStore from '../stores/store/project/project-info-store'
import CommonStore from '../stores/store/common/common-store'

const Store = new DataStore()
const statusEnums = {
  start: '进行中',
  stop: '已结束',
  hang: '已挂起'
}

@observer
class MyProject extends React.Component {
  constructor() {
    super()
    MyProject.doQuery(Store.getSearchValue, Store.getPageInfo)
  }

  static doQuery(searchValue, pageInfo) {
    CommonStore.setNodeSpin({
      prjInfo: true
    })
    Request.fetch({
      url: '/getPrjList',
      sentData: {
        page: pageInfo.page,
        pageSize: pageInfo.pageSize,
        status: searchValue.status,
        name: searchValue.name,
        username: searchValue.mine ? localStorage.getItem('username') : null,
        headPeople: null
      },
      successFn(response) {
        const data = response.data.data
        const pageInfo = response.data.pageInfo
        let table = []
        data instanceof Array && data.map(item => {
          table.push({
            prjName: item.name,
            id: item.id,
            prjStatus: statusEnums[item.status],
            startTime: item.startTime,
            prjOwner: item.headPeople
          })
        })
        Store.setData(table)
        Store.setPageInfo({
          page: pageInfo.page,
          total: pageInfo.totalNum
        })
        CommonStore.setNodeSpin({
          prjInfo: false
        })
      }
    })
  }

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
          localStorage.setItem('prjId', record.id)
          store.router.goTo(router.ProjectDetail, {prjId: record.id, type: 'watch', prjName: record.prjName})
        }}>查看</Button>
      </div>)
    }
  }]

  render() {
    return (<div className='project-info'>
      <div>
        <span>项目状态</span>
        <Select value={Store.getSearchValue.status} onSelect={(v) => {
          Store.setSearchValue({
            status: v
          })
          MyProject.doQuery(Store.getSearchValue, Store.getPageInfo)
        }} style={{width: '100px', marginLeft: '10px', marginRight: '10px'}}>
          <Select.Option value='start'>已启动</Select.Option>
          <Select.Option value='stop'>已结束</Select.Option>
          <Select.Option value='hang'>已挂起</Select.Option>
        </Select>
        <span>项目名称</span>
        <Input style={{width: '200px', marginLeft: '10px', marginRight: '10px'}} value={Store.getSearchValue.name}
               onChange={(e) => {
                 Store.setSearchValue({
                   name: e.target.value
                 })
               }}
               onPressEnter={() => {
                 MyProject.doQuery(Store.getSearchValue, Store.getPageInfo)
               }}
        />
        <Button icon='eye' onClick={() => {
          MyProject.doQuery(Store.getSearchValue, Store.getPageInfo)
        }}>过滤</Button>
        <Checkbox style={{marginLeft: '10px'}} checked={Store.getSearchValue.mine} onChange={(e) => {
          Store.setSearchValue({
            mine: e.target.checked
          })
          MyProject.doQuery(Store.getSearchValue, Store.getPageInfo)
        }}>仅查看我的</Checkbox>
        <Spin spinning={CommonStore.getNodeSpin.prjInfo}>
          <Table bordered columns={this.columns} dataSource={Store.getData.slice()} style={{marginTop: '20px'}}
                 pagination={{
                   pageSize: Store.getPageInfo.pageSize,
                   total: Store.getPageInfo.total,
                   onChange: (page) => {
                     Store.setPageInfo({
                       page: page
                     })
                     MyProject.doQuery(Store.getSearchValue, Store.getPageInfo)
                   }
                 }}/>
        </Spin>
      </div>
    </div>)
  }
}

export default MyProject
