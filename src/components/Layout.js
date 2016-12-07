import React, { Component } from 'react'
import { AppBar, Layout, NavDrawer, Panel, Button, IconButton } from 'react-toolbox'
import theme from '../theme.scss'

const ThemedLayout = (props) => (
  <Layout {...props} theme={theme} />
)

class MyLayout extends Component {

  constructor () {
    super()
    this.state = {
      drawerActive: false
    }
    this.toggleDrawerActive = this.toggleDrawerActive.bind(this)
  }

  toggleDrawerActive () {
    this.setState({
      drawerActive: !this.state.drawerActive
    })
  }

  render () {
    return (
      <ThemedLayout>
        <NavDrawer active={this.state.drawerActive}
                     permanentAt='xxxl'
                     onOverlayClick={ this.toggleDrawerActive }>
          <ul>
            <li><Button
                icon='date_range'
                label='Calendar'
                primary inverse raised
                href='/' /></li>
            <li><Button
                icon='account_circle'
                label='Profile'
                href='/profile' /></li>
            <li><Button
                icon='power_settings_new'
                label='Logout'
                inverse raised
                href='/logout' /></li>
          </ul>
        </NavDrawer>
        <Panel>
          <AppBar fixed>
            <IconButton
              icon='menu'
              inverse={ true }
              onClick={ this.toggleDrawerActive }/>
            <h1>Orlando Developer Meetups</h1>
          </AppBar>
          {this.props.children}
        </Panel>
      </ThemedLayout>
    )
  }
}

export default MyLayout
