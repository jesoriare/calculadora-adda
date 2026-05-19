function g(id) {
  const v = parseFloat(document.getElementById(id).value);
  return isNaN(v) ? 0 : Math.min(10, Math.max(0, v));
}

function setOpcion(prefix, opA, opB) {
  const usaB = opB >= opA;
  document.getElementById(prefix+'opAval').textContent = opA.toFixed(2);
  document.getElementById(prefix+'opBval').textContent = opB.toFixed(2);
  document.getElementById(prefix+'opA').className = 'opcion' + (!usaB ? ' used' : '');
  document.getElementById(prefix+'opB').className = 'opcion' + (usaB ? ' used' : '');
}

function rrow(id, label, pass) {
  const el = document.getElementById(id);
  el.textContent = label + (pass ? ' ✓' : ' ✗');
  el.className = 'rest-val ' + (pass ? 'ok' : 'fail');
}

function calc() {
  const c1t = g('c1t'), c1p1 = g('c1p1'), c1p2 = g('c1p2'), c1cu = g('c1cu');
  const c2t = g('c2t'), c2p1 = g('c2p1'), c2p2 = g('c2p2'), c2cu = g('c2cu');

  const pr1 = c1p1 * 0.5 + c1p2 * 0.5;
  const pr2 = c2p1 * 0.4 + c2p2 * 0.6;

  const c1opA = c1t * 0.6 + pr1 * 0.4;
  const c1opB = c1t * 0.4 + pr1 * 0.4 + c1cu * 0.2;
  const c1nota = Math.max(c1opA, c1opB);

  const c2opA = c2t * 0.6 + pr2 * 0.4;
  const c2opB = c2t * 0.4 + pr2 * 0.4 + c2cu * 0.2;
  const c2nota = Math.max(c2opA, c2opB);

  document.getElementById('c1pr').textContent = pr1.toFixed(2);
  document.getElementById('c1nota').textContent = c1nota.toFixed(2);
  document.getElementById('c2pr').textContent = pr2.toFixed(2);
  document.getElementById('c2nota').textContent = c2nota.toFixed(2);

  setOpcion('c1', c1opA, c1opB);
  setOpcion('c2', c2opA, c2opB);

  const b1 = document.getElementById('c1badge');
  b1.textContent = c1t >= 3 ? '✓ Examen ' + c1t.toFixed(1) + ' ≥ 3' : '✗ Examen ' + c1t.toFixed(1) + ' < 3';
  b1.className = 'mini-badge ' + (c1t >= 3 ? 'ok' : 'fail');

  const b2 = document.getElementById('c2badge');
  b2.textContent = c2t >= 3 ? '✓ Examen ' + c2t.toFixed(1) + ' ≥ 3' : '✗ Examen ' + c2t.toFixed(1) + ' < 3';
  b2.className = 'mini-badge ' + (c2t >= 3 ? 'ok' : 'fail');

  const notaFinal = (c1nota + c2nota) / 2;
  const mediaT = (c1t + c2t) / 2;
  const okCada = c1t >= 3 && c2t >= 3;
  const okMedia = mediaT >= 4;
  const aprueba = okCada && okMedia && notaFinal >= 5;

  document.getElementById('r-c1').textContent = c1nota.toFixed(2);
  document.getElementById('r-c2').textContent = c2nota.toFixed(2);
  document.getElementById('r-final').textContent = notaFinal.toFixed(2);

  rrow('rr1', c1t.toFixed(1), c1t >= 3);
  rrow('rr2', c2t.toFixed(1), c2t >= 3);
  rrow('rr3', mediaT.toFixed(2), okMedia);
  rrow('rr4', notaFinal.toFixed(2), notaFinal >= 5);

  const vEl = document.getElementById('veredicto');
  const vMsg = document.getElementById('veredicto-msg');

  if (!okCada) {
    vEl.className = 'veredicto suspendido';
    vEl.querySelector('.v-title').textContent = 'Suspenso';
    vMsg.textContent = 'Algún examen de teoría no llega a 3. Suspenso directo independientemente del resto de notas.';
  } else if (!okMedia) {
    vEl.className = 'veredicto suspendido';
    vEl.querySelector('.v-title').textContent = 'Suspenso';
    vMsg.textContent = 'La media anual de teoría es ' + mediaT.toFixed(2) + ' (C1: ' + c1t.toFixed(1) + ' + C2: ' + c2t.toFixed(1) + ') ÷ 2. Necesitas al menos 4.';
  } else if (!aprueba) {
    vEl.className = 'veredicto suspendido';
    vEl.querySelector('.v-title').textContent = 'Suspenso';
    vMsg.textContent = 'Los exámenes cumplen los mínimos pero la nota final (' + notaFinal.toFixed(2) + ') no llega al 5. Faltan ' + (5 - notaFinal).toFixed(2) + ' puntos.';
  } else {
    vEl.className = 'veredicto aprobado';
    vEl.querySelector('.v-title').textContent = 'Aprobado con un ' + notaFinal.toFixed(2);
    vMsg.textContent = 'Todos los requisitos cumplidos. ¡Enhorabuena!';
  }
}

calc();
