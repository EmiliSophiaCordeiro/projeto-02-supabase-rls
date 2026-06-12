import { useEffect,useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button
} from 'react-native';

import { supabase } from '../services/supabase';

export default function DoctorDashboard({navigation}) {

  const [consultas,setConsultas] =
    useState([]);

  async function carregar() {

    const { data } =
      await supabase
      .from('consultas')
      .select('*')
      .order('created_at');

    setConsultas(data || []);
  }

  useEffect(()=>{

    carregar();

    const channel =
      supabase
      .channel('consultas')
      .on(
        'postgres_changes',
        {
          event:'*',
          schema:'public',
          table:'consultas'
        },
        carregar
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  },[]);

  return (
    <View style={{flex:1,padding:20}}>

      <Button
        title="Nova Consulta"
        onPress={() =>
          navigation.navigate(
            'NovaConsulta'
          )
        }
      />

      <FlatList
        data={consultas}
        keyExtractor={item=>item.id}
        renderItem={({item})=>(
          <View
            style={{
              borderWidth:1,
              padding:10,
              marginTop:10
            }}
          >
            <Text>
              {item.status}
            </Text>

            <Text>
              {item.sintomas}
            </Text>
          </View>
        )}
      />

    </View>
  );
}