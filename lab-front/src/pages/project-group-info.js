/**
 * @author fyypumpkin on 2018/5/16.
 */
import React from 'react'
import {Select, Input, Button, Table, Badge, Spin, Divider} from 'antd'
import {observer} from 'mobx-react'

import '../themes/pages/project.css'
import store from '../routers/store'
import router from '../routers/router/router-all'
import MyProject from './my-project-info'
import Request from '../util/request'
import DataStore from '../stores/store/project/project-info-store'
import CommonStore from '../stores/store/common/common-store'
import RoleStore from '../stores/store/common/role-store'

const Store = new DataStore()
const statusEnums = {
  start: '已立项',
  stop: '已截止',
  done: '已验收',
  hang: '延期',
  doing: '在研'
}

const statusEnumsBadge = {
  start: 'default',
  doing: 'processing',
  stop: 'error',
  hang: 'warning',
  done: 'success'
}

const rankEnums = {
  college: '院级',
  school: '校级',
  city: '市级',
  province: '省级',
  country: '国家级'
}


@observer
class ProjectGroupInfo extends React.Component {
  columns = [{
    title: '项目名称',
    key: 'prjName',
    dataIndex: 'prjName'
  }, {
    title: '项目状态',
    key: 'prjStatus',
    dataIndex: 'prjStatus',
    render: (text, record) => {
      return (<div>
        <Badge status={statusEnumsBadge[record.prjStatusOrigin]}/>
        <span>{text}</span>
      </div>)
    }
  }, {
    title: '项目级别',
    key: 'rank',
    dataIndex: 'rank'
  }, {
    title: '立项时间',
    key: 'startTime',
    dataIndex: 'startTime'
  }, {
    title: '启动时间',
    key: 'doingTime',
    dataIndex: 'doingTime'
  }, {
    title: '截止时间',
    key: 'completeTime',
    dataIndex: 'completeTime'
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
        <a type='primary' onClick={() => {
          localStorage.setItem('prjId', record.id)
          store.router.goTo(router.ProjectDetail, {prjId: record.id, type: 'watch', prjName: record.prjName})
        }}>查看</a>
        <Divider type="vertical"/>
        <a onClick={() => {
          Request.fetch({
            url: '/delPrjInfo/' + record.id,
            successFn() {
              ProjectGroupInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
            }
          })
        }}>删除</a>
        <Divider type="vertical"/>
        <a onClick={() => {
          localStorage.setItem('prjId', record.id)
          store.router.goTo(router.ProjectSetup, {prjId: record.id, type: 'edit'})
        }}>编辑</a>
      </div>)
    }
  }]

  constructor() {
    super()
    ProjectGroupInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
  }

  static doQuery(searchValue, pageInfo) {
    CommonStore.setNodeSpin({
      groupInfo: true
    })
    Request.fetch({
      url: '/getPrjList',
      sentData: {
        page: pageInfo.page,
        pageSize: pageInfo.pageSize,
        status: searchValue.status,
        name: searchValue.name,
        username: searchValue.mine ? localStorage.getItem('username') : null,
        headPeople: searchValue.headPeople ? searchValue.headPeople : null
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
            prjOwner: RoleStore.getUserMap[item.headPeople] + '(' + item.headPeople + ')',
            prjStatusOrigin: item.status,
            completeTime: item.completeTime,
            doingTime: item.doingTime,
            rank: rankEnums[item.rank]
          })
        })
        Store.setData(table)
        Store.setPageInfo({
          page: pageInfo.page,
          total: pageInfo.totalNum
        })
        CommonStore.setNodeSpin({
          groupInfo: false
        })
      }
    })
  }


  render() {
    return (<div className='project-info'>
      <div>
        <span>项目状态</span>
        <Select value={Store.getSearchValue.status} onSelect={(v) => {
          Store.setSearchValue({
            status: v
          })
          ProjectGroupInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
        }} style={{width: '100px', marginLeft: '10px', marginRight: '10px'}}>
          <Select.Option value={null}>全部</Select.Option>
          <Select.Option value='start'>启动</Select.Option>
          <Select.Option value='doing'>在研</Select.Option>
          <Select.Option value='done'>已验收</Select.Option>
          <Select.Option value='stop'>已截止</Select.Option>
          <Select.Option value='hang'>延期</Select.Option>
        </Select>
        <span>项目名称</span>
        <Input style={{width: '200px', marginLeft: '10px', marginRight: '10px'}} value={Store.getSearchValue.name}
               onChange={(e) => {
                 Store.setSearchValue({
                   name: e.target.value
                 })
                 console.log(e.target.value)
               }}
               onPressEnter={() => {
                 ProjectGroupInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
               }}
        />
        <span>项目负责人</span>
        <Select
          showSearch
          placeholder={'负责人'}
          defaultActiveFirstOption={false}
          style={{width: '100px', marginLeft: '10px', marginRight: '10px'}}
          showArrow={false}
          filterOption={true}
          value={Store.getSearchValue.headPeople}
          onSelect={(value) => {
            Store.setSearchValue({
              headPeople: value
            })
            console.log(value)
            ProjectGroupInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
          }}
        >
          <Select.Option value={null}>全部</Select.Option>
          {RoleStore.getUsers.slice().map((item) => {
            return (<Select.Option key={item.username}>{item.realName}</Select.Option>)
          })}
        </Select>
        <Button icon='eye' onClick={() => {
          ProjectGroupInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
        }}>过滤</Button>
        <Spin spinning={CommonStore.getNodeSpin.groupInfo}>

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

export default ProjectGroupInfo
