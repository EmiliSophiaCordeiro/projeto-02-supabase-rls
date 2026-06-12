import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DoctorDashboard from '../screens/DoctorDashboard';
import PatientDashboard from '../screens/PatientDashboard';
import CreateAppointment from '../screens/CreateAppointment';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Cadastro"
        component={RegisterScreen}
      />

      <Stack.Screen
        name="Medico"
        component={DoctorDashboard}
      />

      <Stack.Screen
        name="Paciente"
        component={PatientDashboard}
      />

      <Stack.Screen
        name="NovaConsulta"
        component={CreateAppointment}
      />

      <Stack.Screen
        name="Perfil"
        component={ProfileScreen}
      />

    </Stack.Navigator>
  );
}