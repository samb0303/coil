// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listItem: {
    padding: 10
  },
  listItemText: {
    fontSize: 20
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#6088E0'
  },
  highlightedRow: {
    backgroundColor: 'red'
  }
})
