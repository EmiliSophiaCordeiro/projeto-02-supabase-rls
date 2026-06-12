import { useState } from 'react';
import {
  View,
  TextInput,
  Button
} from 'react-native';

import { supabase } from '../services/supabase';

export default function RegisterScreen() {

  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');

  async function cadastrar(role) {

    const { data,error } =
      await supabase.auth.signUp({
        email,
        password:senha
      });

    if(error){
      alert(error.message);
      return;
    }

    await supabase
      .from('profiles')
      .insert({
        id:data.user.id,
        nome,
        role
      });

    alert('Usuário criado');
  }

  return (
    <View style={{padding:20}}>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button
        title="Cadastrar Médico"
        onPress={() =>
          cadastrar('medico')
        }
      />

      <Button
        title="Cadastrar Paciente"
        onPress={() =>
          cadastrar('paciente')
        }
      />

    </View>
  );
}