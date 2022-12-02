import { useReducer, useContext } from "react";
import { Alert } from "react-native";

import {
  REMOVE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  ADD_TODO_ITEM,
  SHOW_LOADER,
  HIDE_LOADER,
  CLEAR_ERROR,
  SHOW_ERROR,
  FETCH_TODO_ITEMS,
} from "../actionTypes";

import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ScreenContext } from "../Screen/screenContext";
import { Http } from "../../httpClass";

export const TodoState = ({ children }) => {
  const { changeScreen } = useContext(ScreenContext);

  const initialState = {
    todoItems: [],
    isLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodoItem = async (title) => {
    const data = await Http.post(
      "https://reactnative-todo-app-9d8a1-default-rtdb.firebaseio.com/todoItems.json",
      { title }
    );

    dispatch({ type: ADD_TODO_ITEM, title, id: data.name });
  };
  const removeTodoItem = (id, title) => {
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${title}"?`,
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          onPress: async () => {
            try {
              clearError();

              await Http.delete(
                `https://reactnative-todo-app-9d8a1-default-rtdb.firebaseio.com/todoItems/${id}.json`,
              );

              changeScreen(null);
              dispatch({ type: REMOVE_TODO_ITEM, id });
            } catch (error) {
              showError({ error: "Что-то пошло не так..." });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodoItem = async ({ id, title }) => {
    try {
      clearError();
      await Http.patch(
        `https://reactnative-todo-app-9d8a1-default-rtdb.firebaseio.com/todoItems/${id}.json`,
        { title }
      );

      dispatch({ type: UPDATE_TODO_ITEM, title, id });
    } catch (error) {
      showError({ error: "Что-то пошло не так..." });
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = ({ error }) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const fetchTodoItems = async () => {
    try {
      clearError();
      showLoader();

      const data = await Http.get(
        "https://reactnative-todo-app-9d8a1-default-rtdb.firebaseio.com/todoItems.json",
      );

      const todoItems = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));

      dispatch({ type: FETCH_TODO_ITEMS, todoItems });
    } catch (error) {
      showError({ error: "Что-то пошло не так..." });
      console.warn("error:", error);
    } finally {
      hideLoader();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todoItems: state.todoItems,
        isLoading: state.isLoading,
        error: state.error,
        addTodoItem,
        removeTodoItem,
        updateTodoItem,
        fetchTodoItems,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
