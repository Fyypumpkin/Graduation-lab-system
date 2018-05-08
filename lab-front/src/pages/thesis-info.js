/**
 * @author fyypumpkin on 2018/5/4.
 */
import React from 'react'
import {Table, Button, List, Avatar, Icon, Input, Checkbox} from 'antd'
import {observer} from 'mobx-react'

import store from '../routers/store'
import router from '../routers/router/router-all'
import '../themes/pages/thesis-info.css'
import DataStore from '../stores/store/result/thesis-info-store'
import RoleStore from '../stores/store/common/role-store'

const ThesisStore = new DataStore()

@observer
class ThesisInfo extends React.Component {
  columns = [{
    title: '论文题',
    key: 'thesisName',
    dataIndex: 'thesisName'
  }]
  render () {
    const IconText = ({ type, text }) => (
      <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
    )
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
    return (<div className="thesis-info">
      <div>
        <Input.Search style={{width: '400px', marginBottom: '20px'}}/>
        <a style={{marginLeft: '20px', color: 'gray'}} onClick={() => {
          ThesisStore.setArrowDir(ThesisStore.getArrowDir === 'down' ? 'up' : 'down')
          ThesisStore.setShowRetrieve(ThesisStore.getArrowDir === 'up')
        }}>高级检索 <Icon type={ThesisStore.getArrowDir} /></a>
      </div>
      {ThesisStore.getShowRetrieve && <span>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.all} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: e.target.checked,
            sci: e.target.checked,
            ei: e.target.checked,
            core: e.target.checked,
            mine: !e.target.checked
          })
        console.log(e.target.checked)
}
        }>全部期刊</Checkbox>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.sci} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: e.target.checked ? ThesisStore.getAdvancedRetrieve.all : false,
            sci: e.target.checked
          })
        }}>SCI来源期刊</Checkbox>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.ei} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: e.target.checked ? ThesisStore.getAdvancedRetrieve.all : false,
            ei: e.target.checked
          })
        }}>EI来源期刊</Checkbox>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.core} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: e.target.checked ? ThesisStore.getAdvancedRetrieve.all : false,
            core: e.target.checked
          })
        }}>核心期刊</Checkbox>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.mine} onChange={(e) => {
              ThesisStore.setAdvancedRetrieve({
                all: !e.target.checked,
                mine: e.target.checked
              })
            }}>仅查看我的</Checkbox>
      </span>}
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 3
        }}
        dataSource={listData}
        footer={<div><b>ant design</b> footer part</div>}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[RoleStore.getRoleType > 1 && <IconText type="setting" text="管理" />, RoleStore.getRoleType > 1 && <IconText type="delete" text="删除" />]}
            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a onClick={() => {
                store.router.goTo(router.ThesisDisplay, {test: 'a'})
              }}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>)
  }
}

export default ThesisInfo
