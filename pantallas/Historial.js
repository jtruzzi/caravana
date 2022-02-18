
import { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get("window").width;

const vaquitas = [
  {
    "cuig": "EV833",
    "letra": "B",
    "numero": "2",
  },
  {
    "cuig": "EV841",
    "letra": "A",
    "numero": "25",
  },
  {
    "cuig": "EV841",
    "letra": "A",
    "numero": "25",
  },
  {
    "cuig": "EV841",
    "letra": "A",
    "numero": "25",
  },
];

export default function App() {

  const [data, setData] = useState([]);

  const readData = async () => {
    try {
      const dataasync = await AsyncStorage.getItem('vacas')
  
      if (dataasync !== null) {

        setData(JSON.parse(dataasync))
      }
    } catch (e) {
      alert('Error al leer AsyncStorage')
    }
  }

  useEffect(() => {
    readData()
  });

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>{data.length}<MaterialCommunityIcons
                name={"cow"}
                size={45}
                color="#900"
              /></Text>
      {data.map((item) => (
        <View style={{ width: width - 10, borderColor: 'black', borderWidth: 1, borderRadius: 5, marginVertical: 5 }}>
          <Text style={{fontWeight: 'bold'}}>{item.cuig}</Text>
          <Text>{item.letra}</Text>
          <Text>{item.numero}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white',
    justifyContent: "center"
  },
});
