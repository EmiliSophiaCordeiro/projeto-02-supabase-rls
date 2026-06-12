import React from "react";
import {
 View,
 Text,
 FlatList,
 StyleSheet
} from "react-native";

const consultas = [
 {
  id:"1",
  medico:"Dr. Carlos",
  data:"20/06/2026",
  status:"Agendada"
 }
];

export default function PatientDashboard(){

 return(
  <View style={styles.container}>

   <Text style={styles.title}>
    Minhas Consultas
   </Text>

   <View style={styles.statsContainer}>

    <View style={styles.statCard}>
      <Text style={styles.number}>5</Text>
      <Text>Agendadas</Text>
    </View>

    <View style={styles.statCard}>
      <Text style={styles.number}>12</Text>
      <Text>Concluídas</Text>
    </View>

   </View>

   <FlatList
    data={consultas}
    renderItem={({item})=>(
      <View style={styles.card}>
       <Text>{item.medico}</Text>
       <Text>{item.data}</Text>
       <Text>{item.status}</Text>
      </View>
    )}
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
  fontWeight:"700"
 },
 statsContainer:{
  flexDirection:"row",
  gap:10,
  marginVertical:20
 },
 statCard:{
  flex:1,
  backgroundColor:"#fff",
  padding:20,
  borderRadius:18,
  elevation:4
 },
 number:{
  fontSize:28,
  fontWeight:"bold"
 },
 card:{
  backgroundColor:"#fff",
  padding:20,
  borderRadius:18,
  marginBottom:12,
  elevation:3
 }
});