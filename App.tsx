// @ts-nocheck
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import Inicio from "./app/screens/Inicio";
import Config from "./app/screens/Config";
import Historial from "./app/screens/Historial";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
function App() {
  const Tab = createBottomTabNavigator();
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Contador de ganado"
          screenOptions={{
            tabBarActiveTintColor: "#e91e63",
          }}
        >
          <Tab.Screen
            name="Contador de ganado"
            component={Inicio}
            options={{
              tabBarIcon: ({ size, color }) => (
                <MaterialCommunityIcons
                  name={"cow"}
                  color={color}
                  size={size}
                />
              ),
              headerTitleAlign: "center",
              tabBarLabel: () => {
                return null;
              },
            }}
          />
          <Tab.Screen
            name="Historial"
            component={Historial}
            options={{
              tabBarIcon: ({ size, color }) => (
                <MaterialCommunityIcons
                  name={"feature-search-outline"}
                  color={color}
                  size={size}
                />
              ),
              headerTitleAlign: "center",
              tabBarLabel: () => {
                return null;
              },
            }}
          />
          <Tab.Screen
            name="Configuración"
            component={Config}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Ionicons name={"settings"} color={color} size={size} />
              ),
              headerTitleAlign: "center",
              tabBarLabel: () => {
                return null;
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

export default App;
