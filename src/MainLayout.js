import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";

import NavBar from "./Components/Navbar";
import { MainScreen } from "./Screens/MainScreen";
import { TodoItemScreen } from "./Screens/TodoItemScreen";
import { THEME } from "./theme";

import { ScreenContext } from "./Context/Screen/screenContext";

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  let content = <MainScreen />;

  if (todoId) {
    content = <TodoItemScreen />;
  }

  return (
    <View>
      <NavBar title="Todo app!" />
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
