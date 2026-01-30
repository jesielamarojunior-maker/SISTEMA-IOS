import { supabase } from './supabase.js';

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    console.error('Erro no login:', error);
    return false;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  return { user: data.user, profile };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Erro ao sair:', error);
  }
}

export async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function onAuthStateChange(callback) {
  supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}