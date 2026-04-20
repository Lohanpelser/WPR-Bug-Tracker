const PEOPLE = [
  { id:'p1', name:'Amara',  surname:'Nkosi',   email:'amara@dev.io',  username:'amara_n' },
  { id:'p2', name:'Liam',   surname:'Botha',   email:'liam@dev.io',   username:'liam_b'  },
  { id:'p3', name:'Zara',   surname:'Dlamini', email:'zara@dev.io',   username:'zara_d'  },
  { id:'p4', name:'Ethan',  surname:'Mokoena', email:'ethan@dev.io',  username:'ethan_m' },
  { id:'p5', name:'Priya',  surname:'Patel',   email:'priya@dev.io',  username:'priya_p' },
];

const PROJECTS = [
  { id:'proj1', name:'Portal Web App' },
  { id:'proj2', name:'Mobile Client'  },
  { id:'proj3', name:'API Backend'    },
  { id:'proj4', name:'Admin Dashboard'},
];

const SEED = [
  { id:'ISS-001', summary:'Login button unresponsive on mobile', description:'Tapping login on Android Chrome does nothing.', project:'proj2', assignee:'p2', identifiedBy:'QA Team', dateIdentified:'2025-01-10', priority:'high', status:'open', targetDate:'2025-01-20', actualDate:'', resolution:'' },
  { id:'ISS-002', summary:'Search returns duplicate results', description:'Searching by email sometimes returns the same record twice.', project:'proj1', assignee:'p1', identifiedBy:'Amara Nkosi', dateIdentified:'2025-01-12', priority:'medium', status:'resolved', targetDate:'2025-01-18', actualDate:'2025-01-17', resolution:'Fixed SQL join condition.' },
  { id:'ISS-003', summary:'Profile image not loading', description:'User profile pictures fail to render after account creation.', project:'proj1', assignee:'p3', identifiedBy:'Zara Dlamini', dateIdentified:'2025-01-14', priority:'low', status:'open', targetDate:'2025-01-28', actualDate:'', resolution:'' },
  { id:'ISS-004', summary:'API 500 error on /auth/refresh', description:'Token refresh endpoint throws internal server error intermittently.', project:'proj3', assignee:'p4', identifiedBy:'Ethan Mokoena', dateIdentified:'2025-01-08', priority:'high', status:'overdue', targetDate:'2025-01-15', actualDate:'', resolution:'' },
  { id:'ISS-005', summary:'Dashboard chart not rendering in Safari', description:'Revenue chart is blank on Safari 16+.', project:'proj4', assignee:'p5', identifiedBy:'Priya Patel', dateIdentified:'2025-01-15', priority:'medium', status:'open', targetDate:'2025-02-01', actualDate:'', resolution:'' },
  { id:'ISS-006', summary:'Email notifications delayed by 2+ hours', description:'Password reset emails arrive hours after request.', project:'proj3', assignee:'p2', identifiedBy:'Support Team', dateIdentified:'2025-01-09', priority:'high', status:'overdue', targetDate:'2025-01-14', actualDate:'', resolution:'' },
  { id:'ISS-007', summary:'CSV export truncates long fields', description:'Export cuts off description fields over 200 chars.', project:'proj4', assignee:'p1', identifiedBy:'Amara Nkosi', dateIdentified:'2025-01-16', priority:'low', status:'resolved', targetDate:'2025-01-22', actualDate:'2025-01-21', resolution:'Increased buffer size in export utility.' },
  { id:'ISS-008', summary:'Session expires too quickly', description:'Users logged out after 5 min instead of 30.', project:'proj1', assignee:'p3', identifiedBy:'Liam Botha', dateIdentified:'2025-01-17', priority:'medium', status:'open', targetDate:'2025-01-30', actualDate:'', resolution:'' },
  { id:'ISS-009', summary:'Password reset link invalid after first use', description:'Clicking reset link a second time shows an error.', project:'proj3', assignee:'p4', identifiedBy:'QA Team', dateIdentified:'2025-01-18', priority:'low', status:'resolved', targetDate:'2025-01-24', actualDate:'2025-01-23', resolution:'Token invalidated gracefully.' },
  { id:'ISS-010', summary:'Notification badge count incorrect', description:'Badge shows 5 notifications but only 2 are unread.', project:'proj4', assignee:'p5', identifiedBy:'Priya Patel', dateIdentified:'2025-01-19', priority:'medium', status:'overdue', targetDate:'2025-01-25', actualDate:'', resolution:'' },
  { id:'ISS-011', summary:'Drag-and-drop broken in Firefox', description:'Kanban drag-and-drop does not work in Firefox 120+.', project:'proj4', assignee:'p1', identifiedBy:'Ethan Mokoena', dateIdentified:'2025-01-20', priority:'high', status:'open', targetDate:'2025-02-05', actualDate:'', resolution:'' },
];

