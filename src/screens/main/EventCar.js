import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const EventCar = ({route, navigation}) => {
  const {params} = route;
  const {handleStatus} = params;

  const changeCar = e => {
    handleStatus(e);
    navigation.navigate('InfoCar');
  };
  return (
    <View>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
          fontSize: 28,
          lineHeight: 33,
        }}>
        Reparación
      </Text>
      <View style={styles.line}></View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeCar('observation')}>
        <Text>Es revisión</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => changeCar('pieces')}>
        <Text>Pidiendo Piezas</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => changeCar('repairing')}>
        <Text>Reparando</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => changeCar('preparing')}>
        <Text>Preparando </Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => changeCar('ready')}>
        <Text>Listo</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
    </View>
  );
};

export default EventCar;

const styles = StyleSheet.create({
  button: {width: '100%', margin: 20},
  line: {height: 0.8, backgroundColor: 'grey'},
});
