//COMPONENTS
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// NAVIGATOR
import {createStackNavigator} from '@react-navigation/stack';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
// SCREENS LOGIN
import WelcomeScreen from './src/screens/login/WelcomeScreen';
import Login from './src/screens/login//Login';
import SignUp from './src/screens/login/SignUp';
// FIREBASE
import {firebase} from '@react-native-firebase/database';
import firebaseConfig from './database/firebase';
import auth from '@react-native-firebase/auth';

//VARIABLES
//let deviceWidth = Dimensions.get('window').width;
//let deviceHeight = Dimensions.get('window').height;

if (!firebase.apps.length) {
  console.log('dentro de inicializando app con firebase');
  firebase.initializeApp(firebaseConfig);
}

// SCREENS MAIN
import Home from './src/screens/main/Home';

//CREATE LOGIN STACK
const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}
      tabBarOption={{}}>
      <LoginStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        Options={{}}
      />
      <LoginStack.Screen name="SignUp" component={SignUp} Options={{}} />
      <LoginStack.Screen name="Login" component={Login} Options={{}} />
    </LoginStack.Navigator>
  );
};

// CREATE MAIN STACK

const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      tabBarOption={{}}>
      <LoginStack.Screen name="Home" component={Home} Options={{}} />
    </MainStack.Navigator>
  );
};

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <LoginStackScreen />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
