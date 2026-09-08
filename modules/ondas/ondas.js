/**
 * ondas.js — Simulador de Ondas
 * ¡Bienvenido al creador de olas! 🌊
 * Aquí vamos a dibujar ondas como las del sonido, la luz o el agua del mar.
 */
(function () {
  'use strict';

  // Nuestras herramientas para dibujar en la pantalla
  let canvas, ctx;
  
  // 🎛️ ZONA DE HACKEO: ¡Los controles principales!
  // freq (frecuencia): ¿Qué tan juntas están las olas?
  // amp (amplitud): ¿Qué tan altas son las olas? (Prueba poner 150)
  // speed (velocidad): ¿Qué tan rápido se mueven?
  // type (tipo): ¿Qué forma tienen? ('sin' = suaves, 'square' = cuadradas, 'triangle' = picos)
  let freq = 1;
  let amp = 80;
  let speed = 1;
  let type = 'sin'; // Empieza con olas suaves (senoidales)
  
  // La fase es como el paso del tiempo para mover la ola
  let phase = 0;
  let raf = null; // Nuestro control para detener la película

  // 🧮 Las matemáticas mágicas que le dan forma a la ola
  function waveValue(x) {
    const arg = x * freq * 0.05 + phase; // Esta es la "X" matemática
    
    // Si elegimos ola suave (Senoidal)
    if (type === 'sin')      return Math.sin(arg);
    // Si elegimos ola cuadrada (como una escalera)
    if (type === 'square')   return Math.sign(Math.sin(arg));
    // Si elegimos ola triangular (como montañas)
    if (type === 'triangle') return (2 / Math.PI) * Math.asin(Math.sin(arg));
    
    return 0; // Si no hay tipo, no hay ola (es una línea recta)
  }

  // 🎨 ¡A pintar la ola en la pantalla!
  function draw() {
    const W = canvas.width;  // Ancho de la pantalla
    const H = canvas.height; // Alto de la pantalla
    const cy = H / 2;        // El centro de la pantalla (la línea del agua tranquila)
    
    ctx.clearRect(0, 0, W, H); // Borramos el dibujo anterior

    // 📏 Dibujamos una cuadrícula suave en el fondo para medir las olas
    ctx.strokeStyle = 'rgba(120,130,200,0.07)';
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }

    // ➖ Dibujamos la línea del medio (el punto de equilibrio)
    ctx.strokeStyle = 'rgba(120,130,200,0.25)';
    ctx.setLineDash([5,5]); // Línea punteadita
    ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(W,cy); ctx.stroke();
    ctx.setLineDash([]); // Volvemos a la línea normal

    // 🌈 ZONA DE HACKEO: ¡Colores de la ola!
    // Aquí pintamos la ola con un degradado. 
    // ¿Qué pasa si cambias el '#00d4aa' (verde) por '#ff0000' (rojo)?
    const grad = ctx.createLinearGradient(0,0,W,0);
    grad.addColorStop(0,'#6c63ff'); // Izquierda (morado)
    grad.addColorStop(0.5,'#00d4aa'); // Medio (verde)
    grad.addColorStop(1,'#6c63ff'); // Derecha (morado)

    // 🌊 Empezamos a dibujar la línea principal de la ola
    ctx.beginPath();
    for (let x = 0; x <= W; x++) {
      // Calculamos qué tan alta o baja está la ola en cada puntito de la pantalla
      const y = cy - waveValue(x) * amp;
      if (x === 0) {
        ctx.moveTo(x,y); // Ponemos el lápiz
      } else {
        ctx.lineTo(x,y); // Arrastramos el lápiz
      }
    }
    
    ctx.strokeStyle = grad; // Usamos nuestro color degradado
    ctx.lineWidth = 3;      // Grosor de la línea
    ctx.stroke();           // ¡Pintamos!

    // Pintamos un poco de agua transparente debajo de la ola
    ctx.lineTo(W, cy); 
    ctx.lineTo(0, cy); 
    ctx.closePath();
    ctx.fillStyle = 'rgba(108,99,255,0.07)'; 
    ctx.fill();

    // Hacemos que la ola avance un poquito
    phase += 0.03 * speed;
    
    // Actualizamos los números en la pantalla
    updateInfo();
  }

  // 🎥 El motor de la película: Llama a dibujar una y otra vez súper rápido
  function loop() { 
    draw(); 
    raf = requestAnimationFrame(loop); 
  }

  // 📊 Actualiza los cartelitos que dicen "Período" y "Longitud"
  function updateInfo() {
    const period = (1 / freq).toFixed(2); // El tiempo que tarda en dar una vuelta completa
    const lambda = (canvas.width / freq / 10).toFixed(1); // El largo de la ola
    
    // Nombres en español
    const names  = { sin:'Senoidal', square:'Cuadrada', triangle:'Triangular' };
    
    // Buscamos los cartelitos y les ponemos los números
    const wl = document.getElementById('waveLength');
    const wp = document.getElementById('wavePeriod');
    const wt = document.getElementById('waveTypeLabel');
    
    if (wl) wl.textContent = `${lambda} u`;
    if (wp) wp.textContent = `${period} s`;
    if (wt) wt.textContent = names[type] || type;
  }

  // 📐 Ajusta el tamaño de la pizarra si cambiamos el tamaño de la ventana
  function resizeCanvas() {
    if (!canvas) return;
    canvas.width  = Math.min(canvas.parentElement.clientWidth - 4, 900);
    canvas.height = 300;
  }

  // 🔌 Conectamos todo al empezar
  function init() {
    canvas = document.getElementById('waveCanvas'); // Buscamos el lienzo
    if (!canvas) return;
    ctx = canvas.getContext('2d'); // Preparamos las herramientas 2D
    
    resizeCanvas(); // Ajustamos el tamaño
    window.addEventListener('resize', resizeCanvas); // Si el usuario agranda la ventana, nos adaptamos

    // Buscamos las palancas (sliders) que mueven los niños
    const $freq  = document.getElementById('sliderFreq');
    const $amp   = document.getElementById('sliderAmp');
    const $speed = document.getElementById('sliderSpeed');

    // Conectamos las palancas con nuestras variables maestras
    $freq?.addEventListener('input', () => { 
      freq = parseFloat($freq.value); 
      document.getElementById('valFreq').textContent = freq.toFixed(1); 
    });
    
    $amp?.addEventListener('input', () => { 
      amp = parseInt($amp.value); 
      document.getElementById('valAmp').textContent = amp; 
    });
    
    $speed?.addEventListener('input', () => { 
      speed = parseFloat($speed.value);
      document.getElementById('valSpeed').textContent = speed.toFixed(1); 
    });

    // Conectamos los botones de las formas de ola (Senoidal, Cuadrada, Triangular)
    document.querySelectorAll('.wave-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Le quitamos el color a todos los botones...
        document.querySelectorAll('.wave-type-btn').forEach(b => b.classList.remove('active'));
        // ...y se lo ponemos al que tocamos
        btn.classList.add('active');
        type = btn.dataset.wave; // Cambiamos la forma de la ola
      });
    });
  }

  // Controles del motor (arrancar y apagar)
  function start() { if (!raf) loop(); }
  function stop()  { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  // Guardamos nuestro creador de olas en la mochila
  window.MODULES.ondas = { init, start, stop };
})();
