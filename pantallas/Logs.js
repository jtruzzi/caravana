import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import tailwind from "tailwind-rn";

import { Text } from 'react-native-paper';

const width = Dimensions.get("window").width;

export default function Logs({ animals }) {
  return (
    <ScrollView contentContainerStyle={tailwind("flex bg-white justify-center items-center")}>
      <View style={styles.container}>
        {animals.reverse().map((animal, index) => (
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View><Text style={{ color: "black", fontSize: 40 }}>{animals.length - index}</Text></View>
            <View style={{ width: "70%", margin: 10, borderColor: 'black', borderWidth: 1, borderRadius: 5, display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: "35px" }}></Text>
              <Text style={{ fontSize: "35px" }}>{animal.code} ({animal.sex})</Text>
              <Text style={{ fontSize: "35px" }}>{animal.letter}{animal.number.substring(0, 3)}<Text style={{ fontSize: "25px", color: "#900" }}>{animal.number.substring(3, 4)}</Text></Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white',
    justifyContent: "flex-start"
  },
});
