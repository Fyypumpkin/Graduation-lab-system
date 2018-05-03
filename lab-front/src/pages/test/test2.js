/**
 * @author fyypumpkin on 2018/5/1.
 */
import React from 'react'
import CommonStore from '../../stores/store/common/common-store'

class Test2 extends React.Component {
  render () {
    return (
      <div>
        <button onClick={() => {
          CommonStore.setNodeSpin({
            test: true,
            menuSpin: true,
            personalBtn: true
          })
        }}>测试</button>
      </div>
    )
  }
}
export default Test2
