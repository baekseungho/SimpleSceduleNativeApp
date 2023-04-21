import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./Theme";
import { StatusBar } from "expo-status-bar";
import Input from "./components/Input";
import { images } from "./Images";
import IconButton from "./components/IconButton";
import Task from "./components/Task";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

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

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 50}px;
`;

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const [newSchedule, setNewSchedule] = useState("");
  const [tasks, setTasks] = useState({});

  // 저장하기
  const _saveTask = async (tasks) => {
    try {
      await AsyncStorage.setItem("task", JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  // 불러오기
  const _loadTask = async () => {
    const loadedTask = await AsyncStorage.getItem("task");
    setTasks(JSON.parse(loadedTask || "{}"));
  };

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newSchedule, completed: false },
    };
    setNewSchedule("");
    _saveTask({ ...tasks, ...newTaskObject }); // 배열로 담아주겠다 라는뜻
  };

  const _deleteTask = (id) => {
    const selectTasks = Object.assign({}, tasks);
    delete selectTasks[id];
    _saveTask(selectTasks);
  };

  const _completeTask = (id) => {
    const selectTasks = Object.assign({}, tasks);
    selectTasks[id]["completed"] = !selectTasks[id]["completed"];
    _saveTask(selectTasks);
  };

  const _editTask = (item) => {
    const selectTasks = Object.assign({}, tasks);
    selectTasks[item.id] = item;
    _saveTask(selectTasks);
  };

  const _handleTextChange = (text) => {
    setNewSchedule(text);
  };

  const width = Dimensions.get("window").width;

  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Android 상태바 구분하기위함 */}
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>Secadule List</Title>
        <Input
          placeholder="스케줄을 작성하세요"
          value={newSchedule}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map((item) => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                completeTask={_completeTask}
                editTask={_editTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadTask}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default App;
