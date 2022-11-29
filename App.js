import { StyleSheet, View, Alert } from "react-native";
import { useState } from "react";

import NavBar from "./src/Components/Navbar";
import { MainScreen } from "./src/Screens/MainScreen";
import { TodoItemScreen } from "./src/Screens/TodoItemScreen";

export default function App() {
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
            setTodoId(null)
            setTodoItems((prev) => prev.filter((el) => el.id !== id))
          }
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = ({id, title}) => {
    setTodoItems(prev => prev.map(el => {
      if (el.id === id) {
        el.title = title
      }

      return el
    }))
  }

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

  return (
    <View>
      <NavBar title="Todo app!" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
