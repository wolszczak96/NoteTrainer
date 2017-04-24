import React from 'react'
import ScoreDisplay from './ScoreDisplay.jsx'
import AlertWrong from './AlertWrong.jsx'

const Control = props => {
  let display = null
  if(props.lock) {
    display = (
      <AlertWrong
        correctAnswer={props.correctAnswer}
        failureHandler={props.failureHandler}
      />
    )
  }

  return (
    <div className='control'>
      <ScoreDisplay
        scoreGood={props.scoreGood}
        scoreBad={props.scoreBad}
      />
      {display}
    </div>
  )
}

export default Control
