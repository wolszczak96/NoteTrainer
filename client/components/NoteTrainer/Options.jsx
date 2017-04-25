import React from 'react'
import ClefChoice from './ClefChoice.jsx'

export default class Options extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          <h4 style={{margin:0}}>Clef:</h4>
          <div className='clef-buttons'>
            <ClefChoice
              current={this.props.clef}
              clef='Treble'
              value={0}
              chooseClef={this.props.chooseClef}
              float='left'
            />
            <ClefChoice
              current={this.props.clef}
              clef='Bass'
              value={1}
              chooseClef={this.props.chooseClef}
            />
            <ClefChoice
              current={this.props.clef}
              clef='Random'
              value={undefined}
              chooseClef={this.props.chooseClef}
              float='right'
            />
          </div>
        </div>
        <div>
          <h4 style={{margin:0,display:'inline'}}>Max key signs number: </h4>
          <select value={this.props.maxKey} onChange={this.props.chooseMaxKey}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </div>
        <div>
          <input id="accidentals" type="checkbox" checked={this.props.accidentals} onChange={this.props.chooseAccidentals} /> accidentals
        </div>
      </div>
    )
  }
}
