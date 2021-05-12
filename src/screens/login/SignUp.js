import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const SignUp = () => {
  return (
    <View>
      <View>
        <Text>Comienza una nueva Aventura</Text>
      </View>
      <View>
        <View></View>
        <View>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Nombre de Usuario"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Contraseña"
            placeholderTextColor="grey"
            autoCapitalize="none"
            secureTextEntry={true}
          />

          <TouchableOpacity>
            <Text> Submit </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
