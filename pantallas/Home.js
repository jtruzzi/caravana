
import { useRef } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Keyboard
} from "react-native";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { Formik } from "formik";

import { RadioButton, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import tailwind from "tailwind-rn";
import CustomRadioButton from "../components/CustomRadioButton";


export default function Home({ animals, setAnimals }) {
  const handleReset = (formik) => {
    setAnimals([]);
    formik.resetForm();
    Keyboard.dismiss();
  }

  const inputNumberRef = useRef();

  const addCow = ({ code, letter, number, sex }, actions) => {
    if (!code || !letter || !number) {
      return;
    }
    try {
      const index = animals.findIndex(
        (animal) =>
          animal.code === code &&
          animal.letter === letter &&
          animal.number === number
      );
      if (index !== -1) {
        Alert.alert("ATENCION!", `ANIMAL DUPLICADO en posición ${index}!`);
        return;
      }
      setAnimals(animals => [...animals, { code, letter, number, sex }])
      actions.resetForm();
    }
    catch (err) {
      console.info({ err })
    }
  }

  return (
    <ScrollView contentContainerStyle={tailwind("flex bg-white justify-center items-center")}>
      <Formik
        initialValues={{ code: "", letter: "", sex: "", number: "" }}
        onSubmit={addCow}
      >
        {(formik) => (
          <>
            <View>
              <View style={tailwind("w-10 h-10 border-2 flex items-center justify-center")}>
                <Text style={tailwind("text-4xl")}>{animals.length}</Text>
              </View>
            </View>
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
                    <CustomRadioButton title="F" value="F" />
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
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons
                name={formik.values.number ? "cow" : "feature-search-outline"}
                size={45}
                color="white"
                onPress={() => inputNumberRef.current.focus()}
              />
              <SmoothPinCodeInput
                cellStyle={{
                  borderBottomWidth: 2,
                  borderColor: 'white',
                }}
                cellStyleFocused={{
                  borderColor: 'white',
                }}
                textStyle={{
                  color: 'white',
                  fontSize: 24
                }}
                ref={inputNumberRef}
                value={formik.values.number}
                onTextChange={formik.handleChange('number')}
                onFulfill={() => { formik.submitForm(); Keyboard.dismiss() }}
              />
            </View>

            <TouchableOpacity onPress={formik.handleSubmit} style={tailwind("justify-center items-center p-4 w-4/5 rounded bg-green-600 my-2")}>
              <Text style={tailwind("text-lg text-white")}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              handleReset(formik);
            }} style={tailwind("justify-center items-center p-4 w-4/5 rounded bg-red-600 my-2")}>
              <Text style={tailwind("text-lg text-white")}>Limpiar</Text>
            </TouchableOpacity>
          </>
        )}
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
});
