// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  datePickers: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    marginTop: 20
  },

  metricHeader: {
    alignSelf: 'center',
    fontSize: Fonts.size.regular,
    marginVertical: Metrics.baseMargin,
    color: Colors.smLightGray
  },

  metric: {
    alignSelf: 'center',
    fontSize: Fonts.size.h2,
    marginVertical: Metrics.baseMargin,
    color: Colors.smDarkGray
  },

  channelMetric: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
