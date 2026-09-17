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
  let lienzo, ctx;

  // ¡La función maestra que dibuja nuestro triángulo!
  function dibujar() {
    const W = lienzo.width, H = lienzo.height;
    ctx.clearRect(0, 0, W, H); // Borramos la pizarra para dibujar el triángulo nuevo

    // Escala: queremos que el triángulo siempre se vea bonito y grande en la pantalla,
    // no importa si los lados valen 3 o valen 100.
    const padX = 70;
    const padY = 65;
    const availW = W - padX * 2;
    const availH = H - padY * 2;
    
    // Averiguamos cuál es el lado más grande para saber cuánto "zoom" hacer
    const maxVal = Math.max(a, b, 7);
    const escala = Math.min(availW / maxVal, availH / maxVal);

    // Calculamos el tamaño real en la pantalla
    const anchoTri = b * escala;
    const altoTri = a * escala;

    // Colocamos la esquina del ángulo recto (el cuadradito) en el medio de la pantalla
    const cx = (W - anchoTri) / 2 + 10;
    const cy = (H + altoTri) / 2 - 10;

    // Nuestros tres puntos clave del triángulo:
    const ptA = { x: cx, y: cy - altoTri }; // Arriba (la punta más alta)
    const ptB = { x: cx + anchoTri, y: cy }; // Derecha (la punta que está lejos)
    const ptC = { x: cx, y: cy };         // La esquina cuadrada (90 grados)

    // 📌 EDITAR AQUÍ: La Cuadrícula de Fondo
    // Dibuja las líneas tenues de fondo, como en un cuaderno de matemáticas.
    // Prueba cambiar 'rgba(120, 130, 200, 0.08)' por 'rgba(255, 0, 0, 0.5)' para líneas rojas.
    ctx.strokeStyle = 'rgba(120, 130, 200, 0.08)';
    ctx.lineWidth = 1;
    const pasoCuadricula = Math.max(escala, 15);
    for (let x = 0; x < W; x += pasoCuadricula) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += pasoCuadricula) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // 🎨 Pintamos el relleno del triángulo con un degradado (colores mezclados)
    const degradado = ctx.createLinearGradient(ptC.x, ptA.y, ptB.x, ptC.y);
    degradado.addColorStop(0, 'rgba(108, 99, 255, 0.25)'); // Violeta transparente
    degradado.addColorStop(1, 'rgba(0, 212, 170, 0.12)');  // Verde transparente

    ctx.beginPath();
    ctx.moveTo(ptA.x, ptA.y); // Vamos al punto de arriba
    ctx.lineTo(ptB.x, ptB.y); // Trazamos línea a la derecha
    ctx.lineTo(ptC.x, ptC.y); // Volvemos a la esquina cuadrada
    ctx.closePath(); // Cerramos el triángulo
    ctx.fillStyle = degradado;
    ctx.fill(); // ¡Pintamos adentro!

    // Dibujamos el cuadradito del ángulo recto (que significa que mide exactamente 90 grados)
    const cuadrito = Math.min(22, escala * 0.4);
    ctx.fillStyle = 'rgba(0, 212, 170, 0.15)';
    ctx.fillRect(ptC.x, ptC.y - cuadrito, cuadrito, cuadrito); // Pinta el cuadradito
    ctx.strokeStyle = '#00d4aa'; // --clr-accent: color del cuadrado del ángulo recto
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ptC.x, ptC.y - cuadrito);
    ctx.lineTo(ptC.x + cuadrito, ptC.y - cuadrito);
    ctx.lineTo(ptC.x + cuadrito, ptC.y);
    ctx.stroke();

    // Dibujar un puntito lindo adentro del cuadradito
    ctx.beginPath();
    ctx.arc(ptC.x + cuadrito / 2, ptC.y - cuadrito / 2, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#00d4aa'; // --clr-accent: puntito del ángulo recto
    ctx.fill();

    // 📐 Dibujamos los bordes (los lados a, b y c)
    
    // Cateto "a" (la línea de la izquierda, parada)
    // 📌 EDITAR AQUÍ: ¡Cambia el color de la línea A!
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
    [ptA, ptB, ptC].forEach(punto => {
      ctx.beginPath();
      ctx.arc(punto.x, punto.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });

    // 📝 Esta función es una ayudante que pinta cartelitos flotantes con los números
    function dibujarEtiqueta(texto, x, y, colorFondo, colorTexto) {
      ctx.font = 'bold 14px "JetBrains Mono", monospace';
      const medida = ctx.measureText(texto);
      const rellenoX = 10, rellenoY = 6;
      const anchoBloque = medida.width + rellenoX * 2;
      const altoBloque = 22;
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--clr-surface') || 'rgba(19, 22, 41, 0.9)'; 
      ctx.beginPath();
      ctx.roundRect(x - anchoBloque / 2, y - altoBloque / 2, anchoBloque, altoBloque, 6);
      ctx.fill();
      ctx.strokeStyle = colorFondo;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = colorTexto;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(texto, x, y); // Escribe el número en el cartelito
    }

    // Ponemos el cartelito para la letra "a"
    dibujarEtiqueta(`a = ${a}`, ptC.x - 44, ptC.y - altoTri / 2, '#ef476f', '#ff94b0');

    // Ponemos el cartelito para la letra "b"
    dibujarEtiqueta(`b = ${b}`, ptC.x + anchoTri / 2, ptC.y + 26, '#00d4aa', '#5affdf');

    // 🧮 ¡La fórmula matemática mágica!
    // Calculamos el valor de "c" (la hipotenusa) usando la raíz cuadrada.
    // La fórmula es: c = raíz(a² + b²)
    const c = Math.sqrt(a * a + b * b);
    const centroX = (ptA.x + ptB.x) / 2 + 30;
    const centroY = (ptA.y + ptB.y) / 2 - 20;
    
    // Si "c" es un número entero (sin decimales) lo mostramos bonito, si no, lo cortamos a dos decimales
    const cTexto = Number.isInteger(c) ? `c = ${c}` : `c ≈ ${c.toFixed(2)}`;
    dibujarEtiqueta(cTexto, centroX, centroY, '#6c63ff', '#b4b0ff'); // Ponemos el cartelito de la "c"
  }

  // Cuando movemos las barras de la pantalla, esta función actualiza todo
  function actualizar() {
    // Leemos el valor de la barra deslizante (a y b)
    a = parseInt(document.getElementById('pitA').value);
    b = parseInt(document.getElementById('pitB').value);
    
    // Cambiamos el numerito en pantalla
    document.getElementById('valPitA').textContent = a;
    document.getElementById('valPitB').textContent = b;
    
    // Aquí hacemos la matemática de Pitágoras paso a paso para mostrarla:
    const c2 = a*a + b*b; // c al cuadrado
    const c = Math.sqrt(c2); // Sacamos la raíz cuadrada para saber "c" normal

    // Mostramos los pasos en el tablero de resultados
    document.getElementById('formA2').textContent = `${a}²`; // a al cuadrado
    document.getElementById('formB2').textContent = `${b}²`; // b al cuadrado
    document.getElementById('formA2val').textContent = a*a;  // resultado de a*a
    document.getElementById('formB2val').textContent = b*b;  // resultado de b*b
    document.getElementById('formSuma').textContent = c2;     // la suma mágica
    document.getElementById('formC').textContent = Number.isInteger(c) ? c : c.toFixed(2); // resultado final

    // ¡Volvemos a dibujar el triángulo con las medidas nuevas!
    dibujar();
  }

  // Preparamos todo al arrancar
  function arrancar() {
    lienzo = document.getElementById('lienzoPitagoras'); // Buscamos la pizarra
    if (!lienzo) return; // Si no hay, no hacemos nada
    ctx = lienzo.getContext('2d'); // Preparamos los pinceles 2D
    
    // Si alguien mueve la barrita A o la B, llamamos a "actualizar" para repintar
    document.getElementById('pitA').addEventListener('input', actualizar);
    document.getElementById('pitB').addEventListener('input', actualizar);
    
    // Dibujamos el primer triángulo de bienvenida
    actualizar();
  }

  // Guardamos nuestro juego para que el menú principal pueda prenderlo
  window.MODULES.pitagoras = { init: arrancar };
})();
