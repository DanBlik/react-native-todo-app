import {
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  UPDATE_TODO_ITEM,
} from "../actionTypes";

const handlers = {
  [ADD_TODO_ITEM]: (state, { title }) => ({
    ...state,
    todoItems: [...state.todoItems, { title, id: Date.now().toString() }],
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

  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
