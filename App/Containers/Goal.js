// @flow

import React from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView, TextInput, ListView, TouchableHighlight, Alert, AsyncStorage } from 'react-native'
import Reactotron from 'reactotron-react-native'
import { Actions } from 'react-native-router-flux'

// Styles
import styles from './Styles/GoalStyle'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class Goal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }
  
  populateListWithAccounts() {
    AsyncStorage.getItem('userAccounts', (err, value) => {
      if (err !== null) {
        console.tron.log(String(error))
        return
      }

      var accounts = {}
      JSON.parse(value).forEach((account) => (accounts[account.id] = account.name))

      this.setState({dataSource: ds.cloneWithRows(accounts)})
    })
  }
  
  componentDidMount () {
    this.populateListWithAccounts()
  }

  rowWasTapped(rowID) {
    AsyncStorage.setItem('selectedAccount', rowID, (err, value) => {
      if (err !== null) {
        console.tron.log(String(error))
        return
      }

      Actions.data()
    })
  }
  
  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        underlayColor='#6088E0'
        onPress={() => {
          this.rowWasTapped(rowID)
        }}>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{rowData}</Text>
        </View>
      </TouchableHighlight>
    )
  }
  
  _renderSeperator(sectionId, rowId) {
    return (
      <View key={rowId} style={styles.separator} />
    )
  }

  render () {
    return (
      <View style={{flex: 1, paddingTop: 52}}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeperator}
         />
       </View>
    )
  }

}
