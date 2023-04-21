import React, { useState } from "react";
import styled from "styled-components";
import PorpTypes from "prop-types";
import IconButton from "./IconButton";
import { images } from "../Images";
import Input from "./Input";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0;
`;

const Content = styled.Text`
  flex: 1;
  font-size: 25px;
  text-decoration-line: ${({ completed }) =>
    completed ? "line-through" : "none"};
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
`;

const Task = ({ item, deleteTask, completeTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [text, setText] = useState(item.text);

  const _updateText = () => {
    setIsEditing(true);
  };

  const _onSubmit = () => {
    if (isEditing) {
      const editText = Object.assign({}, item, { text });
      setIsEditing(false);
      editTask(editText);
    }
  };

  return isEditing ? (
    <Input
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={_onSubmit}
    />
  ) : (
    <Container>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted}
        id={item.id}
        onPressOut={completeTask}
        completed={item.completed}
      />
      <Content completed={item.completed}>{item.text}</Content>
      {item.completed || (
        <IconButton type={images.update} onPressOut={_updateText} />
      )}
      <IconButton
        type={images.delete}
        id={item.id}
        onPressOut={deleteTask}
        completed={item.completed}
      />
    </Container>
  );
};

export default Task;
