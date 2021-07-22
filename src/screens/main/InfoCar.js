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
  const [repairing, setRepairing] = useState(false);
  const [notes, setNotes] = useState(['Esto es una nota', 'Esto es otra nota']);

  const user = route.params.user;
  const img = require('../../img/audi.jpg');

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
      });
  }, []);

  const handleNotes = e => {
    setNotes(e);
    console.log(notes);
  };

  const handleEventCar = () => {
    navigation.navigate('EventCar');
  };

  const changeStatus = () => {
    if (!repairing) {
      firestore()
        .collection('Cars')
        .doc(idCar)
        .update({
          status: 'Repairing',
        })
        .then(() => {
          console.log('Car is repairing!');
          setRepairing(!repairing);
        });
    } else {
      firestore()
        .collection('Cars')
        .doc(idCar)
        .update({
          status: 'Ready',
        })
        .then(() => {
          console.log('Car Ready!');
          setRepairing(!repairing);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>{carInfo.model}</Text>
      <View style={styles.containerImg}>
        <ImageBackground source={img} style={styles.image}></ImageBackground>
      </View>
      <FlatList
        style={styles.flatlist}
        data={dataButtons}
        horizontal={true}
        renderItem={({item}) => <FlatListButton data={item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.containerText}>
        <Text>Introduce tus notas</Text>
        <TextInput
          placeholder="Nota ..."
          style={styles.placeholder}
          onChange={e => handleNotes()}
        />
        {notes.map(nota => (
          <Text>{nota}</Text>
        ))}
      </View>
      <View
        style={{width: '80%', alignSelf: 'center', justifyContent: 'center'}}>
        {repairing ? (
          <Progress.Bar progress={0.3} width={300} color={'red'} />
        ) : (
          <Progress.Bar progress={1} width={300} color={'green'} />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => changeStatus()}>
        <Text style={{color: 'white'}}>
          {repairing ? 'Parar reparación' : 'Iniciar Reparación'}{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => handleEventCar()}>
        <Text style={{color: 'black'}}>Añadir Evento</Text>
      </TouchableOpacity>
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
});
