// @flow

import React from 'react'
import { View, Text, ListView, TouchableHighlight, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'

// Styles
import styles from './Styles/GoalStyle'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export default class Goal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  populateListWithAccounts () {
    AsyncStorage.getItem('userAccounts', (err, value) => {
      if (err !== null) {
        console.tron.log(String(error))
        return
      }

      var accounts = {}
      
      JSON.parse(value).forEach((account) => {
        if (account.name.match(uuidRegex) == null && account.name.match(/Freebies/) == null) {
          (accounts[account.id] = account.name)
        }
      })

      this.setState({dataSource: ds.cloneWithRows(accounts)})
    })
  }

  componentDidMount () {
    this.populateListWithAccounts()
  }

  rowWasTapped(rowID) {
    AsyncStorage.setItem('selectedAccount', rowID, (err, value) => {
      if (err !== null) {
        console.tron.log(String(err))
        return
      }

      Actions.data()
    })
  }
  
  _renderRow (rowData, sectionID, rowID, highlightRow) {
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
      <View style={{flex: 1, paddingTop: 55}}>
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
