import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicio from './pantallas/Inicio';
import Historial from './pantallas/Historial';
import Config from './pantallas/Config';
import { MaterialCommunityIcons, Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Contador de ganado" component={Inicio} options={{

          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name={"cow"} color={'#900'} size={size} />
          ),
          headerTitleAlign: "center",
          tabBarLabel:() => {return null},
        }}
        />
        <Tab.Screen name="Historial" component={Historial} options={{

          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name={"feature-search-outline"} color={'#900'} size={size} />
          ),
          headerTitleAlign: "center",
          tabBarLabel:() => {return null},
        }}
        />
        <Tab.Screen name="Configuración" component={Config} options={{

          tabBarIcon: ({ size, color }) => (
            <Ionicons name={"settings"} color={'#900'} size={size} />
          ),
          headerTitleAlign: "center",
          tabBarLabel:() => {return null},
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};