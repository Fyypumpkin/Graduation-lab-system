/**
 * @author fyy on 2/1/18.
 */
import { observable, action } from 'mobx'

class MenuStore {
  @observable menuList = []

  @action.bound
  setMenuList (menuList) {
    this.menuList = menuList
  }

  get getMenuList () {
    return this.menuList
  }
}

export default MenuStore
