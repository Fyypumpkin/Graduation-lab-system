/**
 * @author fyypumpkin on 2018/5/3.
 */
import React from 'react'
import '../themes/pages/personal-info.css'
import {Button, Input, Alert} from 'antd'
import {observer} from 'mobx-react'
import store from '../routers/store'
import RoleStore from '../stores/store/common/role-store'

import PersonalStore from '../stores/store/personal/personal-info-store'
import Request from '../util/request'

@observer
class PersonalInfo extends React.Component {
  constructor () {
    super()
    console.log('constructor')
  }
  componentDidMount () {
    console.log('mount')
    const params = {...store.router.params}
    const username = params.username ? params.username : RoleStore.getUsername ? RoleStore.getUsername : localStorage.getItem('username')
    console.log(username)
    Request.fetch({
      url: '/getPersonalInfo',
      sentData: {
        current: RoleStore.getUsername,
        username: username,
        role: RoleStore.getRoleType
      },
      successFn (response) {
      // TODO 处理用户数据
      }
})
  }
  render () {
    console.log(RoleStore.getUsername)
    return (<div>
      <Alert
        style={{marginLeft: 'auto', marginRight: 'auto', width: '800px', marginBottom: '20px'}}
        message="其他信息只有管理员才能修改！"
        type="warning"
      />
      <div className="personal-info">
        <h2 style={{display: 'flex'}}>个人信息:  <Button style={{display: 'block', marginLeft: 'auto'}} shape="circle" icon="edit" onClick={() => {
        PersonalStore.setEditable({
          info1: !PersonalStore.getEditable.info1
        })
      }} /></h2>
        <h3 className="personal-info-h2">姓名：{PersonalStore.getEditable.info1 ? <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.name} onChange={(e) => {
      PersonalStore.setPersonalInfo({name: e.target.value})
      }}/> : <span>{PersonalStore.getPersonalInfo.name}</span>}</h3>
        <h3 className="personal-info-h2">性别：{PersonalStore.getEditable.info1 ? <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.sex} onChange={(e) => {
        PersonalStore.setPersonalInfo({sex: e.target.value})
      }}/> : <span>{PersonalStore.getPersonalInfo.sex}</span>}</h3>
       <h3 className="personal-info-h2">所在学院：{PersonalStore.getEditable.info1 ? <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.college} onChange={(e) => {
        PersonalStore.setPersonalInfo({college: e.target.value})
      }}/> : <span>{PersonalStore.getPersonalInfo.college}</span>}</h3>
       <h3 className="personal-info-h2">联系电话：{PersonalStore.getEditable.info1 ? <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.phone} onChange={(e) => {
        PersonalStore.setPersonalInfo({phone: e.target.value})
      }}/> : <span>{PersonalStore.getPersonalInfo.phone}</span>}</h3>
      </div>

      <div className="personal-info" style={{marginTop: '20px'}}>
        <h2 style={{display: 'flex'}}>其他信息: {RoleStore.getRoleType > 1 && <Button style={{display: 'block', marginLeft: 'auto'}} shape="circle" icon="edit" onClick={() => {
          PersonalStore.setEditable({
            info2: !PersonalStore.getEditable.info2
          })
        }} />}</h2>
        <h3 className="personal-info-h2">所在团队：{PersonalStore.getEditable.info2 ? <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.team} onChange={(e) => {
          PersonalStore.setPersonalInfo({team: e.target.value})
        }}/> : <span>{PersonalStore.getPersonalInfo.team}</span>}</h3>
        <h3 className="personal-info-h2">学科方向：{PersonalStore.getEditable.info2 ? <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.direction} onChange={(e) => {
          PersonalStore.setPersonalInfo({direction: e.target.value})
        }}/> : <span>{PersonalStore.getPersonalInfo.direction}</span>}</h3>
        <h3 className="personal-info-h2">所在用户组：{PersonalStore.getEditable.info2 ? <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.userGroup} onChange={(e) => {
          PersonalStore.setPersonalInfo({userGroup: e.target.value})
        }}/> : <span>{PersonalStore.getPersonalInfo.userGroup}</span>}</h3>
      </div>
      <div className="personal-info" style={{marginTop: '20px', display: 'flex'}}>
        <a style={{marginRight: '20px', marginLeft: '30px', paddingTop: '5px'}}>查看所在项目</a>
        <a style={{marginRight: '20px', paddingTop: '5px'}}>查看论文</a>
        <a style={{marginRight: '20px', paddingTop: '5px'}}>查看著作权</a>
        <a style={{marginRight: '20px', paddingTop: '5px'}}>查看获奖信息</a>
        <a style={{paddingTop: '5px'}}>查看专利</a>
      <Button type="primary" style={{display: 'block', marginLeft: 'auto'}} onClick={() => {
        alert('修改按钮')
      }}>确认修改</Button>
      </div>
    </div>)
  }
}

export default PersonalInfo
