import { v1 } from "uuid";
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistFilterActionType, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from "./todolists-reducer";
import { FilterValuesType, TodolistType } from "../App";

test("correct todolist should be removed", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todoListId1, title: "What to lern", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(startState, RemoveTodolistAC(todoListId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todoList should be added", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodolistType> = [
    { id: todoListId1, title: "What to lern", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todoList should change its name", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodolistType> = [
    { id: todoListId1, title: "What to lern", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todoListId2, newTodolistTitle));

  expect(endState[0].title).toBe("What to lern");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter should change its name", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newFilter: FilterValuesType = "completed";

  const startState: Array<TodolistType> = [
    { id: todoListId1, title: "What to lern", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ]; 

  const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todoListId2, newFilter));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
