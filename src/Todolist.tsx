import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {/* map - это метод массива, который на основе каждого объекта или элемента массива создаёт какой-то другой элемент */}
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox
                onChange={onChangeStatusHandler}
                checked={t.isDone}
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button color={"primary"}
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button color={"secondary"}
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
