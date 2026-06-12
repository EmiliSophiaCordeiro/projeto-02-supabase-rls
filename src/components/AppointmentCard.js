import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function AppointmentCard({
  appointment,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.doctor}>
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
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginTop: 12,
    elevation: 4,
  },

  doctor: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  status: {
    marginTop: 10,
    color: "#22C55E",
    fontWeight: "700",
  },
});