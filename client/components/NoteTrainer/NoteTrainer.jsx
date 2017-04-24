import React from 'react'
import Randomizer from './Randomizer.jsx'
import Keyboard from './Keyboard/Keyboard.jsx'

export default class NoteTrainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answerTool: 'keyboard',
      currentAnswer: undefined,
      scoreGood: 0,
      scoreBad: 0,
      needNewNote: true,
      lock: false
    }
    this.setAnswer = this.setAnswer.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)
    this.failureHandler = this.failureHandler.bind(this)
  }

  setAnswer(midiValue) {
    this.setState({
      currentAnswer: midiValue,
      needNewNote: false
    })
  }

  checkAnswer(answer) {
    if(this.state.currentAnswer === answer) {
      const newScore = this.state.scoreGood+1
      this.setState({
        scoreGood: newScore,
        needNewNote: true
      })
    }
    else {
      const newScore = this.state.scoreBad+1
      this.setState({
        scoreBad: newScore,
        lock: true,
        lastAnswer: answer
      })
    }
  }

  failureHandler() {
    this.setState({
      lock: false,
      needNewNote: true
    })
  }

  render() {
    let answerTool = undefined
    switch(this.state.answerTool) {
      case 'keyboard':
        answerTool = (
          <Keyboard
            active={!this.state.lock}
            sendAnswer={this.checkAnswer}
            correct={this.state.currentAnswer}
            wrong={this.state.lastAnswer}
          />
        )
        break;
    }
    return (
      <div>
        <Randomizer
          newAnswer={this.setAnswer}
          scoreGood={this.state.scoreGood}
          scoreBad={this.state.scoreBad}
          needNewNote={this.state.needNewNote}
          lock={this.state.lock}
          failureHandler={this.failureHandler}
        />
        {answerTool}
      </div>
    )
  }
}
