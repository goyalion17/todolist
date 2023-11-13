import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST",
  id: string
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST",
  title: string
};
export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE",
  id: string,
  title: string
};
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER",
  id: string,
  filter: FilterValuesType
};

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (
  state: Array<TodolistType>,
  action: ActionsType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        ...state,
        {
          id: v1(),
          title: action.title,
          filter: "all",
        },
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      let todolist = state.find((tl) => tl.id === action.id);
    if (todolist) {
      todolist.filter = action.filter
    }
      return [...state];
    }
    default:
      throw new Error("I don't understand this action type");
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title };
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter };
}
