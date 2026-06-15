import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 Alert,
 ActivityIndicator
} from "react-native";

import { supabase } from "../services/supabase";

export default function ProfileScreen({ navigation }) {

 const [profile, setProfile] = useState(null);
 const [email, setEmail] = useState("");

 useEffect(() => {
  loadProfile();
 }, []);

 async function loadProfile() {

  try {

   const { data: userData } =
    await supabase.auth.getUser();

   if (!userData.user) return;

   setEmail(userData.user.email);

   const { data } =
    await supabase
     .from("profiles")
     .select("*")
     .eq("id", userData.user.id)
     .single();

   setProfile(data);

  } catch (error) {
   Alert.alert("Erro", error.message);
  }
 }

 async function handleLogout() {

  await supabase.auth.signOut();

  navigation.replace("Login");
 }

 if (!profile) {
  return (
   <View style={styles.loading}>
    <ActivityIndicator size="large" />
   </View>
  );
 }

 return (
  <View style={styles.container}>

   <View style={styles.header}>
    <Text style={styles.avatar}>
     👤
    </Text>

    <Text style={styles.name}>
     {profile.nome}
    </Text>

    <Text style={styles.email}>
     {email}
    </Text>
   </View>

   <View style={styles.card}>

    <Text style={styles.label}>
     Tipo de Usuário
    </Text>

    <Text style={styles.value}>
     {profile.role.toUpperCase()}
    </Text>

   </View>

   <TouchableOpacity
    style={styles.logoutButton}
    onPress={handleLogout}
   >
    <Text style={styles.logoutText}>
     Sair da Conta
    </Text>
   </TouchableOpacity>

  </View>
 );
}

const styles = StyleSheet.create({

 container:{
  flex:1,
  backgroundColor:"#F8FAFC",
  padding:20
 },

 loading:{
  flex:1,
  justifyContent:"center",
  alignItems:"center"
 },

 header:{
  alignItems:"center",
  marginTop:40,
  marginBottom:30
 },

 avatar:{
  fontSize:80
 },

 name:{
  fontSize:28,
  fontWeight:"700",
  color:"#0F172A"
 },

 email:{
  color:"#64748B",
  marginTop:5
 },

 card:{
  backgroundColor:"#FFF",
  padding:20,
  borderRadius:20,
  elevation:3
 },

 label:{
  color:"#64748B",
  marginBottom:5
 },

 value:{
  fontSize:20,
  fontWeight:"700",
  color:"#2563EB"
 },

 logoutButton:{
  backgroundColor:"#EF4444",
  marginTop:30,
  padding:18,
  borderRadius:15,
  alignItems:"center"
 },

 logoutText:{
  color:"#FFF",
  fontWeight:"700"
 }

});