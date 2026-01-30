import { supabase } from './supabase.js';

// Função para criar um novo curso
export async function createCourse(name, unitId) {
  const { data, error } = await supabase
    .from('courses')
    .insert([{ name: name, unit_id: unitId }])
    .select();

  if (error) {
    console.error('Erro ao criar curso:', error);
    return false;
  }

  return data[0];
}

// Função para carregar todos os cursos
export async function loadCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('name');

  if (error) {
    console.error('Erro ao carregar cursos:', error);
    return [];
  }

  return data;
}

// Função para atualizar um curso
export async function updateCourse(courseId, name, unitId) {
  const { data, error } = await supabase
    .from('courses')
    .update({ name: name, unit_id: unitId })
    .eq('id', courseId)
    .select();

  if (error) {
    console.error('Erro ao atualizar curso:', error);
    return false;
  }

  return data[0];
}

// Função para deletar um curso
export async function deleteCourse(courseId) {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', courseId);

  if (error) {
    console.error('Erro ao deletar curso:', error);
    return false;
  }

  return true;
}