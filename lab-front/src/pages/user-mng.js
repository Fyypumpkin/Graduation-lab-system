/**
 * @author fyypumpkin on 2018/5/16.
 */
import React from 'react'
import {Input, Button, Modal, List, Row, Col, Select, Alert, message} from 'antd'
import {observer} from 'mobx-react'

import RoleStore from '../stores/store/common/role-store'
import '../themes/pages/user-mng.css'
import router from '../routers/router/router-all'
import store from '../routers/store'
import CommonStore from '../stores/store/common/common-store'
import DataStore from '../stores/store/personal/user-mng-store'
import Request from '../util/request'

const UserStore = new DataStore()

@observer
class UserMng extends React.Component {
  constructor() {
    super()
    UserMng.doQuery(UserStore.getSearchValue, UserStore.getPageInfo)
  }

  handleCancel() {
    console.log('处理modal关闭取消')
    UserStore.resetModalData()
  }

  static doQuery(searchValue, pageInfo) {
    CommonStore.setNodeSpin({
      userList: true
    })
    Request.fetch({
      url: '/getUserList',
      sentData: {
        page: pageInfo.page,
        pageSize: pageInfo.pageSize,
        realName: searchValue.name
      },
      successFn(response) {
        let data = []
        response.data.data instanceof Array && response.data.data.map(item => {
          data.push({
            title: item.realName,
            phone: item.phone,
            college: item.college,
            username: item.username
          })
        })
        UserStore.setPageInfo({
          page: response.data.pageInfo.page,
          total: response.data.pageInfo.totalNum
        })
        UserStore.setData(data)
        CommonStore.setNodeSpin({
          userList: false
        })
      }
    })
  }

  render() {
    return (<div className='user-mng'>
      {RoleStore.getRoleType >= 1 ? <div>
        <Input.Search style={{width: '300px', marginBottom: '20px'}} value={UserStore.getSearchValue.name}
                      onChange={(e) => {
                        UserStore.setSearchValue({
                          name: e.target.value
                        })
                      }} onSearch={() => {
          UserMng.doQuery(UserStore.getSearchValue, UserStore.getPageInfo)
        }} placeholder='输入成员信息，回车检索'/>
        <Button icon='upload' style={{float: 'right'}} onClick={() => {
          UserStore.setModalData({
            visible: true
          })
        }}>新增成员</Button>
        <List
          pagination={{
            pageSize: UserStore.getPageInfo.pageSize,
            total: UserStore.getPageInfo.total,
            currentPage: UserStore.getPageInfo.page,
            onChange: (page) => {
              UserStore.setPageInfo({
                page: page
              })
              UserMng.doQuery(UserStore.getSearchValue, UserStore.getPageInfo)
            }
          }}
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
                description={'学院：' + item.college}
              />
              <div>{'联系方式：' + item.phone}</div>
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
                      const sentData = {
                        username: UserStore.getModalData.username,
                        realName: UserStore.getModalData.realName,
                        sex: parseInt(UserStore.getModalData.sex),
                        college: UserStore.getModalData.college,
                        phone: UserStore.getModalData.phone,
                        userType: parseInt(UserStore.getModalData.userType)
                      }
                      Request.fetch({
                        url: '/register',
                        sentData: sentData,
                        handleSelf: true,
                        successFn(response) {
                          CommonStore.setNodeSpin({
                            userAddBtn: false
                          })
                          if (response.data.success) {
                            message.success('添加成功')
                            UserStore.setModalData({
                              visible: false
                            })
                            Request.fetch({
                              url: '/getAllUserList',
                              successFn(response) {
                                RoleStore.setUsers(response.data.data)
                                const map = {}
                                response.data.data instanceof Array && response.data.data.map(item => {
                                  map[item.username] = item.realName
                                })
                                RoleStore.setUserMap(map)
                              }
                            })
                            UserMng.doQuery(UserStore.getSearchValue, UserStore.getPageInfo)
                          } else {
                            message.error(response.data.message)
                          }
                        }
                      })
                    }}>
              保存
            </Button>
          ]}
        >
          <div>
            <Row>
              <Col span={8} style={{textAlign: 'right'}}>
                <h4>用户名(用于登陆)<span style={{color: 'red'}}> *</span></h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <Input value={UserStore.getModalData.username} onChange={(e) => {
                  UserStore.setModalData({
                    username: e.target.value
                  })
                }}/>
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
                <h4>姓名<span style={{color: 'red'}}> *</span></h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <Input value={UserStore.getModalData.realName} onChange={(e) => {
                  UserStore.setModalData({
                    realName: e.target.value
                  })
                }}/>
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
                <h4>性别<span style={{color: 'red'}}> *</span></h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <Select value={UserStore.getModalData.sex} onSelect={(value) => {
                  UserStore.setModalData({
                    sex: value
                  })
                }}>
                  <Select.Option value={'1'}>男</Select.Option>
                  <Select.Option value={'2'}>女</Select.Option>
                </Select>
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
                <h4>所在学院<span style={{color: 'red'}}> *</span></h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <Input value={UserStore.getModalData.college} onChange={(e) => {
                  UserStore.setModalData({
                    college: e.target.value
                  })
                }}/>
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
                <h4>联系电话<span style={{color: 'red'}}> *</span></h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <Input value={UserStore.getModalData.phone} onChange={(e) => {
                  UserStore.setModalData({
                    phone: e.target.value
                  })
                }}/>
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
                <h4>成员类型<span style={{color: 'red'}}> *</span></h4>
              </Col>
              <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <Select value={UserStore.getModalData.userType} onSelect={(value) => {
                  UserStore.setModalData({
                    userType: value
                  })
                }}>
                  <Select.Option value={'0'}>普通成员</Select.Option>
                  {RoleStore.getRoleType >= 2 && <Select.Option value={'1'}>普通管理员</Select.Option>}
                </Select>
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
