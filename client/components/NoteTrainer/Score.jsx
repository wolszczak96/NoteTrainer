import React from 'react'

const Score = props =>
  <div className={props.scoreType}>
    <div className=' score-holder'>
      {props.value}
    </div>
    <div className='score-text'>{props.displayText}</div>
  </div>

export default Score
