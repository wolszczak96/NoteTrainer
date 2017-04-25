import React from 'react'
import Panel from './Panel/Panel.jsx'
import Content from './Content.jsx'
import NoteTrainer from './NoteTrainer/NoteTrainer.jsx'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: 'notetrainer'
    }
    this.showContent = this.showContent.bind(this)
  }

  showContent(component) {
    this.setState({
      content: component
    })
  }

  render() {
    let content = undefined
    switch(this.state.content) {
      case 'notetrainer':
        content = (
          <NoteTrainer />
        )
    }
    return (
      <div>
        <Panel
          chooseContent={this.showContent}
        />
        <Content>
          {content}
        </Content>
      </div>
    )
  }
}
