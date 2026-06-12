import React from "react";
import {
 View,
 Text,
 StyleSheet
} from "react-native";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function CreateAppointment(){

 return(
  <View style={styles.container}>

   <Text style={styles.title}>
    Nova Consulta
   </Text>

   <CustomInput placeholder="Data"/>
   <CustomInput placeholder="Horário"/>
   <CustomInput placeholder="Sintomas"/>

   <CustomButton
    title="Agendar Consulta"
   />

  </View>
 )
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  padding:20
 },
 title:{
  fontSize:28,
  fontWeight:"700",
  marginBottom:20
 }
});