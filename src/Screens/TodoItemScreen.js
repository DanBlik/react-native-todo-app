import { StyleSheet, View, Dimensions } from "react-native";
import { useState, useContext } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

import { UICard } from "../Components/UI/Card";
import { EditModal } from "../Components/EditModal";
import { UIText } from "../Components/UI/Text";
import { UIButton } from "../Components/UI/Button";

import { THEME } from "../theme";

import { ScreenContext } from "../Context/Screen/screenContext";
import { TodoContext } from "../Context/Todo/todoContext";

export const TodoItemScreen = () => {
  const { todoItems, removeTodoItem, updateTodoItem } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

  const item = todoItems.find((el) => el.id === todoId);

  const [modal, setModal] = useState(false);

  const saveHandler = ({ title }) => {
    updateTodoItem({ id: item.id, title });
    setModal(false);
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
        <UIText isBold inlineStyles={styles.title}>
          {item.title}
        </UIText>

        <UIButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </UIButton>
      </UICard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <UIButton onPress={() => changeScreen(null)} color={THEME.GRAY_COLOR}>
            <AntDesign name="back" size={20} color="#fff" />
          </UIButton>
        </View>
        <View style={styles.button}>
          <UIButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodoItem(item.id, item.title)}
          >
            <FontAwesome name="remove" size={20} />
          </UIButton>
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
    width: Dimensions.get("window").width / 3,
  },
  title: {
    fontSize: 20,
  },
});
