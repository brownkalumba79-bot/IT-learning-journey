// Shared helpers + demo data (stored in the browser with localStorage)
const DB = {
  get(key, fallback) {
    const raw = localStorage.getItem('nth_' + key);
    return raw ? JSON.parse(raw) : fallback;
  },
  set(key, value) { localStorage.setItem('nth_' + key, JSON.stringify(value)); }
};

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }

function seedData() {
  if (DB.get('seeded', false)) return;
  DB.set('departments', ['Emergency', 'Paediatrics', 'Surgery', 'Maternity', 'Internal Medicine', 'Radiology']);
  DB.set('doctors', [
    { id: 'd1', name: 'Dr. Mutale Banda', dept: 'Emergency' },
    { id: 'd2', name: 'Dr. Chola Mwansa', dept: 'Paediatrics' },
    { id: 'd3', name: 'Dr. Naomi Phiri', dept: 'Surgery' },
    { id: 'd4', name: 'Dr. Joseph Tembo', dept: 'Internal Medicine' }
  ]);
  DB.set('patients', [
    { id: 'p1', name: 'Demo Patient', email: 'patient@demo.com', password: 'patient123', phone: '0977000111', nrc: '123456/10/1', gender: 'Female', dob: '1999-04-12' }
  ]);
  DB.set('appointments', [
    { id: 'a1', patientId: 'p1', doctorId: 'd2', date: '2026-10-15', time: '09:00', reason: 'General check-up', status: 'Confirmed' }
  ]);
  DB.set('records', [
    { id: 'r1', patientId: 'p1', date: '2026-09-02', doctorId: 'd4', diagnosis: 'Malaria (uncomplicated)', treatment: 'Artemether-lumefantrine, rest, fluids' }
  ]);
  DB.set('bills', [
    { id: 'b1', patientId: 'p1', desc: 'Consultation', amount: 150, status: 'Paid' },
    { id: 'b2', patientId: 'p1', desc: 'Laboratory tests', amount: 220, status: 'Unpaid' }
  ]);
  DB.set('seeded', true);
}

function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + name));
  document.querySelectorAll('.side nav a').forEach(a => a.classList.toggle('active', a.dataset.page === name));
}

function badge(status) { return `<span class="badge b-${status}">${status}</span>`; }
function nameOf(list, id) { const x = list.find(i => i.id === id); return x ? x.name : 'Unknown'; }
function money(n) { return 'K ' + Number(n).toLocaleString(); }

// Filters rows of a table as the user types in a search box
function filterTable(inputId, tbodyId) {
  const q = document.getElementById(inputId).value.toLowerCase();
  document.querySelectorAll('#' + tbodyId + ' tr').forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

seedData();