import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 TouchableOpacity,
 ActivityIndicator,
 Alert
} from "react-native";

import { supabase } from "../services/supabase";

export default function DoctorDashboard({ navigation }) {

 const [consultas, setConsultas] = useState([]);
 const [profile, setProfile] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {

  carregarDados();

  const channel = supabase
   .channel("consultas-medico")
   .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "consultas"
    },
    () => {
      carregarDados();
    }
   )
   .subscribe();

  return () => {
   supabase.removeChannel(channel);
  };

 }, []);

 async function carregarDados() {

  try {

   const {
    data: { user }
   } = await supabase.auth.getUser();

   const { data: perfil } =
    await supabase
     .from("profiles")
     .select("*")
     .eq("id", user.id)
     .single();

   const { data } =
    await supabase
     .from("consultas")
     .select("*")
     .order("data_consulta", {
      ascending: false
     });

   setProfile(perfil);
   setConsultas(data || []);

  } catch (error) {
   console.log(error);
  }

  setLoading(false);
 }

 async function atualizarStatus(id, status) {

  const { error } =
   await supabase
    .from("consultas")
    .update({ status })
    .eq("id", id);

  if (error) {
   Alert.alert(
    "Erro",
    error.message
   );
   return;
  }

  carregarDados();
 }

 if (loading) {
  return (
   <View style={styles.loading}>
    <ActivityIndicator size="large" />
   </View>
  );
 }

 const pendentes =
  consultas.filter(
   c => c.status === "Pendente"
  ).length;

 const concluidas =
  consultas.filter(
   c => c.status === "Concluída"
  ).length;

 return (

  <ScrollView style={styles.container}>

   <View style={styles.header}>

    <Text style={styles.logo}>
     🏥 MedCare Admin
    </Text>

    <Text style={styles.welcome}>
     Dr(a). {profile?.nome}
    </Text>

    <Text style={styles.subtitle}>
     Painel Administrativo Médico
    </Text>

   </View>

   <View style={styles.statsContainer}>

    <View style={styles.statCard}>
     <Text style={styles.statNumber}>
      {consultas.length}
     </Text>

     <Text style={styles.statLabel}>
      Total
     </Text>
    </View>

    <View style={styles.statCard}>
     <Text style={styles.statNumber}>
      {pendentes}
     </Text>

     <Text style={styles.statLabel}>
      Pendentes
     </Text>
    </View>

    <View style={styles.statCard}>
     <Text style={styles.statNumber}>
      {concluidas}
     </Text>

     <Text style={styles.statLabel}>
      Concluídas
     </Text>
    </View>

   </View>

   <Text style={styles.sectionTitle}>
    Consultas Recebidas
   </Text>

   {consultas.length === 0 ? (

    <View style={styles.emptyCard}>
     <Text>
      Nenhuma consulta cadastrada.
     </Text>
    </View>

   ) : (

    consultas.map((consulta) => (

     <View
      key={consulta.id}
      style={styles.consultaCard}
     >

      <Text style={styles.cardTitle}>
       🩺 Solicitação de Consulta
      </Text>

      <Text style={styles.info}>
       📅 {consulta.data_consulta}
      </Text>

      <Text style={styles.info}>
       ⏰ {consulta.horario}
      </Text>

      <Text style={styles.info}>
       📋 {consulta.sintomas}
      </Text>

      <Text style={styles.status}>
       Status: {consulta.status}
      </Text>

      <View style={styles.buttonsContainer}>

       <TouchableOpacity
        style={styles.confirmar}
        onPress={() =>
         atualizarStatus(
          consulta.id,
          "Confirmada"
         )
        }
       >
        <Text style={styles.buttonText}>
         Confirmar
        </Text>
       </TouchableOpacity>

       <TouchableOpacity
        style={styles.concluir}
        onPress={() =>
         atualizarStatus(
          consulta.id,
          "Concluída"
         )
        }
       >
        <Text style={styles.buttonText}>
         Concluir
        </Text>
       </TouchableOpacity>

      </View>

     </View>

    ))

   )}

   <TouchableOpacity
    style={styles.profileButton}
    onPress={() =>
      navigation.navigate(
       "Profile"
      )
    }
   >
    <Text style={styles.profileText}>
     Meu Perfil
    </Text>
   </TouchableOpacity>

   <View style={{ height: 40 }} />

  </ScrollView>
 );
}

const styles = StyleSheet.create({

 container:{
  flex:1,
  backgroundColor:"#F1F5F9"
 },

 loading:{
  flex:1,
  justifyContent:"center",
  alignItems:"center"
 },

 header:{
  backgroundColor:"#0F172A",
  padding:30,
  borderBottomLeftRadius:30,
  borderBottomRightRadius:30
 },

 logo:{
  color:"#FFF",
  fontSize:26,
  fontWeight:"700"
 },

 welcome:{
  color:"#FFF",
  fontSize:24,
  fontWeight:"700",
  marginTop:10
 },

 subtitle:{
  color:"#94A3B8"
 },

 statsContainer:{
  flexDirection:"row",
  justifyContent:"space-around",
  marginTop:-25
 },

 statCard:{
  backgroundColor:"#FFF",
  width:100,
  padding:20,
  borderRadius:20,
  alignItems:"center",
  elevation:4
 },

 statNumber:{
  fontSize:28,
  fontWeight:"700",
  color:"#2563EB"
 },

 statLabel:{
  color:"#64748B"
 },

 sectionTitle:{
  fontSize:22,
  fontWeight:"700",
  margin:20
 },

 consultaCard:{
  backgroundColor:"#FFF",
  marginHorizontal:20,
  marginBottom:15,
  padding:20,
  borderRadius:20
 },

 cardTitle:{
  fontSize:18,
  fontWeight:"700",
  marginBottom:10
 },

 info:{
  marginTop:5
 },

 status:{
  marginTop:10,
  fontWeight:"700",
  color:"#2563EB"
 },

 buttonsContainer:{
  flexDirection:"row",
  marginTop:15
 },

 confirmar:{
  flex:1,
  backgroundColor:"#F59E0B",
  padding:12,
  borderRadius:12,
  marginRight:5,
  alignItems:"center"
 },

 concluir:{
  flex:1,
  backgroundColor:"#10B981",
  padding:12,
  borderRadius:12,
  marginLeft:5,
  alignItems:"center"
 },

 buttonText:{
  color:"#FFF",
  fontWeight:"700"
 },

 emptyCard:{
  backgroundColor:"#FFF",
  margin:20,
  padding:20,
  borderRadius:20
 },

 profileButton:{
  backgroundColor:"#2563EB",
  marginHorizontal:20,
  padding:18,
  borderRadius:15,
  alignItems:"center",
  marginTop:20
 },

 profileText:{
  color:"#FFF",
  fontWeight:"700"
 }

});