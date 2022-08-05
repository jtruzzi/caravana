import {
    View,
    TouchableOpacity,
    Modal,
    Text,
    TextInput
} from "react-native";
import tailwind from "tailwind-rn";
import { useFormik } from "formik";
import { Chip } from "react-native-paper";

const EditForm = ({ open, onClose, selectedAnimal }) => {
    const initialValues = {
        code: selectedAnimal?.code || "",
        letter: selectedAnimal?.letter || "",
        number: selectedAnimal?.number || "",
        sex: selectedAnimal?.sex || "",
        other: selectedAnimal?.other || false
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    const handleDelete = () => {
        alert("DELETE!")
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={onClose}
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
                            Animal
                        </Text>
                        <TextInput
                            style={tailwind("border w-full rounded h-10 p-2 m-2")}
                            name="code"
                            onChangeText={formik.handleChange}
                            value={formik.values.code}
                        />
                        <TextInput
                            style={tailwind("border w-full rounded h-10 p-2 m-2")}
                            name="number"
                            onChangeText={formik.handleChange}
                            value={formik.values.number}
                        />
                        <View style={tailwind("items-center")}>
                            <Text style={tailwind("text-xl")}>LETRA</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    borderRadius: 5,
                                    padding: 5,
                                }}
                            >
                                <Chip
                                    selected={'A' == formik.values.letter}
                                    onPress={() => formik.setFieldValue('letter', 'A')}
                                    style={tailwind('m-1')}
                                    textStyle={tailwind('mx-2 my-2 text-xl')}
                                >A</Chip>
                                <Chip
                                    selected={'B' == formik.values.letter}
                                    onPress={() => formik.setFieldValue('letter', 'B')}
                                    style={tailwind('m-1')}
                                    textStyle={tailwind('mx-2 my-2 text-xl')}
                                >B</Chip>
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
                                    selected={'M' == formik.values.sex}
                                    onPress={() => formik.setFieldValue('sex', 'M')}
                                    style={tailwind('m-1')}
                                    textStyle={tailwind('mx-2 my-2 text-xl')}
                                >M</Chip>
                                <Chip
                                    selected={'H' == formik.values.sex}
                                    onPress={() => formik.setFieldValue('sex', 'H')}
                                    style={tailwind('m-1')}
                                    textStyle={tailwind('mx-2 my-2 text-xl')}
                                >H</Chip>
                            </View>
                        </View>
                        <Chip
                            selected={formik.values.other === 'true'}
                            onPress={() => {
                                const value = formik.values.other == "true" ? "false" : "true";
                                formik.setFieldValue("other", value)
                                if (value === "true") {
                                    formik.setFieldValue("code", "")
                                }
                            }}
                            style={tailwind('mx-1 h-12')}
                            textStyle={tailwind('mx-2')}
                        >Es Otro?</Chip>
                        <TouchableOpacity
                            onPress={formik.handleSubmit}
                            style={tailwind(
                                "bg-indigo-600 w-full py-2 items-center rounded-md mt-2"
                            )}
                        >
                            <Text style={tailwind("text-white font-medium")}>
                                Guardar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleDelete}
                            style={tailwind(
                                "bg-red-600 w-full py-2 items-center rounded-md mt-2"
                            )}
                        >
                            <Text style={tailwind("text-white font-medium")}>
                                Eliminar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onClose}
                            style={tailwind(
                                "bg-red-600 w-full py-2 items-center rounded-md mt-2"
                            )}
                        >
                            <Text style={tailwind("text-white font-medium")}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

export default EditForm;