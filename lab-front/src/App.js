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

import LoginIndexStore from './stores/store/login/login-store'
import loginbg from './images/login-bg.jpg'

const {Content, Sider} = Layout
startRouter(router, store)

@observer
class App extends Component {
    username = '测试'
    userId = 'test'
  constructor (props) {
    super(props)
    console.log('login')
    localStorage.getItem('status') === 'true' && LoginIndexStore.setLoginStatus(true)
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
  login () {
      // TODO 服务器登陆
    console.log(LoginIndexStore.getUserInfo)
    console.log(localStorage.getItem('status'))
    if (LoginIndexStore.getUserInfo.username === 'fuyaoyao') {
      localStorage.setItem('status', 'true')
      LoginIndexStore.setLoginStatus(true)
    } else {
      message.error('用户名和密码不匹配')
    }
  }
    render () {
      return (
        <Provider store={store}>
           {LoginIndexStore.getLoginStatus
            ? <Layout className="layout">

              {/* 主页头部导航 */}
              <OpHeader username={this.username}/>

              <Layout style={{minHeight: '100vh'}}>
                {/* 主页左侧 menu 菜单 */}
                <Sider
                  collapsible
                  collapsedWidth="0"
                >{
                  this.userId.length > 0 && <OpMenus userId={this.userId}/>
                }
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
                       <Button style={{marginLeft: '198px'}} type="primary" name="submit" onClick={this.login.bind(this)}>登陆</Button>
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
