import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./Theme";
import { StatusBar } from "expo-status-bar";
import Input from "./components/Input";

//IOS - 상단 시간표시되는 공간구분하기위해 SafeAreaView
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  align-self: flex-start;
  margin: 10px 30px;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Android 상태바 구분하기위함 */}
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>Secadule List</Title>
        <Input placeholder="스케줄을 작성하세요" />
      </Container>
    </ThemeProvider>
  );
};

export default App;
