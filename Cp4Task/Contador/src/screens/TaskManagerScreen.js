// src/screens/TaskManagerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';

export default function TaskManagerScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.error('Erro ao carregar tarefas', e);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasksToSave));
    } catch (e) {
      console.error('Erro ao salvar tarefas', e);
    }
  };

  const handleAddTask = () => {
    if (!task.trim()) {
      Alert.alert('Erro', 'Por favor, insira uma tarefa válida.');
      return;
    }

    const newTask = { id: Date.now().toString(), text: task, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTask('');
  };

  const handleToggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    Alert.alert('Confirmação', 'Deseja realmente excluir a tarefa?', [
      { text: 'Cancelar' },
      {
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter((item) => item.id !== id);
          setTasks(updatedTasks);
          saveTasks(updatedTasks);
        },
      },
    ]);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Gerenciador de Tarefas</Text>
      <TextInput
        placeholder="Digite a tarefa"
        value={task}
        onChangeText={setTask}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Adicionar Tarefa" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={handleToggleTaskCompletion} onDelete={handleDeleteTask} />
        )}
      />
    </View>
  );
}
