import {
 View,
 Text,
 StyleSheet
} from "react-native";

export default function AppointmentCard({appointment}) {

 return(
  <View style={styles.card}>

   <Text style={styles.name}>
     {appointment.doctor}
   </Text>

   <Text>
     📅 {appointment.date}
   </Text>

   <Text>
     🕐 {appointment.time}
   </Text>

   <Text style={styles.status}>
     {appointment.status}
   </Text>

  </View>
 )
}

const styles = StyleSheet.create({

 card:{
  backgroundColor:"#fff",
  borderRadius:20,
  padding:20,
  marginBottom:15,

  elevation:5
 },

 name:{
  fontWeight:"700",
  fontSize:18,
  marginBottom:8
 },

 status:{
  marginTop:10,
  color:"#22C55E",
  fontWeight:"700"
 }

});