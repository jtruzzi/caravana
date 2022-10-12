import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  RefreshControl,
  TextInput,
} from "react-native";
import { Formik } from "formik";

import { Text, Chip } from "react-native-paper";
import { useTailwind } from "tailwind-rn";

import { getData, setData } from "../components/utils";
import { useGetCuigs, useGetLetters } from "../hooks/config";

const Inicio = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { cuigs } = useGetCuigs(isRefreshing);
  const { letters } = useGetLetters(isRefreshing);
  const tailwind = useTailwind();

  console.info({ cuigs, letters });

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={tailwind(
        "flex bg-white justify-start items-center"
      )}
    >
      <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      <Formik
        enableReinitialize={true}
        initialValues={{
          code: "",
          letter: "",
          number: "",
          sex: "",
          comment: "",
        }}
        onSubmit={async ({ code, letter, number, sex, comment }, formik) => {
          if (!code || !letter || !number || !sex) {
            Alert.alert("Faltan rellenar campos");
            return;
          }
          const prevAnimals = await getData("animals");
          const index = prevAnimals.findIndex(
            (vaquita) =>
              vaquita.code === code &&
              vaquita.letter === letter &&
              vaquita.number === number &&
              vaquita.sex === sex
          );
          if (index !== -1) {
            Alert.alert(
              "ATENCION!",
              `ANIMAL DUPLICADO en posición ${index + 1}!`
            );
            return;
          }
          const itemvaca = {
            code,
            letter,
            number,
            sex,
            comment,
          };

          if (prevAnimals !== null) {
            prevAnimals.push(itemvaca);
            setData("animals", prevAnimals);
          } else {
            const vacas = [];
            vacas.push(itemvaca);
            setData("animals", vacas);
          }
          formik.setFieldValue("number", "");
          formik.setFieldValue("comment", "");
        }}
      >
        {(formik) => {
          return (
            <>
              <Text style={tailwind("text-xl")}>CUIG</Text>
              <View
                style={{
                  flexDirection: "row",
                  borderColor: "black",
                  alignContent: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {cuigs?.map((cuig, index) => (
                  <Chip
                    key={`cuigs-${index}`}
                    selected={cuig == formik.values.code}
                    onPress={() => {
                      formik.setFieldValue("code", cuig);
                      formik.setFieldValue("comment", "");
                    }}
                    style={tailwind("m-1")}
                    textStyle={tailwind("mx-2 my-2 text-xl")}
                  >
                    {cuig}
                  </Chip>
                ))}
              </View>

              <View style={tailwind("flex-row")}>
                <View style={tailwind("items-center")}>
                  <Text style={tailwind("text-xl")}>LETRA</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    {letters?.map((letter, index) => (
                      <Chip
                        key={`letters-${index}`}
                        selected={letter == formik.values.letter}
                        onPress={() => formik.setFieldValue("letter", letter)}
                        style={tailwind("m-1")}
                        textStyle={tailwind("mx-2 my-2 text-xl")}
                      >
                        {letter}
                      </Chip>
                    ))}
                  </View>
                </View>
                <View style={tailwind("items-center")}>
                  <Text style={tailwind("text-xl")}>SEXO</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    <Chip
                      selected={"M" == formik.values.sex}
                      onPress={() => formik.setFieldValue("sex", "M")}
                      style={tailwind("m-1")}
                      textStyle={tailwind("mx-2 my-2 text-xl")}
                    >
                      M
                    </Chip>
                    <Chip
                      selected={"H" == formik.values.sex}
                      onPress={() => formik.setFieldValue("sex", "H")}
                      style={tailwind("m-1")}
                      textStyle={tailwind("mx-2 my-2 text-xl")}
                    >
                      H
                    </Chip>
                  </View>
                </View>
              </View>
              <View style={tailwind("flex-row items-center")}>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "green",
                    opacity: 0.7,
                    padding: 8,
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>
                    {formik.values.number}
                  </Text>
                </View>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "gray",
                    width: 150,
                    padding: 10,
                    marginLeft: 20,
                  }}
                  // name="code"
                  placeholder="Comentario"
                  placeholderTextColor="gray"
                  onChangeText={(newText) =>
                    formik.setFieldValue("comment", newText)
                  }
                  value={formik.values.comment}
                />
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: 5,
                    padding: 5,
                    alignItems: "center",
                  }}
                ></View>
              </View>
              <View style={tailwind("flex m-4 justify-between")}>
                <View style={tailwind("flex-row")}>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue("number", formik.values.number + "1")
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue("number", formik.values.number + "2")
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue("number", formik.values.number + "3")
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>3</Text>
                  </TouchableOpacity>
                </View>
                <View style={tailwind("flex-row")}>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue("number", formik.values.number + "4")
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue("number", formik.values.number + "5")
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue("number", formik.values.number + "6")
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>6</Text>
                  </TouchableOpacity>
                </View>
                <View style={tailwind("flex-row")}>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue("number", formik.values.number + "7")
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue("number", formik.values.number + "8")
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue("number", formik.values.number + "9")
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>9</Text>
                  </TouchableOpacity>
                </View>
                <View style={tailwind("flex-row")}>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue(
                        "number",
                        formik.values.number.slice(0, -1)
                      )
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>&lt;</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) =>
                      formik.setFieldValue("number", formik.values.number + "0")
                    }
                    style={styles.num}
                  >
                    <Text style={tailwind("text-white")}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.num}>
                    <Text style={tailwind("text-white")}></Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={formik.handleSubmit}
                style={tailwind(
                  "justify-center items-center p-4 w-4/5 rounded bg-green-600 my-2"
                )}
              >
                <Text style={tailwind("text-lg text-white")}>Ingresar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={formik.resetForm}
                style={tailwind(
                  "justify-center items-center p-2 w-4/5 rounded bg-red-600 my-2"
                )}
              >
                <Text style={tailwind("text-lg text-white")}>
                  Limpiar formulario
                </Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

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
  },
});

export default Inicio;
