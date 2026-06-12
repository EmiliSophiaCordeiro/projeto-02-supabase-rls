import {
 TextInput,
 StyleSheet
} from "react-native";

export default function CustomInput(props){

 return(
  <TextInput
   {...props}
   style={styles.input}
  />
 )
}

const styles = StyleSheet.create({

 input:{
  backgroundColor:"#fff",
  padding:16,
  borderRadius:14,
  borderWidth:1,
  borderColor:"#E2E8F0",
  marginBottom:15
 }

});