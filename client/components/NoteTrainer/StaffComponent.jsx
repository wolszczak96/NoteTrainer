import React from 'react'

const StaffComponent = (props) => {
  if(props.id === 'note') {
    const accidental = props.accidental ? <div className={props.accidental}></div> : undefined;
    return (
      <div className='staff-component' style={{top:props.top, left:props.left}}>
        {accidental}
        <div className='note'>
        </div>
      </div>
    )
  }
  else if(props.id === 'line') {
    return (
      <div className='staff-component' style={{top:props.top, left:props.left, paddingLeft:props.paddingLeft}}>
        <div className='line'>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className={`staff-component ${props.id}`} style={{top:props.top, left:props.left}}>
      </div>
    )
  }
}

export default StaffComponent
