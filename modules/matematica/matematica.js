/**
 * matematica.js — Misión Matemática
 * ¡Bienvenido al control de la nave espacial matemática! 🚀
 * Aquí generamos las preguntas y vemos cuántos puntos ganas.
 */
(function () {
  'use strict';

  // 📝 Estas son nuestras "cajas" para guardar los puntos y el tiempo.
  let puntaje = 0;       // Tus puntos totales
  let racha = 0;      // Tu racha (cuántas correctas seguidas llevas)
  let correctas = 0;     // Cuántas has respondido bien en total
  
  // 📌 EDITAR AQUÍ: ¡Más tiempo!
  // Aquí decimos que el juego dura 30 segundos.
  // ¿Qué pasa si pones 60 (un minuto) o 10 (súper rápido)?
  let tiempoRestante = 30;  
  let intervaloTiempo = null; // Nuestro cronómetro interno
  
  let respuesta = 0; // Aquí guardamos la respuesta secreta correcta
  let dificultad = 'facil'; // El nivel de dificultad ('facil', 'medio', 'dificil')
  let enEjecucion = false; // ¿Estamos jugando ahorita mismo?

  // Variables para conectar nuestro código con las partes de la pantalla
  let $puntaje, $tiempo, $racha, $pregunta, $entrada, $retroalimentacion, $puntajeFinal, $correctasUI, $iconoResultado;
  let pantallas = {}; // Aquí guardamos las "páginas" de nuestro juego (inicio, juego, resultado)

  // 📺 Función para mostrar una pantalla y esconder las demás
  function mostrar(nombrePantalla) {
    Object.values(pantallas).forEach(p => { if(p) p.hidden = true; }); // Esconde todas
    if (pantallas[nombrePantalla]) pantallas[nombrePantalla].hidden = false; // Muestra solo la que queremos
  }

  // 🎲 ¡La fábrica de preguntas!
  function generarPregunta() {
    let a, b, op, resultadoTexto, preguntaStr;
    
    // Si elegimos "Fácil" (Solo sumas y restas)
    if (dificultad === 'facil') {
      a = Math.floor(Math.random() * 20) + 1; // Número al azar entre 1 y 20
      b = Math.floor(Math.random() * 20) + 1;
      op = Math.random() < 0.5 ? '+' : '-'; // Cara o cruz: ¿Suma o resta?
      
      // Calculamos la respuesta correcta para guardarla
      resultadoTexto = op === '+' ? a + b : a - b;
      preguntaStr = `${a} ${op} ${b}`; // Escribimos el problema bonito
    
    // Si elegimos "Medio" (Sumas, restas y multiplicaciones)
    } else if (dificultad === 'medio') {
      a = Math.floor(Math.random() * 15) + 2;
      b = Math.floor(Math.random() * 15) + 2;
      const ops = ['+', '-', '×']; // Nuestras opciones
      op = ops[Math.floor(Math.random() * ops.length)]; // Elige una al azar
      
      // Calculamos el resultado según el símbolo
      resultadoTexto = op === '+' ? a+b : op === '-' ? a-b : a*b;
      preguntaStr = `${a} ${op} ${b}`;
    
    // Si elegimos "Difícil" (¡De todo, hasta división!)
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
      const ops = ['+', '-', '×', '÷'];
      op = ops[Math.floor(Math.random() * ops.length)];
      
      // Truco para las divisiones: creamos divisiones exactas
      if (op === '÷') {
        resultadoTexto = b; // El resultado será b
        a = b * (Math.floor(Math.random() * 10) + 2); // a es múltiplo de b
        preguntaStr = `${a} ÷ ${b}`;
      } else {
        resultadoTexto = op === '+' ? a+b : op === '-' ? a-b : a*b;
        preguntaStr = `${a} ${op} ${b}`;
      }
    }

    // Mostramos la pregunta en la pantalla
    $pregunta.textContent = `${preguntaStr} = ?`;
    respuesta = resultadoTexto; // ¡Guardamos el secreto!
    $entrada.value = ''; // Borramos lo que habías escrito antes
    $entrada.focus(); // Ponemos el palito parpadeando para que escribas rápido
    $retroalimentacion.innerHTML = ''; // Borramos el mensaje de "Correcto" o "Incorrecto"
    $retroalimentacion.className = 'retroalimentacion-matematica';
  }

  // ✔️ Función para revisar tu respuesta
  function revisarRespuesta() {
    const val = parseInt($entrada.value); // Leemos el número que escribiste
    if (isNaN(val)) return; // Si no escribiste un número, no hace nada

    // Si tu respuesta es igual al secreto...
    if (val === respuesta) {
      racha++; // ¡Subes tu racha de fuego!
      
      // 📌 EDITAR AQUÍ: ¡Súper Puntos!
      // Si aciertas 3 seguidas, te da 2 puntos extra.
      // ¿Y si quieres que dé 100 puntos extra? ¡Cambia ese 2 por 100!
      const bonus = racha >= 3 ? 2 : 0; 
      puntaje += 10 + bonus; // Sumamos a tus puntos totales
      correctas++; // Cuentas una más como correcta
      
      // Mostramos un mensaje feliz
      $retroalimentacion.innerHTML = racha >= 3 ? `<i class="fa-solid fa-check"></i> ¡Correcto! +${10+bonus} pts (racha ×${racha})` : '<i class="fa-solid fa-check"></i> ¡Correcto!';
      $retroalimentacion.className = 'retroalimentacion-matematica correcto'; // Le pone color verde
    
    // Si te equivocaste...
    } else {
      racha = 0; // Oh no, pierdes tu racha
      // Mostramos el mensaje triste y te decimos cuál era
      $retroalimentacion.innerHTML = `<i class="fa-solid fa-xmark"></i> Incorrecto. La respuesta era ${respuesta}`;
      $retroalimentacion.className = 'retroalimentacion-matematica incorrecto'; // Le pone color rojo
    }

    // Actualizamos los números grandes en la pantalla
    $puntaje.textContent = puntaje;
    $racha.innerHTML = `<i class="fa-solid fa-fire"></i> ${racha}`;
    
    // Esperamos un poquitito (600 milisegundos) y ponemos otra pregunta
    setTimeout(generarPregunta, 600);
  }

  // ⏰ Arranca el cronómetro
  function iniciarReloj() {
    tiempoRestante = 30; // 📌 EDITAR AQUÍ: Si cambiaste arriba, cámbialo aquí también (ej: 60)
    $tiempo.textContent = tiempoRestante;
    document.querySelector('.tarjeta-tiempo')?.classList.remove('urgente');

    // Cada segundo (1000 milisegundos), se ejecuta esto:
    intervaloTiempo = setInterval(() => {
      tiempoRestante--; // Le restamos 1 al tiempo
      $tiempo.textContent = tiempoRestante; // Lo mostramos en pantalla
      
      // Si quedan 10 segundos o menos, ¡se pone rojo parpadeando!
      if (tiempoRestante <= 10) document.querySelector('.tarjeta-tiempo')?.classList.add('urgente');
      
      // ¡Se acabó el tiempo!
      if (tiempoRestante <= 0) terminarJuego();
    }, 1000);
  }

  // 🏁 Fin del juego
  function terminarJuego() {
    clearInterval(intervaloTiempo); // Apagamos el reloj
    intervaloTiempo = null;
    enEjecucion = false; // Ya no estamos jugando
    mostrar('resultado'); // Mostramos la pantalla final de trofeos
    $puntajeFinal.textContent = puntaje; // Mostramos tu puntuación
    $correctasUI.textContent = correctas; // Mostramos cuántas acertaste
    
    // Te damos una medalla de Oro, Plata o Bronce según tus puntos
    $iconoResultado.className = 'fa-solid icono-grande ' + (puntaje >= 100 ? 'fa-trophy' : puntaje >= 50 ? 'fa-medal' : 'fa-award');
  }

  // 🚀 ¡Prepara todo para despegar un juego nuevo!
  function iniciarJuego(dif) {
    dificultad = dif; // Escogemos el nivel
    puntaje = racha = correctas = 0; // Todo a cero
    enEjecucion = true;
    $puntaje.textContent = 0;
    $racha.innerHTML = '<i class="fa-solid fa-fire"></i> 0';
    mostrar('juego'); // Muestra la pantalla para jugar
    generarPregunta(); // Crea la primera pregunta
    iniciarReloj(); // Enciende el reloj
  }

  // Función para pausar el juego (útil si cambias de módulo)
  function pausar() {
    if (intervaloTiempo) { clearInterval(intervaloTiempo); intervaloTiempo = null; }
  }

  // 🔌 Conectamos los cables de HTML al JavaScript
  function arrancar() {
    // Buscamos las partes de la pantalla
    $puntaje    = document.getElementById('puntajeMatematica');
    $tiempo    = document.getElementById('tiempoMatematica');
    $racha   = document.getElementById('rachaMatematica');
    $pregunta = document.getElementById('preguntaMatematica');
    $entrada    = document.getElementById('entradaMatematica');
    $retroalimentacion = document.getElementById('retroalimentacionMatematica');
    $puntajeFinal = document.getElementById('puntajeFinalMatematica');
    $correctasUI    = document.getElementById('correctasMatematica');
    $iconoResultado = document.getElementById('iconoResultadoMatematica');

    // Las tres pantallas
    pantallas = {
      inicio:  document.getElementById('pantallaInicioMatematica'),
      juego:   document.getElementById('pantallaJuegoMatematica'),
      resultado: document.getElementById('pantallaResultadoMatematica'),
    };

    // Conectamos los botones de los niveles
    document.getElementById('btnMatematicaFacil')?.addEventListener('click', () => iniciarJuego('facil'));
    document.getElementById('btnMatematicaMedio')?.addEventListener('click',  () => iniciarJuego('medio'));
    document.getElementById('btnMatematicaDificil')?.addEventListener('click', () => iniciarJuego('dificil'));

    // Conectamos el botón de responder y la tecla "Enter"
    document.getElementById('botonConfirmarMatematica')?.addEventListener('click', revisarRespuesta);
    $entrada?.addEventListener('keydown', e => { if (e.key === 'Enter') revisarRespuesta(); });

    // Conectamos el botón de volver a jugar
    document.getElementById('btnReiniciarMatematica')?.addEventListener('click', () => {
      mostrar('inicio');
      document.querySelector('.tarjeta-tiempo')?.classList.remove('urgente');
    });

    // Muestra la pantalla inicial
    mostrar('inicio');
  }

  // Guardamos nuestro juego en la mochila de módulos para arrancarlo
  window.MODULES.matematica = { init: arrancar, pause: pausar };
})();
