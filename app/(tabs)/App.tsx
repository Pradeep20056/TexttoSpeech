import React from 'react';
import { StyleSheet, View } from 'react-native';
import ECommerce from './project1';

export default function App() {
  return (
    <View style={styles.container}>
      <ECommerce />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});