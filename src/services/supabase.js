import 'expo-sqlite/localStorage/install';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kauhcxzllhxbdkmmujhg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthdWhjeHpsbGh4YmRrbW11amhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNzg5MDYsImV4cCI6MjA5Njc1NDkwNn0.SbIzWf_YeRdWPZ0ULOwAp3Wa1jEKJS50dbIsFii8Ufo';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);