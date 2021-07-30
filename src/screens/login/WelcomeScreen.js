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
import firestore from '@react-native-firebase/firestore';

const img = require('../../img/aliLogo.png');

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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={img} style={styles.image}></ImageBackground>
      </View>
      <View>
        <View style={styles.submitContainer}>
          <View style={styles.textInputContainer}>
            <Text>Email</Text>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={e => onChange(e, 'email')}
            />
            <Text>Password</Text>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              placeholderTextColor="grey"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={e => onChange(e, 'password')}
            />
          </View>
          <TouchableOpacity style={styles.submit} onPress={() => onSubmit()}>
            <Text style={styles.textSubmit}> Submit </Text>
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
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFFF',
  },
  imageContainer: {
    height: '40%',
    backgroundColor: 'blue',
  },
  submitContainer: {
    height: '60%',
    alignItems: 'center',
  },
  textInputContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
  },
  textInput: {
    backgroundColor: '#F2F2F2',
    marginBottom: 20,
    borderRadius: 10,
  },
  submit: {
    backgroundColor: '#000000',
    width: 150,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textSubmit: {
    color: '#ffff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
});
