import * as React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Constants } from 'expo';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class Note extends React.Component {
  render() {
    return (
      <View style={styles.note}>
        <Text style={styles.noteText}> {this.props.val.note} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  noteText: {
    paddingLeft: 4,
  },
});
