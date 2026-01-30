// Este arquivo contém funções para gerenciar as turmas, permitindo a criação e manipulação de dados das turmas.

import { supabase } from './supabase.js';

let classes = [];

// Função para criar uma nova turma
export async function createClass(name, teacherEmail, courseId) {
    const { data, error } = await supabase
        .from('classes')
        .insert([{ name, teacher_email: teacherEmail, course_id: courseId }])
        .select();

    if (error) {
        console.error('Erro ao criar turma:', error);
        return false;
    }

    classes.push(data[0]);
    updateClassesDisplay();
    return true;
}

// Função para carregar turmas
export async function loadClasses() {
    const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('name');

    if (!error) {
        classes = data;
        updateClassesDisplay();
    }
}

// Função para atualizar a exibição das turmas
function updateClassesDisplay() {
    // Implementar a lógica para atualizar a interface com as turmas
}

// Função para deletar uma turma
export async function deleteClass(classId) {
    const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', classId);

    if (error) {
        console.error('Erro ao deletar turma:', error);
        return false;
    }

    classes = classes.filter(c => c.id !== classId);
    updateClassesDisplay();
    return true;
}