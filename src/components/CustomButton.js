import {
 TouchableOpacity,
 Text,
 StyleSheet
} from "react-native";

export default function CustomButton({
 title,
 onPress
}) {

 return(
  <TouchableOpacity
   style={styles.button}
   onPress={onPress}
  >
   <Text style={styles.text}>
    {title}
   </Text>
  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({

 button:{
  backgroundColor:"#2563EB",
  padding:16,
  borderRadius:14,
  alignItems:"center"
 },

 text:{
  color:"#fff",
  fontWeight:"700"
 }

});