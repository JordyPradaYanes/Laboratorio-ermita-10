/**
 * pitagoras.js — Teorema de Pitágoras
 * ¡Hola Arquitecto! Aquí construimos triángulos matemáticos.
 * El Teorema de Pitágoras nos ayuda a descubrir el tamaño del lado más largo (la hipotenusa)
 * si conocemos el tamaño de los otros dos lados (los catetos).
 */
(function () {
  'use strict';

  // Estos son los dos lados cortos del triángulo: "a" y "b"
  // ¡Empiezan con tamaño 3 y 4!
  let a = 3, b = 4;
  
  // Variables mágicas para poder dibujar en la pantalla (como si tuviéramos un lienzo y pintura)
  let canvas, ctx;

  // ¡La función maestra que dibuja nuestro triángulo!
  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H); // Borramos la pizarra para dibujar el triángulo nuevo

    // Escala: queremos que el triángulo siempre se vea bonito y grande en la pantalla,
    // no importa si los lados valen 3 o valen 100.
    const padX = 70;
    const padY = 65;
    const availW = W - padX * 2;
    const availH = H - padY * 2;
    
    // Averiguamos cuál es el lado más grande para saber cuánto "zoom" hacer
    const maxVal = Math.max(a, b, 7);
    const scale = Math.min(availW / maxVal, availH / maxVal);

    // Calculamos el tamaño real en la pantalla
    const triW = b * scale;
    const triH = a * scale;

    // Colocamos la esquina del ángulo recto (el cuadradito) en el medio de la pantalla
    const cx = (W - triW) / 2 + 10;
    const cy = (H + triH) / 2 - 10;

    // Nuestros tres puntos clave del triángulo:
    const ptA = { x: cx, y: cy - triH }; // Arriba (la punta más alta)
    const ptB = { x: cx + triW, y: cy }; // Derecha (la punta que está lejos)
    const ptC = { x: cx, y: cy };         // La esquina cuadrada (90 grados)

    // 🎨 ZONA DE HACKEO: La Cuadrícula de Fondo
    // Dibuja las líneas tenues de fondo, como en un cuaderno de matemáticas.
    // Prueba cambiar 'rgba(120, 130, 200, 0.08)' por 'rgba(255, 0, 0, 0.5)' para líneas rojas.
    ctx.strokeStyle = 'rgba(120, 130, 200, 0.08)';
    ctx.lineWidth = 1;
    const gridStep = Math.max(scale, 15);
    for (let x = 0; x < W; x += gridStep) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += gridStep) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // 🎨 Pintamos el relleno del triángulo con un degradado (colores mezclados)
    const grad = ctx.createLinearGradient(ptC.x, ptA.y, ptB.x, ptC.y);
    grad.addColorStop(0, 'rgba(108, 99, 255, 0.25)'); // Violeta transparente
    grad.addColorStop(1, 'rgba(0, 212, 170, 0.12)');  // Verde transparente

    ctx.beginPath();
    ctx.moveTo(ptA.x, ptA.y); // Vamos al punto de arriba
    ctx.lineTo(ptB.x, ptB.y); // Trazamos línea a la derecha
    ctx.lineTo(ptC.x, ptC.y); // Volvemos a la esquina cuadrada
    ctx.closePath(); // Cerramos el triángulo
    ctx.fillStyle = grad;
    ctx.fill(); // ¡Pintamos adentro!

    // Dibujamos el cuadradito del ángulo recto (que significa que mide exactamente 90 grados)
    const sq = Math.min(22, scale * 0.4);
    ctx.fillStyle = 'rgba(0, 212, 170, 0.15)';
    ctx.fillRect(ptC.x, ptC.y - sq, sq, sq); // Pinta el cuadradito
    ctx.strokeStyle = 'var(--clr-accent)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ptC.x, ptC.y - sq);
    ctx.lineTo(ptC.x + sq, ptC.y - sq);
    ctx.lineTo(ptC.x + sq, ptC.y);
    ctx.stroke();

    // Dibujar un puntito lindo adentro del cuadradito
    ctx.beginPath();
    ctx.arc(ptC.x + sq / 2, ptC.y - sq / 2, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = 'var(--clr-accent)';
    ctx.fill();

    // 📐 Dibujamos los bordes (los lados a, b y c)
    
    // Cateto "a" (la línea de la izquierda, parada)
    // 🎨 ZONA DE HACKEO: ¡Cambia el color de la línea A!
    ctx.strokeStyle = '#ef476f'; // Rosado
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(ptC.x, ptC.y);
    ctx.lineTo(ptA.x, ptA.y);
    ctx.stroke();

    // Cateto "b" (la línea de abajo, acostada)
    ctx.strokeStyle = '#00d4aa'; // Verde
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(ptC.x, ptC.y);
    ctx.lineTo(ptB.x, ptB.y);
    ctx.stroke();

    // Hipotenusa "c" (La resbaladilla mágica, la más larga de todas)
    // Le ponemos una luz especial (sombra) para que resalte
    ctx.shadowColor = 'rgba(108, 99, 255, 0.5)';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#8b84ff'; // Violeta
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(ptA.x, ptA.y); // De la punta alta...
    ctx.lineTo(ptB.x, ptB.y); // ...hasta la punta de abajo
    ctx.stroke();
    ctx.shadowBlur = 0; // Apagamos la luz para no pintar brillante todo lo demás

    // Dibujamos unos circulitos blancos en las tres puntas (vértices)
    [ptA, ptB, ptC].forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });

    // 📝 Esta función es una ayudante que pinta cartelitos flotantes con los números
    function drawBadge(text, x, y, bgCol, textCol) {
      ctx.font = 'bold 14px "JetBrains Mono", monospace';
      const m = ctx.measureText(text);
      const padW = 10, padH = 6;
      const bw = m.width + padW * 2;
      const bh = 22;
      ctx.fillStyle = 'rgba(19, 22, 41, 0.9)'; // Fondo oscuro del cartelito
      ctx.beginPath();
      ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 6);
      ctx.fill();
      ctx.strokeStyle = bgCol;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = textCol;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y); // Escribe el número en el cartelito
    }

    // Ponemos el cartelito para la letra "a"
    drawBadge(`a = ${a}`, ptC.x - 44, ptC.y - triH / 2, '#ef476f', '#ff94b0');

    // Ponemos el cartelito para la letra "b"
    drawBadge(`b = ${b}`, ptC.x + triW / 2, ptC.y + 26, '#00d4aa', '#5affdf');

    // 🧮 ¡La fórmula matemática mágica!
    // Calculamos el valor de "c" (la hipotenusa) usando la raíz cuadrada.
    // La fórmula es: c = raíz(a² + b²)
    const c = Math.sqrt(a * a + b * b);
    const midX = (ptA.x + ptB.x) / 2 + 30;
    const midY = (ptA.y + ptB.y) / 2 - 20;
    
    // Si "c" es un número entero (sin decimales) lo mostramos bonito, si no, lo cortamos a dos decimales
    const cStr = Number.isInteger(c) ? `c = ${c}` : `c ≈ ${c.toFixed(2)}`;
    drawBadge(cStr, midX, midY, '#6c63ff', '#b4b0ff'); // Ponemos el cartelito de la "c"
  }

  // Cuando movemos las barras de la pantalla, esta función actualiza todo
  function update() {
    // Leemos el valor de la barra deslizante (a y b)
    a = parseInt(document.getElementById('pythA').value);
    b = parseInt(document.getElementById('pythB').value);
    
    // Cambiamos el numerito en pantalla
    document.getElementById('valPythA').textContent = a;
    document.getElementById('valPythB').textContent = b;
    
    // Aquí hacemos la matemática de Pitágoras paso a paso para mostrarla:
    const c2 = a*a + b*b; // c al cuadrado
    const c = Math.sqrt(c2); // Sacamos la raíz cuadrada para saber "c" normal

    // Mostramos los pasos en el tablero de resultados
    document.getElementById('formA2').textContent = `${a}²`; // a al cuadrado
    document.getElementById('formB2').textContent = `${b}²`; // b al cuadrado
    document.getElementById('formA2val').textContent = a*a;  // resultado de a*a
    document.getElementById('formB2val').textContent = b*b;  // resultado de b*b
    document.getElementById('formSum').textContent = c2;     // la suma mágica
    document.getElementById('formC').textContent = Number.isInteger(c) ? c : c.toFixed(2); // resultado final

    // ¡Volvemos a dibujar el triángulo con las medidas nuevas!
    draw();
  }

  // Preparamos todo al arrancar
  function init() {
    canvas = document.getElementById('pythagorasCanvas'); // Buscamos la pizarra
    if (!canvas) return; // Si no hay, no hacemos nada
    ctx = canvas.getContext('2d'); // Preparamos los pinceles 2D
    
    // Si alguien mueve la barrita A o la B, llamamos a "update" para repintar
    document.getElementById('pythA').addEventListener('input', update);
    document.getElementById('pythB').addEventListener('input', update);
    
    // Dibujamos el primer triángulo de bienvenida
    update();
  }

  // Guardamos nuestro juego para que el menú principal pueda prenderlo
  window.MODULES.pitagoras = { init };
})();
