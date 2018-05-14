/**
 * 按钮通知提醒
 * @author fyy on 9/7/17.
 */
import React from 'react'
import { notification, Button } from 'antd'

/**
 * 通知，通过openNotification()调用
 */
class Alert extends React.Component {
  close = () => {
  };
  openNotification = (title, message, success, type) => {
    const key = `open${Date.now()}`
    const btnClick = function () {
      notification.close(key)
    }
    const btn = (
      success
        ? <Button type="primary" size="small" onClick={btnClick}>
          确认
        </Button>
        : <Button type="danger" size="small" onClick={btnClick}>
          确认
        </Button>
    )
    notification[type]({
      message: title,
      description: message,
      btn,
      key,
      duration: success ? 2 : 5,
      onClose: this.close
    })
  }
}

export default new Alert()
