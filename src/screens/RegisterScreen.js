import React from "react";
import {
 SafeAreaView,
 ScrollView,
 Text,
 StyleSheet
} from "react-native";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function RegisterScreen(){

 return(
  <SafeAreaView style={styles.container}>
   <ScrollView>

    <Text style={styles.title}>
      Criar Conta
    </Text>

    <CustomInput placeholder="Nome Completo"/>
    <CustomInput placeholder="E-mail"/>
    <CustomInput placeholder="Senha"/>
    <CustomInput placeholder="Confirmar Senha"/>

    <CustomButton title="Cadastrar"/>

   </ScrollView>
  </SafeAreaView>
 )
}

const styles=StyleSheet.create({
 container:{
  flex:1,
  padding:20
 },
 title:{
  fontSize:28,
  fontWeight:"700",
  marginBottom:20
 }
})