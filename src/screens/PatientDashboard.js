import { useEffect,useState } from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';

import { supabase } from '../services/supabase';

export default function PatientDashboard() {

  const [consultas,setConsultas] =
    useState([]);

  async function carregar() {

    const user =
      (await supabase.auth.getUser())
      .data.user;

    const { data } =
      await supabase
      .from('consultas')
      .select('*')
      .eq('paciente_id',user.id);

    setConsultas(data || []);
  }

  useEffect(()=>{
    carregar();
  },[]);

  return (
    <FlatList
      data={consultas}
      keyExtractor={item=>item.id}
      renderItem={({item})=>(
        <View
          style={{
            borderWidth:1,
            margin:10,
            padding:10
          }}
        >
          <Text>{item.status}</Text>
          <Text>{item.sintomas}</Text>
        </View>
      )}
    />
  );
}