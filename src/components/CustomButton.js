import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function CustomButton({
  title,
  onPress,
  loading
}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >
      <Text style={styles.text}>
        {loading ? "Carregando..." : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:COLORS.primary,
    padding:16,
    borderRadius:14,
    alignItems:"center",
    marginTop:10
  },
  text:{
    color:"#fff",
    fontWeight:"700",
    fontSize:16
  }
});