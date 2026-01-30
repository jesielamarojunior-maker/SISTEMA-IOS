// Este arquivo contém funções para gerenciar os professores, incluindo a adição e edição de informações dos professores.

import { supabase } from './supabase.js';

// Função para criar um novo professor
export async function createTeacher(fullName, cpf, email, teacherType, unitId, courseId) {
    const { data, error } = await supabase
        .from('teachers')
        .insert([{ full_name: fullName, cpf, email, teacher_type: teacherType, unit_id: unitId, course_id: courseId }])
        .select();

    if (error) {
        console.error('Erro ao criar professor:', error);
        return null;
    }

    return data[0];
}

// Função para editar informações de um professor
export async function updateTeacher(id, fullName, cpf, email, teacherType, unitId, courseId) {
    const { data, error } = await supabase
        .from('teachers')
        .update({ full_name: fullName, cpf, email, teacher_type: teacherType, unit_id: unitId, course_id: courseId })
        .eq('id', id)
        .select();

    if (error) {
        console.error('Erro ao atualizar professor:', error);
        return null;
    }

    return data[0];
}

// Função para carregar todos os professores
export async function loadTeachers() {
    const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('full_name');

    if (error) {
        console.error('Erro ao carregar professores:', error);
        return [];
    }

    return data;
}

// Função para excluir um professor
export async function deleteTeacher(id) {
    const { data, error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        console.error('Erro ao excluir professor:', error);
        return null;
    }

    return data[0];
}