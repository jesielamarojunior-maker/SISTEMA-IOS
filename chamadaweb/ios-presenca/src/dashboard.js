import { supabase } from './supabase.js';

let currentUser = null;

async function loadUserProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Erro ao carregar perfil do usuário:', error);
        return;
    }

    currentUser = data;
    displayUserProfile();
}

function displayUserProfile() {
    const profileContainer = document.getElementById('profile');
    profileContainer.innerHTML = `
        <h2>Bem-vindo, ${currentUser.full_name}</h2>
        <p>Email: ${currentUser.email}</p>
        <p>Tipo de usuário: ${currentUser.user_type}</p>
    `;
}

async function loadDashboardData() {
    await loadUnits();
    await loadCourses();
    await loadTeachers();
    await loadClasses();
    await loadStudents();
    await loadAttendance();
}

window.addEventListener('load', async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        await loadUserProfile(session.user.id);
        await loadDashboardData();
    } else {
        window.location.href = 'login.html';
    }
});

supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        window.location.href = 'login.html';
    }
});