import React, { useState } from "react";
import {
 View,
 Text,
 TextInput,
 TouchableOpacity,
 StyleSheet,
 Alert,
 ScrollView
} from "react-native";

import { supabase } from "../services/supabase";

export default function RegisterScreen({ navigation }) {

 const [nome, setNome] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [role, setRole] = useState("paciente");

 async function handleRegister() {

  if (!nome || !email || !password) {
   Alert.alert("Erro", "Preencha todos os campos");
   return;
  }

  try {

   const { data, error } =
    await supabase.auth.signUp({
     email,
     password
    });

   if (error) {
    alert("Erro"+ error.message);
    return;
   }

   const userId = data.user?.id;

   if (!userId) {
    alert("Erro"+ "Usuário não criado.");
    return;
   }

   const { error: profileError } =
    await supabase
     .from("profiles")
     .insert({
      id: userId,
      nome,
      role
     });

   if (profileError) {
    alert("Erro"+ profileError.message);
    return;
   }

   alert(
    "Sucesso",
    "Cadastro realizado com sucesso!"
   );

   navigation.goBack();

  } catch (error) {
   alert("Erro"+ error.message);
  }
 }

 return (
  <ScrollView
   contentContainerStyle={styles.container}
  >

   <Text style={styles.logo}>
    🏥
   </Text>

   <Text style={styles.title}>
    Criar Conta
   </Text>

   <Text style={styles.subtitle}>
    MedCare - Clínica Médica
   </Text>

   <View style={styles.card}>

    <TextInput
     style={styles.input}
     placeholder="Nome Completo"
     value={nome}
     onChangeText={setNome}
    />

    <TextInput
     style={styles.input}
     placeholder="Email"
     keyboardType="email-address"
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

    <Text style={styles.roleTitle}>
     Tipo de Usuário
    </Text>

    <View style={styles.roleContainer}>

     <TouchableOpacity
      style={[
       styles.roleButton,
       role === "paciente" &&
       styles.selectedPatient
      ]}
      onPress={() =>
       setRole("paciente")
      }
     >
      <Text style={styles.roleText}>
       👤 Paciente
      </Text>
     </TouchableOpacity>

     <TouchableOpacity
      style={[
       styles.roleButton,
       role === "medico" &&
       styles.selectedDoctor
      ]}
      onPress={() =>
       setRole("medico")
      }
     >
      <Text style={styles.roleText}>
       👨‍⚕️ Médico
      </Text>
     </TouchableOpacity>

    </View>

    <TouchableOpacity
     style={styles.registerButton}
     onPress={handleRegister}
    >
     <Text style={styles.registerText}>
      Cadastrar
     </Text>
    </TouchableOpacity>

   </View>

  </ScrollView>
 );
}

const styles = StyleSheet.create({

 container: {
  flexGrow: 1,
  justifyContent: "center",
  padding: 25,
  backgroundColor: "#F8FAFC"
 },

 logo: {
  fontSize: 60,
  textAlign: "center"
 },

 title: {
  fontSize: 32,
  fontWeight: "700",
  textAlign: "center",
  color: "#0F172A"
 },

 subtitle: {
  textAlign: "center",
  color: "#64748B",
  marginBottom: 30
 },

 card: {
  backgroundColor: "#FFF",
  borderRadius: 24,
  padding: 25,
  elevation: 4
 },

 input: {
  backgroundColor: "#F8FAFC",
  borderWidth: 1,
  borderColor: "#E2E8F0",
  borderRadius: 14,
  padding: 15,
  marginBottom: 15
 },

 roleTitle: {
  fontWeight: "bold",
  marginBottom: 10,
  color: "#0F172A"
 },

 roleContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20
 },

 roleButton: {
  flex: 1,
  padding: 15,
  borderRadius: 12,
  backgroundColor: "#E2E8F0",
  marginHorizontal: 5,
  alignItems: "center"
 },

 selectedPatient: {
  backgroundColor: "#10B981"
 },

 selectedDoctor: {
  backgroundColor: "#2563EB"
 },

 roleText: {
  color: "#FFF",
  fontWeight: "bold"
 },

 registerButton: {
  backgroundColor: "#0F172A",
  padding: 18,
  borderRadius: 14,
  alignItems: "center"
 },

 registerText: {
  color: "#FFF",
  fontWeight: "bold",
  fontSize: 16
 }

});