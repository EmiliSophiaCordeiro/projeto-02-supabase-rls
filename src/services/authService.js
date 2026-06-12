import { supabase } from "./supabase";

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function register(
  name,
  email,
  password,
  role
) {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

  if (error) throw error;

  return data;
}

export async function logout() {
  await supabase.auth.signOut();
}