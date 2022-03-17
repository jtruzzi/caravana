import { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput,
  Text,
  RefreshControl
} from "react-native";
// import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { Formik, FieldArray } from "formik";
import { Snackbar } from 'react-native-paper';

import { MaterialCommunityIcons } from "react-native-vector-icons";
import tailwind from "tailwind-rn";
import { getData, setData } from "../components/utils";

const Config = () => {
  const [config, setConfig] = useState();
  useEffect(async () => {

    try {
      const storedConfig = await getData("config");
      setConfig(storedConfig);
    } catch (e) {
      alert(e.message);
      alert("Error al leer la configuración");
    }
  }, [])

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const storedConfig = await getData("config");
    setConfig(storedConfig);
    return new Promise(resolve => setTimeout(resolve, 2000)).then(() => setRefreshing(false));
  }, []);


  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <ScrollView contentContainerStyle={tailwind("flex bg-white justify-start items-center")}>
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />

        <Formik
          enableReinitialize={true}
          initialValues={config}
          onSubmit={async (values, actions) => {
            await setData('config', values);
            onToggleSnackBar();
          }}
        >
          {(formik) => {
            return (
              <View style={tailwind("w-full px-4")}>
                <Text>Códigos CUIG</Text>
                <FieldArray
                  name={"cuigs"}
                  validateOnChange={true}
                  render={arrayHelpers => (
                    <>
                      {formik.values?.cuigs?.map((cuig, index) => (
                        <View key={`cuig-form-${index}`} style={tailwind("w-full flex flex-row")}>
                          <TextInput
                            name={`cuigs[${index}]`}
                            onChangeText={formik.handleChange(`cuigs[${index}]`)}
                            placeholder="Ingresar CUIG"
                            value={cuig}
                            style={tailwind("text-xl border rounded px-2 my-2 flex-grow mr-2")}
                          />
                          <TouchableOpacity
                            onPress={() => arrayHelpers.remove(index)}
                            style={tailwind("justify-center items-center px-4 h-10 rounded bg-red-600 my-2")}
                          >
                            <MaterialCommunityIcons name={"minus"} color={'#fff'} size={25} />
                          </TouchableOpacity>
                        </View>
                      ))}
                      <View style={tailwind("w-full flex flex-row")}>
                        <TouchableOpacity
                          onPress={() => arrayHelpers.push('')}
                          style={tailwind("justify-center items-center px-4 h-10 rounded bg-green-600 my-2")}
                        >
                          <MaterialCommunityIcons name={"plus"} color={'#fff'} size={25} />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                />
                <TouchableOpacity
                  onPress={formik.handleSubmit}
                  style={tailwind(`flex flex-row justify-center items-center px-4 h-10 rounded bg-green-600 my-2 ${formik.isSubmitting || !formik.dirty ? 'bg-black' : ''}`)}
                >
                  <Text style={tailwind('text-white')}>GUARDAR</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        </Formik>

      </ScrollView>
      <Snackbar
        style={tailwind('bg-green-600 flex-col items-center')}
        visible={visible}
        onDismiss={onDismissSnackBar}
      >
        La configuración fue guardada!
      </Snackbar>
    </>
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
    backgroundColor: "gray",
    fontSize: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  }
});

export default Config