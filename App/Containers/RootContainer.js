// @flow

import React, { Component } from 'react'
import { View, StatusBar, AsyncStorage } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
  constructor() {
    super()
    this.state = { userLoggedIn: false }
  }

  componentWillMount () {
    AsyncStorage.getItem('userToken', (err, result) => {
      if (err !== null) {
      } else {
        this.setState({ userLoggedIn: true})
      }
    })
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    const userLoggedIn = this.state.userLoggedIn;
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter userLoggedIn={userLoggedIn}/>
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
