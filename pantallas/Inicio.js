import { useRef } from "react"
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput
} from "react-native";
// import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { Formik } from "formik";

import { RadioButton, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from "tailwind-rn";
import CustomRadioButton from "../components/CustomRadioButton";

const Inicio = () => {
  const inputNumberRef = useRef();

  AsyncStorage.getItem('animals')
    .then((datavacas) => {
      if (datavacas === null) {
        AsyncStorage.setItem('animals', JSON.stringify([]));
      }
    })
    .catch((err) => {
      alert(err)
    })

  return (
    <ScrollView contentContainerStyle={tailwind("flex bg-white justify-start items-center")}>
      <Formik
        initialValues={{ code: "", letter: "", number: "", sex: "", other: "false" }}
        onSubmit={({ code, letter, number, sex, other }, actions) => {
          if ((other == "false" && !code) || !letter || !number || !sex) {
            Alert.alert("Faltan rellenar campos");
            return;
          }
          AsyncStorage.getItem('animals').then((datavacas) => {
            const vacas = JSON.parse(datavacas);
            const index = vacas.findIndex(
              (vaquita) =>
                vaquita.code === code &&
                vaquita.letter === letter &&
                vaquita.number === number &&
                vaquita.sex === sex
            );
            if (index !== -1) {
              Alert.alert("ATENCION!", `ANIMAL DUPLICADO en posición ${index + 1}!`);
              return;
            }
            const itemvaca = {
              code,
              letter,
              number,
              sex,
              other,
            }
            AsyncStorage.getItem('animals').then((datavacas) => {
              if (datavacas !== null) {
                // Si hay data anterior
                const vacas = JSON.parse(datavacas)
                vacas.push(itemvaca)
                AsyncStorage.setItem('animals', JSON.stringify(vacas));
              }
              else {
                const vacas = []
                vacas.push(itemvaca)
                AsyncStorage.setItem('animals', JSON.stringify(vacas));
              }
            })
              .catch((err) => {
                alert(err)
              })
            actions.resetForm();
          }).catch((err) => {
            alert(err)
          });
        }}
      >
        {(formik) => {
          return (
            <>
              <Text style={tailwind("text-xl")}>CUIG</Text>
              <RadioButton.Group
                onValueChange={formik.handleChange("code")}
                value={formik.values.code}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: "black",
                    padding: 5,
                  }}
                >
                  <CustomRadioButton title="EV833" value="EV833" />
                  <CustomRadioButton title="EV860" value="EV860" />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: "black",
                    padding: 5,
                  }}
                >
                  <CustomRadioButton title="EV841" value="EV841" />
                  <CustomRadioButton title="EV907" value="EV907" />
                </View>
              </RadioButton.Group>

              <View style={tailwind("flex-row")}>
                <View style={tailwind("items-center")}>
                  <Text style={tailwind("text-xl")}>LETRA</Text>
                  <RadioButton.Group
                    onValueChange={formik.handleChange("letter")}
                    value={formik.values.letter}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        borderRadius: 5,
                        padding: 5,
                      }}
                    >
                      <CustomRadioButton title="A" value="A" />
                      <CustomRadioButton title="B" value="B" />
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={tailwind("items-center")}>
                  <Text style={tailwind("text-xl")}>SEXO</Text>
                  <RadioButton.Group
                    onValueChange={formik.handleChange("sex")}
                    value={formik.values.sex}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        borderRadius: 5,
                        padding: 5,
                      }}
                    >
                      <CustomRadioButton title="M" value="M" />
                      <CustomRadioButton title="H" value="H" />
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
              <Text style={tailwind("text-xl")}>NÚMERO</Text>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#900",
                  padding: 5,
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={formik.values.number ? "cow" : "feature-search-outline"}
                  size={45}
                  color="white"
                  onPress={() => inputNumberRef.current.focus()}
                />
                <Text style={tailwind("text-xl text-white")}>{formik.values.number}</Text>

              </View>
              <View style={tailwind("flex m-4 justify-between")}>
                <View style={tailwind("flex-row")}>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number + "1")} style={styles.num}>
                    <Text style={tailwind("text-white")}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number + "2")} style={styles.num}>
                    <Text style={tailwind("text-white")}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number + "3")} style={styles.num}>
                    <Text style={tailwind("text-white")}>3</Text>
                  </TouchableOpacity>
                </View>
                <View style={tailwind("flex-row")}>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number + "4")} style={styles.num}>
                    <Text style={tailwind("text-white")}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number + "5")} style={styles.num}>
                    <Text style={tailwind("text-white")}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number + "6")} style={styles.num}>
                    <Text style={tailwind("text-white")}>6</Text>
                  </TouchableOpacity>
                </View>
                <View style={tailwind("flex-row")}>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number + "7")} style={styles.num}>
                    <Text style={tailwind("text-white")}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number + "8")} style={styles.num}>
                    <Text style={tailwind("text-white")}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number + "9")} style={styles.num}>
                    <Text style={tailwind("text-white")}>9</Text>
                  </TouchableOpacity>
                </View>
                <View style={tailwind("flex-row")}>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number.slice(0, -1))} style={styles.num}>
                    <Text style={tailwind("text-white")}>&lt;</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={(e) => formik.setFieldValue("number", formik.values.number + "0")} style={styles.num}>
                    <Text style={tailwind("text-white")}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.num}>
                    <Text style={tailwind("text-white")}></Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={tailwind("text-xl")}>ES OTRO?</Text>
              <View style={tailwind("items-center")}>
                <RadioButton.Group
                  onValueChange={(value) => {
                    formik.setFieldValue("other", value)
                    if (value === "true") {
                      formik.setFieldValue("code", "")
                    }
                  }}
                  value={formik.values.other}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    <CustomRadioButton title="SI" value="true" />
                    <CustomRadioButton title="NO" value="false" />
                  </View>
                </RadioButton.Group>
              </View>


              <TouchableOpacity onPress={formik.handleSubmit} style={tailwind("justify-center items-center p-4 w-4/5 rounded bg-green-600 my-2")}>
                <Text style={tailwind("text-lg text-white")}>Ingresar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={formik.resetForm} style={tailwind("justify-center items-center p-2 w-4/5 rounded bg-red-600 my-2")}>
                <Text style={tailwind("text-lg text-white")}>Limpiar formulario</Text>
              </TouchableOpacity>
            </>
          )
        }}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
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
  num: {
    width: 100, 
    height: 50, 
    margin: 2,
    backgroundColor: "blue", 
    fontSize: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  }
});

export default Inicio