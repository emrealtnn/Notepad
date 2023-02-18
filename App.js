import * as React from 'react';
import {AsyncStorage, Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {SplashScreen ,HomeScreen, LoginScreen,RegisterScreen, ProfileScreen} from "./src";
import {AuthContext} from "./src/utils";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function SignInScreen({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

const Drawer =createDrawerNavigator();

function HomeDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{headerTitle:'',
            headerRight: () => (
                <TouchableOpacity style={{marginRight:10}}>
                    <MaterialCommunityIcons name="account-circle" size={30} color="black" />
                </TouchableOpacity>
            ),
            headerLeftContainerStyle: { display: "none",  },
            drawerPosition: "right",
        }}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}

const StackAuth = createStackNavigator();

function AuthStact() {
    return (
        <StackAuth.Navigator initialRouteName="Login">
            <StackAuth.Screen name="Login" component={SignInScreen} />
            {/* <StackAuth.Screen name="Register" component={RegisterScreen} /> */}
        </StackAuth.Navigator>
    );

}

const Stack = createStackNavigator();

export default function App({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                    };
                case 'SIGN_IN':
                    if (action.token) {
                        AsyncStorage.setItem('userToken', action.token)
                    }
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    AsyncStorage.removeItem('userToken')
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                // userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    {state.userToken == null ? (
                        // No token found, user isn't signed in
                        <Stack.Screen
                            name="SignIn"
                            component={AuthStact}
                            options={{
                                title: 'Sign In',
                                // When logging out, a pop animation feels intuitive
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                            }}
                        />
                    ) : (
                        // User is signed in
                        <Stack.Screen name="Drawer" component={HomeDrawer} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
