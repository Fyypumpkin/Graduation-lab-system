/**
 * @author fyypumpkin on 2018/5/14.
 */
import axios from 'axios'
import Reminder from './notification'
import LoginIndexStore from '../stores/store/login/login-store'
import RoleStore from '../stores/store/common/role-store'
import CommonStore from '../stores/store/common/common-store'

export default class Request {
  static fetch(fetchObj) {
    let {successFn, sentData, url, handleSelf} = fetchObj
    url = 'http://' + window.location.host + url + '/'
    console.log(url)
    console.log(sentData)
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
          case 502:
            errorMsg = '网络异常，无法请求至指定服务器'
            break
          case 504:
            errorMsg = '网关超时'
            break
        }
      }
      CommonStore.reset()
      Reminder.openNotification('内部错误', errorMsg, false, 'error')
    })
  }

  static exportData(fetchObj) {
    let {successFn, sentData, url, fileName} = fetchObj
    url = 'http://' + window.location.host + url + '/'
    console.log(sentData, url)
    axios({
      method: 'post',
      url: url,
      data: sentData,
      responseType: 'blob' // 表明返回服务器返回的数据类型
    })
      .then((res) => { // 处理返回的文件流
        console.log(res)
        const content = res.data
        const blob = new Blob([content])
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
      .catch(function (err) {
        Reminder.openNotification('导出失败', err.toString(), false, 'error')
      })
  }
}
