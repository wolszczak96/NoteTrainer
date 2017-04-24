import React from 'react'
import Panel from './Panel/Panel.jsx'
import Content from './Content.jsx'
import NoteTrainer from './NoteTrainer/NoteTrainer.jsx'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: <NoteTrainer />
    }
    this.showContent = this.showContent.bind(this)
  }

  showContent(component) {
    this.setState({
      content: component
    })
  }

  render() {
    return (
      <div>
        <Panel
          chooseContent={this.showContent}
        />
        <Content>
          {this.state.content}
        </Content>
      </div>
    )
  }
}
