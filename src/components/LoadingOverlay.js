import {
 Modal,
 View,
 ActivityIndicator,
 StyleSheet
} from "react-native";

export default function LoadingOverlay({
 visible
}) {

 return(
  <Modal
   transparent
   visible={visible}
  >
   <View style={styles.overlay}>
    <ActivityIndicator
      size="large"
      color="#2563EB"
    />
   </View>
  </Modal>
 )
}

const styles = StyleSheet.create({

 overlay:{
  flex:1,
  backgroundColor:"rgba(0,0,0,0.3)",
  justifyContent:"center",
  alignItems:"center"
 }

});