import React, { useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 SafeAreaView
} from "react-native";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constants/colors";

export default function LoginScreen() {

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 return(
  <SafeAreaView style={styles.container}>

   <View style={styles.header}>
    <Text style={styles.logo}>🏥 MedCare</Text>
    <Text style={styles.subtitle}>
      Gestão Inteligente de Consultas
    </Text>
   </View>

   <View style={styles.card}>

    <Text style={styles.title}>
      Entrar
    </Text>

    <CustomInput
      placeholder="E-mail"
      value={email}
      onChangeText={setEmail}
    />

    <CustomInput
      placeholder="Senha"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />

    <CustomButton
      title="Entrar"
    />

   </View>

  </SafeAreaView>
 )
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  backgroundColor:COLORS.background,
  justifyContent:"center",
  padding:20
 },
 header:{
  alignItems:"center",
  marginBottom:40
 },
 logo:{
  fontSize:34,
  fontWeight:"bold",
  color:COLORS.primary
 },
 subtitle:{
  color:COLORS.subtitle,
  marginTop:5
 },
 card:{
  backgroundColor:"#fff",
  padding:25,
  borderRadius:25,
  elevation:8
 },
 title:{
  fontSize:26,
  fontWeight:"700",
  marginBottom:20
 }
});