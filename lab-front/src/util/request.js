/**
 * @author fyypumpkin on 2018/5/14.
 */
import axios from 'axios'
import Reminder from './notification'
import LoginIndexStore from '../stores/store/login/login-store'
import RoleStore from '../stores/store/common/role-store'

export default class Request {
  static fetch (fetchObj) {
    let {successFn, sentData, url, handleSelf} = fetchObj
    url = 'http://' + window.location.host + url + '/'
    console.log(url)
    return axios.post(
      url,
      sentData,
      {crossDomain: true}
    ).then((response) => {
      console.log(response)
      if (response.data.code === 110110) {
        LoginIndexStore.setLoginStatus(false)
        localStorage.setItem('status', 'false')
        RoleStore.setRoleType(0)
      } else {
        if (handleSelf) {
          successFn(response)
        } else {
          if (!response.data.success) {
            Reminder.openNotification('加载失败', response.data.message, false, 'error')
          } else {
            successFn(response)
          }
        }
      }
    }).catch(function (error) {
      let errorMsg = error.toString()
      if (error.response) {
        switch (error.response.status) {
          case 502: errorMsg = '网络异常，无法请求至指定服务器'
            break
          case 504: errorMsg = '网关超时'
            break
        }
      }
      Reminder.openNotification('内部错误', errorMsg, false, 'error')
    })
  }
}
