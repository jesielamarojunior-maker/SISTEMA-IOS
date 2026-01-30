import { createClient } from '@supabase/supabase-js';
import { login } from './auth.js';
import { loadUnits } from './units.js';
import { loadCourses } from './courses.js';
import { loadTeachers } from './teachers.js';
import { loadClasses } from './classes.js';
import { loadStudents } from './students.js';
import { loadAttendance } from './attendance.js';

const supabaseUrl = 'https://seu-projeto.supabase.co';
const supabaseKey = 'sua-chave-publica';
const supabase = createClient(supabaseUrl, supabaseKey);

window.addEventListener('load', async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    await loadUserProfile(session.user.id);
    await loadUnits();
    await loadCourses();
    await loadTeachers();
    await loadClasses();
    await loadStudents();
    await loadAttendance();
  } else {
    showScreen('loginScreen');
  }
});

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    logout();
  }
});