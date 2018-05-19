import React from 'react'
import {Layout, Menu, Dropdown, Icon, Input, Modal, Button, Form, message} from 'antd'
import {observer} from 'mobx-react'

import '../../App.css'
import image from '../../images/hdu.png'
import '../../themes/header.css'
import PersonalStore from '../../stores/store/personal/personal-info-store'
import CommonStore from '../../stores/store/common/common-store'
import store from '../../routers/store'
import router from '../../routers/router/router-all'
import Request from '../../util/request'
import LoginIndexStore from '../../stores/store/login/login-store'

const {Header} = Layout

/**
 * 下拉菜单选项内容
 * @type {XML}
 */
const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="setting" style={{marginRight: '10px', marginLeft: '10px'}}/>
      <a onClick={() => {
        PersonalStore.setModalVisible(true)
      }} style={{display: 'inline-block'}}>密码修改</a>
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="user" style={{marginRight: '10px', marginLeft: '10px'}}/>
      <a onClick={() => {
        store.router.goTo(router.PersonalInfo)
      }} style={{display: 'inline-block'}}>个人信息</a>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item key="3">
      <Icon type="logout" style={{marginRight: '10px', marginLeft: '10px'}}/>
      <a onClick={() => {
        logout()
      }} style={{display: 'inline-block'}}>注销</a>
    </Menu.Item>
  </Menu>
)

function logout(name) {
  Request.fetch({
    url: '/logout',
    sentData: {},
    handleSelf: true,
    successFn(response) {
      if (response.data instanceof Object && response.data.success) {
        LoginIndexStore.setLoginStatus(false)
        localStorage.clear()
        window.location.href = '/'
      } else {
        message.error('退出异常')
      }
    }
  })
  // TODO 服务器登出
}

function changePassWd () {
  Request.fetch({
    url: '/changePassWd',
    sentData: {
      oldPassWd: PersonalStore.getModalData.oldPassWd,
      newPassWd: PersonalStore.getModalData.newPassWd
    },
    handleSelf: true,
    successFn (response) {
      if (!response.data.success) {
        message.error(response.data.message)
      } else {
        message.success('修改成功')
        PersonalStore.setModalVisible(false)
      }
      CommonStore.setNodeSpin({
        personalBtn: false
      })
    }
  })
}

@observer
class OpHeader extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      }
    }
    return (
      <Header className="header">
        <div className="header-div">
          <div className="logo" style={{display: 'flex'}}>
            <img style={{width: '30px', height: '30px', borderRadius: '16px', background: 'white', marginTop: '4px'}}
                 src={image}/>
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="payDash">
              <a href="/" target="_self" style={{fontSize: '20px', color: '#E6A534'}}>实验室科研管理系统</a>
            </Menu.Item>

            <Dropdown overlay={menu}>
              <div className="tail-logo">
                <span style={{fontSize: '16px'}}>
                  欢迎 &nbsp;{this.props.username}
                  <Icon type="setting" style={{marginLeft: '10px', cursor: 'pointer'}}/>
                </span>
              </div>
            </Dropdown>
          </Menu>
        </div>
        <Modal
          title={'密码修改'}
          visible={PersonalStore.getModalVisible}
          onCancel={() => {
            PersonalStore.setModalVisible(false)
          }}
          afterClose={() => {
            PersonalStore.reset()
            CommonStore.reset()
          }}
          footer={[
            <Button key="back" size="large" onClick={() => {
              PersonalStore.setModalVisible(false)
            }}>取消</Button>,
            <Button loading={CommonStore.getNodeSpin.personalBtn} key="submit"
                    type="primary" size="large" onClick={() => {
              CommonStore.setNodeSpin({
                personalBtn: true
              })
              changePassWd()
            }}>
              确认修改
            </Button>
          ]}
        >

          <Form style={{marginTop: '20px'}}>
            <Form.Item label="当前密码" {...formItemLayout}>
              <Input type="password" value={PersonalStore.getModalData.oldPassWd} onChange={(e) => {
                PersonalStore.setModalData({
                  oldPassWd: e.target.value
                })
              }} placeholder='当前密码'/>
            </Form.Item>
            <Form.Item label="新密码" {...formItemLayout}>
              <Input type="password" value={PersonalStore.getModalData.newPassWd} onChange={(e) => {
                PersonalStore.setModalData({
                  newPassWd: e.target.value
                })
              }} placeholder='新密码'/>
            </Form.Item>
          </Form>

        </Modal>
      </Header>
    )
  }
}

export default OpHeader
