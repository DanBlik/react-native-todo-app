import { StyleSheet, View, FlatList, Image } from "react-native";
import { AddTodo } from "../Components/AddTodo";
import { TodoItem } from "../Components/TodoItem";

export const MainScreen = ({
  addTodoItem,
  removeTodoItem,
  todoItems,
  openTodoHandler,
}) => {
  let content = (
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
  );

  if (!todoItems.length) {
    content = (
      <View style={styles.imgWrap}>
        <Image style={styles.img} source={require("../../assets/no-items.png")} />
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});
