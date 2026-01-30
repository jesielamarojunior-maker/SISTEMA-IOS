// Este arquivo contém funções para gerenciar a presença dos alunos, permitindo registrar e consultar a presença nas aulas.

import { supabase } from './supabase.js';

// Função para registrar a presença de um aluno
export async function recordAttendance(studentId, classId, status) {
    const { data, error } = await supabase
        .from('attendance')
        .insert([{ student_id: studentId, class_id: classId, status: status, date: new Date().toISOString().split('T')[0], time: new Date().toLocaleTimeString() }]);

    if (error) {
        console.error('Erro ao registrar presença:', error);
        return false;
    }

    return true;
}

// Função para consultar a presença de um aluno em uma turma
export async function getAttendance(classId) {
    const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('class_id', classId)
        .order('date', { ascending: false });

    if (error) {
        console.error('Erro ao consultar presença:', error);
        return [];
    }

    return data;
}

// Função para obter a presença de um aluno específico
export async function getStudentAttendance(studentId, classId) {
    const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('student_id', studentId)
        .eq('class_id', classId)
        .order('date', { ascending: false });

    if (error) {
        console.error('Erro ao consultar presença do aluno:', error);
        return [];
    }

    return data;
}