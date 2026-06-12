import { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

import { supabase } from '../services/supabase';

export default function LoginScreen({ navigation }) {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  async function login() {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if(error){
      alert(error.message);
      return;
    }

    const user =
      (await supabase.auth.getUser())
      .data.user;

    const { data } =
      await supabase
      .from('profiles')
      .select('*')
      .eq('id',user.id)
      .single();

    if(data.role === 'medico'){
      navigation.replace('Medico');
    }else{
      navigation.replace('Paciente');
    }
  }

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        onPress={login}
      />

      <Button
        title="Cadastrar"
        onPress={() =>
          navigation.navigate('Cadastro')
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    padding:20
  },
  input:{
    borderWidth:1,
    marginBottom:10,
    padding:10
  }
});