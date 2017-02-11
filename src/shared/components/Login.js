import React, { PropTypes as T } from 'react'
import AuthService from '../../utils/AuthService'

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth, buttonText } = this.props
    return (
      <button className="button button-primary" onClick={auth.login.bind(this)}>{buttonText}</button>
    )
  }
}

export default Login
