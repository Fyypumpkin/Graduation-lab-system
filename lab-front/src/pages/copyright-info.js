/**
 * 著作权信息
 * @author fyypumpkin on 2018/5/8.
 */
import React from 'react'
import {Input, List, Checkbox, Button} from 'antd'
import {observer} from 'mobx-react'

import CommonStore from '../stores/store/common/common-store'
import '../themes/pages/copyright-info.css'
import store from '../routers/store'
import router from '../routers/router/router-all'
import Request from '../util/request';
import DataStore from '../stores/store/result/copyright-info-store'
import UserMng from "./user-mng";
import RoleStore from "../stores/store/common/role-store";

const Store = new DataStore()

@observer
class CopyrightInfo extends React.Component {
  componentDidMount() {
    CopyrightInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
  }

  static doQuery(searchValue, pageInfo) {
    CommonStore.setNodeSpin({
      copyList: true
    })
    Request.fetch({
      url: '/getCopyrightList',
      sentData: {
        username: searchValue.username,
        allName: searchValue.allName,
        page: pageInfo.page,
        pageSize: pageInfo.pageSize,
      },
      successFn(response) {
        Store.setData(response.data.data)
        Store.setPageInfo({
          page: response.data.pageInfo.page,
          total: response.data.pageInfo.totalNum
        })
        CommonStore.setNodeSpin({
          copyList: false
        })
      }
    })
  }

  render() {
    const listData = []
    for (let i = 0; i < 5; i++) {
      listData.push({
        id: i,
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      })
    }
    return (<div className="copyright-info">
      <div>
        <Input.Search style={{width: '400px', marginBottom: '20px'}} placeholder="软件著作权检索"
                      value={Store.getSearchValue.allName} onChange={(e) => {
          Store.setSearchValue({
            allName: e.target.value
          })
        }} onSearch={() => {
          CopyrightInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
        }}/>
        <Checkbox style={{marginLeft: '50px'}} onChange={(e) => {
          if (e.target.checked) {
            Store.setSearchValue({
              username: localStorage.getItem('username')
            })
          } else {
            Store.setSearchValue({
              username: null
            })
          }
          CopyrightInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
        }
        }>仅查看我的</Checkbox>
        <Button icon='upload' style={{float: 'right'}} onClick={() => {
          store.router.goTo(router.CopyrightEdit, {status: 'create'})
        }}>上传著作权信息</Button>
      </div>
      <List
        pagination={{
          pageSize: Store.getPageInfo.pageSize,
          total: Store.getPageInfo.total,
          currentPage: Store.getPageInfo.page,
          onChange: (page) => {
            Store.setPageInfo({
              page: page
            })
            UserMng.doQuery(Store.getSearchValue, Store.getPageInfo)
          }
        }}
        className="demo-loadmore-list"
        loading={CommonStore.getNodeSpin.copyList}
        itemLayout="horizontal"
        dataSource={Store.getData.slice()}
        renderItem={item => (
          <List.Item
            actions={[<a disabled={(RoleStore.getRoleType < 1 || item.username !== localStorage.getItem('username'))}
                         onClick={() => {
                           console.log('删除')
                         }}>删除</a>,
              <a disabled={(RoleStore.getRoleType < 1 || item.username !== localStorage.getItem('username'))}
                 onClick={() => {
                   store.router.goTo(router.CopyrightEdit, {copyEditId: item.id, status: 'modify'})
                 }}>编辑</a>, <a onClick={() => {
                store.router.goTo(router.CopyrightEdit, {copyEditId: item.id, status: 'watch'})
              }}>查看</a>]}>
            <List.Item.Meta
              title={<a onClick={() => {
                store.router.goTo(router.CopyrightEdit, {copyEditId: item.id, status: 'watch'})
              }}>{item.allName}</a>}
              description={item.usage.length > 50 ? item.usage.substring(0, 50) : item.usage}
            />
          </List.Item>
        )}
      />
    </div>)
  }
}

export default CopyrightInfo
