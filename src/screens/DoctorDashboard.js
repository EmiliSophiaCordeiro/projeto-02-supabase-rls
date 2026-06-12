import React from "react";
import {
 View,
 Text,
 FlatList,
 TouchableOpacity,
 StyleSheet
} from "react-native";

export default function DoctorDashboard(){

 const consultas = [
  {
   id:"1",
   paciente:"Sophia",
   sintomas:"Dor de cabeça"
  }
 ];

 return(
  <View style={styles.container}>

   <Text style={styles.title}>
    Consultas Pendentes
   </Text>

   <FlatList
    data={consultas}
    renderItem={({item})=>(
      <View style={styles.card}>

       <Text style={styles.name}>
        {item.paciente}
       </Text>

       <Text>
        {item.sintomas}
       </Text>

       <View style={styles.buttons}>

        <TouchableOpacity
         style={styles.confirm}
        >
         <Text style={styles.btnText}>
          Confirmar
         </Text>
        </TouchableOpacity>

        <TouchableOpacity
         style={styles.cancel}
        >
         <Text style={styles.btnText}>
          Cancelar
         </Text>
        </TouchableOpacity>

       </View>

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
 card:{
  backgroundColor:"#fff",
  padding:20,
  borderRadius:20,
  marginTop:15
 },
 name:{
  fontWeight:"700",
  fontSize:18
 },
 buttons:{
  flexDirection:"row",
  marginTop:15
 },
 confirm:{
  flex:1,
  backgroundColor:"#22C55E",
  padding:12,
  borderRadius:12,
  marginRight:5
 },
 cancel:{
  flex:1,
  backgroundColor:"#EF4444",
  padding:12,
  borderRadius:12,
  marginLeft:5
 },
 btnText:{
  color:"#fff",
  textAlign:"center",
  fontWeight:"700"
 }
});