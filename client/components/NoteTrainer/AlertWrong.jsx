import React from 'react'

const AlertWrong = props =>
  <div className='bad-choice'>
    Wrong!<br/>
    The correct answer is:<br/>
    {props.correctAnswer}<br/>
    <button onClick={props.failureHandler}>I knew it!</button>
  </div>

export default AlertWrong
