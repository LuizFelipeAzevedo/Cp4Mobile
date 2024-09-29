// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Configurações do Aplicativo</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Versão: 1.0.0</Text>
      <Text style={{ marginBottom: 10 }}>Aqui você pode ajustar suas preferências.</Text>

      <Button title="Alterar Tema" onPress={() => alert('Função de alterar tema ainda não implementada')} />
      <Button title="Notificações" onPress={() => alert('Função de notificações ainda não implementada')} />
      <Button title="Limpar Histórico" onPress={() => alert('Função de limpar histórico ainda não implementada')} />
    </View>
  );
}
