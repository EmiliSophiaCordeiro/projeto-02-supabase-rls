import React from "react";
import {
 View,
 Text,
 StyleSheet
} from "react-native";

export default function PatientDashboard(){

 return(
  <View style={styles.container}>

   <Text style={styles.title}>
    Bem-vindo Paciente
   </Text>

  </View>
 )
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center"
 },
 title:{
  fontSize:30,
  fontWeight:"700"
 }
});