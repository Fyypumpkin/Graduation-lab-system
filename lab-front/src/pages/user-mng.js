/**
 * @author fyypumpkin on 2018/5/16.
 */
import React from 'react'
import {Input, Button, Modal, List, Row, Col, Select, Alert} from 'antd'
import {observer} from 'mobx-react'

import RoleStore from '../stores/store/common/role-store'
import '../themes/pages/user-mng.css'
import router from '../routers/router/router-all'
import store from '../routers/store'
import CommonStore from '../stores/store/common/common-store'
import DataStore from '../stores/store/personal/user-mng-store'

const UserStore = new DataStore()

@observer
class UserMng extends React.Component {
  handleCancel () {
    console.log('处理modal关闭取消')
    UserStore.resetModalData()
  }
  render () {
    return (<div className='user-mng'>
      {RoleStore.getRoleType >= 1 ? <div>
        <Input.Search style={{width: '300px', marginBottom: '20px'}} value={UserStore.getSearchValue.name} onChange={(e) => {
          UserStore.setSearchValue({
            name: e.target.value
          })
        }} placeholder='输入成员信息，回车检索'/>
        <Button icon='upload' style={{float: 'right'}} onClick={() => {
          UserStore.setModalData({
            visible: true
          })
        }}>新增成员</Button>
        <List
          className="demo-loadmore-list"
          loading={CommonStore.getNodeSpin.userList}
          itemLayout="horizontal"
          dataSource={UserStore.getData.slice()}
          renderItem={item => (
            <List.Item actions={[<a onClick={() => {
              store.router.goTo(router.PersonalInfo, {username: item.username})
            }}>查看</a>]}>
              <List.Item.Meta
                title={<a onClick={() => {
                  store.router.goTo(router.PersonalInfo, {username: item.username})
                }}>{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </List.Item>
          )}
        />
        <Modal
          visible={UserStore.getModalData.visible}
          title={'成员新增'}
          onCancel={() => this.handleCancel('user')}
          afterClose={() => {
            console.log('after close')
            CommonStore.setNodeSpin({
              userAddBtn: false
            })
          }}
          footer={[
            <Button key="back" size="large" onClick={() => this.handleCancel('user')}>取消</Button>,
            <Button key="submit" type="primary" size="large" loading={CommonStore.getNodeSpin.userAddBtn}
                    onClick={() => {
                      CommonStore.setNodeSpin({
                        userAddBtn: true
                      })
                    }}>
              保存
            </Button>
          ]}
        >
          <div>
            <Row>
              <Col span={8} style={{textAlign: 'right'}}>
                <h4>用户名(用于登陆)</h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <Input value={UserStore.getModalData.username} onChange={(e) => {
                  UserStore.setModalData({
                    username: e.target.value
                  })
                }}/>
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
              <h4>姓名</h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <Input value={UserStore.getModalData.realName} onChange={(e) => {
                  UserStore.setModalData({
                    realName: e.target.value
                  })
                }}/>
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
              <h4>性别</h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
               <Select value={UserStore.getModalData.sex} onSelect={(value) => {
                 UserStore.setModalData({
                   sex: value
                 })
               }}>
                 <Select.Option value={'M'}>男</Select.Option>
                 <Select.Option value={'F'}>女</Select.Option>
               </Select>
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
              <h4>所在学院</h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <Input value={UserStore.getModalData.college} onChange={(e) => {
                  UserStore.setModalData({
                    college: e.target.value
                  })
                }}/>
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
              <h4>联系电话</h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <Input value={UserStore.getModalData.phone} onChange={(e) => {
                  UserStore.setModalData({
                    phone: e.target.value
                  })
                }}/>
              </Col>
              <Col span={20}>
                <Alert
                  style={{background: 'white', border: 'none', marginLeft: '150px'}}
                  message="初始密码123456"
                  type="info"
                  showIcon
                />
              </Col>
            </Row>
          </div>
        </Modal>
      </div> : <div style={{textAlign: 'center'}}><span style={{fontSize: '30px'}}>您没有权利访问</span></div>}
    </div>)
  }
}

export default UserMng