function ls(k, fb) { try { return JSON.parse(localStorage.getItem(k)) || fb; } catch { return fb; } }
function ss(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

let issues = ls('bt2_issues', null);
if (!issues) { issues = SEED; ss('bt2_issues', issues); }

let pics = ls('bt2_pics', {});
let editId = null;

// NAVIGATION
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  const idx = {board:0,issues:1,people:2,projects:3};
  if (idx[name] !== undefined) document.querySelectorAll('.nav-btn')[idx[name]].classList.add('active');
  if (name === 'board') renderBoard();
  if (name === 'issues') renderTable(ls('bt2_issues', SEED));
  if (name === 'people') renderPeople();
  if (name === 'projects') renderProjects();
}

// AVATAR HTML
function avatarHTML(personId, size=26) {
  const p = PEOPLE.find(x => x.id === personId);
  if (!p) return `<div class="avatar" style="width:${size}px;height:${size}px">?</div>`;
  const initials = p.name[0] + p.surname[0];
  const imgSrc = pics[personId];
  return `<div class="avatar" style="width:${size}px;height:${size}px">
    ${imgSrc ? `<img src="${imgSrc}" alt="${initials}">` : initials}
  </div>`;
}

// BOARD
function renderBoard() {
  issues = ls('bt2_issues', SEED);
  const cols = { backlog:[], open:[], overdue:[], resolved:[] };
  issues.forEach(i => {
    const c = ['open','resolved','overdue'].includes(i.status) ? i.status : 'backlog';
    cols[c].push(i);
  });
  document.getElementById('s-total').textContent = issues.length;
  document.getElementById('s-open').textContent = cols.open.length;
  document.getElementById('s-overdue').textContent = cols.overdue.length;
  document.getElementById('s-resolved').textContent = cols.resolved.length;
  ['backlog','open','overdue','resolved'].forEach(col => {
    document.getElementById('cc-' + col).textContent = cols[col].length;
    document.getElementById('col-' + col).innerHTML = cols[col].length
      ? cols[col].map(cardHTML).join('')
      : '<div style="color:#ccc;font-size:12px;padding:8px">No issues</div>';
  });
}

function cardHTML(i) {
  return `<div class="card" onclick="showDetail('${i.id}')">
    <div class="card-id">${i.id}</div>
    <div class="card-summary">${i.summary}</div>
    <div class="card-footer">
      <span class="badge badge-${i.priority}">${i.priority}</span>
      <span class="badge badge-${i.status}">${i.status}</span>
      ${avatarHTML(i.assignee)}
    </div>
  </div>`;
}

