import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PatientDashboard from "../screens/PatientDashboard";
import DoctorDashboard from "../screens/DoctorDashboard";
import CreateAppointment from "../screens/CreateAppointment";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle:{
            backgroundColor:"#2563EB"
          },
          headerTintColor:"#fff",
          headerTitleStyle:{
            fontWeight:"700"
          }
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="PatientDashboard"
          component={PatientDashboard}
        />

        <Stack.Screen
          name="DoctorDashboard"
          component={DoctorDashboard}
        />

        <Stack.Screen
          name="CreateAppointment"
          component={CreateAppointment}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}