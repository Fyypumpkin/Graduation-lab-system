/**
 * @author fyypumpkin on 2018/5/17.
 */
import React from 'react'
import {Button, Collapse, Row, Col, Badge, Pagination, Input, Select, Spin, Tooltip, Modal, message, Upload} from 'antd'
import {observer} from 'mobx-react'
import '../themes/pages/winning-info.css'

import DataStore from '../stores/store/result/winning-store'
import RoleStore from '../stores/store/common/role-store'
import CommonStore from '../stores/store/common/common-store'
import Request from '../util/request'

const Store = new DataStore()
const Panel = Collapse.Panel

@observer
class WinningInfo extends React.Component {
  constructor() {
    super()
    WinningInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
  }

  static doQuery(searchValue, pageInfo) {
    CommonStore.setNodeSpin({
      winning: true
    })
    Request.fetch({
      url: '/getWinList',
      sentData: {
        winName: searchValue.name,
        winRank: searchValue.rank,
        username: searchValue.winner,
        page: pageInfo.page,
        pageSize: pageInfo.pageSize
      },
      successFn(response) {
        CommonStore.setNodeSpin({
          winning: false
        })
        const data = response.data.data
        const list = []
        data instanceof Array && data.map(item => {
          const startTime = new Date(item.winTime)
          list.push({
            id: item.id,
            winner: item.username,
            winnerDesc: RoleStore.getUserMap[item.username],
            rank: item.winRank,
            inst: item.winInst,
            time: startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate(),
            name: item.winName,
            url: item.url
          })
        })
        Store.setData(list)
        Store.setPageInfo({
          page: response.data.pageInfo.page,
          total: response.data.pageInfo.totalNum,
          pageSize: response.data.pageInfo.pageSize
        })
      }
    })
  }

  componentWillUnmount() {
    Store.resetModal()
    Store.reset()
  }

