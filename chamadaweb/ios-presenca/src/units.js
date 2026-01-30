import { supabase } from './supabase.js';

let units = [];

// Função para criar uma nova unidade
export async function createUnit(name) {
  const { data, error } = await supabase
    .from('units')
    .insert([{ name: name }])
    .select();

  if (error) {
    console.error('Erro ao criar unidade:', error);
    return false;
  }

  units.push(data[0]);
  updateUnitsDisplay();
  return true;
}

// Função para carregar unidades
export async function loadUnits() {
  const { data, error } = await supabase
    .from('units')
    .select('*')
    .order('name');

  if (!error) {
    units = data;
    updateUnitsDisplay();
  }
}

// Função para atualizar a exibição das unidades
function updateUnitsDisplay() {
  const unitsContainer = document.getElementById('unitsContainer');
  unitsContainer.innerHTML = '';

  units.forEach(unit => {
    const unitElement = document.createElement('div');
    unitElement.textContent = unit.name;
    unitsContainer.appendChild(unitElement);
  });
}

// Função para excluir uma unidade
export async function deleteUnit(unitId) {
  const { error } = await supabase
    .from('units')
    .delete()
    .eq('id', unitId);

  if (error) {
    console.error('Erro ao excluir unidade:', error);
    return false;
  }

  units = units.filter(unit => unit.id !== unitId);
  updateUnitsDisplay();
  return true;
}