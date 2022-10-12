import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Modal,
  Text,
  TextInput,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useFormik } from "formik";
import { Chip } from "react-native-paper";
import { deleteAnimal, updateAnimal, useGetCuigs } from "../../hooks/config";

const EditForm = ({
  open,
  onClose,
  selectedAnimal,
  onRefresh,
  isRefreshing,
}) => {
  const { cuigs } = useGetCuigs(isRefreshing);

  const tailwind = useTailwind();
  const initialValues = {
    index: selectedAnimal?.index || "",
    code: selectedAnimal?.code || "",
    letter: selectedAnimal?.letter || "",
    number: selectedAnimal?.number || "",
    sex: selectedAnimal?.sex || "",
    comment: selectedAnimal?.comment || false,
  };

  console.info({ initialValues });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: (values) => {
      console.info(values);
      updateAnimal(values);
      onRefresh();
      onClose();
    },
  });

  const handleDelete = () => {
    deleteAnimal(selectedAnimal.code);
    onRefresh();
    onClose();
  };

  return (
    <Modal transparent={false} visible={open} onRequestClose={onClose}>
      <ScrollView
        contentContainerStyle={tailwind(
          "flex bg-white justify-start items-center py-4"
        )}
      >
        <View>
          <View style={tailwind("bg-white w-full p-6 rounded-lg items-center")}>
            <Text style={tailwind("text-gray-800 text-xl font-medium mt-4")}>
              CUIG
            </Text>
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
                  }}
                  style={tailwind("m-1")}
                  textStyle={tailwind("mx-2 my-2 text-xl")}
                >
                  {cuig}
                </Chip>
              ))}
            </View>
            <View style={tailwind("items-center")}>
              <Text style={tailwind("text-xl")}>Número</Text>
              <TextInput
                style={tailwind("border w-full rounded h-10 p-2 m-2")}
                keyboardType="numeric"
                onChangeText={(newText) =>
                  formik.setFieldValue("number", newText)
                }
                value={formik.values.number}
              />
            </View>
            <View style={tailwind("items-center")}>
              <Text style={tailwind("text-xl")}>Letra</Text>
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <Chip
                  selected={"A" == formik.values.letter}
                  onPress={() => formik.setFieldValue("letter", "A")}
                  style={tailwind("m-1")}
                  textStyle={tailwind("mx-2 my-2 text-xl")}
                >
                  A
                </Chip>
                <Chip
                  selected={"B" == formik.values.letter}
                  onPress={() => formik.setFieldValue("letter", "B")}
                  style={tailwind("m-1")}
                  textStyle={tailwind("mx-2 my-2 text-xl")}
                >
                  B
                </Chip>
              </View>
            </View>

            <View style={tailwind("items-center")}>
              <Text style={tailwind("text-xl")}>Sexo</Text>
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
            <View style={tailwind("items-center")}>
              <Text style={tailwind("text-xl")}>Comentario</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "black",
                  padding: 10,
                  margin: 10,
                  minWidth: 150,
                }}
                // name="code"
                placeholder="Comentario"
                placeholderTextColor={"gray"}
                onChangeText={(newText) =>
                  formik.setFieldValue("comment", newText)
                }
                value={formik.values.comment}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={formik.handleSubmit}
                style={tailwind(
                  "bg-indigo-600 px-4 py-2 items-center rounded-md"
                )}
              >
                <Text style={tailwind("text-white font-medium")}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={tailwind(
                  "bg-red-600 px-4 py-2 items-center rounded-md mt-2"
                )}
              >
                <Text style={tailwind("text-white font-medium")}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                style={tailwind(
                  "bg-red-600 px-4 py-2 items-center rounded-md mt-2"
                )}
              >
                <Text style={tailwind("text-white font-medium")}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditForm;
