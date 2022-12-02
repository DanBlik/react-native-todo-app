import { useReducer, useContext } from "react";
import { Alert } from "react-native";

import {
  REMOVE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  ADD_TODO_ITEM,
} from "../actionTypes";

import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ScreenContext } from "../Screen/screenContext";


export const TodoState = ({ children }) => {
  const { changeScreen } = useContext(ScreenContext);

  const initialState = {
    todoItems: [
      { id: "123", title: "Learn React Native" },
      { id: "1234", title: "Learn React Native 2" },
    ],
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodoItem = (title) => dispatch({ type: ADD_TODO_ITEM, title });
  const removeTodoItem = (id, title) => {
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${title}"?`,
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          onPress: () => {
            changeScreen(null);
            dispatch({ type: REMOVE_TODO_ITEM, id });
          },
        },
      ],
      { cancelable: false }
    );


  };
  const updateTodoItem = ({ id, title }) =>
    dispatch({ type: UPDATE_TODO_ITEM, title, id });

  return (
    <TodoContext.Provider
      value={{
        todoItems: state.todoItems,
        addTodoItem,
        removeTodoItem,
        updateTodoItem,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
