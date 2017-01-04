// @flow

import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
// import Icon from 'react-native-vector-icons/FontAwesome'
// import Animatable from 'react-native-animatable'
// import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/DataStyle'

// I18n
// import I18n from 'react-native-i18n'

import API from '../Services/Api'
import FJSON from 'format-json'

class Data extends React.Component {
  state: {
    visibleHeight: number,
    title: string,
    data: Object
  }

  constructor (props: Object) {
    super(props)

    this.state = {
      visibleHeight: Metrics.screenHeight,
      title: 'hey',
      data: []
    }

    this.api = API.create()

    // this.getData()
  }

  componentDidMount () {
    this.getData()
  }

  getData () {
    this.api['getData'].apply(this, ['']).then((result) => {
      this.showResult(result, 'Result')
    })
  }

  showResult (response: Object, title: string = 'Response') {
    // this.refs.container.scrollTo({x: 0, y: 0, animated: true})
    if (response.ok) {
      console.tron.log(`DATA: ${FJSON.plain(response.data['data'][0])}`)

      const data = response.data['data'][0].attributes
      const metrics = data.metrics
      const dataValues = response.data['data'][1]

      this.refs.result.setState({
        metrics: metrics,
        dataValues: dataValues
      })
    } else {
      this.refs.container.setState({result: `${response.problem} - ${response.status}`})
    }
  }

  render () {
    return (
      <ScrollView style={styles.mainContainer} ref='container'>
        <KeyboardAvoidingView behavior='position'>
          <APIResult ref='result' />
        </KeyboardAvoidingView>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Data)

class APIResult extends React.Component {

  // state: {
  //   result: Array,
  // }

  constructor (props) {
    super(props)
    this.state = {
      goalCompletions: Object
    }
  }

  getGoalCompletions () {
    if (this.state.metrics) {
      // console.tron.log(`GET GOAL COMPLETIONS: ${this.state.metrics['goal_completions']}`)

      return FJSON.plain(this.state.metrics['goal_completions'])
    }
  }

  renderView () {
    return (
      <Text style={{fontFamily: 'CourierNewPS-BoldMT', fontSize: 10}}>
        Goal Completions {this.getGoalCompletions()}
      </Text>
    )
  }

  render () {
    let messageView = null
    if (this.state.metrics) {
      return this.renderView()
    }

    return messageView
  }
}
