import { StyleSheet, View, Alert, SafeAreaView } from "react-native";
import { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import NavBar from "./src/Components/Navbar";
import { MainScreen } from "./src/Screens/MainScreen";
import { TodoItemScreen } from "./src/Screens/TodoItemScreen";
import { THEME } from "./src/theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "roboto-regular": require("./assets/Fonts/Roboto/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/Fonts/Roboto/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [todoId, setTodoId] = useState(null);
  const [todoItems, setTodoItems] = useState([]);

  const addTodoItem = (title) => {
    setTodoItems((prev) => [...prev, { id: Date.now().toString(), title }]);
  };

  const removeTodoItem = (id) => {
    const currentItem = todoItems.find((el) => el.id === id);

    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${currentItem.title}"?`,
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          onPress: () => {
            setTodoId(null);
            setTodoItems((prev) => prev.filter((el) => el.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = ({ id, title }) => {
    setTodoItems((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          el.title = title;
        }

        return el;
      })
    );
  };

  let content = (
    <MainScreen
      todoItems={todoItems}
      addTodoItem={addTodoItem}
      removeTodoItem={removeTodoItem}
      openTodoHandler={(id) => setTodoId(id)}
    />
  );

  if (todoId) {
    content = (
      <TodoItemScreen
        item={todoItems.find((el) => el.id === todoId)}
        goBack={() => setTodoId(null)}
        onRemove={removeTodoItem}
        onSave={updateTodo}
      />
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <View onLayout={onLayoutRootView}>
        <NavBar title="Todo app!" />
        <View style={styles.container}>{content}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
