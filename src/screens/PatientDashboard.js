import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 TouchableOpacity,
 ActivityIndicator
} from "react-native";

import { supabase } from "../services/supabase";

export default function PatientDashboard({ navigation }) {

 const [consultas, setConsultas] = useState([]);
 const [profile, setProfile] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  carregarDados();

  const channel = supabase
   .channel("consultas-paciente")
   .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "consultas"
    },
    () => carregarDados()
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

   const { data: consultasData } =
    await supabase
     .from("consultas")
     .select("*")
     .eq("paciente_id", user.id)
     .order("data_consulta", {
      ascending: false
     });

   setProfile(perfil);
   setConsultas(consultasData || []);

  } catch (error) {
   console.log(error);
  }

  setLoading(false);
 }

 if (loading) {
  return (
   <View style={styles.loading}>
    <ActivityIndicator size="large" />
   </View>
  );
 }

 const proximConsulta = consultas[0];

 const pendentes =
  consultas.filter(
   c => c.status === "Pendente"
  ).length;

 return (

  <ScrollView style={styles.container}>

   <View style={styles.header}>

    <Text style={styles.logo}>
     🏥 MedCare
    </Text>

    <Text style={styles.welcome}>
     Olá, {profile?.nome} 👋
    </Text>

    <Text style={styles.subtitle}>
     Bem-vindo ao portal do paciente
    </Text>

   </View>

   <View style={styles.statsContainer}>

    <View style={styles.statCard}>
     <Text style={styles.statNumber}>
      {consultas.length}
     </Text>

     <Text style={styles.statLabel}>
      Consultas
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
      {consultas.length > 0 ? "✓" : "0"}
     </Text>

     <Text style={styles.statLabel}>
      Histórico
     </Text>
    </View>

   </View>

   {proximConsulta && (

    <View style={styles.nextCard}>

     <Text style={styles.cardTitle}>
      📅 Próxima Consulta
     </Text>

     <Text style={styles.bigText}>
      {proximConsulta.data_consulta}
     </Text>

     <Text style={styles.info}>
      Horário: {proximConsulta.horario}
     </Text>

     <Text style={styles.info}>
      Status: {proximConsulta.status}
     </Text>

    </View>

   )}

   <Text style={styles.sectionTitle}>
    Ações Rápidas
   </Text>

   <View style={styles.actionsContainer}>

    <TouchableOpacity
     style={styles.actionCard}
     onPress={() =>
      navigation.navigate(
       "CreateAppointment"
      )
     }
    >
     <Text style={styles.actionIcon}>
      📅
     </Text>

     <Text style={styles.actionText}>
      Nova Consulta
     </Text>
    </TouchableOpacity>

    <TouchableOpacity
     style={styles.actionCard}
     onPress={() =>
      navigation.navigate(
       "Profile"
      )
     }
    >
     <Text style={styles.actionIcon}>
      👤
     </Text>

     <Text style={styles.actionText}>
      Perfil
     </Text>
    </TouchableOpacity>

   </View>

   <Text style={styles.sectionTitle}>
    Histórico Médico
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

      <Text style={styles.consultaTitle}>
       🩺 Consulta Médica
      </Text>

      <Text>
       Data: {consulta.data_consulta}
      </Text>

      <Text>
       Horário: {consulta.horario}
      </Text>

      <Text>
       Sintomas: {consulta.sintomas}
      </Text>

      <Text style={styles.status}>
       {consulta.status}
      </Text>

     </View>

    ))

   )}

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
  backgroundColor:"#2563EB",
  padding:30,
  borderBottomLeftRadius:30,
  borderBottomRightRadius:30
 },

 logo:{
  color:"#FFF",
  fontSize:28,
  fontWeight:"700"
 },

 welcome:{
  color:"#FFF",
  fontSize:24,
  fontWeight:"700",
  marginTop:10
 },

 subtitle:{
  color:"#DBEAFE"
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

 nextCard:{
  backgroundColor:"#FFF",
  margin:20,
  padding:20,
  borderRadius:20
 },

 cardTitle:{
  fontSize:18,
  fontWeight:"700",
  marginBottom:10
 },

 bigText:{
  fontSize:24,
  fontWeight:"700"
 },

 info:{
  marginTop:5
 },

 sectionTitle:{
  fontSize:20,
  fontWeight:"700",
  marginHorizontal:20,
  marginBottom:15
 },

 actionsContainer:{
  flexDirection:"row",
  justifyContent:"space-evenly",
  marginBottom:20
 },

 actionCard:{
  backgroundColor:"#FFF",
  width:150,
  padding:20,
  borderRadius:20,
  alignItems:"center"
 },

 actionIcon:{
  fontSize:35
 },

 actionText:{
  marginTop:10,
  fontWeight:"700"
 },

 emptyCard:{
  backgroundColor:"#FFF",
  margin:20,
  padding:20,
  borderRadius:20
 },

 consultaCard:{
  backgroundColor:"#FFF",
  marginHorizontal:20,
  marginBottom:15,
  padding:20,
  borderRadius:20
 },

 consultaTitle:{
  fontWeight:"700",
  marginBottom:10
 },

 status:{
  marginTop:10,
  color:"#10B981",
  fontWeight:"700"
 }

});