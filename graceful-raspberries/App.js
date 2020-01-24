import * as React from 'react';
import {
  Alert,
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {AsyncStorage} from 'react-native';

import { Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import Note from './components/Note';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    };
  }

  render() {
    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key}  val={val} />;
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>- Muistiinpanot -</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>{notes}</ScrollView>

        <View style={styles.base}>
          <TouchableOpacity
            onPress={this.addNote.bind(this)}
            style={styles.addButton}>
            <Text style={styles.addButtonText}> Lisää </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            onChangeText={noteText => this.setState({ noteText })}
            value={this.state.noteText}
            placeholder="Kirjoita tähän"
            placeholderTextColor="black"
            underlineColorAndroid="transparent"
            placeholderPadding="20"
          />
        </View>
      </View>
    );
  }
  saveData = async (x) => {
  let notes=x;
  console.log('tietokannan array' + notes);
  try {
  await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(x));
} catch (error) {
  // Error saving data
}
  } 
   displayData = async () => {
     try {
  const x = await AsyncStorage.getItem('@MySuperStore:key');
  if (x !== null) {
    // We have data!!
      this.setState({ noteArray: (JSON.parse(x))});
  }
} catch (error) {
  // Error retrieving data
}
   }


   


  addNote() {
    var x = true;
    var i;
    for (i = 0; i < this.state.noteArray.length; i++) {
      var arvo = this.state.noteArray[i].note;
      if (this.state.noteText === arvo) {
        Alert.alert(
          'Duplikaatti ongelma!',
          'Sinulla on jo samanlainen muistiinpano',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'OK', onPress: () => this.setState({ noteText: '' }) },
          ],
          { cancelable: false }
        );
        x = false;  
      }
    }
    if (x) {
      if (this.state.noteText) {
        
        this.state.noteArray.push({
          note: this.state.noteText,
        });
        this.setState({ noteText: '' });
        console.log(this.state.noteArray);
        this.saveData(this.state.noteArray);
        this.displayData();
      }
    }
 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#E9967A',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    padding: 30,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  base: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: '#E9967A',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 300,
    zIndex: 100,
  },
  addButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    textAlign: 'center',
    alignSelf: 'stretch',
    color: 'black',
    paddingTop: 5,
    backgroundColor: '#E9967A',
    borderTopWidth: 5,
    borderTopColor: '#ddd',
    fontWeight: 'bold',
    fontSize: 36,
  },
});
