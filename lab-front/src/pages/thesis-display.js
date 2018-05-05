/**
 * @author fyypumpkin on 2018/5/4.
 */
import React from 'react'
import pdf from './test.pdf'
import {Document, Page} from 'react-pdf'
import {Icon, Input, message} from 'antd'
import {observer} from 'mobx-react'

import store from '../routers/store'
import router from '../routers/router/router-all'
import DataStore from '../stores/store/result/thesis-display-store'
import '../themes/pages/thesis-info.css'

const DisplayStore = new DataStore()

@observer
class ThesisDisplay extends React.Component {
  constructor () {
    super()
    const params = {...store.router.params}
    console.log(params)
  }
  onDocumentLoad = ({ numPages }) => {
    DisplayStore.setPdfPageInfo({numPages})
  }
  render () {
    const { pageNumber, numPages } = DisplayStore.getPageInfo
    return (<div className="thesis-info" style={{display: 'flex'}}>
      <div style={{marginTop: 'auto', marginBottom: 'auto', width: '40px', marginLeft: '20px'}}>
        {pageNumber > 1 && <Icon type="double-left" className="display-icon" style={{fontSize: '35px', cursor: 'pointer'}} onClick={() => {
          DisplayStore.setPdfPageInfo({
            pageNumber: pageNumber - 1
          })
        }}/>}
      </div>
      <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
      <Document file={pdf} onLoadSuccess = {this.onDocumentLoad}>
        <Page scale={1.1} pageNumber={pageNumber} />
      </Document>
      <p style={{textAlign: 'center'}}>第 {pageNumber} 页，共 {numPages} 页</p>
      <p style={{textAlign: 'center'}}>跳转 <Input style={{width: '50px'}} onPressEnter={(e) => {
        if (parseInt(e.target.value) > numPages || parseInt(e.target.value) < 1) {
          message.error('输入的页码有误')
        } else {
          DisplayStore.setPdfPageInfo({
            pageNumber: parseInt(e.target.value)
          })
        }
      }} /> 页</p>
      </div>
      <div style={{marginTop: 'auto', marginBottom: 'auto', width: '40px', marginRight: '20px'}}>
        {pageNumber < numPages && <Icon type="double-right" className="display-icon" style={{fontSize: '35px', cursor: 'pointer'}} onClick={() => {
          DisplayStore.setPdfPageInfo({
            pageNumber: pageNumber + 1
          })
        }} />}
      </div>
    </div>)
  }
}

export default ThesisDisplay
