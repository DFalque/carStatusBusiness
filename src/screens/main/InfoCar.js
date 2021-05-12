import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';

const InfoCar = ({route, navigation}) => {
  console.log(route.params);
  const [carInfo, setCarInfo] = useState('');

  useEffect(() => {
    let obj = [];
    const user = route.params.user;
    console.log(user);
    database()
      .ref('/users/' + user)
      .once('value')
      .then(snapshot => {
        let data = snapshot.val();
        obj.push(data.info);
        const [item] = obj;
        console.log(item); //salida correcta
        setCarInfo(item);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Información del vehículo </Text>

      <View style={styles.containerText}>
        <Text>Marca: </Text>
        <Text>{carInfo.car}</Text>
      </View>
      <View style={styles.containerText}>
        <Text>Modelo: </Text>
        <Text>{carInfo.model}</Text>
      </View>
      <View style={styles.containerText}>
        <Text>Fuel: </Text>
        <Text>{carInfo.oil}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => pressButton()}>
        <Text style={{color: 'white'}}> Iniciar reparación </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InfoCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    width: 200,
    backgroundColor: '#A73F39',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  containerText: {
    flexDirection: 'row',
    margin: 10,
  },
});
