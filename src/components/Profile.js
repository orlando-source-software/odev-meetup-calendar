import React, { Component } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button'
import base from '../config/rebase'
import { getMeetupGroups } from '../config/meetup'
import { currentMeetupToken } from '../util/meetupToken'

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
            group={group}
            toggleGroup={this.toggleGroup.bind(this, group.id)}
            selected={this.state.selectedGroups.includes(group.id)}/>)}
        </div>
      </div>
    )
  }
}

const Group = ({group, toggleGroup, selected}) => {
  let startDate = (new Date(group.created)).toDateString()
  if (group.next_event) {
    var nextEventDate = (new Date(group.next_event.time)).toDateString().replace(/\d{4}/,'')
    var nextEventName = group.next_event.name
    var nextEventRSVPs = group.next_event.yes_rsvp_count
  }
  var avatar, photo
  if (group.group_photo) {
    avatar = group.group_photo.thumb_link
  }
  if (group.key_photo) {
    photo = <CardMedia
              aspectRatio='wide'
              image={group.key_photo.photo_link} />
  }
  var description = group.plain_text_description
  description = description.length > 280 ? description.substr(0, 280) + '...' : description
  return (
    <Card style={{ width: '31%', margin: '1%' }} >
      <CardTitle
        avatar={avatar}
        title={group.name}
        subtitle={nextEventDate ? `next event: ${nextEventDate}` : 'no event scheduled'} />
      {photo}
      <CardText>{description}</CardText>
      <CardActions>
        <Button
          onClick={toggleGroup}
          icon={selected ? 'star' : 'star border'}
          primary raised
          label={selected ? 'Remove from Calendar' : 'Show on Calendar'}/>
      </CardActions>
    </Card>
  )
}
export default Profile

