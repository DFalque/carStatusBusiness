import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Home = props => {
  const {navigation} = props;
  const [username, setUsername] = useState('');

  const changeState = e => {
    console.log(e);
    setUsername(e);
    //setUsername('oAgphnNeMsXEQiYGiJKzQILAWrW2');
    console.log(username);
  };

  const pressButton = () => {
    navigation.navigate('InfoCar', {
      user: username,
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>Introduzca</Text>
        <Text style={styles.messageText}>la matricula del vehículo</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Nombre usuario"
          style={styles.placeholder}
          autoCapitalize="none"
          onChangeText={e => changeState(e)}
        />
        <TouchableOpacity style={styles.button} onPress={() => pressButton()}>
          <Text style={{color: 'white'}}> Ver Vehículo </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    backgroundColor: '#F2F2F2',
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: 200,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 200,
    height: 50,
    borderRadius: 10,
  },
  messageContainer: {
    height: '25%',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 28,
    lineHeight: 33,
  },
});
