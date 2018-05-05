/**
 * @author fyypumpkin on 2018/5/4.
 */
import React from 'react'
import RoleStore from '../stores/store/common/role-store'

class AcademicMng extends React.Component {
  render () {
    return (<div>
      {RoleStore.getRoleType > 1 && <div>
        balabala
      </div>}
    </div>)
  }
}

export default AcademicMng
