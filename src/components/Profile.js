import React, { Component } from 'react'
import base from '../config/rebase'
import { getMeetupGroups } from '../config/meetup'
import { currentMeetupToken } from '../util/meetupToken'
import Group from './Group'

class Profile extends Component {

  constructor () {
    super()
    this.state = {
      availableGroups: [],
      selectedGroups: []
    }
  }

  componentDidMount () {
    getMeetupGroups(currentMeetupToken())
    .then(results => this.setState({
      availableGroups: results.data
    }))
    base.onAuth(user => {
      base.syncState(`/groups/${user.uid}`, {
        context: this,
        state: 'selectedGroups',
        asArray: true
      })
    })
  }

  toggleGroup (id) {
    if (this.state.selectedGroups.includes(id)) {
      var selectedGroups = this.state.selectedGroups.filter(groupId => groupId !== id)
    } else {
      var selectedGroups = this.state.selectedGroups.concat(id)
    }
    this.setState({ selectedGroups })
  }

  render () {
    let groups = this.state.availableGroups
    return (
      <div>
        <h1>Choose Meetup Groups to Follow</h1>
        <div style={{ display: 'flex', flexFlow: 'row wrap' }} >
          {groups.map(group => <Group
            key={group.id}
            name={group.name}
            photo={group.key_photo ? group.key_photo.photo_link : null}
            avatar={group.group_photo ? group.group_photo.thumb_link : null}
            nextEvent={group.next_event ? group.next_event.time : null}
            description={group.plain_text_description}
            toggleGroup={this.toggleGroup.bind(this, group.id)}
            selected={this.state.selectedGroups.includes(group.id)}/>)}
        </div>
      </div>
    )
  }
}

export default Profile

