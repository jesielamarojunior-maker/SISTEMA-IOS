// 📊 DASHBOARD E ANALYTICS DO PROFESSOR

// CARREGAR DASHBOARD DA TURMA
function loadTeacherDashboard(classId) {
  const stats = calculateClassStats(classId, currentUser.id);
  const selectedClass = classes.find(c => c.id == classId);
  
  if (!stats || !selectedClass) {
    document.getElementById('teacherDashboardContent').innerHTML = `
      <div class="dashboard-error">
        <i class="fas fa-exclamation-triangle fa-2x"></i>
        <h4>Erro ao carregar dados</h4>
        <p>Não foi possível calcular as estatísticas da turma.</p>
      </div>
    `;
    return;
  }
  
  const dashboardHTML = `
    <div class="teacher-dashboard">
      <div class="dashboard-header">
        <h4><i class="fas fa-chart-line"></i> Dashboard - ${selectedClass.name}</h4>
        <div class="dashboard-controls">
          <button onclick="exportDashboardData(${classId})" class="btn btn-outline btn-sm">
            <i class="fas fa-download"></i> Exportar Dados
          </button>
          <button onclick="refreshDashboard(${classId})" class="btn btn-outline btn-sm">
            <i class="fas fa-sync"></i> Atualizar
          </button>
        </div>
      </div>
      
      <!-- CARDS DE ESTATÍSTICAS GERAIS -->
      <div class="dashboard-stats-grid">
        <div class="dashboard-stat-card">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">${stats.totalStudents}</div>
            <div class="stat-label">Total de Alunos</div>
          </div>
        </div>
        
        <div class="dashboard-stat-card">
          <div class="stat-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">${stats.classAverage.toFixed(1)}</div>
            <div class="stat-label">Média da Turma</div>
          </div>
        </div>
        
        <div class="dashboard-stat-card">
          <div class="stat-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">${stats.avgAttendance}%</div>
            <div class="stat-label">Frequência Média</div>
          </div>
        </div>
        
        <div class="dashboard-stat-card ${stats.studentsAtRisk.length > 0 ? 'stat-alert' : ''}">
          <div class="stat-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">${stats.studentsAtRisk.length}</div>
            <div class="stat-label">Alunos em Risco</div>
          </div>
        </div>
      </div>
      
      <!-- GRÁFICOS E ANÁLISES -->
      <div class="dashboard-charts-grid">
        <!-- GRÁFICO DE DISTRIBUIÇÃO DE NOTAS -->
        <div class="dashboard-chart-card">
          <div class="chart-header">
            <h5><i class="fas fa-chart-bar"></i> Distribuição de Notas</h5>
          </div>
          <div class="chart-content">
            <div class="grade-distribution-chart">
              <div class="grade-bar excellent" style="height: ${(stats.gradeDistribution.excellent / stats.totalStudents) * 100}%">
                <span class="bar-label">${stats.gradeDistribution.excellent}</span>
                <span class="bar-category">Excelente<br>(9.0-10.0)</span>
              </div>
              <div class="grade-bar good" style="height: ${(stats.gradeDistribution.good / stats.totalStudents) * 100}%">
                <span class="bar-label">${stats.gradeDistribution.good}</span>
                <span class="bar-category">Bom<br>(7.0-8.9)</span>
              </div>
              <div class="grade-bar average" style="height: ${(stats.gradeDistribution.average / stats.totalStudents) * 100}%">
                <span class="bar-label">${stats.gradeDistribution.average}</span>
                <span class="bar-category">Regular<br>(6.0-6.9)</span>
              </div>
              <div class="grade-bar below" style="height: ${(stats.gradeDistribution.below / stats.totalStudents) * 100}%">
                <span class="bar-label">${stats.gradeDistribution.below}</span>
                <span class="bar-category">Abaixo<br>(<6.0)</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- RANKING DOS ALUNOS -->
        <div class="dashboard-chart-card">
          <div class="chart-header">
            <h5><i class="fas fa-trophy"></i> Top 10 Alunos</h5>
          </div>
          <div class="chart-content">
            <div class="student-ranking">
              ${stats.studentDetails
                .sort((a, b) => b.average - a.average)
                .slice(0, 10)
                .map((studentStat, index) => `
                  <div class="ranking-item">
                    <div class="rank-position">${index + 1}º</div>
                    <div class="rank-student">
                      <div class="student-name">${studentStat.student.name}</div>
                      <div class="student-ra">RA: ${studentStat.student.ra}</div>
                    </div>
                    <div class="rank-stats">
                      <div class="rank-average">${studentStat.average.toFixed(1)}</div>
                      <div class="rank-attendance">${studentStat.attendanceRate.toFixed(1)}%</div>
                    </div>
                  </div>
                `).join('')}
            </div>
          </div>
        </div>
      </div>
      
      <!-- ALUNOS EM RISCO -->
      ${stats.studentsAtRisk.length > 0 ? `
        <div class="dashboard-alert-section">
          <div class="alert-header">
            <h5><i class="fas fa-exclamation-triangle"></i> Alunos que Precisam de Atenção</h5>
          </div>
          <div class="alert-content">
            ${stats.studentsAtRisk.map(studentStat => {
              const reasons = [];
              if (studentStat.average < 6.0) reasons.push('Média baixa');
              if (studentStat.attendanceRate < 75) reasons.push('Frequência baixa');
              
              return `
                <div class="risk-student-card">
                  <div class="risk-student-info">
                    <div class="student-name">${studentStat.student.name}</div>
                    <div class="student-ra">RA: ${studentStat.student.ra}</div>
                  </div>
                  <div class="risk-stats">
                    <div class="risk-average">Média: ${studentStat.average.toFixed(1)}</div>
                    <div class="risk-attendance">Freq: ${studentStat.attendanceRate.toFixed(1)}%</div>
                  </div>
                  <div class="risk-reasons">
                    ${reasons.map(reason => `<span class="risk-tag">${reason}</span>`).join('')}
                  </div>
                  <div class="risk-actions">
                    <button onclick="addStudentAnnotation(${studentStat.student.id}, ${classId})" 
                            class="btn btn-sm btn-outline">
                      <i class="fas fa-sticky-note"></i> Anotar
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}
      
      <!-- HISTÓRICO DE ATIVIDADES -->
      <div class="dashboard-activities-section">
        <div class="activities-header">
          <h5><i class="fas fa-history"></i> Últimas Atividades</h5>
        </div>
        <div class="activities-timeline">
          ${getRecentActivities(classId).map(activity => `
            <div class="timeline-item">
              <div class="timeline-date">${new Date(activity.date).toLocaleDateString('pt-BR')}</div>
              <div class="timeline-content">
                <div class="activity-type">${activity.type}</div>
                <div class="activity-description">${activity.description}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('teacherDashboardContent').innerHTML = dashboardHTML;
}

// OBTER ATIVIDADES RECENTES
function getRecentActivities(classId) {
  const activities = [];
  
  // Adicionar atividades de notas
  const recentGrades = window.gradeSystem.grades
    .filter(g => g.classId == classId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  recentGrades.forEach(grade => {
    activities.push({
      date: grade.createdAt,
      type: 'Nota Lançada',
      description: `${grade.activityName} - ${grade.activityType}`
    });
  });
  
  // Adicionar atividades de presença
  const recentAttendance = window.gradeSystem.attendance
    .filter(a => a.classId == classId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  
  recentAttendance.forEach(attendance => {
    activities.push({
      date: attendance.createdAt,
      type: 'Chamada Realizada',
      description: `Aula ${attendance.classType === 'main' ? 'Principal' : 'de Extensão'}`
    });
  });
  
  // Adicionar anotações
  const recentAnnotations = window.gradeSystem.annotations
    .filter(a => a.classId == classId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  
  recentAnnotations.forEach(annotation => {
    activities.push({
      date: annotation.createdAt,
      type: 'Anotação Criada',
      description: annotation.title
    });
  });
  
  // Ordenar por data e retornar os 10 mais recentes
  return activities
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
}

// ATUALIZAR DASHBOARD
function refreshDashboard(classId) {
  showAlert("Atualizando dashboard...", "info");
  setTimeout(() => {
    loadTeacherDashboard(classId);
    showAlert("Dashboard atualizado!", "success");
  }, 1000);
}

// EXPORTAR DADOS DO DASHBOARD
function exportDashboardData(classId) {
  const stats = calculateClassStats(classId, currentUser.id);
  const selectedClass = classes.find(c => c.id == classId);
  
  if (!stats || !selectedClass) {
    showAlert("Erro ao exportar dados", "error");
    return;
  }
  
  const exportData = {
    turma: selectedClass.name,
    professor: currentUser.name,
    dataExportacao: new Date().toLocaleString('pt-BR'),
    estatisticas: {
      totalAlunos: stats.totalStudents,
      mediaGeral: stats.classAverage,
      frequenciaMedia: stats.avgAttendance,
      alunosEmRisco: stats.studentsAtRisk.length
    },
    distribuicaoNotas: stats.gradeDistribution,
    alunosDetalhados: stats.studentDetails.map(s => ({
      nome: s.student.name,
      ra: s.student.ra,
      media: s.average,
      frequencia: s.attendanceRate
    }))
  };
  
  // Criar arquivo JSON para download
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `dashboard_${selectedClass.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  showAlert("Dados exportados com sucesso!", "success");
}

// ADICIONAR ANOTAÇÃO RÁPIDA PARA ALUNO EM RISCO
function addStudentAnnotation(studentId, classId) {
  const student = students.find(s => s.id === studentId);
  if (!student) return;
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content quick-annotation-modal">
      <div class="modal-header">
        <h3><i class="fas fa-sticky-note"></i> Anotação Rápida - ${student.name}</h3>
        <button onclick="closeModal()" class="modal-close">&times;</button>
      </div>
      
      <form onsubmit="saveQuickAnnotation(event, ${studentId}, ${classId})">
        <div class="form-group">
          <label for="quickAnnotationType">Tipo de Observação</label>
          <select id="quickAnnotationType" required>
            <option value="difficulty">Dificuldade de Aprendizado</option>
            <option value="behavior">Comportamento</option>
            <option value="attendance">Problema de Frequência</option>
            <option value="performance">Baixo Desempenho</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="quickAnnotationContent">Observação</label>
          <textarea id="quickAnnotationContent" required rows="4" 
                    placeholder="Descreva o que você observou sobre este aluno..."></textarea>
        </div>
        
        <div class="form-group">
          <label for="quickAnnotationPriority">Prioridade</label>
          <select id="quickAnnotationPriority" required>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
            <option value="urgent">Urgente</option>
          </select>
        </div>
        
        <div class="modal-actions">
          <button type="button" onclick="closeModal()" class="btn btn-secondary">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar Anotação</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// SALVAR ANOTAÇÃO RÁPIDA
function saveQuickAnnotation(event, studentId, classId) {
  event.preventDefault();
  
  const type = document.getElementById('quickAnnotationType').value;
  const content = document.getElementById('quickAnnotationContent').value;
  const priority = document.getElementById('quickAnnotationPriority').value;
  
  const titles = {
    'difficulty': 'Dificuldade de Aprendizado',
    'behavior': 'Questão Comportamental',
    'attendance': 'Problema de Frequência',
    'performance': 'Baixo Desempenho'
  };
  
  const annotationData = createTeacherAnnotation({
    studentId: studentId,
    classId: classId,
    teacherId: currentUser.id,
    type: type,
    title: titles[type],
    content: content,
    priority: priority,
    isPrivate: false
  });
  
  window.gradeSystem.annotations.push(annotationData);
  saveEnhancedData();
  
  showAlert("Anotação salva com sucesso!", "success");
  closeModal();
  
  // Atualizar dashboard para refletir mudanças
  loadTeacherDashboard(classId);
}

// GERAR RELATÓRIO COMPLETO DA TURMA
function generateClassReport(classId) {
  const stats = calculateClassStats(classId, currentUser.id);
  const selectedClass = classes.find(c => c.id == classId);
  
  if (!stats || !selectedClass) {
    showAlert("Erro ao gerar relatório", "error");
    return;
  }
  
  const reportHTML = `
    <div class="class-report">
      <div class="report-header">
        <h2>Relatório da Turma: ${selectedClass.name}</h2>
        <p>Professor: ${currentUser.name} | Data: ${new Date().toLocaleDateString('pt-BR')}</p>
      </div>
      
      <div class="report-summary">
        <h3>Resumo Geral</h3>
        <ul>
          <li>Total de Alunos: ${stats.totalStudents}</li>
          <li>Média da Turma: ${stats.classAverage.toFixed(2)}</li>
          <li>Frequência Média: ${stats.avgAttendance}%</li>
          <li>Alunos em Risco: ${stats.studentsAtRisk.length}</li>
        </ul>
      </div>
      
      <div class="report-details">
        <h3>Detalhamento por Aluno</h3>
        <table>
          <thead>
            <tr><th>Nome</th><th>RA</th><th>Média</th><th>Frequência</th><th>Situação</th></tr>
          </thead>
          <tbody>
            ${stats.studentDetails.map(s => `
              <tr>
                <td>${s.student.name}</td>
                <td>${s.student.ra}</td>
                <td>${s.average.toFixed(1)}</td>
                <td>${s.attendanceRate.toFixed(1)}%</td>
                <td>${s.average >= 6 ? 'Aprovado' : s.average >= 4 ? 'Recuperação' : 'Reprovado'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Abrir em nova janela para impressão
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Relatório - ${selectedClass.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .report-header { text-align: center; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>${reportHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

// EXPORTAR FUNÇÕES
window.loadTeacherDashboard = loadTeacherDashboard;
window.refreshDashboard = refreshDashboard;
window.exportDashboardData = exportDashboardData;
window.addStudentAnnotation = addStudentAnnotation;
window.saveQuickAnnotation = saveQuickAnnotation;
window.generateClassReport = generateClassReport;