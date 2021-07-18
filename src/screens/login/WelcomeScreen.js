import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
//FIREBASE
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const WelcomeScreen = props => {
  const {navigation} = props;
  const [formData, setFormData] = useState(defaultFormValue());

  function defaultFormValue() {
    return {
      email: '',
      password: '',
    };
  }

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e});
    console.log(formData);
  };

  const onSubmit = () => {
    auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(response => {
        console.log(response);
        const id = response.user.uid;
        firestore()
          .collection('Workshop')
          .doc(id)
          .set({
            clients: [],
          })
          .then(() => {
            console.log('Data updated.');
            console.log('User account created & signed in!');
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <View>
      <View>
        <Text>Registrate</Text>
      </View>
      <View>
        <View>
          <Text>Registrate</Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={e => onChange(e, 'email')}
          />
          <TextInput
            //underlineColorAndroid="transparent"
            placeholder="Contraseña"
            placeholderTextColor="grey"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={e => onChange(e, 'password')}
          />

          <TouchableOpacity onPress={() => onSubmit()}>
            <Text> Submit </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
