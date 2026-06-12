import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function StatsCard({
  title,
  value,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    margin: 5,
    elevation: 4,
  },

  value: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2563EB",
  },

  title: {
    color: "#64748B",
  },
});