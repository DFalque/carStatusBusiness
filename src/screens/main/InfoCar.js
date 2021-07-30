import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  TextInput,
} from 'react-native';
//import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import FlatListButton from '../../components/FlatListButton';
import * as Progress from 'react-native-progress';

const dataButtons = [
  {id: 1, name: 'Información'},
  {id: 2, name: 'Historial'},
  {id: 3, name: 'Reparaciones'},
  {id: 4, name: 'Pendiente'},
  {id: 5, name: 'Facturas'},
];

const InfoCar = ({route, navigation}) => {
  console.log(route.params);
  const [carInfo, setCarInfo] = useState({});
  const [idCar, setIdCar] = useState('');
  const [status, setStatus] = useState();

  const user = route.params.user;
  const img = require('../../img/audi.jpg');
  const imgInfo = require('../../img/infoButton.png');
  const imgHistorial = require('../../img/historialIcon.png');
  const imgRepair = require('../../img/repairIcon.png');
  const imgChat = require('../../img/chatIcon.png');
  const imgShop = require('../../img/workshopIcon.png');
  const imgBill = require('../../img/billIcon.png');

  useEffect(() => {
    console.log('Este es el usuario');
    console.log(user);
    firestore()
      .collection('Cars')
      .where('number', '==', user)
      .get()
      .then(doc => {
        console.log('Dentro de firestore');
        console.log(doc._docs);
        setIdCar(doc._docs[0].id);
        const car = doc._docs[0].data();
        setCarInfo(car);
        setStatus(car.status);
      });
  }, []);

  const statusCar = {
    ready: 'Listo',
    repairing: 'El coche está en reparación',
    observation: 'Inspeccionando',
    pieces: 'Pidiendo piezas',
    preparing: 'Preparando la entrega',
  };

  const handleStatus = e => {
    setStatus(e);
    changeStatus(e);
    console.log(status);
  };

  const handleEventCar = () => {
    navigation.navigate('EventCar', {
      handleStatus: handleStatus,
    });
  };

  const changeStatus = e => {
    firestore()
      .collection('Cars')
      .doc(idCar)
      .update({
        status: e,
      })
      .then(() => {
        setStatus(e);
      });
  };

  const noHaceNada = () => {
    console.log('No hace nada');
  };

  const renderBarText = () => {
    console.log(carInfo.status);
    console.log(statusCar[status]);

    return statusCar[status];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>{carInfo.model}</Text>
      <View style={styles.containerImg}>
        <ImageBackground source={img} style={styles.image}></ImageBackground>
      </View>
      <View
        style={{width: '80%', alignSelf: 'center', justifyContent: 'center'}}>
        {status === 'ready' ? (
          <Progress.Bar
            style={{alignSelf: 'center', margin: 10}}
            color="green"
            progress={1}
            width={200}
          />
        ) : status === 'repairing' ? (
          <Progress.Bar
            style={{alignSelf: 'center', margin: 10}}
            color="blue"
            progress={0.6}
            width={200}
          />
        ) : status === 'pieces' ? (
          <Progress.Bar
            style={{alignSelf: 'center', margin: 10}}
            color="orange"
            progress={0.4}
            width={200}
          />
        ) : status === 'observation' ? (
          <Progress.Bar
            style={{alignSelf: 'center', margin: 10}}
            color="red"
            progress={0.2}
            width={200}
          />
        ) : status === 'preparing' ? (
          <Progress.Bar
            style={{alignSelf: 'center', margin: 10}}
            color="blue"
            progress={0.9}
            width={200}
          />
        ) : (
          <Text>Vacio</Text>
        )}
        <Text style={{alignSelf: 'center'}}>{renderBarText()}</Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.buttonSecondary2}
          onPress={() => noHaceNada()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgInfo}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary2}
          onPress={() => noHaceNada()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgHistorial}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary2}
          onPress={() => handleEventCar()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgRepair}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Reparación</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary2}
          onPress={() => noHaceNada()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgChat}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary2}
          onPress={() => noHaceNada()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgShop}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Talleres</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary2}
          onPress={() => noHaceNada()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgBill}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Facturas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InfoCar;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 200,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  containerText: {
    height: '30%',
    margin: 10,
  },
  containerImg: {height: '30%', width: '100%'},
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  tittle: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 28,
    lineHeight: 33,
  },
  flatlist: {
    margin: 5,
    flexGrow: 0,
    height: 50,
  },
  placeholder: {
    backgroundColor: '#F2F2F2',
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: '80%',
  },
  buttonSecondary: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 200,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    borderStyle: 'solid',
    borderBottomColor: 'black',
    borderWidth: 2,
  },

  containerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    //backgroundColor: 'red',
    width: '70%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonSecondary2: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 80,
    marginRight: 20,
    marginLeft: 20,
    height: 70,
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    width: 70,
    height: 60,
    borderRadius: 10,
  },
});
