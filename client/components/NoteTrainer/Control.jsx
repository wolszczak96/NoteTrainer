import React from 'react'
import ScoreDisplay from './ScoreDisplay.jsx'
import AlertWrong from './AlertWrong.jsx'
import Options from './Options.jsx'

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
  else {
    display = (
    <Options
      chooseClef={props.chooseClef}
      clef={props.clef}
      chooseMaxKey={props.chooseMaxKey}
      maxKey={props.maxKey}
      chooseAccidentals={props.chooseAccidentals}
      accidentals={props.accidentals}
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
