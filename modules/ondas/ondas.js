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
 *    • Variables "maestras": frecuencia, amplitud, velocidad, tipo.
 *      Son como perillas de radio: cambiarlas cambia la ola.
 *    • valorOnda(x): fórmula matemática que calcula la altura de la ola
 *      en cada punto X de la pantalla, según el tipo elegido.
 *    • dibujar(): dibuja un fotograma de la ola usando Canvas 2D.
 *      Lee las variables maestras en cada fotograma, por eso al cambiar
 *      frecuencia o tipo la ola cambia instantáneamente.
 *    • bucle(): llama a dibujar() ~60 veces por segundo con requestAnimationFrame,
 *      creando la ilusión de movimiento (igual que un flip-book).
 *    • actualizarInfo(): actualiza los cartelitos de "Período" y "Longitud".
 *    • arrancar(): conecta el lienzo y LLAMA a la función iniciar().
 *
 *  PARTE 2 — LO QUE PROGRAMA EL ESTUDIANTE:
 *    El estudiante debe conectar los sliders y botones con las variables
 *    maestras usando addEventListener. Eso es todo: si cambia frecuencia,
 *    la ola cambia sola porque dibujar() la lee 60 veces por segundo.
 *
 * ════════════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  //  CÓDIGO YA HECHO — No lo modifiques
  // ══════════════════════════════════════════════════════════════════

  // Nuestras herramientas para dibujar en la pantalla
  let lienzo, contexto;

  // 🎛️ Variables "maestras": controlan cómo se ve la ola.
  // El estudiante las cambia desde los sliders y botones.
  // frecuencia: ¿Qué tan juntas están las olas?
  // amplitud:   ¿Qué tan altas son las olas?
  // velocidad:  ¿Qué tan rápido se mueven?
  // tipo:       ¿Qué forma tienen? ('sin', 'square', 'triangle')
  let frecuencia = 1;
  let amplitud   = 80;
  let velocidad  = 1;
  let tipo       = 'sin';

  // La fase es como el paso del tiempo para mover la ola
  let fase      = 0;
  let fotograma = null; // Control para detener la animación

  // 🧮 Fórmula matemática que le da forma a la ola
  function valorOnda(x) {
    const argumento = x * frecuencia * 0.05 + fase;
    if (tipo === 'sin')      return Math.sin(argumento);
    if (tipo === 'square')   return Math.sign(Math.sin(argumento));
    if (tipo === 'triangle') return (2 / Math.PI) * Math.asin(Math.sin(argumento));
    return 0;
  }

  // 🎨 Dibuja un fotograma de la ola en el lienzo
  function dibujar() {
    const ancho  = lienzo.width;
    const alto   = lienzo.height;
    const centro = alto / 2;
    contexto.clearRect(0, 0, ancho, alto);

    // Cuadrícula de fondo
    const colorBorde = getComputedStyle(document.body).getPropertyValue('--clr-border').trim() || 'rgba(120,130,200,0.15)';
    contexto.strokeStyle = colorBorde;
    contexto.lineWidth = 1;
    contexto.globalAlpha = 0.15;
    for (let y = 0; y < alto; y += 40) { contexto.beginPath(); contexto.moveTo(0,y); contexto.lineTo(ancho,y); contexto.stroke(); }
    for (let x = 0; x < ancho; x += 80) { contexto.beginPath(); contexto.moveTo(x,0); contexto.lineTo(x,alto); contexto.stroke(); }
    contexto.globalAlpha = 1;

    // Línea del equilibrio (centro)
    contexto.strokeStyle = 'rgba(120,130,200,0.25)';
    contexto.setLineDash([5,5]);
    contexto.beginPath(); contexto.moveTo(0,centro); contexto.lineTo(ancho,centro); contexto.stroke();
    contexto.setLineDash([]);

    // Degradado de colores para la ola
    const colorPrimario = getComputedStyle(document.body).getPropertyValue('--clr-primary').trim() || '#6c63ff';
    const colorAcento   = getComputedStyle(document.body).getPropertyValue('--clr-accent').trim()  || '#00d4aa';
    const degradado = contexto.createLinearGradient(0,0,ancho,0);
    degradado.addColorStop(0, colorPrimario);
    degradado.addColorStop(0.5, colorAcento);
    degradado.addColorStop(1, colorPrimario);

    // Dibuja la línea de la ola
    contexto.beginPath();
    for (let x = 0; x <= ancho; x++) {
      const y = centro - valorOnda(x) * amplitud;
      x === 0 ? contexto.moveTo(x,y) : contexto.lineTo(x,y);
    }
    contexto.strokeStyle = degradado;
    contexto.lineWidth   = 3;
    contexto.stroke();

    // Relleno transparente bajo la ola
    contexto.lineTo(ancho, centro);
    contexto.lineTo(0, centro);
    contexto.closePath();
    contexto.fillStyle = getComputedStyle(document.body).getPropertyValue('--clr-primary-glow') || 'rgba(108,99,255,0.07)';
    contexto.fill();

    // Avanza la fase para que la ola se mueva
    fase += 0.03 * velocidad;
    actualizarInfo();
  }

  // 🎥 Motor de animación: llama a dibujar() ~60 veces por segundo
  function bucle() {
    dibujar();
    fotograma = requestAnimationFrame(bucle);
  }

  // 📊 Actualiza los cartelitos de Período, Longitud y Tipo
  function actualizarInfo() {
    const periodo      = (1 / frecuencia).toFixed(2);
    const longitudOnda = (lienzo.width / frecuencia / 10).toFixed(1);
    const nombres      = { sin: 'Senoidal', square: 'Cuadrada', triangle: 'Triangular' };
    const elLongitud   = document.getElementById('longitudOnda');
    const elPeriodo    = document.getElementById('periodoOnda');
    const elTipo       = document.getElementById('tipoOndaEtiqueta');
    if (elLongitud) elLongitud.textContent = `${longitudOnda} u`;
    if (elPeriodo)  elPeriodo.textContent  = `${periodo} s`;
    if (elTipo)     elTipo.textContent     = nombres[tipo] || tipo;
  }

  // 📐 Ajusta el tamaño del lienzo si cambia la ventana
  function ajustarLienzo() {
    if (!lienzo) return;
    lienzo.width  = Math.min(lienzo.parentElement.clientWidth - 4, 900);
    lienzo.height = 300;
  }

  // Arrancar y parar la animación
  function iniciar() { if (!fotograma) bucle(); }
  function detener() {
    if (fotograma) { cancelAnimationFrame(fotograma); fotograma = null; }
    window.removeEventListener('resize', ajustarLienzo);
  }

  // ══════════════════════════════════════════════════════════════════
  //  TU CÓDIGO AQUÍ — Completa los event listeners en arrancar()
  // ══════════════════════════════════════════════════════════════════

  /**
   * arrancar() — Se ejecuta automáticamente cuando se abre este módulo.
   * Tu misión: conectar los sliders y botones del HTML con las
   * variables maestras (frecuencia, amplitud, velocidad, tipo) usando addEventListener.
   */
  function arrancar() {
    lienzo = document.getElementById('lienzo');
    if (!lienzo) return;
    contexto = lienzo.getContext('2d');

    ajustarLienzo();
    window.addEventListener('resize', ajustarLienzo);

    // Buscamos los sliders en el HTML
    const controlFrecuencia = document.getElementById('controlFrecuencia');
    const controlAmplitud   = document.getElementById('controlAmplitud');
    const controlVelocidad  = document.getElementById('controlVelocidad');

    // ──────────────────────────────────────────────────────────────
    // TODO 1: Slider de FRECUENCIA
    // Cuando el usuario mueve el slider de frecuencia, debes:
    //   a) Leer su nuevo valor con: parseFloat(controlFrecuencia.value)
    //   b) Guardarlo en la variable "frecuencia"
    //   c) Mostrar el valor en pantalla actualizando el texto de:
    //      document.getElementById('valorFrecuencia').textContent
    // Pista: usa controlFrecuencia.addEventListener('input', function() { ... })
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 2: Slider de AMPLITUD
    // Igual que el TODO 1, pero para controlAmplitud y la variable "amplitud".
    // Usa parseInt() en vez de parseFloat() (la amplitud es entera).
    // El elemento que muestra el valor se llama 'valorAmplitud'.
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 3: Slider de VELOCIDAD
    // Igual que el TODO 1, pero para controlVelocidad y la variable "velocidad".
    // El elemento que muestra el valor se llama 'valorVelocidad'.
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 4: Botones de TIPO de onda (Senoidal, Cuadrada, Triangular)
    // Los botones tienen la clase CSS 'boton-tipo-onda'.
    // Selecciónalos todos con: document.querySelectorAll('.boton-tipo-onda')
    // Para CADA botón (usa .forEach):
    //   a) Agrega un addEventListener de tipo 'click'
    //   b) Dentro, quita la clase 'activo' a TODOS los botones
    //      (recorre de nuevo con forEach y haz boton.classList.remove('activo'))
    //   c) Agrégale la clase 'activo' al botón que se clickeó
    //   d) Guarda el tipo en la variable "tipo" usando: boton.dataset.wave
    // ──────────────────────────────────────────────────────────────


    iniciar(); // 🚀 ¡Arranca la animación! (no borres esta línea)
  }

  // Registramos el módulo en la aplicación
  window.MODULES.ondas = { init: arrancar, start: iniciar, stop: detener };
})();
