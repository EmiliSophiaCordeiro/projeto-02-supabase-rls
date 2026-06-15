import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 ActivityIndicator,
 ScrollView,
 Alert
} from "react-native";

import { supabase } from "../services/supabase";

export default function ProfileScreen({ navigation }) {

 const [profile, setProfile] = useState(null);
 const [email, setEmail] = useState("");
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  carregarPerfil();
 }, []);

 async function carregarPerfil() {

  try {

   const {
    data: { user }
   } = await supabase.auth.getUser();

   if (!user) return;

   setEmail(user.email);

   const { data } =
    await supabase
     .from("profiles")
     .select("*")
     .eq("id", user.id)
     .single();

   setProfile(data);

  } catch (error) {
   Alert.alert(
    "Erro",
    error.message
   );
  }

  setLoading(false);
 }

 async function logout() {

  await supabase.auth.signOut();

  navigation.replace("Login");
 }

 if (loading) {
  return (
   <View style={styles.loading}>
    <ActivityIndicator size="large" />
   </View>
  );
 }

 return (

  <ScrollView style={styles.container}>

   <View style={styles.header}>

    <Text style={styles.avatar}>
     👨‍⚕️
    </Text>

    <Text style={styles.name}>
     {profile?.nome}
    </Text>

    <Text style={styles.email}>
     {email}
    </Text>

   </View>

   <View style={styles.infoCard}>

    <Text style={styles.cardTitle}>
     Informações da Conta
    </Text>

    <Text style={styles.label}>
     Nome
    </Text>

    <Text style={styles.value}>
     {profile?.nome}
    </Text>

    <Text style={styles.label}>
     Tipo de Usuário
    </Text>

    <Text style={styles.value}>
     {profile?.role}
    </Text>

   </View>

   <View style={styles.statsContainer}>

    <View style={styles.statCard}>
     <Text style={styles.statNumber}>
      ✓
     </Text>

     <Text style={styles.statLabel}>
      Conta Ativa
     </Text>
    </View>

    <View style={styles.statCard}>
     <Text style={styles.statNumber}>
      🔒
     </Text>

     <Text style={styles.statLabel}>
      Segura
     </Text>
    </View>

   </View>

   <TouchableOpacity
    style={styles.button}
    onPress={() =>
      navigation.goBack()
    }
   >
    <Text style={styles.buttonText}>
     Voltar
    </Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.logoutButton}
    onPress={logout}
   >
    <Text style={styles.logoutText}>
     Sair da Conta
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
  backgroundColor:"#2563EB",
  alignItems:"center",
  padding:35,
  borderBottomLeftRadius:30,
  borderBottomRightRadius:30
 },

 avatar:{
  fontSize:80
 },

 name:{
  color:"#FFF",
  fontSize:26,
  fontWeight:"700",
  marginTop:10
 },

 email:{
  color:"#DBEAFE",
  marginTop:5
 },

 infoCard:{
  backgroundColor:"#FFF",
  margin:20,
  padding:20,
  borderRadius:20
 },

 cardTitle:{
  fontSize:20,
  fontWeight:"700",
  marginBottom:20
 },

 label:{
  color:"#64748B",
  marginTop:10
 },

 value:{
  fontSize:18,
  fontWeight:"700",
  color:"#0F172A"
 },

 statsContainer:{
  flexDirection:"row",
  justifyContent:"space-around"
 },

 statCard:{
  backgroundColor:"#FFF",
  width:150,
  padding:20,
  borderRadius:20,
  alignItems:"center"
 },

 statNumber:{
  fontSize:30,
  fontWeight:"700"
 },

 statLabel:{
  marginTop:10,
  color:"#64748B"
 },

 button:{
  backgroundColor:"#2563EB",
  margin:20,
  padding:18,
  borderRadius:15,
  alignItems:"center"
 },

 buttonText:{
  color:"#FFF",
  fontWeight:"700"
 },

 logoutButton:{
  backgroundColor:"#EF4444",
  marginHorizontal:20,
  padding:18,
  borderRadius:15,
  alignItems:"center"
 },

 logoutText:{
  color:"#FFF",
  fontWeight:"700"
 }

});