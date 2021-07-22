import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const FlatListButton = data => {
  const {
    data: {name},
  } = data;
  console.log(data);
  console.log(name);

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default FlatListButton;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    //height: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {margin: 0, padding: 5},
});
