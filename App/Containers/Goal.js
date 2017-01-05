// @flow

import React from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView, TextInput, Picker, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/GoalStyle'

var GOAL_METRICS = {
  'impressions': 'Impressions',
  'visits': 'Visits',
  'views': 'Page Views',
  'completions': 'Goal Completions'
}

class Goal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      selectedGoal: 'impressions',
      selectedGoalDisplayText: 'Impressions'
    }

    this.saveAndProceed = this.saveAndProceed.bind(this)
  }

  setGoal (metric) {
    this.setState({
      selectedGoal: metric,
      selectedGoalDisplayText: GOAL_METRICS[metric]
    })
  }

  saveAndProceed () {
    try {
      AsyncStorage.setItem('goalMetric', this.state.selectedGoal)
      // go to next view
    } catch (error) {
      Alert.alert(String(error))
    }
  }

  render () {
    return (
      <ScrollView style={[styles.mainContainer, styles.goalContainer]}>
        <KeyboardAvoidingView behavior='position'>
          <Text style={styles.goalMainText}>
            I want to set a goal for my {this.state.selectedGoalDisplayText.toLowerCase()}
          </Text>
          <Picker
            onValueChange={(metric) => this.setGoal(metric)}
            selectedValue={this.state.selectedGoal}>
            {Object.keys(GOAL_METRICS).map((metric) => (
              <Picker.Item value={metric} label={GOAL_METRICS[metric]} key={metric} />
            ))}
          </Picker>
          <Text style={styles.goalMainText}>
            to reach
          </Text>
          <View style={styles.centerplease}>
            <View style={styles.goalTextInputContainer}>
              <TextInput style={styles.goalTextInput} />
            </View>
          </View>
          <View style={styles.centerplease}>
            <TouchableOpacity onPress={this.saveAndProceed} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Let us measure →</Text>
            </TouchableOpacity>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal)