// TABLE
function renderTable(list) {
  const tbody = document.getElementById('issues-tbody');
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#bbb;padding:40px">No issues found</td></tr>';
    return;
  }
  tbody.innerHTML = list.map(i => {
    const proj = PROJECTS.find(p => p.id === i.project);
    const person = PEOPLE.find(p => p.id === i.assignee);
    return `<tr onclick="showDetail('${i.id}')">
      <td style="color:#bbb;font-size:12px">${i.id}</td>
      <td style="font-weight:500">${i.summary}</td>
      <td style="color:#666">${proj ? proj.name : '—'}</td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          ${avatarHTML(i.assignee)}
          <span style="color:#666">${person ? person.name + ' ' + person.surname : '—'}</span>
        </div>
      </td>
      <td><span class="badge badge-${i.priority}">${i.priority}</span></td>
      <td><span class="badge badge-${i.status}">${i.status}</span></td>
      <td style="color:#888;font-size:12px">${i.targetDate || '—'}</td>
    </tr>`;
  }).join('');
}

function filterIssues(q) {
  const all = ls('bt2_issues', SEED);
  renderTable(all.filter(i =>
    i.summary.toLowerCase().includes(q.toLowerCase()) || i.id.toLowerCase().includes(q.toLowerCase())
  ));
}

// DETAIL
function showDetail(id) {
  issues = ls('bt2_issues', SEED);
  const i = issues.find(x => x.id === id);
  if (!i) return;
  const proj = PROJECTS.find(p => p.id === i.project);
  const person = PEOPLE.find(p => p.id === i.assignee);
  document.getElementById('detail-content').innerHTML = `
    <div class="detail-header">
      <div>
        <div class="detail-id">${i.id}</div>
        <div class="detail-title">${i.summary}</div>
      </div>
      <button class="btn btn-secondary" onclick="editIssue('${i.id}')">Edit</button>
    </div>
    <div class="detail-body">
      <div>
        <div class="desc-box">${i.description || 'No description provided.'}</div>
        ${i.resolution ? `<div style="font-size:12px;font-weight:600;color:#888;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em">Resolution</div><div class="desc-box" style="border-left:3px solid #1e8a4a">${i.resolution}</div>` : ''}
      </div>
      <div class="sidebar">
        <div class="sidebar-row"><span class="sidebar-key">Status</span><span class="badge badge-${i.status}">${i.status}</span></div>
        <div class="sidebar-row"><span class="sidebar-key">Priority</span><span class="badge badge-${i.priority}">${i.priority}</span></div>
        <div class="sidebar-row"><span class="sidebar-key">Project</span><span>${proj ? proj.name : '—'}</span></div>
        <div class="sidebar-row">
          <span class="sidebar-key">Assignee</span>
          <div style="display:flex;align-items:center;gap:6px">
            ${avatarHTML(i.assignee, 24)}
            <span>${person ? person.name + ' ' + person.surname : '—'}</span>
          </div>
        </div>
        <div class="sidebar-row"><span class="sidebar-key">Identified By</span><span>${i.identifiedBy || '—'}</span></div>
        <div class="sidebar-row"><span class="sidebar-key">Date Identified</span><span style="font-size:12px">${i.dateIdentified || '—'}</span></div>
        <div class="sidebar-row"><span class="sidebar-key">Target Date</span><span style="font-size:12px">${i.targetDate || '—'}</span></div>
        <div class="sidebar-row"><span class="sidebar-key">Resolved On</span><span style="font-size:12px">${i.actualDate || '—'}</span></div>
      </div>
    </div>
  `;
  showView('detail');
}

// PEOPLE
function renderPeople() {
  pics = ls('bt2_pics', {});
  document.getElementById('people-grid').innerHTML = PEOPLE.map(p => {
    const imgSrc = pics[p.id];
    const initials = p.name[0] + p.surname[0];
    return `<div class="person-card">
      <div class="person-avatar-wrap" onclick="document.getElementById('pic-${p.id}').click()">
        ${imgSrc ? `<img src="${imgSrc}" alt="${initials}">` : initials}
      </div>
      <input type="file" accept="image/*" class="pic-input" id="pic-${p.id}" onchange="uploadPic('${p.id}', this)">
      <div class="person-name">${p.name} ${p.surname}</div>
      <div class="person-username">@${p.username}</div>
      <div class="person-email">${p.email}</div>
    </div>`;
  }).join('');
}

