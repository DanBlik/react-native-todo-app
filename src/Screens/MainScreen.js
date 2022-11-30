import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-safearea-height";

import { getOrientation } from "../../helpers/getOrientation";
import { AddTodo } from "../Components/AddTodo";
import { TodoItem } from "../Components/TodoItem";
import { THEME } from "../theme";

export const MainScreen = ({
  addTodoItem,
  removeTodoItem,
  todoItems,
  openTodoHandler,
}) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );

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

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        data={todoItems}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onRemove={removeTodoItem}
            onOpen={openTodoHandler}
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
