import React from 'react'
import { Layout, Menu, Dropdown, Icon, Input } from 'antd'
import '../../App.css'
import image from '../../images/hdu.png'
import '../../themes/header.css'

const {Header} = Layout

/**
 * 下拉菜单选项内容
 * @type {XML}
 */
const menu = (
  <Menu>
    <Menu.Item key="3">
      <Icon type="logout" style={{marginRight: '10px', marginLeft: '10px'}}/>
      <a onClick={() => {
      }} style={{display: 'inline-block'}}>注销</a>
    </Menu.Item>
    <Menu.Item key="4">
      <Icon type="user" style={{marginRight: '10px', marginLeft: '10px'}}/>
      <a onClick={() => {
      }} style={{display: 'inline-block'}}>个人信息</a>
    </Menu.Item>
  </Menu>
)

function logout (name) {
  localStorage.clear()
  window.location.reload()
  // TODO 服务器登出
}

class OpHeader extends React.Component {
  render () {
    return (
      <Header className="header">
        <div className="header-div">
          <div className="logo" style={{display: 'flex'}}>
            <img style={{width: '30px', height: '30px'}} src={image}/>
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
      </Header>
    )
  }
}

export default OpHeader