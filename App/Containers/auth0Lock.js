// @flow

import React from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView } from 'react-native'
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

  componentWillMount() {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      // Authentication worked!
      console.log('Logged in with Auth0!');
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