  render() {
    const proveProps = {
      action: '',
      headers: {
        'X-Requested-With': null
      },
      onRemove: (file) => {
        const fileList = Store.getModalData.proveFile.slice()
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        Store.setModalData({
          proveFile: newFileList
        })
      },
      beforeUpload: (file) => {
        Store.setModalData({
          proveFile: [...Store.getModalData.proveFile.slice(), file]
        })
        return false
      },
      fileList: Store.getModalData.proveFile.slice()
    }
    return (<div className={'winning-info'}>
      <span>获奖名称</span>
      <Input style={{width: '200px', marginLeft: '10px', marginRight: '10px'}} value={Store.getSearchValue.name}
             onChange={(e) => {
               Store.setSearchValue({
                 name: e.target.value
               })
               console.log(e.target.value)
             }}
             onPressEnter={() => {
               WinningInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
             }}
             placeholder={'获奖名称'}
      />
      <span>获奖人</span>
      <Select
        showSearch
        placeholder={'获奖人'}
        defaultActiveFirstOption={false}
        style={{width: '100px', marginLeft: '10px', marginRight: '10px'}}
        showArrow={false}
        filterOption={true}
        value={Store.getSearchValue.winner}
        onSelect={(value) => {
          Store.setSearchValue({
            winner: value
          })
          WinningInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
        }}
      >
        <Select.Option value={null}>全部</Select.Option>
        {RoleStore.getUsers.slice().map((item) => {
          return (<Select.Option key={item.username}>{item.realName}</Select.Option>)
        })}
      </Select>
      <span>获奖级别</span>
      <Tooltip title="比如优秀奖，一等奖等">
        <Input style={{width: '200px', marginLeft: '10px', marginRight: '10px'}} value={Store.getSearchValue.rank}
               onChange={(e) => {
                 Store.setSearchValue({
                   rank: e.target.value
                 })
                 console.log(e.target.value)
               }}
               onPressEnter={() => {
                 WinningInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
               }}
               placeholder={'获奖级别'}
        />
      </Tooltip>
      <Button icon='search' type={'primary'} onClick={() => {
        WinningInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
      }}>查询</Button>
      {RoleStore.getRoleType >= 1 && <Button style={{float: 'right'}} icon='plus-circle-o' onClick={() => {
        Store.setModalData({
          visible: true,
          status: 'create'
        })
      }}>新增</Button>}
      <Spin spinning={CommonStore.getNodeSpin.winning}>
        <Collapse bordered={false} style={{marginTop: '20px'}} defaultActiveKey={['0','1','2','3','4','5','6','7','8','9']}>
          {Store.getData.slice().map((item, index) => {
            return (
              <Panel header={<div><Row><Col span={15}><Badge status="success"/>{item.name}</Col><Col
                span={5}>获奖人：{item.winnerDesc}</Col></Row></div>} key={index}>
                {<Row>
                  <Col span={3} style={{textAlign: 'right'}}>
                    <span>获奖名称：</span>
                  </Col>
                  <Col span={8}>
                    {item.name}
                  </Col>
                  <Col span={3} offset={2} style={{textAlign: 'right'}}>
                    <span>获奖时间：</span>
                  </Col>
                  <Col span={8}>
                    {item.time}
                  </Col>

                  <Col span={3} style={{textAlign: 'right'}}>
                    <span>授奖机构：</span>
                  </Col>
                  <Col span={8}>
                    {item.inst}
                  </Col>
                  <Col span={3} offset={2} style={{textAlign: 'right'}}>
                    <span>获奖等级：</span>
                  </Col>
                  <Col span={8}>
                    {item.rank}
                    <a style={{marginLeft: '20px'}} onClick={() => {
                      console.log(item.id)
                      Store.setModalData({
                        visible: true,
                        status: 'modify',
                        name: item.name,
                        time: item.time,
                        inst: item.inst,
                        rank: item.rank,
                        winner: item.winner,
                        url: item.url,
                        proveFile: [],
                        id: item.id
                      })
                    }}>编辑</a>
                  </Col>
                  {item.url && <Col span={3} style={{textAlign: 'right'}}>
                    <span>获奖证书：</span>
                  </Col>}
                  {item.url && <Col span={8}>
                    <a onClick={() => {
                      window.location.href = item.url
                    }}>下载</a>
                  </Col>}
                </Row>}
              </Panel>)
          })}
        </Collapse>
        <Pagination style={{textAlign: 'right', marginTop: '20px'}} current={Store.getPageInfo.page}
                    total={Store.getPageInfo.total} onChange={(page) => {
          Store.setPageInfo({
            page: page
          })
          console.log(page)
        }}/>
      </Spin>
      <Modal
        visible={Store.getModalData.visible}
        title={'获奖信息'}
        onCancel={() => {
          Store.resetModal()
          console.log(Store.getModalData)
        }}
        afterClose={() => {
          console.log('after close')
          Store.resetModal()
          CommonStore.setNodeSpin({
            winAddBtn: false
          })
        }}
        footer={[
          <Button key="back" size="large" onClick={() => Store.resetModal()}>取消</Button>,
          <Button key="submit" type="primary" size="large" loading={CommonStore.getNodeSpin.winAddBtn}
                  onClick={() => {
                    CommonStore.setNodeSpin({
                      winAddBtn: true
                    })
                    const time = new Date(Store.getModalData.time.replace(/-/g, '/'))
                    if (Store.getModalData.status === 'create') {
                      const sentData = {
                        id: null,
                        username: Store.getModalData.winner,
                        winRank: Store.getModalData.rank,
                        winInst: Store.getModalData.inst,
                        winTime: time,
                        winName: Store.getModalData.name,
                        url: Store.getModalData.proveFile.slice().length > 0 ? Store.getUrl : null
                      }
                      Request.fetch({
                        url: '/creteWin',
                        sentData: sentData,
                        handleSelf: true,
                        successFn(response) {
                          CommonStore.setNodeSpin({
                            winAddBtn: false
                          })
                          if (response.data.success) {
                            message.success('添加成功')
                            Store.setModalData({
                              visible: false
                            })
                            WinningInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
                          } else {
                            message.error('添加失败')
                          }
                        }
                      })
                    } else {
                      const sentData = {
                        id: Store.getModalData.id,
                        username: Store.getModalData.winner,
                        winRank: Store.getModalData.rank,
                        winInst: Store.getModalData.inst,
                        winTime: time,
                        winName: Store.getModalData.name,
                        url: Store.getModalData.proveFile.slice().length > 0 ? Store.getUrl : Store.getModalData.url
                      }
                      Request.fetch({
                        url: '/updateWin',
                        sentData: sentData,
                        handleSelf: true,
                        successFn(response) {
                          CommonStore.setNodeSpin({
                            winAddBtn: false
                          })
                          if (response.data.success) {
                            message.success('修改成功')
                            Store.setModalData({
                              visible: false
                            })
                            WinningInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
                          } else {
                            message.error('修改失败')
                          }
                        }
                      })
                    }
                  }}>
            保存
          </Button>
        ]}
      >
        <div>
          <Row>
            <Col span={8} style={{textAlign: 'right'}}>
              获奖名称<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={Store.getModalData.name} placeholder={'获奖名称'} onChange={(e) => {
                Store.setModalData({
                  name: e.target.value
                })
              }}/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              获奖人<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Select
                showSearch
                placeholder={'获奖人'}
                defaultActiveFirstOption={false}
                style={{width: '100px'}}
                showArrow={false}
                filterOption={true}
                value={Store.getModalData.winner}
                onSelect={(value) => {
                  Store.setModalData({
                    winner: value
                  })
                  console.log(value)
                }}
              >
                {RoleStore.getUsers.slice().map((item) => {
                  return (<Select.Option key={item.username}>{item.realName}</Select.Option>)
                })}
              </Select>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              授奖机构<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={Store.getModalData.inst} placeholder={'授奖机构'} onChange={(e) => {
                Store.setModalData({
                  inst: e.target.value
                })
              }}/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              获奖时间<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={Store.getModalData.time} placeholder={'获奖时间'} onChange={(e) => {
                Store.setModalData({
                  time: e.target.value
                })
              }}/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              获奖等级<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Tooltip title="比如优秀奖，一等奖等">
                <Input value={Store.getModalData.rank} placeholder={'获奖等级'} onChange={(e) => {
                  Store.setModalData({
                    rank: e.target.value
                  })
                }}/>
              </Tooltip>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              获奖证书
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px', display: 'flex'}}>
              <Upload {...proveProps}>
                <Button>上传</Button>
              </Upload>
              {Store.getModalData.url && <a style={{marginLeft: '20px', paddingTop: '5px'}} onClick={() => {
                window.location.href = Store.getModalData.url
              }}>下载原证书</a>}
            </Col>

          </Row>
        </div>
      </Modal>
    </div>)
  }
}

export default WinningInfo
