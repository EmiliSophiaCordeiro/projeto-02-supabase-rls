import React from "react";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity
} from "react-native";

export default function ProfileScreen(){

 return(
  <View style={styles.container}>

   <View style={styles.avatar}>
    <Text style={styles.avatarText}>
      S
    </Text>
   </View>

   <Text style={styles.name}>
    Sophia Cordeiro
   </Text>

   <Text style={styles.email}>
    sophia@email.com
   </Text>

   <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>
      Editar Perfil
    </Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.logout}
   >
    <Text style={styles.buttonText}>
      Sair
    </Text>
   </TouchableOpacity>

  </View>
 )
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  alignItems:"center",
  justifyContent:"center"
 },
 avatar:{
  width:120,
  height:120,
  borderRadius:60,
  backgroundColor:"#2563EB",
  justifyContent:"center",
  alignItems:"center"
 },
 avatarText:{
  color:"#fff",
  fontSize:40,
  fontWeight:"bold"
 },
 name:{
  fontSize:24,
  fontWeight:"700",
  marginTop:20
 },
 email:{
  color:"#64748B"
 },
 button:{
  marginTop:25,
  backgroundColor:"#2563EB",
  padding:15,
  width:"80%",
  borderRadius:14
 },
 logout:{
  marginTop:15,
  backgroundColor:"#EF4444",
  padding:15,
  width:"80%",
  borderRadius:14
 },
 buttonText:{
  color:"#fff",
  textAlign:"center",
  fontWeight:"700"
 }
});