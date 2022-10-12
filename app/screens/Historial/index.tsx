import React, { useState, useCallback } from "react";
import Swipeout from "react-native-swipeout";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { DataTable } from "react-native-paper";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTailwind } from "tailwind-rn";
import EditForm from "./EditForm";
// TENGO QUE CAMBIAR ESTE CODIGO!
// Required to save to cache
import * as FileSystem from "expo-file-system";
// ExcelJS
import ExcelJS from "exceljs";
// Share excel via share dialog
import * as Sharing from "expo-sharing";
import { Buffer as NodeBuffer } from "buffer";
import { deleteAnimal, useGetAnimals } from "../../hooks/config";
import { setData } from "../../components/utils";

const width = Dimensions.get("window").width;

export default function Historial() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { animals } = useGetAnimals(isRefreshing);
  const [selectedAnimal, setSelectedAnimal] = useState();
  const tailwind = useTailwind();

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const generateShareableExcel = async () => {
    const now = new Date();
    const fileName = `caravana-conteo-${now.toISOString().split("T")[0]}.xlsx`;
    const fileUri = FileSystem.cacheDirectory + fileName;
    return new Promise((resolve, reject) => {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Me";
      workbook.created = now;
      workbook.modified = now;
      // Add a sheet to work on
      const worksheet = workbook.addWorksheet("Conteo", {});
      // Just some columns as used on ExcelJS Readme
      worksheet.columns = [
        { header: "CUIGLetraNumero", key: "code", width: 50 },
        { header: "Sexo", key: "sex" },
      ];

      // Add some test data
      animals.forEach((animal, index) => {
        worksheet.addRow({
          code: `${animal.code}${animal.letter}${animal.number}`,
          sex: animal.sex,
        });
      });

      // Write to file
      workbook.xlsx.writeBuffer().then((buffer) => {
        // Do this to use base64 encoding
        const nodeBuffer = NodeBuffer.from(buffer);
        const bufferStr = nodeBuffer.toString("base64");
        FileSystem.writeAsStringAsync(fileUri, bufferStr, {
          encoding: FileSystem.EncodingType.Base64,
        }).then(() => {
          resolve(fileUri);
        });
      });
    });
  };
  const shareExcel = async () => {
    const shareableExcelUri = await generateShareableExcel();
    Sharing.shareAsync(shareableExcelUri as any, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: "Exportar",
      UTI: "com.microsoft.excel.xlsx", // iOS
    }).catch((error) => {
      Alert.alert("Error al compartir el archivo");
      console.error("Error", error);
    });
  };

  return (
    <>
      <EditForm
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedAnimal={selectedAnimal}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
      />
      <ScrollView
        contentContainerStyle={tailwind(
          "flex bg-white justify-start items-center py-4"
        )}
      >
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              backgroundColor: "white",
              justifyContent: "center",
              marginTop: 50,
              marginBottom: 50,
            }}
          >
            {animals.length != 0 ? (
              <View style={{ width: width, alignItems: "center" }}>
                <TouchableOpacity
                  onPress={shareExcel}
                  style={tailwind(
                    "justify-center items-center p-2 w-4/5 rounded bg-green-600 my-1"
                  )}
                >
                  <Text style={tailwind("text-lg text-white")}>
                    EXPORTAR DATOS{" "}
                    <MaterialCommunityIcons name={"download"} size={21} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setData("animals", []);
                  }}
                  style={tailwind(
                    "justify-center items-center p-2 w-4/5 rounded bg-red-600 my-1"
                  )}
                >
                  <Text style={tailwind("text-lg text-white")}>
                    Comenzar nuevo conteo
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>
              {animals.length}
              <MaterialCommunityIcons name={"cow"} size={45} color="#900" />
            </Text>

            <ScrollView
              contentContainerStyle={{
                width: Dimensions.get("window").width,
                alignItems: "center",
              }}
            >
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Orden</DataTable.Title>
                  <DataTable.Title>Animal</DataTable.Title>
                  <DataTable.Title>Comentario</DataTable.Title>
                </DataTable.Header>
                {animals?.map((animal, index) => (
                  <TouchableOpacity
                    key={`${animal.code}-${index}`}
                    onLongPress={() => {
                      deleteAnimal(index);
                      onRefresh();
                    }}
                    delayLongPress={3000}
                  >
                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text>{index + 1}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {animal.code || "---"} ({animal.sex}) {animal.letter}
                        {animal.number.substring(0, 3)}{" "}
                        {animal.number.substring(3, 4)}
                      </DataTable.Cell>
                      <DataTable.Cell>{animal.comment}</DataTable.Cell>
                    </DataTable.Row>
                  </TouchableOpacity>
                ))}
              </DataTable>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </>
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
