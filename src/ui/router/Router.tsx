import React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from '@assets/img/logos/e-diaristas-logo.png';
import { NavigationTheme } from '../themes/app-theme';
import Index from '../../pages';
import EncontrarDiarista from 'pages/encontrar-diarista';

export type RootStackParamList = {
    Index: undefined;
    EncontrarDiarista: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Router: React.FC = () => {
    return (
        <NavigationContainer theme={NavigationTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Image
                            style={{
                                width: 150,
                                height: 50,
                                resizeMode: 'contain',
                            }}
                            source={Logo}
                        />
                    ),
                }}
            >
                <Stack.Screen name="Index" component={Index} />
                <Stack.Screen
                    name="EncontrarDiarista"
                    component={EncontrarDiarista}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
