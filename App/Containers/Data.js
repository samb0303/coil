// @flow

import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics, Colors } from '../Themes'
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
import update from 'immutability-helper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FormattedNumber, FormattedCurrency } from 'react-native-globalize'
import numeral from 'numeral'

class Data extends React.Component {
  state: {
    visibleHeight: number,
    title: string
  }

  constructor (props: Object) {
    super(props)

    const endDate = moment()
    const startDate = endDate.clone().subtract(1, 'month')
    const diff = endDate.diff(startDate, 'days')

    const comparisonStartDate = startDate.clone().subtract(diff, 'days')
    const comparisonEndDate = endDate.clone().subtract(diff, 'days')

    this.state = {
      visibleHeight: Metrics.screenHeight,
      title: 'hey',
      data: [],
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      comparisonStartDate: comparisonStartDate.format('YYYY-MM-DD'),
      comparisonEndDate: comparisonEndDate.format('YYYY-MM-DD'),
      metrics: {},
      channelMetrics: {},
      deltaPercentages: {}
    }

    this.api = API.create()

    this.startDateChanged = this.startDateChanged.bind(this)
    this.endDateChanged = this.endDateChanged.bind(this)
    this.getComparisonDates = this.getComparisonDates.bind(this)
  }

  componentDidMount () {
    // this.setComparisonDates()
    this.getData()
    this.getChannelData()
  }

  getData () {
    // console.tron.log(`Get Data Start Date: ${this.state.startDate}`)
    // console.tron.log(`End Date: ${this.state.endDate}`)

    const filters = {
      'tz': ['America/Los_Angeles'],
      'filter': ['session.referrer_channel_type.eq(social)', 'session.referrer_channel.eq(dark_social,facebook,instagram,pinterest,twitter,youtube)', 'session.driving_domain_id.neq(38,39)'],
      'period': [`session.start_time.in(${moment(this.state.startDate).utc().format()}...${moment(this.state.endDate).utc().format()}).vs(${moment(this.state.comparisonStartDate).utc().format()}...${moment(this.state.comparisonEndDate).utc().format()})`],
      'metrics': ['session.duration.per(session.count).as(average_time_on_site),conversion.revenue.per(conversion.purchases_count).as(average_order_value),session.bounces_count.per(session.count).as(bounce_rate),conversion.business_value.as(business_value),conversion.count.as(goal_completions),conversion.unique_converters.per(session.unique_visits).as(goal_completion_rate),conversion.purchases_count.as(purchases),conversion.unique_purchasers.per(session.unique_visits).as(purchase_conversion_rate),conversion.items_count.per(conversion.purchases_count).as(items_per_purchase),session.pageviews.as(pageviews),conversion.revenue.as(revenue),session.count.as(visits),session.unique_pageviews.as(unique_pageviews),session.unique_pageviews.per(session.unique_visits).as(unique_pageviews_per_unique_visits),session.unique_visits.as(unique_visits)']
    }

    // 'period': [`session.start_time.in(2016-09-01T07:00:00Z...2016-10-01T07:00:00Z).vs(2016-08-02T07:00:00Z...2016-09-01T07:00:00Z)`]
    this.api['getData'](filters).then((result) => {
      this.showResult(result, 'Result')
    })
  }

  getChannelData () {
    const filters = {
      'tz': ['America/Los_Angeles'],
      'filter': ['session.referrer_channel_type.eq(social)', `session.start_time.gte(${this.state.startDate}).lt(${this.state.endDate})`, 'session.referrer_channel.eq(dark_social,facebook,instagram,pinterest,twitter,youtube)', 'session.driving_domain_id.neq(38,39)'],
      'metrics': ['session.duration.per(session.count).as(average_time_on_site),conversion.revenue.per(conversion.purchases_count).as(average_order_value),session.bounces_count.per(session.count).as(bounce_rate),conversion.business_value.as(business_value),conversion.count.as(goal_completions),conversion.unique_converters.per(session.unique_visits).as(goal_completion_rate),conversion.purchases_count.as(purchases),conversion.unique_purchasers.per(session.unique_visits).as(purchase_conversion_rate),conversion.items_count.per(conversion.purchases_count).as(items_per_purchase),session.pageviews.as(pageviews),conversion.revenue.as(revenue),session.count.as(visits),session.unique_pageviews.as(unique_pageviews),session.unique_pageviews.per(session.unique_visits).as(unique_pageviews_per_unique_visits),session.unique_visits.as(unique_visits)'],
      'dimensions': ['session.referrer_channel']
    }

    this.api['getData'](filters).then((result) => {
      this.showChannelResult(result, 'Result')
    })
  }

