import {
  ADD_TODO_ITEM,
  CLEAR_ERROR,
  FETCH_TODO_ITEMS,
  HIDE_LOADER,
  REMOVE_TODO_ITEM,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO_ITEM,
} from "../actionTypes";

const handlers = {
  [ADD_TODO_ITEM]: (state, { title, id }) => ({
    ...state,
    todoItems: [...state.todoItems, { title, id }],
  }),

  [REMOVE_TODO_ITEM]: (state, { id }) => ({
    ...state,
    todoItems: state.todoItems.filter((el) => el.id !== id),
  }),

  [UPDATE_TODO_ITEM]: (state, { id, title }) => ({
    ...state,
    todoItems: state.todoItems.map((el) => {
      if (el.id === id) {
        el.title = title;
      }

      return el;
    }),
  }),
  [SHOW_LOADER]: (state) => ({ ...state, isLoading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, isLoading: false }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [FETCH_TODO_ITEMS]: (state, { todoItems }) => ({ ...state, todoItems }),

  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
