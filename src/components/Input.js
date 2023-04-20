import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native"; //열린창의 너비를 구하는것

const StyleInput = styled.TextInput.attrs(({ theme }) => {
  placeholderTextColor: theme.main;
})`
  width: ${({ width }) => width - 50}px;
  height: 60px;
  margin: 5px 0;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 25px;
  color: ${({ theme }) => theme.text};
`;

const Input = ({ placeholder }) => {
  const width = Dimensions.get("window").width;
  return (
    <StyleInput
      placeholder={placeholder}
      maxLength={50}
      width={width}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      keyboardAppearance="dark" //IOS만 적용
    />
  );
};

export default Input;
