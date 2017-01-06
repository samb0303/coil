// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listItem: {
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  listItemText: {
    fontSize: 20
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#6088E0'
  }
})
