import { View, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function CustomInput(props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="#94A3B8"
        {...props}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginBottom:15
  },
  input:{
    backgroundColor:"#fff",
    padding:16,
    borderRadius:14,
    borderWidth:1,
    borderColor:COLORS.border
  }
});