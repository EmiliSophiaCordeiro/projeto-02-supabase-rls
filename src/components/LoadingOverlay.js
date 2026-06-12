import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function LoadingOverlay({
  visible,
}) {
  return (
    <Modal
      transparent
      visible={visible}
    >
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});