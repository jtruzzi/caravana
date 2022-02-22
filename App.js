import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pantallas/Home';
import Logs from './pantallas/Logs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  const [animals, setAnimals] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Contador de ganado" children={() => <Home animals={animals} setAnimals={setAnimals} />} options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name={"cow"} color={'#900'} size={size} />
          ),
          headerTitleAlign: "center",
          tabBarLabel: () => { return null },
        }}
        />
        <Tab.Screen name="Historico" children={() => <Logs animals={animals} setAnimals={setAnimals} />} options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name={"feature-search-outline"} color={'#900'} size={size} />
          ),
          headerTitleAlign: "center",
          tabBarLabel: () => { return null },
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};