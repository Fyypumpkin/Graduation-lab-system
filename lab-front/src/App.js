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

const {Content, Sider} = Layout
startRouter(router, store)

@observer
class App extends Component {
    username = '测试'
    userId = 'test'
  constructor (props) {
    super(props)
    console.log('login')
    localStorage.getItem('status') === true && LoginIndexStore.setLoginStatus(true)
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
  submitFun () {
    console.log(LoginIndexStore.getUserInfo)
    if (LoginIndexStore.getUserInfo.username === 'fuyaoyao') {
      localStorage.setItem('status', true)
      LoginIndexStore.setLoginStatus(true)
      console.log('haha')
    } else {
      message.error('用户名和密码不匹配')
    }
  }
    render () {
      return (
        <Provider store={store}>
          {/* {!LoginIndexStore.getLoginStatus || !localStorage.getItem('status') */}
          { parseInt(1) === 2
            ? <div className="login">
            <Row>
              <Col span={10} offset={6}>
                <br/>
                <br/>
                <br/>
                <Form>
                  <h2>用户登录</h2>
                  <br/>
                  <p>
                    <Input type="text" name="username" className="username" placeholder="请输入用户名" value={LoginIndexStore.getUserInfo.username} onChange={this.changeUsername.bind(this)} />
                  </p>
                  <br/>
                  <p>
                    <Input type="password" name="password" className="password" placeholder="请输入用户名" value={LoginIndexStore.getUserInfo.passWd} onChange={this.changePassword.bind(this)} />
                  </p>
                  <br/>
                  <p>
                    <Checkbox name="rememeber" className="remember"/> <a>记住密码</a>
                  </p>
                  <br/>
                  <p>
                    <Button type="primary" name="submit" onClick={this.submitFun.bind(this)}>提交</Button>
                  </p>
                </Form>
              </Col>
            </Row>
          </div>
            : <Layout className="layout">

              {/* 主页头部导航 */}
              <OpHeader userName={this.username}/>

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
            </Layout>}
        </Provider>
      )
  }
}

export default App
