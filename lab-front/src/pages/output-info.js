import React from 'react'
import {observer} from 'mobx-react'
import {Select, Input, DatePicker, Button, Divider, Checkbox, Alert} from 'antd'
import moment from 'moment'

import '../themes/pages/export-info.css'
import DataStore from '../stores/store/result/output-info-store'
import Request from '../util/request'
import RoleStore from '../stores/store/common/role-store'

const {RangePicker} = DatePicker
const Store = new DataStore()
const dateFormat = 'YYYY-MM-DD'
const urlEnum = {
  user: '/outputUsers',
  patent: '/outputPatents',
  win: '/outputWins',
  thesis: '/outputThesis',
  prj: '/outputPrjs'
}

@observer
class OutputInfo extends React.Component {
  render() {
    return (<div className={'output'}>
      <span style={{marginRight: '10px'}}>导出信息类型：</span>
      <Select value={Store.getOutputType} style={{marginBottom: '40px'}} onSelect={(value) => {
        Store.setOutputType(value)
        Store.resetSearchValue()
      }}>
        <Select.Option value={'user'}>人员信息</Select.Option>
        <Select.Option value={'prj'}>项目信息</Select.Option>
        <Select.Option value={'thesis'}>论文信息</Select.Option>
        <Select.Option value={'win'}>获奖信息</Select.Option>
        <Select.Option value={'patent'}>专利信息</Select.Option>
      </Select>
      <Divider/>
      <div>

        {Store.getOutputType === 'user' && <div>
          <Alert message="人员信息会导出所有人员的信息" type="info" showIcon/>
        </div>}

        {Store.getOutputType === 'prj' && <div>
          <span>项目名称：</span>
          <Input style={{width: '200px', marginRight: '10px'}} value={Store.getSearchValue.prj.name} onChange={(e) => {
            Store.setSearchValue({
              prj: {
                ...Store.getSearchValue.prj,
                name: e.target.value
              }
            })
          }} placeholder={'项目名称'}/>
          <br/>
          <span>项目状态：</span>
          <Select style={{marginRight: '10px', marginTop: '20px'}} value={Store.getSearchValue.prj.status}
                  onSelect={(value) => {
                    Store.setSearchValue({
                      prj: {
                        ...Store.getSearchValue.prj,
                        status: value
                      }
                    })
                  }}>
            <Select.Option value={null}>全部</Select.Option>
            <Select.Option value='start'>已立项</Select.Option>
            <Select.Option value='done'>已验收</Select.Option>
            <Select.Option value='stop'>已截止</Select.Option>
            <Select.Option value='doing'>在研</Select.Option>
            <Select.Option value='hang'>延期</Select.Option>
          </Select>
          <br/>
          <span>负责人：</span>
          <Select style={{marginTop: '20px'}} value={Store.getSearchValue.prj.headPeople} onSelect={(value) => {
            Store.setSearchValue({
              prj: {
                ...Store.getSearchValue.prj,
                headPeople: value
              }
            })
          }}>
            <Select.Option value={null}>全部</Select.Option>
            {RoleStore.getUsers.slice().map((item) => {
              return (<Select.Option key={item.username}>{item.realName}</Select.Option>)
            })}
          </Select>
          <br/>
          <span>时间跨度：</span>
          <RangePicker disabled={!Store.getSearchValue.prj.disable} style={{marginTop: '20px'}}
                       value={[moment(Store.getSearchValue.prj.time[0], dateFormat), moment(Store.getSearchValue.prj.time[1], dateFormat)]}
                       onChange={(value, string) => {
                         console.log(value, string)
                         Store.setSearchValue({
                           prj: {
                             ...Store.getSearchValue.prj,
                             time: string
                           }

                         })
                       }}/>
          <span style={{marginLeft: '10px'}}>跨度类型：</span>
          <Select disabled={!Store.getSearchValue.prj.disable} style={{marginRight: '20px'}}
                  value={Store.getSearchValue.prj.timeType} onSelect={(value) => {
            Store.setSearchValue({
              prj: {
                ...Store.getSearchValue.prj,
                timeType: value
              }
            })
          }}>
            <Select.Option value={null}>全部时间</Select.Option>
            <Select.Option value={'start'}>立项时间</Select.Option>
            <Select.Option value={'done'}>启动时间</Select.Option>
            <Select.Option value={'stop'}>截止时间</Select.Option>
          </Select>
          <Checkbox checked={Store.getSearchValue.prj.disable} onChange={(check) => {
            Store.setSearchValue({
              prj: {
                ...Store.getSearchValue.prj,
                disable: check.target.checked
              }
            })
          }}>启用</Checkbox>
          <br/>
        </div>}

        {Store.getOutputType === 'thesis' && <div>
          <span>论文名称：</span>
          <Input style={{width: '200px', marginRight: '10px'}} value={Store.getSearchValue.thesis.name}
                 onChange={(e) => {
                   Store.setSearchValue({
                     thesis: {
                       ...Store.getSearchValue.thesis,
                       name: e.target.value
                     }
                   })
                 }} placeholder={'论文名称'}/>
          <br/>
          <span>论文作者：</span>
          <Input style={{width: '200px', marginRight: '10px', marginTop: '20px'}}
                 value={Store.getSearchValue.thesis.author} onChange={(e) => {
            Store.setSearchValue({
              thesis: {
                ...Store.getSearchValue.thesis,
                author: e.target.value
              }
            })
          }} placeholder={'论文作者'}/>
          <br/>
          <span>发布时间：</span>
          <RangePicker disabled={!Store.getSearchValue.thesis.disable}
                       style={{marginTop: '20px', marginRight: '20px'}}
                       value={[moment(Store.getSearchValue.thesis.time[0], dateFormat), moment(Store.getSearchValue.thesis.time[1], dateFormat)]}
                       onChange={(value, string) => {
                         console.log(value, string)
                         Store.setSearchValue({
                           thesis: {
                             ...Store.getSearchValue.thesis,
                             time: string
                           }

                         })
                       }}/>
          <Checkbox checked={Store.getSearchValue.thesis.disable} onChange={(check) => {
            Store.setSearchValue({
              thesis: {
                ...Store.getSearchValue.thesis,
                disable: check.target.checked
              }
            })
          }}>启用</Checkbox>
        </div>}

        {Store.getOutputType === 'win' && <div>
          <span>获奖名称：</span>
          <Input style={{width: '200px', marginRight: '10px'}} value={Store.getSearchValue.win.name} onChange={(e) => {
            Store.setSearchValue({
              win: {
                ...Store.getSearchValue.win,
                name: e.target.value
              }
            })
          }} placeholder={'项目名称'}/>
          <br/>
          <span>获奖时段：</span>
          <RangePicker disabled={!Store.getSearchValue.win.disable}
                       style={{marginTop: '20px', marginRight: '20px'}}
                       value={[moment(Store.getSearchValue.win.time[0], dateFormat), moment(Store.getSearchValue.win.time[1], dateFormat)]}
                       onChange={(value, string) => {
                         console.log(value, string)
                         Store.setSearchValue({
                           win: {
                             ...Store.getSearchValue.win,
                             time: string
                           }

                         })
                       }}/>
          <Checkbox checked={Store.getSearchValue.win.disable} onChange={(check) => {
            Store.setSearchValue({
              win: {
                ...Store.getSearchValue.win,
                disable: check.target.checked
              }
            })
          }}>启用</Checkbox>
          <br/>
          <span>获奖人员：</span>
          <Select
            mode="multiple"
            style={{width: '200px', marginTop: '20px'}}
            placeholder="选择获奖人"
            value={Store.getSearchValue.win.people.slice()}
            onChange={(value) => {
              console.log(value)
              Store.setSearchValue({
                win: {
                  ...Store.getSearchValue.win,
                  people: value
                }
              })
            }}
          >
            {RoleStore.getUsers.slice().map((item) => {
              return (<Select.Option key={item.username}>{item.realName}</Select.Option>)
            })}
          </Select>
        </div>}

        {Store.getOutputType === 'patent' && <div>
          <span>专利名称：</span>
          <Input style={{width: '200px', marginRight: '10px'}} value={Store.getSearchValue.patent.name}
                 onChange={(e) => {
                   Store.setSearchValue({
                     patent: {
                       ...Store.getSearchValue.patent,
                       name: e.target.value
                     }
                   })
                 }} placeholder={'项目名称'}/>
          <br/>
          <span>授予时段：</span>
          <RangePicker disabled={!Store.getSearchValue.patent.disable}
                       style={{marginTop: '20px', marginRight: '20px'}}
                       value={[moment(Store.getSearchValue.patent.time[0], dateFormat), moment(Store.getSearchValue.patent.time[1], dateFormat)]}
                       onChange={(value, string) => {
                         console.log(value, string)
                         Store.setSearchValue({
                           patent: {
                             ...Store.getSearchValue.patent,
                             time: string
                           }

                         })
                       }}/>
          <Checkbox checked={Store.getSearchValue.patent.disable} onChange={(check) => {
            Store.setSearchValue({
              patent: {
                ...Store.getSearchValue.patent,
                disable: check.target.checked
              }
            })
          }}>启用</Checkbox>
          <br/>
          <span>申请人员：</span>
          <Select
            mode="multiple"
            style={{width: '200px', marginTop: '20px'}}
            placeholder="选择申请人"
            value={Store.getSearchValue.patent.people.slice()}
            onChange={(value) => {
              console.log(value)
              Store.setSearchValue({
                patent: {
                  ...Store.getSearchValue.patent,
                  people: value
                }
              })
            }}
          >
            {RoleStore.getUsers.slice().map((item) => {
              return (<Select.Option key={item.username}>{item.realName}</Select.Option>)
            })}
          </Select>
        </div>}
        <Divider/>
      </div>
      <div style={{textAlign: 'right', marginTop: '60px'}}>
        <Button type={'primary'} icon={'cloud-download-o'} onClick={() => {
          let sentData = null
          let fileName = ''
          switch (Store.getOutputType) {
            case 'user':
              fileName = '人员信息.xls'
              break
            case 'patent':
              sentData = {
                name: Store.getSearchValue.patent.name,
                people: Store.getSearchValue.patent.people.slice().length > 0 ? Store.getSearchValue.patent.people.slice() : null,
                start: Store.getSearchValue.patent.disable ? new Date(Date.parse(Store.getSearchValue.patent.time[0].replace(/-/g, '/'))) : null,
                stop: Store.getSearchValue.patent.disable ? new Date(Date.parse(Store.getSearchValue.patent.time[1].replace(/-/g, '/'))) : null,
              }
              fileName = '专利信息.xls'
              break
            case 'thesis':
              sentData = {
                name: Store.getSearchValue.thesis.name,
                author: Store.getSearchValue.thesis.author,
                start: Store.getSearchValue.thesis.disable ? new Date(Date.parse(Store.getSearchValue.thesis.time[0].replace(/-/g, '/'))) : null,
                stop: Store.getSearchValue.thesis.disable ? new Date(Date.parse(Store.getSearchValue.thesis.time[1].replace(/-/g, '/'))) : null,
              }
              fileName = '论文信息.xls'
              break
            case 'win':
              sentData = {
                name: Store.getSearchValue.win.name,
                people: Store.getSearchValue.win.people.slice().length > 0 ? Store.getSearchValue.win.people.slice() : null,
                start: Store.getSearchValue.win.disable ? new Date(Date.parse(Store.getSearchValue.win.time[0].replace(/-/g, '/'))) : null,
                stop: Store.getSearchValue.win.disable ? new Date(Date.parse(Store.getSearchValue.win.time[1].replace(/-/g, '/'))) : null,
              }
              fileName = '获奖信息.xls'
                  break
            case 'prj':
              sentData = {
                name: Store.getSearchValue.prj.name,
                status: Store.getSearchValue.prj.status,
                timeType: Store.getSearchValue.prj.timeType,
                headPeople: Store.getSearchValue.prj.headPeople,
                start: Store.getSearchValue.prj.disable ? new Date(Date.parse(Store.getSearchValue.prj.time[0].replace(/-/g, '/'))) : null,
                stop: Store.getSearchValue.prj.disable ? new Date(Date.parse(Store.getSearchValue.prj.time[1].replace(/-/g, '/'))) : null,
              }
              fileName = '项目信息.docx'
          }
          Request.exportData({
            url: urlEnum[Store.getOutputType],
            sentData: sentData,
            fileName: fileName,
          })
          // window.open('/outputPatents')
        }}>开始导出</Button>
      </div>
    </div>)
  }
}

export default OutputInfo
