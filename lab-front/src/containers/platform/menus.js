/**
 * index Sider中的Menu
 */
import React from 'react'
import { Menu, Icon, Spin } from 'antd'
import { observer } from 'mobx-react'

import menusList from '../../stores/menu'
import store from '../../routers/store'
import router from '../../routers/router/router-all'
import '../../themes/menu.css'
import MenuStore from '../../stores/store/menu/menu-store'
import CommonStore from '../../stores/store/common/common-store'

const menuStore = new MenuStore()
const {SubMenu} = Menu
const menusMap = {}

/**
 * 当菜单被点击时,路由跳转至菜单页面
 * @param key
 */
function handleOnMenuSelect ({key}) {
  let menu = menusMap[key]
  console.log('select menu')

  menu &&
  store.router.goTo(
    router[menu.router],
    menu.routerParams && JSON.parse(menu.routerParams)
  )
}

/**
 * 渲染菜单组件
 */

@observer
export default class SiderMenu extends React.Component {
  constructor (props) {
    super(props)
    CommonStore.setNodeSpin({
      menuSpin: false
    })
    menuStore.setMenuList(menusList)
  }

  render () {
    console.log(CommonStore.getNodeSpin)
    return (
      <Spin tip={'加载中...'} spinning={CommonStore.getNodeSpin.menuSpin} size="small" style={{marginTop: '50px'}}>
        <Menu theme="dark" mode="inline" defaultOpenKeys={['01', '02', '04', '05', '06']} onSelect={handleOnMenuSelect}>
          {menuStore.getMenuList.map(menu =>
            <SubMenu key={menu.id} title={<span><Icon key={menu.id + menu.icon} type={menu.icon}/>{menu.title}</span>}>
              {menu.items.map(menu =>
                (menusMap[menu.id] = menu) &&
                <Menu.Item key={menu.id}>
                  <Icon type={menu.icon}/>
                  <span>{menu.title}</span>
                </Menu.Item>
              )}
            </SubMenu>
          )}
        </Menu></Spin>
    )
  }
}
