/**
 * @author fyypumpkin on 2018/5/4.
 */
import React from 'react'
import {Modal, Button, List, Avatar, Icon, Input, Checkbox, message, Col, Row, Select, Upload, Alert} from 'antd'
import {observer} from 'mobx-react'

import store from '../routers/store'
import router from '../routers/router/router-all'
import '../themes/pages/thesis-info.css'
import DataStore from '../stores/store/result/thesis-info-store'
import RoleStore from '../stores/store/common/role-store'
import CommonStore from '../stores/store/common/common-store'
import Request from '../util/request'

const ThesisStore = new DataStore()

@observer
class ThesisInfo extends React.Component {
  columns = [{
    title: '论文题',
    key: 'thesisName',
    dataIndex: 'thesisName'
  }]

  constructor() {
    super()
    ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
  }

  static doQuery(searchValue, pageInfo) {
    const username = ThesisStore.getAdvancedRetrieve.mine === true ? localStorage.getItem('username') : null
    let journalType
    let journalFrom = []
    journalFrom.push('none')
    ThesisStore.getAdvancedRetrieve.sci === true && journalFrom.push('sci')
    ThesisStore.getAdvancedRetrieve.ei === true && journalFrom.push('ei')
    ThesisStore.getAdvancedRetrieve.ssci === true && journalFrom.push('ssci')
    ThesisStore.getAdvancedRetrieve.cssci === true && journalFrom.push('cssci')
    ThesisStore.getAdvancedRetrieve.core === true ? journalType = 'core' : journalType = 'nonCore'
    CommonStore.setNodeSpin({
      thesisList: true
    })
    Request.fetch({
      url: '/getThesisList',
      sentData: {
        page: pageInfo.page,
        pageSize: pageInfo.pageSize,
        username: username,
        journalType: journalType,
        journalFrom: journalFrom,
        name: searchValue.name
      },
      successFn(response) {
        if (response.data.data instanceof Array) {
          const data = response.data.data
          let listData = []
          data.map(item => {
            listData.push({
              id: item.id,
              title: item.name,
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              description: `作者: ${item.firstAuthor}, ${item.teleAuthor}`,
              content: `期刊名：${item.journalName}, 期刊来源: ${item.journalFrom}, 期刊类型: ${item.journalType}`
            })
          })
          ThesisStore.setData(listData)
        } else {
          ThesisStore.setData([])
        }
        ThesisStore.setPageInfo({
          total: response.data.pageInfo.totalNum,
          page: response.data.pageInfo.page
        })
        CommonStore.setNodeSpin({
          thesisList: false
        })
      }
    })
  }

  handleModifyThesis() {
    const data = ThesisStore.getModalData
    if (ThesisStore.getModalAttr.status === 'edit') {
      if (data.id && data.username) {
        if ((data.journalFrom !== 'none') || data.journalFrom === 'none') {
          if (data.name && data.journalType && data.journalName && data.firstAuthor && data.publishTime) {
            Request.fetch({
              url: '/modifyThesisInfo',
              sentData: {
                username: data.username,
                id: data.id,
                name: data.name,
                journalFrom: data.journalFrom,
                journalName: data.journalName,
                journalType: data.journalType,
                publishTime: data.publishTime,
                prove: data.journalFrom !== 'none' ? data.prove ? data.prove : ThesisStore.getUrl.proveUrl : null,
                firstAuthor: data.firstAuthor,
                teleAuthor: data.teleAuthor,
                journalSource: data.journalSource ? data.journalSource : ThesisStore.getUrl.sourceUrl
              },
              successFn(response) {
                message.success(ThesisStore.getModalAttr.status === 'edit' ? '修改成功' : '添加成功')
                ThesisStore.resetModal()
                ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
              }
            })
          } else {
            message.error('请检查字段是否有遗漏')
          }
        } else {
          message.error('请检查证明文件是否有遗漏')
        }
      } else {
        message.error('论文id丢失')
      }
    } else {
      if (ThesisStore.getModalAttr.status === 'create') {
        if ((data.journalFrom !== 'none' && data.proveFile) || data.journalFrom === 'none') {
          if (data.name && data.journalType && data.journalName && data.firstAuthor && data.publishTime) {
            Request.fetch({
              url: '/createThesisInfo',
              sentData: {
                username: localStorage.getItem('username'),
                id: data.id,
                name: data.name,
                journalFrom: data.journalFrom,
                journalName: data.journalName,
                journalType: data.journalType,
                publishTime: data.publishTime,
                prove: data.journalFrom !== 'none' ? ThesisStore.getUrl.proveUrl : null,
                firstAuthor: data.firstAuthor,
                teleAuthor: data.teleAuthor,
                journalSource: data.sourceFile.length > 0 ? ThesisStore.getUrl.sourceUrl : null
              },
              successFn(response) {
                ThesisStore.resetModal()
                ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
                message.success('修改成功')
              }
            })
          } else {
            message.error('请检查字段是否有遗漏')
          }
        } else {
          message.error('请检查证明文件是否有遗漏')
        }
      } else {
        message.error('未知操作')
      }
    }
  }

