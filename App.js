import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicio from './pantallas/Inicio';
import Historial from './pantallas/Historial';
import {MaterialCommunityIcons} from 'react-native-vector-icons';


function LogoTitle() {
  return (
    <View style={{flexDirection: 'row'}}>
    <MaterialCommunityIcons name={"account-cowboy-hat"} color={'#900'} size={35}  />
    <Text style={{fontSize: 25}}>Historial</Text>
    <MaterialCommunityIcons name={"account-cowboy-hat"} color={'#900'} size={35}  />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inicio" component={Inicio} options={{
          
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name={"cow"} color={'#900'} size={size} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          
        }}
        />
        <Tab.Screen name="Historial" component={Historial} options={{
          
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name={"feature-search-outline"} color={'#900'} size={size} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};