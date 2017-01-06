// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'
// import Reactotron from 'reactotron-react-native'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import AllComponentsScreen from '../Containers/AllComponentsScreen'
import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
import LoginScreen from '../Containers/LoginScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import ListviewSectionsExample from '../Containers/ListviewSectionsExample'
import ListviewSearchingExample from '../Containers/ListviewSearchingExample'
import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import ThemeScreen from '../Containers/ThemeScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'
import Auth0Lock from '../Containers/auth0Lock'
import DataScreen from '../Containers/Data'
import GoalScreen from '../Containers/Goal'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRoute: <Scene initial key='auth0Lock' component={Auth0Lock} title='Login' navigator={navigator} />,
      mundaneRoute: <Scene initial key='goalScreen' component={GoalScreen} title='Goals' navigator={navigator} />
   }
  }

  componentWillMount() {
    let userLoggedIn = this.props.userLoggedIn;

    if (userLoggedIn) {
      this.setState({ initialRoute: <Scene initial key='goalScreen' component={GoalScreen} navigator={navigator} title='Set A Goal' /> })
      this.setState({ mundaneRoute: '' })
    }
  }

  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            {this.state.initialRoute}
            {this.state.mundaneRoute}
            <Scene key='componentExamples' component={AllComponentsScreen} title='Components' />
            <Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' rightTitle='Example' onRight={() => window.alert('Example Pressed')} />
            <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
            <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
            <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
            <Scene key='listviewSectionsExample' component={ListviewSectionsExample} title='Listview Sections' />
            <Scene key='listviewSearchingExample' component={ListviewSearchingExample} title='Listview Searching' navBar={CustomNavBar} />
            <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
            <Scene key='apiTesting' component={APITestingScreen} title='API Testing' />
            <Scene key='theme' component={ThemeScreen} title='Theme' />
            <Scene key='data' component={DataScreen} title='Data' />

            {/* Custom navigation bar example */}
            <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