function uploadPic(personId, input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    pics = ls('bt2_pics', {});
    pics[personId] = e.target.result;
    ss('bt2_pics', pics);
    renderPeople();
  };
  reader.readAsDataURL(file);
}

// PROJECTS
function renderProjects() {
  issues = ls('bt2_issues', SEED);
  document.getElementById('projects-grid').innerHTML = PROJECTS.map(p => {
    const count = issues.filter(i => i.project === p.id).length;
    return `<div class="project-card">
      <div class="project-name">${p.name}</div>
      <div class="project-id">${p.id}</div>
      <div class="project-count"><strong>${count}</strong> issue${count !== 1 ? 's' : ''}</div>
    </div>`;
  }).join('');
}

// MODAL
function populateSelects() {
  document.getElementById('f-project').innerHTML =
    '<option value="">— Select —</option>' + PROJECTS.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
  document.getElementById('f-assignee').innerHTML =
    '<option value="">— Unassigned —</option>' + PEOPLE.map(p => `<option value="${p.id}">${p.name} ${p.surname}</option>`).join('');
}

function openCreate() {
  editId = null;
  document.getElementById('modal-title').textContent = 'New Issue';
  ['summary','desc','identified-by','date-identified','target-date','actual-date','resolution'].forEach(f => {
    const el = document.getElementById('f-' + f);
    if (el) el.value = '';
  });
  document.getElementById('f-priority').value = 'medium';
  document.getElementById('f-status').value = 'open';
  populateSelects();
  document.getElementById('issue-modal').classList.add('open');
}

function editIssue(id) {
  issues = ls('bt2_issues', SEED);
  const i = issues.find(x => x.id === id);
  if (!i) return;
  editId = id;
  document.getElementById('modal-title').textContent = 'Edit Issue';
  populateSelects();
  document.getElementById('f-summary').value = i.summary;
  document.getElementById('f-desc').value = i.description;
  document.getElementById('f-identified-by').value = i.identifiedBy;
  document.getElementById('f-date-identified').value = i.dateIdentified;
  document.getElementById('f-project').value = i.project;
  document.getElementById('f-assignee').value = i.assignee;
  document.getElementById('f-priority').value = i.priority;
  document.getElementById('f-status').value = i.status;
  document.getElementById('f-target-date').value = i.targetDate;
  document.getElementById('f-actual-date').value = i.actualDate;
  document.getElementById('f-resolution').value = i.resolution;
  document.getElementById('issue-modal').classList.add('open');
}

function closeModal() { document.getElementById('issue-modal').classList.remove('open'); }

function saveIssue() {
  const summary = document.getElementById('f-summary').value.trim();
  if (!summary) { alert('Summary is required.'); return; }
  issues = ls('bt2_issues', SEED);
  const data = {
    summary,
    description: document.getElementById('f-desc').value.trim(),
    identifiedBy: document.getElementById('f-identified-by').value.trim(),
    dateIdentified: document.getElementById('f-date-identified').value,
    project: document.getElementById('f-project').value,
    assignee: document.getElementById('f-assignee').value,
    priority: document.getElementById('f-priority').value,
    status: document.getElementById('f-status').value,
    targetDate: document.getElementById('f-target-date').value,
    actualDate: document.getElementById('f-actual-date').value,
    resolution: document.getElementById('f-resolution').value.trim(),
  };
  if (editId) {
    const idx = issues.findIndex(i => i.id === editId);
    if (idx > -1) issues[idx] = { ...issues[idx], ...data };
  } else {
    issues.push({ id: 'ISS-' + String(issues.length + 1).padStart(3,'0'), ...data });
  }
  ss('bt2_issues', issues);
  closeModal();
  showView('board');
}

renderBoard();
