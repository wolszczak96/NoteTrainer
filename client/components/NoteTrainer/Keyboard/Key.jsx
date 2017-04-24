import React from 'react'

export default class Key extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: this.props.color
    }
    this.activateKey = this.activateKey.bind(this)
    this.deactivateKey = this.deactivateKey.bind(this)
    this.sendAnswer = this.sendAnswer.bind(this)
  }

  activateKey() {
    const color = this.props.keyType === 'keyBlack' ? 'activeBlack' : 'activeWhite'
    this.setState({
      color: color
    })
  }

  deactivateKey() {
    this.setState({
      color: ''
    })
  }

  sendAnswer() {
    this.props.sendAnswer(this.props.midi)
  }

  render() {
    if(this.props.keyType === 'keyBlack') {
      return (
        <div className='keyHolder' style={{left: this.props.left, top: '2px'}}>
          <div
            className={`${this.props.keyType} ${this.state.color} ${this.props.active ? '' : 'deactivated'}`}
            onClick={this.props.active ? this.sendAnswer : undefined}
            onMouseEnter={this.props.active ? this.activateKey : undefined}
            onMouseLeave={this.props.active ? this.deactivateKey : undefined}
          />
        </div>
      )
    }
    else return (
      <div
        className={`${this.props.keyType} ${this.state.color} ${this.props.active ? '' : 'deactivated'}`}
        onClick={this.props.active ? this.sendAnswer : undefined}
        onMouseEnter={this.props.active ? this.activateKey : undefined}
        onMouseLeave={this.props.active ? this.deactivateKey : undefined}
      />
    )
  }
}
