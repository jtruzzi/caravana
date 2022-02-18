
import { useRef } from "react"
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from "tailwind-rn";
import CustomRadioButton from "../components/CustomRadioButton";

let vaquitas = [];

export default function App() {
  const handleReset = (formik) => {
    formik.resetForm();
    Keyboard.dismiss();
  }

  const inputNumeroRef = useRef();

  return (
    <ScrollView contentContainerStyle={tailwind("flex bg-white justify-center items-center")}>
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
          const itemvaca = {
            cuig: cuig,
            letra:  letra,
            numero: numero
          }
          AsyncStorage.getItem('vacas').then((datavacas)=>{
            if (datavacas !== null) {
              // We have data!!
              const vacas = JSON.parse(datavacas)
              vacas.push(itemvaca)
              AsyncStorage.setItem('vacas',JSON.stringify(vacas));
            }
            else{
              const vacas  = []
              cart.push(itemvacas)
              AsyncStorage.setItem('vacas',JSON.stringify(vacas));
            }
            alert("Add vacas")
          })
          .catch((err)=>{
            alert(err)
          })
          console.log(vaquitas);
          actions.resetForm();
        }}
      >
        {(formik) => (
          <>
            <Text style={tailwind("text-xl")}>CUIG</Text>
            <RadioButton.Group
              onValueChange={formik.handleChange("cuig")}
              value={formik.values.cuig}
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

            <Text style={tailwind("text-xl")}>LETRA</Text>
            <RadioButton.Group
              onValueChange={formik.handleChange("letra")}
              value={formik.values.letra}
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
                name={formik.values.numero ? "cow" : "feature-search-outline"}
                size={45}
                color="white"
                onPress={() => inputNumeroRef.current.focus()}
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
                ref={inputNumeroRef}
                value={formik.values.numero}
                onTextChange={formik.handleChange('numero')}
                onFulfill={() => { formik.submitForm(); Keyboard.dismiss() }}
              />
            </View>

            <TouchableOpacity onPress={formik.handleSubmit} style={tailwind("justify-center items-center p-4 w-4/5 rounded bg-green-600 my-2")}>
              <Text style={tailwind("text-lg text-white")}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              handleReset(formik); vaquitas = [];
            }} style={tailwind("justify-center items-center p-4 w-4/5 rounded bg-red-600 my-2")}>
              <Text style={tailwind("text-lg text-white")}>Limpiar</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView >
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
