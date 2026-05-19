const decisions = { t1: 'guardar', t2: 'guardar' };

function g(id) {
  const v = parseFloat(document.getElementById(id).value);
  return isNaN(v) ? 0 : Math.min(10, Math.max(0, v));
}

function gNullable(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  const v = parseFloat(el.value);
  return isNaN(v) ? null : Math.min(10, Math.max(0, v));
}

function onNotaChange(exam) {
  const nota = g(exam);
  if (nota < 3 && decisions[exam] === 'guardar') {
    decisions[exam] = 'presentar';
  }
  updateUI(exam);
  calc();
}

function setDecision(exam, decision) {
  if (decision === 'guardar' && g(exam) < 3) return;
  decisions[exam] = decision;
  updateUI(exam);
  calc();
}

function updateUI(exam) {
  const nota = g(exam);
  const canKeep = nota >= 3;
  const decision = decisions[exam];

  const btnG = document.getElementById(exam + '-btn-guardar');
  const btnP = document.getElementById(exam + '-btn-presentar');
  const pill = document.getElementById(exam + '-pill');
  const nuevaRow = document.getElementById(exam + '-nueva-row');
  const nuevaInput = document.getElementById(exam + '-nueva');

  btnG.disabled = !canKeep;
  btnG.className = 'toggle-btn' + (decision === 'guardar' && canKeep ? ' active-guardar' : '');
  btnP.className = 'toggle-btn' + (decision === 'presentar' ? ' active-presentar' : '');

  const mostrarNueva = !canKeep || decision === 'presentar';
  nuevaRow.style.display = mostrarNueva ? 'block' : 'none';
  if (!mostrarNueva) nuevaInput.value = '';

  if (!canKeep) {
    pill.className = 'info-pill must-present';
    pill.textContent = '⚠️ Nota < 3 · obligatorio presentarse. Introduce la nueva nota arriba.';
  } else if (decision === 'guardar') {
    pill.className = 'info-pill can-keep';
    pill.textContent = 'Tienes ≥ 3 · nota guardada. Puedes presentarte si quieres intentar mejorarla.';
  } else {
    pill.className = 'info-pill will-replace';
    pill.textContent = '⚠️ La nota anterior queda anulada. Se usará la nueva nota del examen.';
  }
}

function getNotaEfectiva(exam) {
  const notaOriginal = g(exam);
  if (decisions[exam] === 'guardar' && notaOriginal >= 3) return notaOriginal;
  const nueva = gNullable(exam + '-nueva');
  return nueva !== null ? nueva : 0;
}

function calc() {
  const t1ef = getNotaEfectiva('t1');
  const t2ef = getNotaEfectiva('t2');

  document.getElementById('show-t1').textContent = t1ef.toFixed(1);
  document.getElementById('show-t2').textContent = t2ef.toFixed(1);

  const p1 = g('p1'), p2 = g('p2'), p3 = g('p3'), p4 = g('p4');
  const notaPr = p1 * 0.25 + p2 * 0.25 + p3 * 0.20 + p4 * 0.30;
  document.getElementById('show-pr').textContent = notaPr.toFixed(2);

  const notaTeoria = t1ef * 0.30 + t2ef * 0.30;
  const notaPracticas = notaPr * 0.40;
  const notaFinal = notaTeoria + notaPracticas;

  document.getElementById('r-teoria').textContent = notaTeoria.toFixed(2);
  document.getElementById('r-practicas').textContent = notaPracticas.toFixed(2);
  document.getElementById('r-final').textContent = notaFinal.toFixed(2);

  const aprueba = notaFinal >= 5;
  const rrFinal = document.getElementById('rr-final');
  rrFinal.textContent = notaFinal.toFixed(2) + (aprueba ? ' ✓' : ' ✗');
  rrFinal.className = 'rest-val ' + (aprueba ? 'ok' : 'fail');

  const vEl = document.getElementById('veredicto');
  const vMsg = document.getElementById('veredicto-msg');

  if (aprueba) {
    vEl.className = 'veredicto aprobado';
    vEl.querySelector('.v-title').textContent = 'Aprobado con un ' + notaFinal.toFixed(2);
    vMsg.textContent = '¡Superada la convocatoria!';
  } else {
    vEl.className = 'veredicto suspendido';
    vEl.querySelector('.v-title').textContent = 'Suspenso con un ' + notaFinal.toFixed(2);
    vMsg.textContent = 'La nota final no llega al 5. Faltan ' + (5 - notaFinal).toFixed(2) + ' puntos.';
  }
}

onNotaChange('t1');
onNotaChange('t2');
