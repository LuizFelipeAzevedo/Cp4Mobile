import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

export default function TaskItem({ item, onToggle, onDelete }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <Button title="Excluir" onPress={() => onDelete(item.id)} />
    </View>
  );
}
