import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';

export default class App extends React.Component {
  render() {
    return (

            <WebView
        style={styles.container}
        source={{uri: 'http://192.168.1.117:3000'}}/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: 40,
    backgroundColor: '#f00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
