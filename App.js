import { useState } from "react"
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Formik } from "formik";

import { RadioButton, Text } from 'react-native-paper';

const vaquitas = [];

export default function App() {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ cuig: "", letra: "", numero: "" }}
        onSubmit={({ cuig, letra, numero }, actions) => {
          if (vaquitas.find(vaquita => vaquita.cuig === cuig && vaquita.letra === letra && vaquita.numero === numero)) {
            alert("VACA DUPLICADA!")
            return;
          }
          vaquitas.push({ cuig, letra, numero })
          actions.resetForm();
        }}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          handleBlur,
        }) => (
          <>
            <View><Text>Cantida de vacas ingresadas: {vaquitas.length}.</Text></View>
            <RadioButton.Group onValueChange={handleChange("cuig")} value={values.cuig}>
              <View>
                <Text>EV833</Text>
                <RadioButton value="EV833" />
              </View>
              <View>
                <Text>EV860</Text>
                <RadioButton value="EV860" />
              </View>
              <View>
                <Text>EV841</Text>
                <RadioButton value="EV841" />
              </View>
              <View>
                <Text>EV907</Text>
                <RadioButton value="EV907" />
              </View>
            </RadioButton.Group>

            <RadioButton.Group onValueChange={handleChange("letra")} value={values.letra}>
              <View>
                <Text>A</Text>
                <RadioButton value="A" />
              </View>
              <View>
                <Text>B</Text>
                <RadioButton value="B" />
              </View>
            </RadioButton.Group>

            <TextInput
              style={styles.input}
              numberOfLines={1}
              value={values.numero}
              placeholder="Numero"
              onChangeText={handleChange("numero")}
              autoCapitalize="none"
              onBlur={handleBlur("numero")}
            />

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Ingresar</Text>
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
    marginTop: 40,
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
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: Dimensions.get("window").width - 200,
    height: 44,
    borderRadius: 5,
    backgroundColor: "#343434",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});
