import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

const CustomRadioButton = ({ title, value }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
      }}
    >
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        {title}
      </Text>
      <RadioButton value={value} color={"white"} uncheckedColor="white" />
    </View>
  );
};

export default CustomRadioButton;
