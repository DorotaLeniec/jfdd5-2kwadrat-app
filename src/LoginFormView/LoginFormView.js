import React from 'react'
import {connect} from 'react-redux'
import {loggedIn, loginTrying} from './LoginFormReducer/actionCreators'

import './LoginFormView.css'

const mapStateToProps = state => ({
  loggedIn: state.loggedInData.loggedInStatus,
  loggedUserId: state.loggedInData.loggedInUserId,
  loginTriesStatus: state.loggedInData.loggingTests
})

const mapDispatchToProps = dispatch => ({
  loggingIn: (userId) => dispatch(loggedIn(userId)),
  loginTrying: () => dispatch(loginTrying())
})

class LoginFormView extends React.Component {

  constructor() {
    super()

    this.state = {
      userName: '',
      userPassword: '',
      data: null,
      loggedUser: null
    }
  }

  componentWillMount() {
    fetch(
      process.env.PUBLIC_URL + '/data/users.json'
    ).then(
      response => response.json()
    ).then(
      users =>
        this.setState({
          ...this.state,
          data: users
        })
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const loggedUser = this.state.data.find(
      user =>
      user.password === this.state.userPassword && user.login === this.state.userName
    )

    loggedUser?
      fetch(
        process.env.PUBLIC_URL + '/data/user-' + loggedUser.id + '.json'
      ).then(
        response => response.json()
      ).then(
        loggedUser => {
          this.props.loggingIn(loggedUser.id)
          return (this.setState({
            ...this.state,
            loggedUser: loggedUser
          }))
        }
      ) : console.error('złe hasło') + this.props.loginTrying()
  }


  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <h1>Zaloguj się</h1>
        <form onSubmit={this.handleSubmit}>
          <inputLabel>Login:</inputLabel>

          <input type="text"
                 value={this.state.userName}
                 onChange={
                   event =>
                     this.setState({
                       userName: event.target.value
                     })
                 }
          />
          <br/>
          <br/>

          <inputLabel>Hasło:</inputLabel>

          <input type="password"
                 value={this.state.userPassword}
                 onChange={
                   event =>
                     this.setState({
                       userPassword: event.target.value
                     })
                 }
          />
          <br/>
          <br/>

          <button type="submit">Zaloguj</button>
          {
            this.props.loginTriesStatus ?
              <h4 className="login-alert">
                Podałeś zły login lub hasło.<br/>
                Spróbuj ponownie
              </h4> :
              ''
          }
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormView)