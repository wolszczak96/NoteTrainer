import React from 'react'
import Score from './Score.jsx'

const ScoreDisplay = props =>
  <div className='score-container'>
    <Score
      value={props.scoreGood}
      scoreType='score-good'
      displayText='Good'
    />
    <Score
      value={props.scoreBad}
      scoreType='score-bad'
      displayText='Bad'
    />
  </div>

export default ScoreDisplay
