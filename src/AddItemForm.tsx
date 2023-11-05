import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  };
  const addTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Field is required");
    }
  };

  return (
    <div>
      <TextField
        value={title}
        onChange={onChangeHandler}
        onKeyPress={OnKeyPressHandler}
        error={!!error}
        variant={"outlined"}
        label={"Type value"}
        helperText={error}
      />
      <IconButton onClick={addTask} color={"primary"}>
        <ControlPoint />
      </IconButton>
    </div>
  );
}
