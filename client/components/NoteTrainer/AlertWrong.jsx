import React from 'react'

const AlertWrong = props =>
  <div className='bad-choice'>
    <h4 style={{margin:0}}>Wrong!</h4>
    The correct answer is:<br/>
    {props.correctAnswer}
    <div className='button' style={{float:'right'}} onClick={props.failureHandler}>I knew it!</div>
  </div>

export default AlertWrong