  render() {
    const proveProps = {
      action: '',
      headers: {
        'X-Requested-With': null
      },
      onRemove: (file) => {
        const fileList = ThesisStore.getModalData.proveFile.slice()
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        ThesisStore.setModalData({
          proveFile: newFileList
        })
      },
      beforeUpload: (file) => {
        ThesisStore.setModalData({
          proveFile: [...ThesisStore.getModalData.proveFile.slice(), file]
        })
        return false
      },
      fileList: ThesisStore.getModalData.proveFile.slice()
    }
    const sourceProps = {
      action: '',
      headers: {
        'X-Requested-With': null
      },
      onRemove: (file) => {
        const fileList = ThesisStore.getModalData.sourceFile.slice()
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        ThesisStore.setModalData({
          sourceFile: newFileList
        })
      },
      beforeUpload: (file) => {
        ThesisStore.setModalData({
          sourceFile: [...ThesisStore.getModalData.sourceFile.slice(), file]
        })
        return false
      },
      fileList: ThesisStore.getModalData.sourceFile.slice()
    }
    const IconText = ({type, text, onClick}) => (
      <span onClick={onClick}><Icon type={type} style={{marginRight: 8}}/>{text}</span>)
    return (<div className="thesis-info">
      <div>
        <Input.Search style={{width: '400px', marginBottom: '20px'}} value={ThesisStore.getSearchValue.name}
                      onChange={(e) => {
                        ThesisStore.setSearchValue({
                          name: e.target.value
                        })
                      }}
                      onSearch={() => {
                        ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
                      }}
        />
        <a style={{marginLeft: '20px', color: 'gray'}} onClick={() => {
          ThesisStore.setArrowDir(ThesisStore.getArrowDir === 'down' ? 'up' : 'down')
          ThesisStore.setShowRetrieve(ThesisStore.getArrowDir === 'up')
        }}>高级检索 <Icon type={ThesisStore.getArrowDir}/></a>
        <Button icon='plus-circle-o' style={{float: 'right'}} onClick={() => {
          ThesisStore.setModalAttr({
            visible: true,
            status: 'create'
          })
        }}>论文录入</Button>
      </div>
      {ThesisStore.getShowRetrieve && <span>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.all} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: e.target.checked,
            sci: e.target.checked,
            ei: e.target.checked,
            ssci: e.target.checked,
            cssci: e.target.checked,
            core: e.target.checked,
            mine: !e.target.checked
          })
          ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
          console.log(e.target.checked)
        }
        }>全部期刊</Checkbox>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.sci} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: e.target.checked ? ThesisStore.getAdvancedRetrieve.all : false,
            sci: e.target.checked
          })
          ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
        }}>SCI来源期刊</Checkbox>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.ei} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: e.target.checked ? ThesisStore.getAdvancedRetrieve.all : false,
            ei: e.target.checked
          })
          ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
        }}>EI来源期刊</Checkbox>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.ssci} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: e.target.checked ? ThesisStore.getAdvancedRetrieve.all : false,
            ssci: e.target.checked
          })
          ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
        }}>SSCI来源期刊</Checkbox>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.cssci} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: e.target.checked ? ThesisStore.getAdvancedRetrieve.all : false,
            cssci: e.target.checked
          })
          ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
        }}>CSSCI来源期刊</Checkbox>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.core} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: e.target.checked ? ThesisStore.getAdvancedRetrieve.all : false,
            core: e.target.checked
          })
          ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
        }}>核心期刊</Checkbox>
        <Checkbox checked={ThesisStore.getAdvancedRetrieve.mine} onChange={(e) => {
          ThesisStore.setAdvancedRetrieve({
            all: !e.target.checked,
            mine: e.target.checked
          })
          ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
        }}>仅查看我的</Checkbox>
      </span>}
      <List
        itemLayout="vertical"
        size="large"
        loading={CommonStore.getNodeSpin.thesisList}
        pagination={{
          pageSize: ThesisStore.getPageInfo.pageSize,
          total: ThesisStore.getPageInfo.total,
          currentPage: ThesisStore.getPageInfo.page,
          onChange: (page) => {
            ThesisStore.setPageInfo({
              page: page
            })
            ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
          }
        }}
        dataSource={ThesisStore.getData.slice()}
        footer={<div><b>期刊论文</b> 信息检索</div>}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[RoleStore.getRoleType > 1 && <IconText type="setting" text="管理" onClick={() => {
              ThesisStore.setModalAttr({
                visible: true,
                status: 'edit'
              })
              Request.fetch({
                url: '/getThesisInfo/' + item.id,
                successFn(response) {
                  const data = response.data.data
                  ThesisStore.setModalData({
                    id: data.id,
                    firstAuthor: data.firstAuthor,
                    teleAuthor: data.teleAuthor,
                    journalFrom: data.journalFrom,
                    journalType: data.journalType,
                    journalName: data.journalName,
                    journalSource: data.journalSource,
                    name: data.name,
                    prove: data.prove,
                    publishTime: data.publishTime,
                    username: data.username
                  })
                }
              })
            }}/>, RoleStore.getRoleType > 1 &&
            <IconText type="delete" text="删除" onClick={() => {
              Request.fetch({
                url: '/delThesisInfo/' + item.id,
                successFn(response) {
                  ThesisInfo.doQuery(ThesisStore.getSearchValue, ThesisStore.getPageInfo)
                  message.success('删除成功')
                }
              })
            }}/>]}
            extra={<img width={272} alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar}/>}
              title={<a onClick={() => {
                store.router.goTo(router.ThesisDisplay, {test: 'a'})
              }}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      <Modal
        visible={ThesisStore.getModalAttr.visible}
        title={'论文简息'}
        onCancel={() => {
          ThesisStore.resetModal()
        }}
        afterClose={() => {
          console.log('after close')
        }}
        footer={[
          <Button key="back" size="large" onClick={() => {
            ThesisStore.resetModal()
          }}>取消</Button>,
          <Button key="submit" type="primary" size="large" loading={CommonStore.getNodeSpin.userAddBtn}
                  onClick={() => {
                    this.handleModifyThesis()
                  }}>
            保存
          </Button>
        ]}
      >
        <div>
          <Row>
            <Col span={8} style={{textAlign: 'right'}}>
              <h4>论文篇名<span style={{color: 'red'}}> *</span></h4>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={ThesisStore.getModalData.name} onChange={(e) => {
                ThesisStore.setModalData({
                  name: e.target.value
                })
              }} placeholder="篇名"/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              <h4>第一作者<span style={{color: 'red'}}> *</span></h4>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={ThesisStore.getModalData.firstAuthor} onChange={(e) => {
                ThesisStore.setModalData({
                  firstAuthor: e.target.value
                })
              }} placeholder="第一作者"/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              <h4>通讯作者</h4>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={ThesisStore.getModalData.teleAuthor} onChange={(e) => {
                ThesisStore.setModalData({
                  teleAuthor: e.target.value
                })
              }} placeholder="通讯作者"/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              <h4>期刊名<span style={{color: 'red'}}> *</span></h4>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={ThesisStore.getModalData.journalName} onChange={(e) => {
                ThesisStore.setModalData({
                  journalName: e.target.value
                })
              }} placeholder="刊名"/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              <h4>发表时间<span style={{color: 'red'}}> *</span></h4>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Input value={ThesisStore.getModalData.publishTime} onChange={(e) => {
                ThesisStore.setModalData({
                  publishTime: e.target.value
                })
              }} placeholder="发表时间 格式xxxx-xx-xx"/>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              <h4>期刊类型<span style={{color: 'red'}}> *</span></h4>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Select
                style={{width: '100%'}}
                placeholder="下拉选择"
                value={ThesisStore.getModalData.journalType} onChange={(e) => {
                ThesisStore.setModalData({
                  journalType: e
                })
              }}
              >
                <Select.Option value={'core'}>核心期刊</Select.Option>
                <Select.Option value={'nonCore'}>非核心期刊</Select.Option>
              </Select>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              <h4>收入名称</h4>
            </Col>
            <Col span={12} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Select
                style={{width: '100%'}}
                placeholder="下拉选择，可为空"
                value={ThesisStore.getModalData.journalFrom}
                onChange={(value) => {
                  ThesisStore.setModalData({
                    journalFrom: value
                  })
                }}
              >
                <Select.Option value={'none'}>无</Select.Option>
                <Select.Option value={'sci'}>SCI</Select.Option>
                <Select.Option value={'ei'}>EI</Select.Option>
                <Select.Option value={'ssci'}>SSCI</Select.Option>
                <Select.Option value={'cssci'}>CSSCI</Select.Option>
              </Select>
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
              <h4>上传论文原件(pdf,doc)</h4>
            </Col>
            <Col span={8} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Upload {...sourceProps}>
                <Button type={'primary'}>点击上传</Button>
              </Upload>
            </Col>
            {ThesisStore.getModalData.journalSource && <Col span={6} style={{textAlign: 'right'}}>
              <a onClick={() => {
                window.location.href = ThesisStore.getModalData.journalSource
              }}>点击下载源文件</a>
            </Col>}
            {ThesisStore.getModalData.journalFrom !== 'none' && <Col span={8} style={{textAlign: 'right'}}>
              <h4>上传相关收入证明<span style={{color: 'red'}}> *</span></h4>
            </Col>}
            {ThesisStore.getModalData.journalFrom !== 'none' &&
            <Col span={8} style={{marginLeft: '10px', marginBottom: '10px'}}>
              <Upload {...proveProps}>
                <Button type={'primary'}>点击上传</Button>
              </Upload>
            </Col>}
            {ThesisStore.getModalData.prove && <Col span={6} style={{textAlign: 'right'}}>
              <a onClick={() => {
                window.location.href = '' + ThesisStore.getModalData.prove
              }}>下载原证明文件</a>
            </Col>}
            <Col span={20}>
              <Alert
                style={{background: 'white', border: 'none', marginLeft: '150px'}}
                message="上传论文原件可直接在列表页预览，选择性上传"
                type="info"
                showIcon
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>)
  }
}

export default ThesisInfo
