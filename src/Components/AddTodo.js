import { useState } from "react";
import { TextInput, View, Button, StyleSheet, Alert } from "react-native";

import { THEME } from "../theme";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const pressHandler = (value) => {
    const trimmedValue = value.trim()
    if (trimmedValue !== '') {
      setValue('')
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
      <Button title="Добавить" onPress={() => pressHandler(value)} />
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
    width: "70%",
    borderStyles: "solid",
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
  },
});
