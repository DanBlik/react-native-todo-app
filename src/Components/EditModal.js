import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";

import { UIButton } from "./UI/Button";
import { THEME } from "../theme";

export const EditModal = ({ isVisible, onClose, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert("Ошибка!", `Минимальная длина названия 3 символа`);
    } else {
      onSave({ title });
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={s.wrap}>
        <View style={s.input}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Введите название"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={64}
          />
        </View>

        <View style={s.buttons}>
          <UIButton onPress={onClose} color={THEME.DANGER_COLOR}>
            Отменить
          </UIButton>

          <UIButton onPress={() => saveHandler()}>Сохранить</UIButton>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    width: "80%",
    borderBottomWidth: 2,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: "100%",
    marginTop: 10,
  },
});
