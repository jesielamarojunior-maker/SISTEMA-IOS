import { supabase } from './supabase.js';

let students = [];

// Função para carregar alunos
export async function loadStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('full_name');

  if (error) {
    console.error('Erro ao carregar alunos:', error);
    return;
  }

  students = data;
  updateStudentsDisplay();
}

// Função para adicionar um novo aluno
export async function addStudent(fullName, cpf, classId) {
  const { data, error } = await supabase
    .from('students')
    .insert([{ full_name: fullName, cpf: cpf, class_id: classId }])
    .select();

  if (error) {
    console.error('Erro ao adicionar aluno:', error);
    return false;
  }

  students.push(data[0]);
  updateStudentsDisplay();
  return true;
}

// Função para editar informações de um aluno
export async function editStudent(id, fullName, cpf, classId) {
  const { data, error } = await supabase
    .from('students')
    .update({ full_name: fullName, cpf: cpf, class_id: classId })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Erro ao editar aluno:', error);
    return false;
  }

  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    students[index] = data[0];
    updateStudentsDisplay();
  }
  return true;
}

// Função para atualizar a exibição dos alunos
function updateStudentsDisplay() {
  // Implementar a lógica para atualizar a interface com a lista de alunos
}