// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  goalContainer: {
    marginTop: 100
  },
  goalMainText: {
    fontSize: 30,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  centerplease: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 60
  },
  goalTextInputContainer: {
    height: 50,
    width: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#6088E0',
    marginTop: 40
  },
  goalTextInput: {
    textAlign: 'center',
    fontSize: 30,
    height: 50,
    width: 100,
    color: 'gray'
  },
  confirmButton: {
    flex: 1,
    width: 140,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#6088E0',
    justifyContent: 'center'
  },
  confirmButtonText: {
    width: 130,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    marginLeft: 5
  }
})
