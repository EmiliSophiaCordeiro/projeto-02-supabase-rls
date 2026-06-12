import { supabase } from "./supabase";

export async function getAppointments() {
  const { data, error } =
    await supabase
      .from("appointments")
      .select("*");

  if (error) throw error;

  return data;
}

export async function createAppointment(
  appointment
) {
  const { error } =
    await supabase
      .from("appointments")
      .insert([appointment]);

  if (error) throw error;
}