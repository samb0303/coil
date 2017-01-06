// @flow

import React from 'react'
import { View, AsyncStorage, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PresentationScreenStyle'

import Reactotron from 'reactotron-react-native'

var Auth0Lock = require('react-native-lock')
var lock = new Auth0Lock({clientId: 'YwDY9D433veMHCred7j0BESjlnwF7ry8', domain: 'simplymeasured.auth0.com'})

export default class auth0Lock extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    lock.show({
      authParams: {
        scope: 'openid profile'
      }
    }, (err, profile, token) => {
      if (err) {
        Reactotron.log(err)
        return
      }
      // Authentication worked!
      try {
        console.tron.log(`USER TOKEN: ${token.idToken}`)
        AsyncStorage.setItem('userToken', token.idToken)
      } catch (error) {
        console.tron.log(`ERROR SETTING TOKEN: ${error}`)
      }

      fetch(`https://api.staging-sm.com/v2/users/${profile.identities[0].userId}/assigned-permissions?include[assigned-permissions]=account&filter[accounts][is_active]=true`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.idToken}`
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          AsyncStorage.setItem('userAccounts', JSON.stringify(responseJson.included.map((item) => {
            let value = {
              name: item.attributes.name,
              id: item.id
            }

            return value
          })))
        })
        .then(() => Actions.goalScreen())
        .catch((error) => console.tron.log(String(error)))
    })
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            size="large"
            color="black"
          />
      </View>
    )
  }

}
