/**
 * @author fyypumpkin on 2018/5/3.
 */
import React from 'react'
import '../themes/pages/personal-info.css'
import {Button, Input, Alert, Select, message, Spin} from 'antd'
import {observer} from 'mobx-react'
import store from '../routers/store'
import RoleStore from '../stores/store/common/role-store'

import PersonalStore from '../stores/store/personal/personal-info-store'
import Request from '../util/request'
import CommonStore from '../stores/store/common/common-store'

const sexEnum = {
  1: '男',
  2: '女'
}

@observer
class PersonalInfo extends React.Component {
  constructor() {
    super()
    CommonStore.setNodeSpin({
      personalInfo: true
    })
    const params = {...store.router.params}
    const username = params.username ? params.username : RoleStore.getUsername ? RoleStore.getUsername : localStorage.getItem('username')
    const currentUser = localStorage.getItem('username')
    const role = RoleStore.getRoleType ? RoleStore.getRoleType : localStorage.getItem('role')
    console.log(role >= 1, role < 1, params.username !== currentUser)
    if (params.username !== undefined && params.username !== currentUser) {
      role >= 1 && Request.fetch({
        url: '/getUserInfo',
        sentData: {
          currentUser: currentUser,
          username: username,
          role: role
        },
        successFn(response) {
          PersonalStore.setPersonalInfo({
            name: response.data.data.realName,
            sex: response.data.data.sex,
            college: response.data.data.college,
            phone: response.data.data.phone
          })
          CommonStore.setNodeSpin({
            personalInfo: false
          })
        }
      })
    } else {
      role >= 1 && Request.fetch({
        url: '/getUserInfo',
        sentData: {
          currentUser: currentUser,
          username: username,
          role: role
        },
        successFn(response) {
          PersonalStore.setPersonalInfo({
            name: response.data.data.realName,
            sex: response.data.data.sex,
            college: response.data.data.college,
            phone: response.data.data.phone
          })
          CommonStore.setNodeSpin({
            personalInfo: false
          })
        }
      })
      role < 1 && Request.fetch({
        url: '/getUserInfo',
        sentData: {
          currentUser: currentUser,
          username: currentUser,
          role: role
        },
        successFn(response) {
          PersonalStore.setPersonalInfo({
            name: response.data.data.realName,
            sex: response.data.data.sex,
            college: response.data.data.college,
            phone: response.data.data.phone
          })
          CommonStore.setNodeSpin({
            personalInfo: false
          })
        }
      })
    }
  }

  render() {
    return (<div>
      <Alert
        style={{marginLeft: 'auto', marginRight: 'auto', width: '800px', marginBottom: '20px'}}
        message="其他信息只有管理员才能修改！"
        type="warning"
      />
      <Spin spinning={CommonStore.getNodeSpin.personalInfo}>
      <div className="personal-info">
        <h2 style={{display: 'flex'}}>个人信息: <Button style={{display: 'block', marginLeft: 'auto'}} shape="circle"
                                                    icon="edit" onClick={() => {
          PersonalStore.setEditable({
            info1: !PersonalStore.getEditable.info1
          })
        }}/></h2>
        <h3 className="personal-info-h2">姓名：{PersonalStore.getEditable.info1 ?
          <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.name} onChange={(e) => {
            PersonalStore.setPersonalInfo({name: e.target.value})
          }}/> : <span>{PersonalStore.getPersonalInfo.name}</span>}</h3>
        <h3 className="personal-info-h2">性别：{PersonalStore.getEditable.info1 ?
          <Select value={PersonalStore.getPersonalInfo.sex + ''} onSelect={(value) => {
            PersonalStore.setPersonalInfo({
              sex: value
            })
          }}>
            <Select.Option value={'1'}>男</Select.Option>
            <Select.Option value={'2'}>女</Select.Option>
          </Select> : <span>{sexEnum[PersonalStore.getPersonalInfo.sex]}</span>}</h3>
        <h3 className="personal-info-h2">所在学院：{PersonalStore.getEditable.info1 ?
          <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.college} onChange={(e) => {
            PersonalStore.setPersonalInfo({college: e.target.value})
          }}/> : <span>{PersonalStore.getPersonalInfo.college}</span>}</h3>
        <h3 className="personal-info-h2">联系电话：{PersonalStore.getEditable.info1 ?
          <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.phone} onChange={(e) => {
            PersonalStore.setPersonalInfo({phone: e.target.value})
          }}/> : <span>{PersonalStore.getPersonalInfo.phone}</span>}</h3>
      </div>

      <div className="personal-info" style={{marginTop: '20px'}}>
        <h2 style={{display: 'flex'}}>其他信息: {RoleStore.getRoleType > 1 &&
        <Button style={{display: 'block', marginLeft: 'auto'}} shape="circle" icon="edit" onClick={() => {
          PersonalStore.setEditable({
            info2: !PersonalStore.getEditable.info2
          })
        }}/>}</h2>
        <h3 className="personal-info-h2">所在团队：{PersonalStore.getEditable.info2 ?
          <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.team} onChange={(e) => {
            PersonalStore.setPersonalInfo({team: e.target.value})
          }}/> : <span>{PersonalStore.getPersonalInfo.team}</span>}</h3>
        <h3 className="personal-info-h2">学科方向：{PersonalStore.getEditable.info2 ?
          <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.direction} onChange={(e) => {
            PersonalStore.setPersonalInfo({direction: e.target.value})
          }}/> : <span>{PersonalStore.getPersonalInfo.direction}</span>}</h3>
        <h3 className="personal-info-h2">所在用户组：{PersonalStore.getEditable.info2 ?
          <Input style={{width: '150px'}} value={PersonalStore.getPersonalInfo.userGroup} onChange={(e) => {
            PersonalStore.setPersonalInfo({userGroup: e.target.value})
          }}/> : <span>{PersonalStore.getPersonalInfo.userGroup}</span>}</h3>
      </div>
      <div className="personal-info" style={{marginTop: '20px', display: 'flex'}}>
        {/*<a style={{marginRight: '20px', marginLeft: '30px', paddingTop: '5px'}}>查看所在项目</a>*/}
        {/*<a style={{marginRight: '20px', paddingTop: '5px'}}>查看论文</a>*/}
        {/*<a style={{marginRight: '20px', paddingTop: '5px'}}>查看著作权</a>*/}
        {/*<a style={{marginRight: '20px', paddingTop: '5px'}}>查看获奖信息</a>*/}
        {/*<a style={{paddingTop: '5px'}}>查看专利</a>*/}
        <Button type="primary" style={{display: 'block', marginLeft: 'auto'}} onClick={() => {
          const params = {...store.router.params}
          const username = params.username ? params.username : RoleStore.getUsername ? RoleStore.getUsername : localStorage.getItem('username')
          const currentUser = localStorage.getItem('username')
          const role = RoleStore.getRoleType ? RoleStore.getRoleType : localStorage.getItem('role')
          Request.fetch({
            url: '/modifyUser',
            sentData: {
              currentUser: currentUser,
              username: username,
              role: role,
              realName: PersonalStore.getPersonalInfo.name,
              college: PersonalStore.getPersonalInfo.college,
              phone: PersonalStore.getPersonalInfo.phone,
              sex: parseInt(PersonalStore.getPersonalInfo.sex)
            },
            successFn(response){
              message.success('修改成功')
            }
          })
        }}>修改</Button>
      </div>
      </Spin>
    </div>)
  }
}

export default PersonalInfo
