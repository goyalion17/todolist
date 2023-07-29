import { TextField } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';

type EditableSpanPropsType = {
  title: string,
  onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  }
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  return editMode
    ? <TextField onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title} autoFocus />
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}