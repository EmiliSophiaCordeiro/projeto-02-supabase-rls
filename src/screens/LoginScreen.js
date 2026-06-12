import React, { useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 SafeAreaView
} from "react-native";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ navigation }) {

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 return(
  <SafeAreaView style={styles.container}>

   <Text style={styles.logo}>
    🏥 MedCare
   </Text>

   <Text style={styles.subtitle}>
    Sistema de Clínica Médica
   </Text>

   <View style={styles.card}>

    <CustomInput
      placeholder="Email"
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
      onPress={() =>
        navigation.navigate(
          "PatientDashboard"
        )
      }
    />

    <View style={{height:10}} />

    <CustomButton
      title="Cadastrar"
      onPress={() =>
        navigation.navigate(
          "Register"
        )
      }
    />

   </View>

  </SafeAreaView>
 )
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  justifyContent:"center",
  padding:20,
  backgroundColor:"#F8FAFC"
 },
 logo:{
  fontSize:36,
  fontWeight:"700",
  textAlign:"center",
  color:"#2563EB"
 },
 subtitle:{
  textAlign:"center",
  marginBottom:30
 },
 card:{
  backgroundColor:"#fff",
  padding:25,
  borderRadius:25
 }
});