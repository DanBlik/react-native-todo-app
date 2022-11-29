import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export const TodoItem = ({ item, onRemove, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(item.id)}
      onLongPress={() => onRemove(item.id)}
    >
      <View style={s.todoItem}>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  todoItem: {
    alignItems: "flex-start",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
    color: "blue",
  },
});
