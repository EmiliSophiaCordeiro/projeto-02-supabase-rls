import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import { supabase } from '../services/supabase';

export default function ProfileScreen({ navigation }) {

  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');

  async function carregarPerfil() {

    const user =
      (await supabase.auth.getUser())
      .data.user;

    if (!user) return;

    setEmail(user.email);

    const { data, error } =
      await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!error) {
      setProfile(data);
    }
  }

  async function logout() {

    await supabase.auth.signOut();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Meu Perfil
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          Nome:
        </Text>

        <Text style={styles.value}>
          {profile?.nome}
        </Text>

        <Text style={styles.label}>
          Email:
        </Text>

        <Text style={styles.value}>
          {email}
        </Text>

        <Text style={styles.label}>
          Tipo:
        </Text>

        <Text style={styles.value}>
          {profile?.role}
        </Text>

      </View>

      <Button
        title="Sair"
        onPress={logout}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20
  },

  label: {
    fontWeight: 'bold',
    marginTop: 10
  },

  value: {
    fontSize: 16
  }
});