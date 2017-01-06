// @flow

import React from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PresentationScreenStyle'

// I18n
import I18n from 'react-native-i18n'
import Reactotron from 'reactotron-react-native'

var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: 'mSd3IB3npgzW25nGn0Ixy1SeL7V2EKKE', domain: 'simplymeasured-prod.auth0.com'});

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
        Reactotron.log(err);
        return;
      }
      // Authentication worked!
      try {
        AsyncStorage.multiSet([['userProfile', JSON.parse(profile)], ['userToken', JSON.parse(token)]]);
      } catch (error) {
        console.tron.log(error);
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
          })));
        })
        .then(() => Actions.goalScreen())
        .catch((error) => console.tron.log(String(error)))
    });
  }
  render () {
    return (
      <View style={styles.mainContainer}>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(auth0Lock)
