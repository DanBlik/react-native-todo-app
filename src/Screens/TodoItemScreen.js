import { StyleSheet, View, Text, Button } from "react-native";
import { useState } from "react";

import { UICard } from "../Components/UI/Card";
import { EditModal } from "../Components/EditModal";

import { THEME } from "../theme";

export const TodoItemScreen = ({ item, goBack, onRemove, onSave }) => {
  const [modal, setModal] = useState(false);

  const saveHandler = ({ title }) => {
    onSave({ id: item.id, title });
    setModal(false)
  };

  return (
    <View>
      <EditModal
        isVisible={modal}
        value={item.title}
        onClose={() => setModal(false)}
        onSave={saveHandler}
      />

      <UICard inlineStyles={{ marginBottom: 20 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Button title="Ред." onPress={() => setModal(true)} />
      </UICard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Назад" onPress={goBack} color={THEME.GRAY_COLOR} />
        </View>
        <View style={styles.button}>
          <Button
            title="Удалить"
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(item.id)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
  },
  title: {
    fontSize: 20,
  },
});
