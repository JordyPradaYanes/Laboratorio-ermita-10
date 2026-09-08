/**
 * gravedad.js — Laboratorio de Gravedad
 * ¡Bienvenido al código de la gravedad! Aquí controlamos cómo caen las cosas.
 */
(function () {
  'use strict';

  // Variables importantes. ¡Imagina que son cajas donde guardamos información!
  let canvas, ctx;
  
  // 🌍 ZONA DE HACKEO: ¡Cambia la gravedad!
  // En la Tierra, la gravedad es 9.8. Pero, ¿qué pasa si pones 1.6 (Luna) o 25 (Júpiter)?
  // ¡Cámbialo y mira cómo cae de rápido la bola!
  let g = 9.8; 
  
  // Posición inicial de nuestra bola (empieza arriba del todo)
  let y = 0;   
  
  // Velocidad de la bola. ¡Empieza en 0 porque está quieta antes de soltarla!
  let v = 0;   
  
  // El cronómetro. Empieza en 0 segundos.
  let t = 0;   
  
  let raf = null; // Esto nos ayuda a detener la animación cuando queramos
  let dropping = false; // ¿Está cayendo la bola? Al principio es "falso" (no)
  
  // 🎨 ZONA DE HACKEO: ¡Apariencia!
  // radius: Es el tamaño de la bola. ¿Qué pasa si pones 30? ¡Bola gigante!
  const radius = 15;
  const scale = 40; // píxeles por metro (es como el zoom de la pantalla)
  const maxH = 10;  // altura máxima en metros
  const topY = 20;  // margen de arriba
  
  // Botones y textos que conectaremos con la pantalla (HTML)
  let $btn, $stats, $tLabel, $vLabel, $envBtns;

  // Función para reiniciar el laboratorio y poner todo como estaba
  function reset() {
    if (raf) cancelAnimationFrame(raf); // Detiene la película
    dropping = false; // Ya no está cayendo
    y = topY; // Volvemos arriba
    v = 0; // Velocidad cero
    t = 0; // Tiempo cero
    draw(); // Dibujamos la bola en su nueva posición
    $stats.hidden = true; // Escondemos los resultados
    $btn.disabled = false; // Activamos el botón de soltar
  }

  // Función para dibujar nuestro mundo en el lienzo (canvas)
  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H); // Borra todo para dibujar el siguiente fotograma limpiecito

    // Dibujamos el suelo
    const groundY = topY + maxH * scale;
    ctx.fillStyle = 'var(--clr-surface)';
    ctx.fillRect(0, groundY, W, H - groundY);
    ctx.strokeStyle = 'var(--clr-border)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W, groundY); ctx.stroke();
    
    // Dibujamos la regla que mide los metros
    ctx.fillStyle = 'var(--clr-text-muted)';
    ctx.font = '12px var(--font-mono)';
    for (let i = 0; i <= maxH; i++) {
      const lineY = groundY - i * scale;
      ctx.fillText(i + 'm', 5, lineY + 4);
      ctx.fillRect(25, lineY, 10, 1);
    }

    // Dibujamos el objeto (nuestra esfera)
    ctx.beginPath();
    ctx.arc(W/2, y, radius, 0, Math.PI*2); // Dibuja un círculo perfecto
    ctx.fillStyle = 'var(--clr-accent)'; // Pinta el círculo con el color de acento
    ctx.fill();
    
    // Le ponemos un brillo mágico a la bola
    ctx.shadowColor = 'rgba(0, 212, 170, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Este es nuestro "motor físico". Se ejecuta muchas veces por segundo (como en un videojuego)
  function loop() {
    const dt = 1/60; // Delta time: un pedacito de segundo
    t += dt; // El reloj avanza
    
    // Las matemáticas mágicas de Isaac Newton
    // 1. La gravedad aumenta la velocidad
    v += g * dt;
    
    // 2. La velocidad mueve la bola hacia abajo
    y += v * scale * dt;

    const groundY = topY + maxH * scale - radius;
    
    // Si la bola toca el suelo (¡Pum!)
    if (y >= groundY) {
      y = groundY; // No la dejes atravesar el suelo
      draw(); // Dibuja por última vez
      finishDrop(); // Muestra los resultados
      return; // Detiene el motor
    }

    draw(); // Dibuja la bola en su nueva posición
    raf = requestAnimationFrame(loop); // Pide el siguiente fotograma (como una película)
  }

  // ¡Acción! Empieza la caída
  function startDrop() {
    reset(); // Todo limpio
    dropping = true; // Empezó la caída
    $btn.disabled = true; // Desactivamos el botón para no pulsarlo dos veces
    loop(); // Arrancamos el motor físico
  }

  // ¡Fin de la caída! Mostramos los resultados
  function finishDrop() {
    dropping = false; // Ya cayó
    $stats.hidden = false; // Aparecen los resultados en pantalla
    $tLabel.textContent = t.toFixed(2); // Mostramos el tiempo con dos decimales
    $vLabel.textContent = v.toFixed(2); // Mostramos la velocidad final
  }

  // Esta función prepara todo cuando abrimos el laboratorio
  function init() {
    canvas = document.getElementById('gravityCanvas');
    if (!canvas) return; // Si no hay lienzo, no hacemos nada
    ctx = canvas.getContext('2d'); // Las herramientas de dibujo 2D
    
    // Conectamos los botones de HTML con nuestro código
    $btn = document.getElementById('gravDropBtn');
    $stats = document.getElementById('gravStats');
    $tLabel = document.getElementById('gravTime');
    $vLabel = document.getElementById('gravVel');
    $envBtns = document.querySelectorAll('.env-btns button'); // Botones de Tierra, Luna, Marte...

    // A cada botón de planeta le decimos qué hacer
    $envBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (dropping) return; // Si la bola está cayendo, no cambiamos de planeta
        $envBtns.forEach(b => b.classList.remove('active-mode'));
        btn.classList.add('active-mode'); // Se pinta el botón pulsado
        g = parseFloat(btn.dataset.g); // Cambia nuestra gravedad por la del planeta elegido
      });
    });

    // Le decimos al botón "Soltar Objeto" que active la caída
    $btn.addEventListener('click', startDrop);
    
    // Le decimos al botón de reiniciar que vuelva a empezar todo
    const $resetBtn = document.getElementById('gravResetBtn');
    if ($resetBtn) {
      $resetBtn.addEventListener('click', reset);
    }
    
    reset(); // Preparamos la escena antes de empezar
  }

  // Función para detener todo (útil cuando cambiamos de módulo)
  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  // Guardamos nuestras funciones importantes para que otros las puedan usar
  window.MODULES.gravedad = { init, stop };
})();
