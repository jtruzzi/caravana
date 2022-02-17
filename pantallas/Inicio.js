import { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Formik } from "formik";

import { RadioButton, Text } from "react-native-paper";
import VirtualKeyboard from "react-native-virtual-keyboard";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const vaquitas = [];

export default function App() {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ cuig: "", letra: "", numero: "" }}
        onSubmit={({ cuig, letra, numero }, actions) => {
          if (
            vaquitas.find(
              (vaquita) =>
                vaquita.cuig === cuig &&
                vaquita.letra === letra &&
                vaquita.numero === numero
            )
          ) {
            Alert.alert("ATENCION!", "VACA DUPLICADA!");
            return;
          }
          vaquitas.push({ cuig, letra, numero });
          console.log(vaquitas);
          actions.resetForm();
        }}
      >
        {({ handleChange, values, handleSubmit, handleBlur }) => (
          <>
            <View>
              <Text>
                <MaterialCommunityIcons name="cow" size={30} color="#900" />{" "}
                registradas: {vaquitas.length}.
              </Text>
            </View>
            <Text style={{ margin: 5 }}>Cuig</Text>
            <RadioButton.Group
              onValueChange={handleChange("cuig")}
              value={values.cuig}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "black",
                }}
              >
                <View style={{ marginHorizontal: 10 }}>
                  <Text>EV833</Text>
                  <RadioButton
                    value="EV833"
                    color="black"
                    uncheckedColor="gray"
                  />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Text>EV860</Text>
                  <RadioButton
                    value="EV860"
                    color="black"
                    uncheckedColor="gray"
                  />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Text>EV841</Text>
                  <RadioButton
                    value="EV841"
                    color="black"
                    uncheckedColor="gray"
                  />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Text>EV907</Text>
                  <RadioButton
                    value="EV907"
                    color="black"
                    uncheckedColor="gray"
                  />
                </View>
              </View>
            </RadioButton.Group>
            <Text>Letra</Text>
            <RadioButton.Group
              onValueChange={handleChange("letra")}
              value={values.letra}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "black",
                  padding: 5,
                }}
              >
                <View
                  style={{
                    backgroundColor: "black",
                    flexDirection: "row",
                    padding: 5,
                    borderRadius: 5,
                    marginRight: 25,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
                  >
                    A
                  </Text>
                  <RadioButton
                    value="A"
                    color={"white"}
                    uncheckedColor="white"
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "black",
                    flexDirection: "row",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
                  >
                    B
                  </Text>
                  <RadioButton value="B" color="white" uncheckedColor="white" />
                </View>
              </View>
            </RadioButton.Group>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#900",
                padding: 5,
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons
                name={values.numero ? "cow" : "feature-search-outline"}
                size={45}
                color="white"
              />
              <Text
                style={{ fontSize: 35, fontWeight: "bold", color: "white" }}
              >
                {values.numero}
              </Text>
            </View>

            <VirtualKeyboard
              color="black"
              pressMode="string"
              clearOnLongPress={true}
              onPress={handleChange("numero")}
            />

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.limpiarContainer}>
              <Text style={styles.limpiarText}>Limpiar</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
    backgroundColor: "white",
    justifyContent: "center",
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
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: Dimensions.get("window").width - 200,
    height: 44,
    borderRadius: 5,
    bottom: 5,
    backgroundColor: "#343434",
  },
  limpiarContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    width: Dimensions.get("window").width - 300,
    height: 44,
    borderRadius: 5,
    backgroundColor: "red",
  },
  limpiarText: {
    fontSize: 14,
    color: "#ffffff",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});
