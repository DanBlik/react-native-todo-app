import { useEffect, useState, useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-safearea-height";

import { getOrientation } from "../../helpers/getOrientation";
import { AddTodo } from "../Components/AddTodo";
import { TodoItem } from "../Components/TodoItem";
import { UILoader } from "../Components/UI/Loader";

import { ScreenContext } from "../Context/Screen/screenContext";
import { TodoContext } from "../Context/Todo/todoContext";
import { UIText } from "../Components/UI/Text";

import { THEME } from "../theme";
import { UIButton } from "../Components/UI/Button";

export const MainScreen = () => {
  const {
    todoItems,
    addTodoItem,
    removeTodoItem,
    fetchTodoItems,
    isLoading,
    error,
  } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );

  const loadTodoItems = useCallback(async () => fetchTodoItems(), [todoItems]);

  useEffect(() => {
    loadTodoItems();
  }, []);

  useEffect(() => {
    const handler = Dimensions.addEventListener("change", () => {
      const { width, height } = Dimensions.get("screen");
      const orientation = getOrientation({ width, height });

      const currentWidth =
        Dimensions.get("window").width -
        THEME.PADDING_HORIZONTAL * 2 -
        (orientation === "horizontal" ? getStatusBarHeight() : 0);

      setDeviceWidth(currentWidth);
    });

    return () => handler?.remove();
  });

  if (isLoading) {
    return <UILoader />;
  }

  if (error) {
    return (
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      }}>
        <UIText
          inlineStyles={{
            color: THEME.DANGER_COLOR,
            paddingVertical: 20
          }}
        >
          {error}
        </UIText>
        <UIButton onPress={loadTodoItems}>Повторить</UIButton>
      </View>
    );
  }

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        data={todoItems}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onRemove={removeTodoItem}
            onOpen={changeScreen}
          />
        )}
      />
    </View>
  );

  if (!todoItems.length) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.img}
          source={require("../../assets/no-items.png")}
        />
      </View>
    );
  }

  return (
    <View>
      <View>
        <AddTodo onSubmit={addTodoItem} />

        {content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
  },
  img: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    resizeMode: "contain",
  },
});
