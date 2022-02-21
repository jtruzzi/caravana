import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tailwind from "tailwind-rn";

const width = Dimensions.get("window").width;

export default function App() {
  const [data, setData] = useState([]);

  const readData = async () => {
    try {
      const dataasync = await AsyncStorage.getItem("vacas");

      if (dataasync !== null) {
        setData(JSON.parse(dataasync));
      }
    } catch (e) {
      alert("Error al leer AsyncStorage");
    }
  };

  useEffect(() => {
    readData();
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          width: Dimensions.get("window").width,
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            width: Dimensions.get("window").width,
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            {data.length}
            <MaterialCommunityIcons name={"cow"} size={45} color="#900" />
          </Text>
          {data.map((item, i) => (
            <View
              key={i}
              style={tailwind(
                "justify-center items-center p-4 w-4/5 rounded bg-green-500 my-2"
              )}
            >
              <Text style={{ fontWeight: "bold" }}>{item.cuig}</Text>
              <Text>{item.letra}</Text>
              <Text>{item.numero}</Text>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.setItem("vacas", JSON.stringify([]));
            }}
            style={tailwind(
              "justify-center items-center p-4 w-4/5 rounded bg-red-600 my-2"
            )}
          >
            <Text style={tailwind("text-lg text-white")}>Limpiar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
});