  showChannelResult (response: Object, title: string = 'Response') {
    // this.refs.container.scrollTo({x: 0, y: 0, animated: true})
    if (response.ok) {
      // console.tron.log(`CHANNEL DATA: ${FJSON.plain(response.data['data'])}`)

      const data = response.data['data']

      // const channelData = []

      // const channelMetrics = this.state.channelMetrics.slice()

      data.forEach((metric) => {
        // const result = {}
        const channelMetric = {}
        const channel = metric.attributes.dimensions['session.referrer_channel']
        const goalCompletions = metric.attributes.metrics['goal_completions']
        const visits = metric.attributes.metrics['visits']
        const revenue = metric.attributes.metrics['revenue']
        const businessValue = metric.attributes.metrics['business_value']

        channelMetric[channel] = {
          'goal_completions': goalCompletions,
          'visits': visits,
          'revenue': revenue,
          'business_value': businessValue
        }

        const newChannelMetrics = update(this.state.channelMetrics, {$merge: channelMetric})

        this.setState({ channelMetrics: newChannelMetrics })
      })
      // console.tron.log(`CHANNEL DATA: ${FJSON.plain(this.state.channelMetrics)}`)
      // this.setState({ channelMetrics: channelMetrics })
    } else {
      this.refs.container.setState({result: `${response.problem} - ${response.status}`})
    }
  }

  showResult (response: Object, title: string = 'Response') {
    // this.refs.container.scrollTo({x: 0, y: 0, animated: true})
    if (response.ok) {
      // console.tron.log(`DATA: ${FJSON.plain(response.data['data'][0])}`)

      const data = response.data['data'][0].attributes
      const metrics = data.metrics
      const deltaPercentages = data['delta_percentages']

      this.setState({ metrics: metrics, deltaPercentages: deltaPercentages })
    } else {
      this.refs.container.setState({result: `${response.problem} - ${response.status}`})
    }
  }

  startDateChanged (date) {
    const [comparisonStartDate, comparisonEndDate] = this.getComparisonDates(date, this.state.endDate)

    this.setState({startDate: date, comparisonStartDate: comparisonStartDate, comparisonEndDate: comparisonEndDate}, function () {
      this.getData()
      this.getChannelData()
    })
  }

  endDateChanged (date) {
    const [comparisonStartDate, comparisonEndDate] = this.getComparisonDates(this.state.startDate, date)

    this.setState({endDate: date, comparisonStartDate: comparisonStartDate, comparisonEndDate: comparisonEndDate}, function () {
      this.getData()
      this.getChannelData()
    })
  }

  getComparisonDates (startDate, endDate) {
    const momentStartDate = moment(startDate)
    const momentEndDate = moment(endDate)

    const diff = momentEndDate.diff(momentStartDate, 'days')

    const comparisonStartDate = momentStartDate.clone().subtract(diff, 'days').format('YYYY-MM-DD')
    const comparisonEndDate = momentEndDate.clone().subtract(diff, 'days').format('YYYY-MM-DD')

    return [comparisonStartDate, comparisonEndDate]
  }

