// @flow

import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PresentationScreenStyle'

import Reactotron from 'reactotron-react-native'

var Auth0Lock = require('react-native-lock')
var lock = new Auth0Lock({clientId: 'mSd3IB3npgzW25nGn0Ixy1SeL7V2EKKE', domain: 'simplymeasured-prod.auth0.com'})

export default class auth0Lock extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    AsyncStorage.getItem('userToken', (err, result) => {
      Reactotron.log(result)
    })
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
        AsyncStorage.multiSet([['userProfile', JSON.parse(profile)], ['userToken', JSON.parse(token)]])
      } catch (error) {
        console.tron.log(error)
      }

      fetch(`https://api.simplymeasured.com/v2/users/${profile.identities[0].userId}/assigned-permissions?include[assigned-permissions]=account&filter[accounts][is_active]=true`, {
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
      </View>
    )
  }

}

