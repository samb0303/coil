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

  socialROI: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center'
  },

  smallMetricsContainer: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  metricHeader: {
    alignSelf: 'center',
    fontSize: Fonts.size.h4,
    color: Colors.smLightGray,
    marginTop: 8,
  },

  smallMetricHeader: {
    marginTop: 5,
    marginBottom: 2,
    color: Colors.smLightGray
  },

  metrics: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  smallMetrics: {
    flex: 0,
    flexDirection: 'row'
  },

  metric: {
    alignSelf: 'center',
    fontSize: Fonts.size.h1,
    marginVertical: Metrics.baseMargin,
    color: Colors.smDarkGray,
    fontFamily: Fonts.type.number,
  },

  smallMetric: {
    // alignSelf: 'center',
    fontSize: Fonts.size.h4,
    // marginVertical: Metrics.baseMargin,
    color: Colors.smDarkGray,
    fontFamily: Fonts.type.number,
  },

  deltaPercentage: {
    padding: 10,
    alignItems: 'center',
    flex: 0,
    flexDirection: 'row'
  },

  percentage: {
    color: Colors.smLightGray,
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.number,
  },

  smallPercentage: {
    color: Colors.smLightGray,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.number,
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
  },

  channelMetricItem: {
    padding: 10
  },

  channelMetricValue: {
    fontFamily: Fonts.type.number,
    color: Colors.smLightGray
  }
})
