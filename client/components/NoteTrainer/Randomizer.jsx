import React from 'react'
import Staff from './Staff.jsx'
import Control from './Control.jsx'
import StaffComponent from './StaffComponent.jsx'

export default class Randomizer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clef: undefined,
      maxKey: 6,
      accidentals: true,
      currentAnswerText: undefined,
      keySign: [],
      note: null,
      lines: []
    }
    this.randomizeNote = this.randomizeNote.bind(this)
    this.createKeySign = this.createKeySign.bind(this)
    this.createAdditionalLines = this.createAdditionalLines.bind(this)
    this.chooseClef = this.chooseClef.bind(this)
    this.chooseMaxKey = this.chooseMaxKey.bind(this)
    this.chooseAccidentals = this.chooseAccidentals.bind(this)
  }

  componentWillMount() {
    if(this.props.needNewNote) this.randomizeNote()
  }

  componentDidUpdate() {
    if(this.props.needNewNote) this.randomizeNote()
  }

  chooseClef(value) {
    this.setState({
      clef: value
    })
    this.props.alertChange()
  }

  chooseMaxKey(e) {
    this.setState({
      maxKey: parseInt(e.target.value)
    })
    this.props.alertChange()
  }

  chooseAccidentals(e) {
    this.setState({
      accidentals: e.target.checked
    })
    this.props.alertChange()
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  newStaffComponent(componentId, clef, xIndex, yIndex, accidental, paddingLeft) {
    const posX0 = 140
    const posY0 = clef===0 ? 170 : 270
    const left = posX0 + xIndex * 20 + 'px'
    const top = posY0 - yIndex * 10 + 'px'
    return (
      <StaffComponent
        key={Math.random()}
        id={componentId}
        left={left}
        top={top}
        accidental={accidental}
        paddingLeft={paddingLeft}
      />
    )
  }

  randomizeNote() {
    const octaves = ['contra', 'great', 'small', '1line', '2line', '3line']
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    const midiNotes = [24, 26, 28, 29, 31, 33, 35]
    const accidentals = ['dblflat', 'flat', 'natural', 'sharp', 'dblsharp']
    const key = this.random(-this.state.maxKey, this.state.maxKey)
    const clef = this.state.clef === undefined ? this.random(0, 1) : this.state.clef
    const accidentalValue = this.state.accidentals ? this.random(-1, 1) : 0
    const index = clef === 1 ? this.random(-12, 1) : this.random(-1, 12)
    const octave = Math.floor((index+21)/7)
    const cursor = (index+21)%7
    const modifiedSteps = key!==0 ? this.evaluateModifiedSteps(key) : []
    const keyModifier = modifiedSteps.includes(cursor) ? key/Math.abs(key) : 0
    const accidental = accidentals[keyModifier + accidentalValue + 2]
    const accidentalId = accidentalValue ? accidental : undefined
    const note = this.newStaffComponent('note', clef, Math.abs(key)+3, index, accidentalId)
    const keySign = this.createKeySign(key)
    const additionalLines = this.createAdditionalLines(clef, Math.abs(key)+3, index, accidentalId)
    this.props.newAnswer(midiNotes[cursor] + 12*octave + keyModifier + accidentalValue)
    this.setState({
      keySign: keySign,
      note: note,
      lines: additionalLines,
      currentAnswerText: `${notes[cursor]} ${accidental} ${octaves[octave]}`
    })
  }

  evaluateModifiedSteps(key) {
    const keyData = []
    let index = key<0 ? 55 : 3
    for(let i=0; i<Math.abs(key); i++) {
      keyData.push(index%7)
      index += (key/Math.abs(key))*4
    }
    return keyData
  }

  createKeySign(key) {
    // for flat keys:
    if(key < 0) {
      var sign = 'flat' // set accidental sign
      var index = 6 // set first key sign' index (Bb)
      var jump = 3 // 3 steps up, which is the same as 4 steps down (perfect fifth down)
      var min = 3 // set minimum index of key signs (Fb)
    }
    // for sharp keys
    else {
      var sign = 'sharp' // set accidental sign
      var index = 3 // set first key sign' index (F#)
      var jump = 4 // 4 steps up (perfect fifth up)
      var min = 5 // set minimum index of key signs (B#)
    }
    const keySign = []
    // create all key signs in both clefs
    for(var i=0; i<Math.abs(key); i++) {
      keySign.push(this.newStaffComponent(sign, 0, i, index%7<min ? index%7+7 : index%7)) // add key sign in treble clef in first octave above minimum index
      keySign.push(this.newStaffComponent(sign, 1, i, index%7<min ? index%7+7-14 : index%7-14)) // add key sign in bass clef in first octave above minimum index
      index += jump // jump to the next index
    }
    return keySign // return indexes of all notes modified by key sign
  }

  createAdditionalLines(clef, currentX, index, sign) {
    const signs = {
      sharp: '28px',
      dblsharp: '28px',
      flat: '27px',
      dblflat: '50px',
      natural: '20px'
    }
    let quantity // number of additional lines
    let start // starting index (first additional line)
    let dir // direction for showing additional lines (-1 - down; 1 - up)
    // for treble clef:
    if(clef === 0) {
      // if current note is above the staff:
      if(index >= 12) {
        quantity = Math.floor((index - 10)/2) // compute how many additional lines do we need
        start = 12
        dir = 1
      }
      // if current note is below the staff:
      else if(index <= 0) {
        quantity = Math.floor((Math.abs(index) + 2)/2) // compute how many additional lines do we need
        start = 0 // set first additional line index;
        dir = -1 // set direction
      }
    }
    // for bass clef:
    else {
      // if current note is above the staff:
      if(index >= 0) {
        quantity = Math.floor((index + 2)/2) // compute how many additional lines do we need
        start = 0 // set first additional line index;
        dir = 1 // set direction
      }
      // if current note is below the staff:
      else if(index <= -12) {
        quantity = Math.floor((Math.abs(index) - 10)/2) // compute how many additional lines do we need
        start = -12 // set first additional line index;
        dir = -1 // set direction
      }
    }
    const additionalLines = []
    // create additional lines:
    for(let i=0; i<quantity; i++) {
      additionalLines.push(this.newStaffComponent('line', clef, currentX-1, start+dir*i*2, undefined, signs[sign]))
    }
    return additionalLines
  }

  render() {
    return (
      <div>
        <Staff>
          {this.state.keySign}
          {this.state.note}
          {this.state.lines}
        </Staff>
        <Control
          requestNote={this.randomizeNote}
          scoreGood={this.props.scoreGood}
          scoreBad={this.props.scoreBad}
          lock={this.props.lock}
          correctAnswer={this.state.currentAnswerText}
          failureHandler={this.props.failureHandler}
          chooseClef={this.chooseClef}
          clef={this.state.clef}
          chooseMaxKey={this.chooseMaxKey}
          maxKey={this.state.maxKey}
          chooseAccidentals={this.chooseAccidentals}
          accidentals={this.state.accidentals}
        />
      </div>
    )
  }
}
