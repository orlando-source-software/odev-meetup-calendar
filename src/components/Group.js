import React, { Component } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import theme from '../styles/group.scss'

class Group extends Component {

  constructor () {
    super()
    this.truncatedDescription = this.truncatedDescription.bind(this)
    this.photo = this.photo.bind(this)
    this.nextEvent = this.nextEvent.bind(this)
  }


  truncatedDescription () {
    let description = this.props.description
    return description.length > 280 ?
           description.substr(0, 280) + '...' : description
  }

  photo () {
    if (this.props.photo) {
      return <CardMedia aspectRatio='wide' image={this.props.photo} />
    } else {
      return null
    }
  }

  nextEvent () {
    if (this.props.nextEvent) {
      var nextEventDate = (new Date(this.props.nextEvent)).toDateString().replace(/\d{4}/,'')
      return `next event: ${nextEventDate}`
    } else {
      return  'no event scheduled'
    }
  }

  render () {
    return (
      <Card style={{ width: '31%', margin: '1%' }} >
        <CardTitle
          avatar={this.props.avatar}
          title={this.props.name}
          subtitle={this.nextEvent()} />
        {this.photo()}
        <CardText>{this.truncatedDescription()}</CardText>
        <CardActions>
          <Button
            onClick={this.props.toggleGroup}
            icon={this.props.selected ? 'star' : 'star border'}
            primary raised
            className={theme.button}
            theme={theme}
            label={`${this.props.selected ? 'Remove from' : 'Show on'} Calendar`}/>
        </CardActions>
      </Card>
    )
  }
}
export default Group
