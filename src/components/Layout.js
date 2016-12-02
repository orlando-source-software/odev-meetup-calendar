import React, { Component } from 'react'
import { AppBar, Layout, NavDrawer, Panel, Button, IconButton } from 'react-toolbox'

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
      <Layout>
        <NavDrawer active={this.state.drawerActive}
                   permanentAt='xxxl'
                   onOverlayClick={ this.toggleDrawerActive }>
          <p>
            <Button label='Profile' href='/profile' />
            <Button label='Logout' href='/logout' />
            <Button label='Calendar' href='/' />
          </p>
        </NavDrawer>
        <Panel>
          <AppBar >
            <IconButton
              icon='menu'
              inverse={ true }
              onClick={ this.toggleDrawerActive }/>
            <h1>TIY Calendar App</h1>
          </AppBar>
          {this.props.children}
        </Panel>
      </Layout>
    )
  }
}

export default MyLayout
