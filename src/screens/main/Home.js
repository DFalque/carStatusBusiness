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
    //setUsername(e);
    setUsername('FSteWQp3aERq2BnueWFL2QYFpIC3');
    console.log(username);
  };

  const pressButton = () => {
    navigation.navigate('InfoCar', {
      user: 'FSteWQp3aERq2BnueWFL2QYFpIC3',
    });
  };
  return (
    <View style={{flex: 1}}>
      <Text style={{margin: 10, fontSize: 20}}>Bienvenido a su perfil</Text>
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
    backgroundColor: '#ECE6E6',
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: 200,
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: '#A73F39',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
