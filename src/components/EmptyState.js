import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function EmptyState({
  message,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: "center",
  },
  text: {
    color: "#64748B",
  },
});