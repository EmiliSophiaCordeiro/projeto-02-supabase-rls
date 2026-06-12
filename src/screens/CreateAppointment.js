import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

import { supabase } from '../services/supabase';

export default function CreateAppointment({ navigation }) {

  const [dataConsulta, setDataConsulta] =
    useState('');

  const [horario, setHorario] =
    useState('');

  const [sintomas, setSintomas] =
    useState('');

  async function criarConsulta() {

    const user =
      (await supabase.auth.getUser())
      .data.user;

    const { error } =
      await supabase
        .from('consultas')
        .insert({
          paciente_id: user.id,
          data_consulta: dataConsulta,
          horario,
          sintomas,
          status: 'Agendada'
        });

    if (error) {
      alert(error.message);
      return;
    }

    alert('Consulta agendada com sucesso!');

    navigation.goBack();
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Nova Consulta
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Data (2026-06-15)"
        value={dataConsulta}
        onChangeText={setDataConsulta}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário (14:00)"
        value={horario}
        onChangeText={setHorario}
      />

      <TextInput
        style={[
          styles.input,
          { height: 120 }
        ]}
        multiline
        placeholder="Descreva seus sintomas"
        value={sintomas}
        onChangeText={setSintomas}
      />

      <Button
        title="Agendar Consulta"
        onPress={criarConsulta}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15
  }
});