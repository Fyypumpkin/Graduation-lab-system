import React, { Component } from 'react'
import {Form, Button, Row, Col, Input, Checkbox, message, Layout} from 'antd'
import {Provider, observer} from 'mobx-react'
import store from './routers/store'
import router from './routers/router/router-all'
import {startRouter, MobxRouter} from 'mobx-router'

import OpHeader from './containers/platform/header'
import OpMenus from './containers/platform/menus'
import OpFooter from './containers/platform/footer'
import './App.css'
import Request from './util/request'
import loginbg from './images/login-bg.jpg'
import LoginIndexStore from './stores/store/login/login-store'
import RoleStore from './stores/store/common/role-store'
import menuStore from './stores/store/menu/menu-store'
import CommonStore from './stores/store/common/common-store'

const {Content, Sider} = Layout
startRouter(router, store)

@observer
class App extends Component {
  constructor (props) {
    super(props)
    const that = this
    localStorage.getItem('status') === 'true' && LoginIndexStore.setLoginStatus(true)
    Request.fetch({
      url: '/check',
      sentData: {},
      handleSelf: true,
      successFn (response) {
        if (response.data.success && response.data.data) {
          LoginIndexStore.setLoginStatus(true)
          RoleStore.setRoleType(response.data.data.role)
          RoleStore.setUsername(response.data.data.username)
          RoleStore.setRealname(response.data.data.realName)
          that.handleMenu(response.data.data.role)
          localStorage.setItem('status', 'true')
          localStorage.setItem('username', response.data.data.username)
          localStorage.setItem('role', response.data.data.role)
        } else {
          LoginIndexStore.setLoginStatus(false)
          localStorage.setItem('status', 'false')
        }
      }
    })
  }
  changeUsername (e) {
    LoginIndexStore.setUserInfo({
      username: e.target.value
    })
  }
  changePassword (e) {
    LoginIndexStore.setUserInfo({
      passWd: e.target.value
    })
  }
  handleMenu (value) {
    switch (value) {
      case 2:
            let menu = menuStore.getMenuList.slice()
            menu[0].items[1] = {id: '0202', title: '成员信息管理', icon: 'user', router: 'UserMng'}
            menu[1].items[menu[1].items.length] = {id: '0498', title: '立项', icon: 'plus-circle-o', router: 'ProjectSetup'}
            menu[1].items[menu[1].items.length] = {id: '0499', title: '项目组信息管理', icon: 'copy', router: 'ProjectGroupInfo'}
            menuStore.setMenuList(menu)
            break
      case 1:
            let menu2 = menuStore.getMenuList.slice()
            menu2[0].items[1] = {id: '0202', title: '成员信息管理', icon: 'user', router: 'UserMng'}
            menu[1].items[menu[1].items.length] = {id: '0498', title: '立项', icon: 'plus-circle-o', router: 'ProjectSetup'}
            menu2[1].items[menu[1].items.length] = {id: '0499', title: '项目组信息管理', icon: 'copy', router: 'ProjectGroupInfo'}
            menuStore.setMenuList(menu)
            break
    }
  }
  login () {
      const that = this
    CommonStore.setNodeSpin({
      login: true
    })
    Request.fetch({
      url: '/login',
      sentData: {
        username: LoginIndexStore.getUserInfo.username,
        passWd: LoginIndexStore.getUserInfo.passWd
      },
      handleSelf: true,
      successFn (response) {
        if (response.data instanceof Object && response.data.success) {
          LoginIndexStore.setLoginStatus(true)
          RoleStore.setRoleType(response.data.data.role)
          RoleStore.setUsername(response.data.data.username)
          RoleStore.setRealname(response.data.data.realName)
          localStorage.setItem('username', response.data.data.username)
          localStorage.setItem('role', response.data.data.role)
          that.handleMenu(response.data.data.role)
          localStorage.setItem('status', 'true')
          console.log(RoleStore.getRoleType)
        } else {
          LoginIndexStore.setLoginStatus(false)
          message.error(response.data.message ? response.data.message : '登录异常')
        }
        CommonStore.setNodeSpin({
          login: false
        })
      }
    })
    console.log(LoginIndexStore.getUserInfo)
    console.log(localStorage.getItem('status'))
  }
    render () {
      return (
        <Provider store={store}>
           {LoginIndexStore.getLoginStatus
            ? <Layout className="layout">

              {/* 主页头部导航 */}
              <OpHeader username={RoleStore.getRealname}/>

              <Layout style={{minHeight: '100vh'}}>
                {/* 主页左侧 menu 菜单 */}
                <Sider
                  collapsible
                  collapsedWidth="0"
                >
                  <OpMenus/>
                </Sider>

                {/* 主页右侧内容 */}
                <Content style={{margin: '24px 16px 0'}}>
                  <div className="content-layout">
                    <MobxRouter />
                  </div>

                  <Layout><OpFooter/></Layout>
                </Content>
              </Layout>
            </Layout>
             : <div>
               <img className="login-bg" src={loginbg}/>
                <div className="login">
               <Row>
                 <Col span={10} offset={6}>
                   <br/>
                   <br/>
                   <br/>
                   <Form>
                     <h2>用户登录</h2>
                     <br/>
                     <p style={{display: 'flex'}}>
                       <span style={{width: '90px'}}>用户名：</span>
                       <Input type="text" name="username" className="username" placeholder="请输入用户名" value={LoginIndexStore.getUserInfo.username} onChange={this.changeUsername.bind(this)} />
                     </p>
                     <br/>
                     <p style={{display: 'flex'}}>
                       <span style={{width: '90px'}}>密码：</span>
                       <Input type="password" name="password" className="password" placeholder="请输入用户名" value={LoginIndexStore.getUserInfo.passWd} onChange={this.changePassword.bind(this)} />
                     </p>
                     <br/>
                     <p style={{display: 'flex'}}>
                       <Button style={{marginLeft: '198px'}} type="primary" name="submit" onClick={this.login.bind(this)} loading={CommonStore.getNodeSpin.login}>登陆</Button>
                     </p>
                   </Form>
                 </Col>
               </Row>
               </div>
             </div>
           }
        </Provider>
      )
  }
}

export default App
