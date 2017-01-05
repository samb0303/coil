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

var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: 'YwDY9D433veMHCred7j0BESjlnwF7ry8', domain: 'simplymeasured.auth0.com'});

export default class auth0Lock extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      // Authentication worked!
      try {
        AsyncStorage.multiSet([['userProfile', JSON.parse(profile)], ['userToken', JSON.parse(token)]]);
      } catch (error) {
        console.tron.log(error);
      }

      fetch(`https://api.staging-sm.com/v2/users/${profile.identities[0].userId}/assigned-permissions?include[assigned-permissions]=account`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFzbmlkZXJAc2ltcGx5bWVhc3VyZWQuY29tIiwiYXBwX21ldGFkYXRhIjp7ImlzX3NtX2FkbWluIjp0cnVlLCJhcGlfYWNjZXNzIjp0cnVlfSwidXNlcl9tZXRhZGF0YSI6eyJwcm9maWxlX2ltYWdlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNTk0NjQ4Mjk4MmVjOWU5NDU3YzJmZjY5NjhjNmU5ODk_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhcy5wbmciLCJlbWFpbCI6ImFzbmlkZXJAc2ltcGx5bWVhc3VyZWQuY29tIiwiZmlyc3RfbmFtZSI6IkFsZXgg8J-SgfCfj7siLCJsYXN0X25hbWUiOiJTbmlkZXIifSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNsaWVudElEIjoiWXdEWTlENDMzdmVNSENyZWQ3ajBCRVNqbG53RjdyeTgiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMS0wNFQyMDowMjoyMC45NDRaIiwidXNlcl9pZCI6ImF1dGgwfDQ2ZGQxMzU4LTdiYjItNDNiMS1hZGNkLWFkODgwZmQwMWQzYiIsImlkZW50aXRpZXMiOlt7InVzZXJfaWQiOiI0NmRkMTM1OC03YmIyLTQzYjEtYWRjZC1hZDg4MGZkMDFkM2IiLCJwcm92aWRlciI6ImF1dGgwIiwiY29ubmVjdGlvbiI6IlVBTURCIiwiaXNTb2NpYWwiOmZhbHNlfV0sImNyZWF0ZWRfYXQiOiIyMDE2LTAzLTI4VDIyOjM3OjExLjAyN1oiLCJpc3MiOiJodHRwczovL3NpbXBseW1lYXN1cmVkLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw0NmRkMTM1OC03YmIyLTQzYjEtYWRjZC1hZDg4MGZkMDFkM2IiLCJhdWQiOiJZd0RZOUQ0MzN2ZU1IQ3JlZDdqMEJFU2psbndGN3J5OCIsImV4cCI6MTQ4NDA2MDE0MSwiaWF0IjoxNDgzNTYwMTQxfQ.klJDJBrRNOilTXvyRb8XpwpB2vdXYROEdK3QwNvzxpk'
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          AsyncStorage.setItem('userAccounts', JSON.parse(responseJson.included.map((item) => {
            return {
              name: item.attributes.name,
              id: item.id
            }
          })));
        })
        .catch((error) => console.tron.log(error))
      Actions.goalScreen();
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
