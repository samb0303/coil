// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  dateContainer: {
    borderBottomWidth: .5,
    borderBottomColor: Colors.smLightGray
  },

  datePickers: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  vs: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: 8,
    color: Colors.smLightGray,
    flexDirection: 'row',
    marginBottom: 11
  },

  metricsContainer: {
    borderBottomWidth: .5,
    borderBottomColor: Colors.smLightGray,
    padding: 10
  },

  metricHeader: {
    alignSelf: 'center',
    fontSize: Fonts.size.h4,
    color: Colors.smLightGray
  },

  metrics: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },

  metric: {
    alignSelf: 'center',
    fontSize: Fonts.size.h1,
    marginVertical: Metrics.baseMargin,
    color: Colors.smDarkGray
  },

  deltaPercentage: {
    padding: 10,
    alignItems: 'center',
    flex: 0,
    flexDirection: 'row'
  },

  percentage: {
    color: Colors.smLightGray,
    fontSize: Fonts.size.h5
  },

  percentageIcon: {
    paddingRight: 5,
  },

  channelMetrics: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  channelMetric: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // fontSize: Fonts.size.h5
  },

  channelMetricItem: {
    padding: 10
  },

  channelMetricValue: {
    color: Colors.smLightGray
  }
})
