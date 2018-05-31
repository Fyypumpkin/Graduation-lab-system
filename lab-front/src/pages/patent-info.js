/**
 * @author fyypumpkin on 2018/5/17.
 */
import React from 'react'
import {Button, Select, Input, Spin, List, message, Modal, Row, Col, Upload, Popover} from 'antd'
import {observer} from 'mobx-react'

import '../themes/pages/patent-info.css'
import RoleStore from '../stores/store/common/role-store'
import DataStore from '../stores/store/result/patent-store'
import CommonStore from '../stores/store/common/common-store'
import Request from '../util/request'

const Store = new DataStore()

@observer
class PatentInfo extends React.Component {
  constructor() {
    super()
    PatentInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
  }

  static doQuery(searchValue, pageInfo) {
    CommonStore.setNodeSpin({
      patentList: true
    })
    Request.fetch({
      url: '/getPatentList',
      sentData: {
        page: pageInfo.page,
        pageSize: pageInfo.pageSize,
        name: searchValue.name,
        username: searchValue.username,
        patentNo: searchValue.patentNo,
        patentOriginNo: searchValue.patentOriginNo
      },
      successFn(response) {
        CommonStore.setNodeSpin({
          patentList: false
        })
        const data = response.data.data
        let list = []
        data instanceof Array && data.map(item => {
          list.push({
            id: item.id,
            name: item.name,
            ipc: item.ipc,
            patentOriginNo: item.patentOriginNo,
            intro: item.patentIntro,
            awardTime: new Date(item.awardTime).getFullYear() + '-' + (new Date(item.awardTime).getMonth() + 1) + '-' + new Date(item.awardTime).getDate(),
            noticeNo: item.noticeNo,
            patentNo: item.patentNo,
            url: item.url,
            username: item.username,
            applyName: RoleStore.getUserMap[item.username]
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

  render() {
    const props = {
      action: '',
      headers: {
        'X-Requested-With': null
      },
      onRemove: (file) => {
        const fileList = Store.getModalData.file.slice()
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        Store.setModalData({
          file: newFileList
        })
      },
      beforeUpload: (file) => {
        Store.setModalData({
          file: [...Store.getModalData.file.slice(), file]
        })
        return false
      },
      fileList: Store.getModalData.file.slice()
    }
    return (<div className={'patent-info'}>
      <span>专利名称</span>
      <Input style={{width: '180px', marginLeft: '10px', marginRight: '10px'}} placeholder={'专利名称'}
             value={Store.getSearchValue.name}
             onChange={(e) => {
               Store.setSearchValue({
                 name: e.target.value
               })
               console.log(e.target.value)
             }}
             onPressEnter={() => {
               PatentInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
             }}
      />
      <span>申请人</span>
      <Select
        showSearch
        placeholder={'申请人'}
        defaultActiveFirstOption={false}
        style={{width: '100px', marginLeft: '10px', marginRight: '10px'}}
        showArrow={false}
        filterOption={true}
        value={Store.getSearchValue.username}
        onSelect={(value) => {
          Store.setSearchValue({
            username: value
          })
          PatentInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
          console.log(value)
        }}
      >
        <Select.Option value={null}>全部</Select.Option>
        {RoleStore.getUsers.slice().map((item) => {
          return (<Select.Option key={item.username}>{item.realName}</Select.Option>)
        })}
      </Select>
      <span>申请号</span>
      <Input style={{width: '100px', marginLeft: '10px', marginRight: '10px'}} value={Store.getSearchValue.patentNo}
             onChange={(e) => {
               Store.setSearchValue({
                 patentNo: e.target.value
               })
               console.log(e.target.value)
             }}
             onPressEnter={() => {
               PatentInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
             }}
             placeholder={'申请号'}
      />
      <span>专利号</span>
      <Input style={{width: '100px', marginLeft: '10px', marginRight: '10px'}}
             value={Store.getSearchValue.patentOriginNo}
             onChange={(e) => {
               Store.setSearchValue({
                 patentOriginNo: e.target.value
               })
               console.log(e.target.value)
             }}
             onPressEnter={() => {
               PatentInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
             }}
             placeholder={'专利号'}
      />
      <Button icon='search' type={'primary'} onClick={() => {
        PatentInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
      }} style={{marginLeft: '20px'}}>查询</Button>
      {RoleStore.getRoleType >= 1 && <Button style={{float: 'right'}} icon='plus-circle-o' onClick={() => {
        Store.setModalData({
          visible: true,
          status: 'create'
        })
      }}>新增</Button>}

      <List
        pagination={{
          pageSize: Store.getPageInfo.pageSize,
          total: Store.getPageInfo.total,
          currentPage: Store.getPageInfo.page,
          onChange: (page) => {
            Store.setPageInfo({
              page: page
            })
            PatentInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
          }
        }}
        style={{marginTop: '20px'}}
        className="demo-loadmore-list"
        loading={CommonStore.getNodeSpin.patentList}
        itemLayout="horizontal"
        dataSource={Store.getData.slice()}
        renderItem={item => (
          <List.Item actions={[<Popover trigger="click" placement={'topRight'} content={
            <Row>
              <Col span={8} style={{textAlign: 'right'}}>
                专利名称:
              </Col>
              <Col span={14} style={{marginLeft: '10px', marginBottom: '10px'}}>
                {item.name ? item.name : '无信息'}
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
                申请号:
              </Col>
              <Col span={14} style={{marginLeft: '10px', marginBottom: '10px'}}>
                {item.patentNo ? item.patentNo : '无信息'}
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
                专利号:
              </Col>
              <Col span={14} style={{marginLeft: '10px', marginBottom: '10px'}}>
                {item.patentOriginNo ? item.patentOriginNo : '无信息'}
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
                专利公开号:
              </Col>
              <Col span={14} style={{marginLeft: '10px', marginBottom: '10px'}}>
                {item.noticeNo ? item.noticeNo : '无信息'}
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
                专利领域:
              </Col>
              <Col span={14} style={{marginLeft: '10px', marginBottom: '10px'}}>
                {item.ipc ? item.ipc : '无信息'}
              </Col>
              <Col span={8} style={{textAlign: 'right'}}>
                专利简介:
              </Col>
              <Col span={14} style={{marginLeft: '10px', marginBottom: '10px'}}>
                {item.intro ? item.intro : '无信息'}
              </Col>
              {item.url && <Col span={8} style={{textAlign: 'right'}}>
                下载专利附件:
              </Col>}
              {item.url && <Col span={14} style={{marginLeft: '10px', marginBottom: '10px'}}>
                <a onClick={() => {
                  window.location.href = item.url
                }}>点击下载</a>
              </Col>}
            </Row>
          } title="详细信息"><a>查看</a></Popover>, <a disabled={RoleStore.getRoleType < 1} onClick={() => {
            Store.setModalData({
              visible: true,
              status: 'modify',
              id: item.id,
              username: item.username,
              name: item.name,
              noticeNo: item.noticeNo,
              patentNo: item.patentNo,
              ipc: item.ipc,
              intro: item.intro,
              url: item.url,
              patentOriginNo: item.patentOriginNo,
              awardTime: item.awardTime
            })
          }}>编辑</a>]}>
            <List.Item.Meta
              title={<span>{item.name}</span>}
              description={<div style={{display: 'grid'}}>
                <span>专利名称：{item.name}</span>
                <span>专利号：{item.patentOriginNo}</span>
                <span>所在领域：{item.ipc}</span>
              </div>}
            />
            <div>{'申请人：' + item.applyName}</div>
          </List.Item>
        )}
      />

      <Modal
        visible={Store.getModalData.visible}
        title={'专利信息'}
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
                    if (Store.getModalData.status === 'create') {
                      const sentData = {
                        username: Store.getModalData.username,
                        name: Store.getModalData.name,
                        patentNo: Store.getModalData.patentNo,
                        noticeNo: Store.getModalData.noticeNo,
                        ipc: Store.getModalData.ipc,
                        patentIntro: Store.getModalData.intro,
                        patentOriginNo: Store.getModalData.patentOriginNo,
                        awardTime: new Date(Store.getModalData.awardTime.replace(/-/g, '/')),
                        url: Store.getModalData.file.length > 0 ? Store.getUrl : ''
                      }
                      console.log(sentData)
                      Request.fetch({
                        url: '/cretePatent',
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
                            PatentInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
                          } else {
                            message.error(response.data.message)
                          }
                        }
                      })
                    } else {
                      const sentData = {
                        id: Store.getModalData.id,
                        username: Store.getModalData.username,
                        name: Store.getModalData.name,
                        patentNo: Store.getModalData.patentNo,
                        noticeNo: Store.getModalData.noticeNo,
                        ipc: Store.getModalData.ipc,
                        patentIntro: Store.getModalData.intro,
                        patentOriginNo: Store.getModalData.patentOriginNo,
                        awardTime: new Date(Store.getModalData.awardTime.replace(/-/g, '/')),
                        url: Store.getModalData.url ? Store.getModalData.url : Store.getModalData.file.length > 0 ? Store.getUrl : ''
                      }
                      Request.fetch({
                        url: '/updatePatent',
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
                            PatentInfo.doQuery(Store.getSearchValue, Store.getPageInfo)
                          } else {
                            message.error(response.data.message)
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
              申请人<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Select
                showSearch
                placeholder={'申请人'}
                defaultActiveFirstOption={false}
                style={{width: '100px'}}
                showArrow={false}
                filterOption={true}
                value={Store.getModalData.username}
                onSelect={(value) => {
                  Store.setModalData({
                    username: value
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
              专利名称<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={Store.getModalData.name} placeholder={'专利名称'} onChange={(e) => {
                Store.setModalData({
                  name: e.target.value
                })
              }}/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              申请号<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={Store.getModalData.patentNo} placeholder={'申请号'} onChange={(e) => {
                Store.setModalData({
                  patentNo: e.target.value
                })
              }}/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              专利号<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={Store.getModalData.patentOriginNo} placeholder={'专利号'} onChange={(e) => {
                Store.setModalData({
                  patentOriginNo: e.target.value
                })
              }}/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              专利公开号<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={Store.getModalData.noticeNo} placeholder={'专利公开号'} onChange={(e) => {
                Store.setModalData({
                  noticeNo: e.target.value
                })
              }}/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              专利领域
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={Store.getModalData.ipc} placeholder={'专利领域'} onChange={(e) => {
                Store.setModalData({
                  ipc: e.target.value
                })
              }}/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              专利简介
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input.TextArea rows={4} value={Store.getModalData.intro} placeholder={'专利简介'} onChange={(e) => {
                Store.setModalData({
                  intro: e.target.value
                })
              }}/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              专利获取时间<span style={{color: 'red'}}> *</span>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={Store.getModalData.awardTime} placeholder={'获取时间'} onChange={(e) => {
                Store.setModalData({
                  awardTime: e.target.value
                })
              }}/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              上传专利原件
            </Col>
            <Col span={8} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Upload {...props}>
                <Button type={'primary'}>点击上传</Button>
              </Upload>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>)
  }
}

export default PatentInfo
