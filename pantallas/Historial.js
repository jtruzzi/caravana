import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";

import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tailwind from "tailwind-rn";

const width = Dimensions.get("window").width;

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View
            style={tailwind(
              "h-full items-center justify-center bg-gray-500 p-12 pt-40"
            )}
          >
            <View
              style={tailwind("bg-white w-full p-6 rounded-lg items-center")}
            >
              <MaterialCommunityIcons
                name={"bookmark-check"}
                size={58}
                color="#900"
              />

              <Text style={tailwind("text-gray-800 text-xl font-medium mt-4")}>
                ¡Datos enviados!
              </Text>

              <Text style={tailwind("text-gray-600 text-center mt-2 w-56")}>
                ¡Revisa tu casilla de email!
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={tailwind(
                  "bg-indigo-600 w-full py-2 items-center rounded-md mt-6"
                )}
              >
                <Text style={tailwind("text-white font-medium")}>
                  Volver atras!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
                "justify-center items-center p-4 w-4/5 rounded bg-green-400 my-2"
              )}
            >
              <Text style={{ fontWeight: "bold" }}>{item.cuig}</Text>
              <Text>{item.letra}</Text>
              <Text>{item.numero}</Text>
            </View>
          ))}
          {data.length != 0 ? <View style={{width: width, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={tailwind(
              "justify-center items-center p-4 w-4/5 rounded bg-green-600 my-2"
            )}
          >
            <Text style={tailwind("text-lg text-white")}>
              <MaterialCommunityIcons name={"email"} size={21} /> Enviar{" "}
              <MaterialCommunityIcons name={"email"} size={21} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.setItem("vacas", JSON.stringify([]));
            }}
            style={tailwind(
              "justify-center items-center p-4 w-4/5 rounded bg-red-600 my-2"
            )}
          >
            <Text style={tailwind("text-lg text-white")}>Limpiar</Text>
          </TouchableOpacity></View> : null}
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
