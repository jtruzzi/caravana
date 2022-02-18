import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Text } from 'react-native-paper';

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
];

export default function App() {
  return (
    <View style={styles.container}>
      {vaquitas.map((item) => (
        <View style={{ width: width - 10, borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
          <Text>{item.cuig}</Text>
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
