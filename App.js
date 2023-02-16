import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={HomeScreen} />
          <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen} />
          <Stack.Screen
              name={"Register"}
              options={{ headerShown: false }}
              component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;