import { v1 } from "uuid";
import { todolistsReducer } from "./todolists-reducer";
import { TodolistType } from "../App";


test("correct todolist should be removed", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todoListId1, title: "What to lern", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(startState, { type: "REMOVE-TODOLIST", id: todoListId1});

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});
