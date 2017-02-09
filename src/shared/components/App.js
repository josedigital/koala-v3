import React, {Component} from 'react'
import Login from './Login'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      profile: props.route.auth.getProfile(),
    }

    // listen to profile_updated events to update internal state
    props.route.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })

  }
  render () {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth, //sends auth instance from route to children
        profile: this.state.profile
      })
    }
    return (
      <div>
        {this.state.profile.email ? children : <Login auth={this.props.route.auth} />}
      </div>
    )
  }
}

export default App
