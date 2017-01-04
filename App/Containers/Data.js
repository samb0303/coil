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

import DatePicker from 'react-native-datepicker'
import moment from 'moment'

class Data extends React.Component {
  state: {
    visibleHeight: number,
    title: string,
    startDate: Date
  }

  constructor (props: Object) {
    super(props)

    this.state = {
      visibleHeight: Metrics.screenHeight,
      title: 'hey',
      data: [],
      startDate: '2016-05-15',
      endDate: '2016-06-15',
      metrics: {}
    }

    this.api = API.create()

    this.startDateChanged = this.startDateChanged.bind(this)
    this.endDateChanged = this.endDateChanged.bind(this)

    // this.getData()
  }

  componentDidMount () {
    this.getData()
  }

  getData () {
    console.tron.log(`Start Date: ${this.state.startDate}`)
    console.tron.log(`End Date: ${this.state.endDate}`)

    const filters = {
      'tz': ['America/Los_Angeles'],
      'filter': ['session.referrer_channel_type.eq(social)', 'session.referrer_channel.eq(dark_social,facebook,instagram,pinterest,twitter,youtube)', 'session.driving_domain_id.neq(38,39)'],
      'period': [`session.start_time.in(${moment(this.state.startDate).utc().format()}...${moment(this.state.endDate).utc().format()}).vs(${moment(this.state.startDate).utc().format()}...${moment(this.state.endDate).utc().format()})`],
      'metrics': ['session.duration.per(session.count).as(average_time_on_site),conversion.revenue.per(conversion.purchases_count).as(average_order_value),session.bounces_count.per(session.count).as(bounce_rate),conversion.business_value.as(business_value),conversion.count.as(goal_completions),conversion.unique_converters.per(session.unique_visits).as(goal_completion_rate),conversion.purchases_count.as(purchases),conversion.unique_purchasers.per(session.unique_visits).as(purchase_conversion_rate),conversion.items_count.per(conversion.purchases_count).as(items_per_purchase),session.pageviews.as(pageviews),conversion.revenue.as(revenue),session.count.as(visits),session.unique_pageviews.as(unique_pageviews),session.unique_pageviews.per(session.unique_visits).as(unique_pageviews_per_unique_visits),session.unique_visits.as(unique_visits)']
    }

    // 'period': [`session.start_time.in(2016-09-01T07:00:00Z...2016-10-01T07:00:00Z).vs(2016-08-02T07:00:00Z...2016-09-01T07:00:00Z)`]
    this.api['getData'](filters).then((result) => {
      this.showResult(result, 'Result')
    })
  }

  startDateChanged (date) {
    console.tron.log(`Start Date Changed ${date}`)
    this.setState({startDate: date})
    this.getData()
  }

  endDateChanged (date) {
    console.tron.log(`End Date Changed ${date}`)
    this.setState({endDate: date})
    this.getData()
  }

  showResult (response: Object, title: string = 'Response') {
    // this.refs.container.scrollTo({x: 0, y: 0, animated: true})
    if (response.ok) {
      console.tron.log(`DATA: ${FJSON.plain(response.data['data'][0])}`)

      const data = response.data['data'][0].attributes
      const metrics = data.metrics

      this.setState({ metrics: metrics })
      // this.refs.result.setState({
      //   metrics: metrics,
      //   dataValues: dataValues
      // })
    } else {
      this.refs.container.setState({result: `${response.problem} - ${response.status}`})
    }
  }

  render () {
    return (
      <ScrollView style={styles.mainContainer} ref='container'>
        <KeyboardAvoidingView behavior='position'>
          <Text> Start Date:</Text>
          <TheDatePicker ref='start-date' dateChanged={this.startDateChanged} date={this.state.startDate} />
          <Text> End Date:</Text>
          <TheDatePicker ref='end-date' dateChanged={this.endDateChanged} date={this.state.endDate} />
          <APIResult ref='result' metrics={this.state.metrics} />
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
    if (this.props.metrics) {
      // console.tron.log(`GET GOAL COMPLETIONS: ${this.state.metrics['goal_completions']}`)

      return FJSON.plain(this.props.metrics['goal_completions'])
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
    if (this.props.metrics) {
      return this.renderView()
    }

    return messageView
  }
}

export class TheDatePicker extends React.Component {

  render () {
    return (
      <DatePicker
        style={{width: 200}}
        date={this.props.date}
        mode='date'
        placeholder='select date'
        format='YYYY-MM-DD'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => { this.props.dateChanged(date) }}
      />
    )
  }
}
