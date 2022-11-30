import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, View, Button, StyleSheet, Alert, Keyboard } from "react-native";

import { THEME } from "../theme";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const pressHandler = (value) => {
    const trimmedValue = value.trim()
    if (trimmedValue !== '') {
      setValue('')
      Keyboard.dismiss()
      return onSubmit(trimmedValue)
    }

    Alert.alert('Ошибка! Название заметки не может быть пустым!')
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        placeholder="Введите название заметки..."
        value={value}
        autoCorrect={false}
        autoCapitalize='words'
      />

      <AntDesign.Button name="pluscircleo" onPress={() => pressHandler(value)}>
        Добавить
      </AntDesign.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  input: {
    width: "60%",
    borderStyles: "solid",
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
  },
});
