import React from 'react'
import image from '../images/hdu.png'

class Welcome extends React.Component{
  render () {
    return (<div style={{paddingTop: '50px', textAlign: 'center'}}>
       <img style={{width: '600px', height: '600px', webkitFilter: 'blur(25px)'}} src={image}/>
    </div>)
  }
}
export default Welcome
