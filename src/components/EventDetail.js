import React, { Component } from 'react'
import { Dialog } from 'react-toolbox/lib/dialog'

class EventDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: !!props.event.description,
      event: props.event
    }
  }

  componentWillReceiveProps ({ event }) {
    this.setState({
      event,
      active: !!event.description
    })
  }

  handleToggle () {
    this.setState({active: !this.state.active});
  }

  actions = [
    { label: "Close", onClick: this.handleToggle.bind(this) }
  ]

  createMarkup () {
    return { __html: this.props.event.description }
  }

  render () {
    return (
      <Dialog
        actions={this.actions}
        active={this.state.active}
        onEscKeyDown={this.handleToggle}
        onOverlayClick={this.handleToggle}
        title={this.props.event.group}
      >
        <div dangerouslySetInnerHTML={this.createMarkup()} />
      </Dialog>
    )
  }
}

export default EventDetail
