/**
 * 著作权信息
 * @author fyypumpkin on 2018/5/8.
 */
import React from 'react'
import {Input, List, Checkbox, Button} from 'antd'

import CommonStore from '../stores/store/common/common-store'
import '../themes/pages/copyright-info.css'
import store from '../routers/store'
import router from '../routers/router/router-all'

class CopyrightInfo extends React.Component {
  render () {
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
        <Input.Search style={{width: '400px', marginBottom: '20px'}} placeholder="软件著作权检索"/>
        <Checkbox style={{marginLeft: '50px'}}>仅查看我的</Checkbox>
        <Button icon='upload' style={{float: 'right'}} onClick={() => {
          store.router.goTo(router.CopyrightEdit, {status: 'create'})
        }}>上传著作权信息</Button>
      </div>
      <List
        className="demo-loadmore-list"
        loading={CommonStore.getNodeSpin.copyList}
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={item => (
          <List.Item actions={[<a onClick={() => {
            store.router.goTo(router.CopyrightEdit, {copyEditId: item.id, status: 'modify'})
          }}>编辑</a>, <a onClick={() => {
            store.router.goTo(router.CopyrightEdit, {copyEditId: item.id, status: 'watch'})
          }}>查看</a>]}>
            <List.Item.Meta
              title={<a onClick={() => {
                store.router.goTo(router.CopyrightEdit, {copyEditId: item.id, status: 'watch'})
              }}>{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>content</div>
          </List.Item>
        )}
      />
    </div>)
  }
}

export default CopyrightInfo