  render () {
    return (
      <ScrollView style={styles.mainContainer} ref='container'>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.dateContainer}>
            <View style={styles.datePickers}>
              <TheDatePicker ref='start-date' dateChanged={this.startDateChanged} date={this.state.startDate} />
              <Text style={styles.deltaPercentage}>TO</Text>
              <TheDatePicker ref='end-date' dateChanged={this.endDateChanged} date={this.state.endDate} />
            </View>
            <Text style={styles.vs}>
              VS. {moment(this.state.comparisonStartDate).format('MMM D, YYYY')} - {moment(this.state.comparisonEndDate).format('MMM D, YYYY')}
            </Text>
          </View>
          <APIResult ref='result' metrics={this.state.metrics} channelMetrics={this.state.channelMetrics} deltaPercentages={this.state.deltaPercentages} />
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

  constructor (props) {
    super(props)
    this.state = {
      goalCompletions: Object
    }
  }

  getMetric (metric) {
    const metricValue = this.props.metrics[metric]

    if (!metricValue) {
      return '--'
    }
    if (metric === 'business_value' || metric === 'revenue') {
      return numeral(metricValue).format('($ 0.00 a)')
    } else {
      return numeral(metricValue).format('(0 a)')
    }
  }

  getFormattedMetric (metric) {
    const metricValue = this.getMetric(metric)

    return (
      <Text style={styles.metric}>{metricValue}</Text>
    )
  }

  getFormattedPercentage (metric) {
    const percentage = this.getPercentage(metric)

    return (
      <Text style={styles.percentage}>{percentage}</Text>
    )
  }

  getPercentage (metric) {
    const metricValue = this.props.deltaPercentages[metric]

    if (!metricValue) {
      return '--'
    }
    return numeral(metricValue / 100).format('0 %')
  }

  getChannelMetic (metric, channel) {
    return this.props.channelMetrics[channel][metric]
  }

  getPercentageIcon (metric) {
    const percentage = this.getPercentage(metric)

    if (percentage > 0) {
      return (
        <Icon name='caret-up' size={Metrics.icons.small} color={Colors.smGreen} style={styles.percentageIcon} />
      )
    } else {
      return (
        <Icon name='caret-down' size={Metrics.icons.small} color={Colors.smRed} style={styles.percentageIcon} />
      )
    }
  }

  getChannelIcon (channel) {
    if (channel === 'dark_social') {
      return (
        <Icon name='commenting' key={`${channel}-icon`} size={Metrics.icons.medium} color={Colors.smBlue} />
      )
    }

    if (channel === 'youtube') {
      return (
        <Icon name='youtube-play' key={`${channel}-icon`} size={Metrics.icons.medium} color={Colors.smBlue} />
      )
    }

    return (
      <Icon name={channel} key={`${channel}-icon`} size={Metrics.icons.medium} color={Colors.smBlue} />
    )
  }

  renderView () {
    return (
      <View>
        <View style={styles.metricsContainer}>
          <Text style={styles.metricHeader}>
            GOAL COMPLETIONS
          </Text>
          <View style={styles.metrics}>
            {this.getFormattedMetric('goal_completions')}

            <View style={styles.deltaPercentage}>
              {this.getPercentageIcon('goal_completions')}
              {this.getFormattedPercentage('goal_completions')}
            </View>
          </View>

          <View style={styles.channelMetrics}>
            { Object.keys(this.props.channelMetrics).map(function (channel) {
              return (
                <View style={styles.channelMetric} key={`${channel}-info`}>
                  {this.getChannelIcon(channel)}
                  <Text key={`${channel}-metric`}>
                    {this.getChannelMetic('goal_completions', channel)}
                  </Text>
                </View>
              )
            }, this)}
          </View>
        </View>

        <View style={styles.metricsContainer}>
          <Text style={styles.metricHeader}>
            VISITS
          </Text>
          <View style={styles.metrics}>
            {this.getFormattedMetric('visits')}

            <View style={styles.deltaPercentage}>
              {this.getPercentageIcon('visits')}
              {this.getFormattedPercentage('visits')}
            </View>
          </View>

          <View style={styles.channelMetrics}>
            { Object.keys(this.props.channelMetrics).map(function (channel) {
              return (
                <View style={styles.channelMetric} key={`${channel}-info`}>
                  {this.getChannelIcon(channel)}
                  <Text key={`${channel}-metric`}>
                    {this.getChannelMetic('visits', channel)}
                  </Text>
                </View>
              )
            }, this)}
          </View>
        </View>

        <View style={styles.metricsContainer}>
          <Text style={styles.metricHeader}>
            REVENUE
          </Text>
          <View style={styles.metrics}>
            {this.getFormattedMetric('revenue')}

            <View style={styles.deltaPercentage}>
              {this.getPercentageIcon('revenue')}
              {this.getFormattedPercentage('revenue')}
            </View>
          </View>

          <View style={styles.channelMetrics}>
            { Object.keys(this.props.channelMetrics).map(function (channel) {
              return (
                <View style={styles.channelMetric} key={`${channel}-info`}>
                  {this.getChannelIcon(channel)}
                  <Text key={`${channel}-metric`}>
                    {this.getChannelMetic('revenue', channel)}
                  </Text>
                </View>
              )
            }, this)}
          </View>
        </View>

        <View style={styles.metricsContainer}>
          <Text style={styles.metricHeader}>
            BUSINESS VALUE
          </Text>
          <View style={styles.metrics}>
            {this.getFormattedMetric('business_value')}

            <View style={styles.deltaPercentage}>
              {this.getPercentageIcon('business_value')}
              {this.getFormattedPercentage('business_value')}
            </View>
          </View>

          <View style={styles.channelMetrics}>
            { Object.keys(this.props.channelMetrics).map(function (channel) {
              return (
                <View style={styles.channelMetric} key={`${channel}-info`}>
                  {this.getChannelIcon(channel)}
                  <Text key={`${channel}-metric`}>
                    {this.getChannelMetic('business_value', channel)}
                  </Text>
                </View>
              )
            }, this)}
          </View>
        </View>
      </View>
    )
  }

  render () {
    let messageView = null
    // console.tron.log(`CHANNEL DATA PROPS: ${FJSON.plain(this.props.channelMetrics)}`)
    console.tron.log(`METRICS: ${FJSON.plain(this.props.metrics)}`)

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
        style={{width: 150}}
        date={this.props.date}
        mode='date'
        placeholder='select date'
        format='YYYY-MM-DD'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        showIcon={false}
        customStyles={{
          dateIcon: {
            width: 0,
            marginLeft: 0
          },
          dateInput: {
            marginRight: 0,
            borderRadius: 4,
            width: 50
          },
          dateText: {
            color: Colors.smDarkGray
          },
          datePickerMask: {
            display: 'inline',
            backgroundColor: Colors.smDarkGray
          },
          dateTouchBody: {
            width: 150
          },
          dateTouch: {
          }
        }}
        onDateChange={(date) => { this.props.dateChanged(date) }}
      />
    )
  }
}
