/**
 * ondas.js — Simulador de Ondas
 * ¡Bienvenido al creador de olas! 🌊
 * Aquí vamos a dibujar ondas como las del sonido, la luz o el agua del mar.
 *
 * ════════════════════════════════════════════════════════════════════
 *  📖 PARA EL PROFESOR — Resumen del motor (léelo antes de clase)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Este archivo tiene DOS partes:
 *
 *  PARTE 1 — MOTOR (ya hecho, no tocar):
 *    • Variables "maestras": freq, amp, speed, type.
 *      Son como perillas de radio: cambiarlas cambia la ola.
 *    • waveValue(x): fórmula matemática que calcula la altura de la ola
 *      en cada punto X de la pantalla, según el tipo elegido.
 *    • draw(): dibuja un fotograma de la ola usando Canvas 2D.
 *      Lee las variables maestras en cada fotograma, por eso al cambiar
 *      freq o type la ola cambia instantáneamente.
 *    • loop(): llama a draw() ~60 veces por segundo con requestAnimationFrame,
 *      creando la ilusión de movimiento (igual que un flip-book).
 *    • updateInfo(): actualiza los cartelitos de "Período" y "Longitud".
 *    • init(): conecta el canvas y LLAMA a la función start().
 *
 *  PARTE 2 — LO QUE PROGRAMA EL ESTUDIANTE:
 *    El estudiante debe conectar los sliders y botones con las variables
 *    maestras usando addEventListener. Eso es todo: si cambia freq,
 *    la ola cambia sola porque draw() la lee 60 veces por segundo.
 *
 * ════════════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  //  CÓDIGO YA HECHO — No lo modifiques
  // ══════════════════════════════════════════════════════════════════

  // Nuestras herramientas para dibujar en la pantalla
  let canvas, ctx;

  // 🎛️ Variables "maestras": controlan cómo se ve la ola.
  // El estudiante las cambia desde los sliders y botones.
  // freq (frecuencia): ¿Qué tan juntas están las olas?
  // amp (amplitud):    ¿Qué tan altas son las olas?
  // speed (velocidad): ¿Qué tan rápido se mueven?
  // type (tipo):       ¿Qué forma tienen? ('sin', 'square', 'triangle')
  let freq  = 1;
  let amp   = 80;
  let speed = 1;
  let type  = 'sin';

  // La fase es como el paso del tiempo para mover la ola
  let phase = 0;
  let raf   = null; // Control para detener la animación

  // 🧮 Fórmula matemática que le da forma a la ola
  function waveValue(x) {
    const arg = x * freq * 0.05 + phase;
    if (type === 'sin')      return Math.sin(arg);
    if (type === 'square')   return Math.sign(Math.sin(arg));
    if (type === 'triangle') return (2 / Math.PI) * Math.asin(Math.sin(arg));
    return 0;
  }

  // 🎨 Dibuja un fotograma de la ola en el canvas
  function draw() {
    const W  = canvas.width;
    const H  = canvas.height;
    const cy = H / 2;
    ctx.clearRect(0, 0, W, H);

    // Cuadrícula de fondo
    const gridColor = getComputedStyle(document.body).getPropertyValue('--clr-border').trim() || 'rgba(120,130,200,0.15)';
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.15;
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    ctx.globalAlpha = 1;

    // Línea del equilibrio (centro)
    ctx.strokeStyle = 'rgba(120,130,200,0.25)';
    ctx.setLineDash([5,5]);
    ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(W,cy); ctx.stroke();
    ctx.setLineDash([]);

    // Degradado de colores para la ola
    const colorPrim = getComputedStyle(document.body).getPropertyValue('--clr-primary').trim() || '#6c63ff';
    const colorAcc  = getComputedStyle(document.body).getPropertyValue('--clr-accent').trim()  || '#00d4aa';
    const grad = ctx.createLinearGradient(0,0,W,0);
    grad.addColorStop(0, colorPrim);
    grad.addColorStop(0.5, colorAcc);
    grad.addColorStop(1, colorPrim);

    // Dibuja la línea de la ola
    ctx.beginPath();
    for (let x = 0; x <= W; x++) {
      const y = cy - waveValue(x) * amp;
      x === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.strokeStyle = grad;
    ctx.lineWidth   = 3;
    ctx.stroke();

    // Relleno transparente bajo la ola
    ctx.lineTo(W, cy);
    ctx.lineTo(0, cy);
    ctx.closePath();
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--clr-primary-glow') || 'rgba(108,99,255,0.07)';
    ctx.fill();

    // Avanza la fase para que la ola se mueva
    phase += 0.03 * speed;
    updateInfo();
  }

  // 🎥 Motor de animación: llama a draw() ~60 veces por segundo
  function loop() {
    draw();
    raf = requestAnimationFrame(loop);
  }

  // 📊 Actualiza los cartelitos de Período, Longitud y Tipo
  function updateInfo() {
    const period = (1 / freq).toFixed(2);
    const lambda = (canvas.width / freq / 10).toFixed(1);
    const names  = { sin: 'Senoidal', square: 'Cuadrada', triangle: 'Triangular' };
    const wl = document.getElementById('waveLength');
    const wp = document.getElementById('wavePeriod');
    const wt = document.getElementById('waveTypeLabel');
    if (wl) wl.textContent = `${lambda} u`;
    if (wp) wp.textContent = `${period} s`;
    if (wt) wt.textContent = names[type] || type;
  }

  // 📐 Ajusta el tamaño del canvas si cambia la ventana
  function resizeCanvas() {
    if (!canvas) return;
    canvas.width  = Math.min(canvas.parentElement.clientWidth - 4, 900);
    canvas.height = 300;
  }

  // Arrancar y parar la animación
  function start() { if (!raf) loop(); }
  function stop()  {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    window.removeEventListener('resize', resizeCanvas);
  }

  // ══════════════════════════════════════════════════════════════════
  //  TU CÓDIGO AQUÍ — Completa los event listeners en init()
  // ══════════════════════════════════════════════════════════════════

  /**
   * init() — Se ejecuta automáticamente cuando se abre este módulo.
   * Tu misión: conectar los sliders y botones del HTML con las
   * variables maestras (freq, amp, speed, type) usando addEventListener.
   */
  function init() {
    canvas = document.getElementById('waveCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Buscamos los sliders en el HTML
    const $freq  = document.getElementById('sliderFreq');
    const $amp   = document.getElementById('sliderAmp');
    const $speed = document.getElementById('sliderSpeed');

    // ──────────────────────────────────────────────────────────────
    // TODO 1: Slider de FRECUENCIA
    // Cuando el usuario mueve el slider de frecuencia, debes:
    //   a) Leer su nuevo valor con: parseFloat($freq.value)
    //   b) Guardarlo en la variable "freq"
    //   c) Mostrar el valor en pantalla actualizando el texto de:
    //      document.getElementById('valFreq').textContent
    // Pista: usa $freq.addEventListener('input', function() { ... })
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 2: Slider de AMPLITUD
    // Igual que el TODO 1, pero para $amp y la variable "amp".
    // Usa parseInt() en vez de parseFloat() (la amplitud es entera).
    // El elemento que muestra el valor se llama 'valAmp'.
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 3: Slider de VELOCIDAD
    // Igual que el TODO 1, pero para $speed y la variable "speed".
    // El elemento que muestra el valor se llama 'valSpeed'.
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 4: Botones de TIPO de onda (Senoidal, Cuadrada, Triangular)
    // Los botones tienen la clase CSS 'wave-type-btn'.
    // Selecciónalos todos con: document.querySelectorAll('.wave-type-btn')
    // Para CADA botón (usa .forEach):
    //   a) Agrega un addEventListener de tipo 'click'
    //   b) Dentro, quita la clase 'active' a TODOS los botones
    //      (recorre de nuevo con forEach y haz b.classList.remove('active'))
    //   c) Agrégale la clase 'active' al botón que se clickeó
    //   d) Guarda el tipo en la variable "type" usando: btn.dataset.wave
    // ──────────────────────────────────────────────────────────────


    start(); // 🚀 ¡Arranca la animación! (no borres esta línea)
  }

  // Registramos el módulo en la aplicación
  window.MODULES.ondas = { init, start, stop };
})();
