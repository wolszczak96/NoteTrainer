import React from 'react'

export default class ClefChoice extends React.Component {
  constructor(props) {
    super(props)
    this.sendChoice = this.sendChoice.bind(this)
  }

  sendChoice() {
    this.props.chooseClef(this.props.value)
  }

  render() {
    const active = this.props.current === this.props.value ? 'clef-chosen' : ''
    return (
      <div className={`button ${active}`} style={{float:this.props.float}} onClick={this.sendChoice}>{this.props.clef}</div>
    )
  }
}
