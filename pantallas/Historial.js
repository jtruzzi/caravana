import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";

import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tailwind from "tailwind-rn";
// TENGO QUE CAMBIAR ESTE CODIGO!
// Required to save to cache 
import * as FileSystem from 'expo-file-system';
// ExcelJS
import ExcelJS from 'exceljs';
// Share excel via share dialog
import * as Sharing from 'expo-sharing';
import { Buffer as NodeBuffer } from 'buffer';

const width = Dimensions.get("window").width;

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [animals, setAnimals] = useState([]);

  const readStorage = async () => {
    try {
      const dataasync = await AsyncStorage.getItem("animals");

      if (dataasync !== null) {
        setAnimals([...JSON.parse(dataasync)]);
      }
    } catch (e) {
      alert("Error al leer AsyncStorage");
    }
  };

  useEffect(() => {
    readStorage();
  });

  const generateShareableExcel = async () => {
    const now = new Date();
    const fileName = `caravana-conteo-${now.toISOString().split('T')[0]}.xlsx`;
    const fileUri = FileSystem.cacheDirectory + fileName;
    return new Promise((resolve, reject) => {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Me';
      workbook.created = now;
      workbook.modified = now;
      // Add a sheet to work on
      const worksheet = workbook.addWorksheet('Conteo', {});
      // Just some columns as used on ExcelJS Readme
      worksheet.columns = [
        { header: 'CUIGLetraNumero', key: 'code', width: 50 },
        { header: 'Sexo', key: 'sex' }
      ];

      // Add some test data
      animals.forEach((animal, index) => {
        worksheet.addRow({ code: `${animal.code}${animal.letter}${animal.number}`, sex: animal.sex });
      });

      // Write to file
      workbook.xlsx.writeBuffer().then((buffer) => {
        // Do this to use base64 encoding
        const nodeBuffer = NodeBuffer.from(buffer);
        const bufferStr = nodeBuffer.toString('base64');
        FileSystem.writeAsStringAsync(fileUri, bufferStr, {
          encoding: FileSystem.EncodingType.Base64
        }).then(() => {
          resolve(fileUri);
        });
      });
    });
  };
  const shareExcel = async () => {
    const shareableExcelUri = await generateShareableExcel();
    Sharing.shareAsync(shareableExcelUri, {
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      dialogTitle: 'Exportar',
      UTI: 'com.microsoft.excel.xlsx' // iOS
    }).catch(error => {
      Alert.alert("Error al compartir el archivo")
      console.error('Error', error);
    })
  };

  // const convertArrayToCSV = () => {
  //   const csvString = [
  //     [
  //       "CUIGLetraNumero",
  //       "Sexo",
  //     ],
  //     ...animals.map(animal => [
  //       `${animal.code}${animal.letter}${animal.number}`,
  //       animal.sex,
  //     ])
  //   ].map(e => e.join(","))
  //     .join("\n");;

  //   return csvString
  // }

  return (
    <View style={styles.container}>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
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
              <Text style={tailwind("text-gray-800 text-xl font-medium mt-4")}>
                Lista de animales
              </Text>

              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderBottomColor: '#000000',
                  borderBottomWidth: 1,
                  height: 300,
                }}>
                <Text selectable={true}>{convertArrayToCSV(animals)}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={tailwind(
                  "bg-indigo-600 w-full py-2 items-center rounded-md mt-6"
                )}
              >
                <Text style={tailwind("text-white font-medium")}>
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
      <View
        style={{
          width: "100%",
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
            {animals.length}
            <MaterialCommunityIcons name={"cow"} size={45} color="#900" />
          </Text>
          {animals.reverse().map((animal, index) => (
            <View
              key={index}
              style={tailwind(
                `justify-center items-center rounded bg-green-400 my-2 w-full`
              )}
            >
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={{ color: "black", fontSize: 40, margin: 10 }}>{animals.length - index}</Text>
                </View>
                <View style={{ margin: 10, borderColor: 'black', display: "flex", alignItems: "center" }}>
                  <Text style={{ fontSize: 35 }}>{animal.code || "---"} ({animal.sex})</Text>
                  <Text style={{ fontSize: 35 }}>{animal.letter}{animal.number.substring(0, 3)}
                    <Text style={{ fontSize: 25, color: "#900" }}>{animal.number.substring(3, 4)}</Text>
                  </Text>
                </View>
              </View>
            </View>
          ))}
          {animals.length != 0 ? <View style={{ width: width, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={
                shareExcel
              }
              style={tailwind(
                "justify-center items-center p-4 w-4/5 rounded bg-green-600 my-2"
              )}
            >
              <Text style={tailwind("text-lg text-white")}>
                EXPORTAR DATOS{" "}<MaterialCommunityIcons name={"download"} size={21} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.setItem("animals", JSON.stringify([]));
              }}
              style={tailwind(
                "justify-center items-center p-4 w-4/5 rounded bg-red-600 my-2"
              )}
            >
              <Text style={tailwind("text-lg text-white")}>Comenzar nuevo conteo</Text>
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
