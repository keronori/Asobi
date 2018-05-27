import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';

export default class App extends React.Component {
  render() {
    return (

            <WebView
        style={styles.container}
        source={{uri: 'http://172.20.10.3:3000'}}/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: 40,
    backgroundColor: '#929292',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
