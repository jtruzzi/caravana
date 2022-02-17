import { useState } from "react"
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";
import { Formik } from "formik";

import { RadioButton, Text } from 'react-native-paper';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import {MaterialCommunityIcons} from 'react-native-vector-icons';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const vaquitas = [
  {
    "cuig": "EV833",
    "letra": "B",
    "numero": "2",
  },
  {
    "cuig": "EV841",
    "letra": "A",
    "numero": "25",
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      {vaquitas.map((item) => (
        <View style={{width: width-10, borderColor: 'black', borderWidth: 1, borderRadius: 5}}>
        <Text>{item.cuig}</Text>
        <Text>{item.letra}</Text>
        <Text>{item.numero}</Text>
        </View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white',
    justifyContent: "center"
  },
  input: {
    marginVertical: 10,
    width: Dimensions.get("window").width - 100,

    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: Dimensions.get("window").width - 200,
    height: 44,
    borderRadius: 5,
    bottom:5,
    backgroundColor: "#343434",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});
