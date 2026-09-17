/**
 * trivia.js — Trivia Multijugador
 * ¡El juego de las preguntas sabihondas! 🧠✨
 * Invita a un amigo y veamos quién sabe más de ciencia.
 */
(function () {
  'use strict';

  // 📌 EDITAR AQUÍ: ¡Tu propio banco de preguntas!
  // Aquí están todas las preguntas del juego.
  // "p": Es la pregunta.
  // "opcs": Son las 4 respuestas posibles (Opciones 0, 1, 2, 3).
  // "resp": Es el número de la respuesta correcta. ¡Recuerda que empezamos a contar desde CERO!
  // (Ejemplo: Si la correcta es la primera, resp es 0. Si es la tercera, resp es 2)
  const BD = [
    { p: "¿Cuál es el planeta más grande del sistema solar?", opcs: ["Tierra", "Marte", "Júpiter", "Saturno"], resp: 2 },
    { p: "¿Qué gas respiramos principalmente?", opcs: ["Oxígeno", "Nitrógeno", "Dióxido de Carbono", "Hidrógeno"], resp: 1 }, // ¡Sí, el aire es 78% Nitrógeno!
    { p: "¿Cuál es el hueso más largo del cuerpo humano?", opcs: ["Fémur", "Tibia", "Húmero", "Radio"], resp: 0 },
    { p: "¿Qué órgano bombea la sangre?", opcs: ["Cerebro", "Pulmón", "Corazón", "Hígado"], resp: 2 },
    { p: "¿Fórmula química del agua?", opcs: ["HO", "H2O2", "H2O", "CO2"], resp: 2 },
    { p: "¿Quién formuló la teoría de la relatividad?", opcs: ["Newton", "Galileo", "Tesla", "Einstein"], resp: 3 },
    { p: "¿Qué partícula tiene carga negativa?", opcs: ["Protón", "Neutrón", "Electrón", "Quark"], resp: 2 },
    { p: "¿Cuál es el metal más abundante en la corteza terrestre?", opcs: ["Hierro", "Aluminio", "Cobre", "Oro"], resp: 1 },
    { p: "¿Qué tipo de onda es la luz?", opcs: ["Mecánica", "Sonora", "Electromagnética", "Gravitacional"], resp: 2 },
    { p: "¿Cuál es el elemento químico más ligero?", opcs: ["Helio", "Oxígeno", "Hidrógeno", "Carbono"], resp: 2 }
    // ¡Añade tu propia pregunta aquí abajo copiando el formato!
  ];

  // Variables de los jugadores
  let nombreP1, nombreP2; // Nombres
  let puntajeP1 = 0, puntajeP2 = 0; // Puntos de cada uno
  let turno = 1; // ¿De quién es el turno? (1 o 2)
  
  // Variables del juego
  let preguntas = []; // Las preguntas que vamos a usar en esta partida
  let indicePreguntaActual = 0; // ¿Por qué pregunta vamos? (Empezamos en la cero)

  // Las conexiones con la pantalla de la compu
  let $configuracion, $juego, $victoria;
  let $tarjetaP1, $tarjetaP2, $puntajeP1UI, $puntajeP2UI, $etiquetaTurno;
  let $contadorPregunta, $textoPregunta, $opciones, $btnSiguiente;

  // 🌪️ El Mezclador: Desordena las preguntas para que no salgan siempre igual
  function mezclar(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // ¡Intercambio de lugares!
    }
    return arr;
  }

  // 🚀 ¡Empieza el juego!
  function arrancar() {
    // Leemos los nombres que escribieron, si no escribieron nada, les ponemos "Jugador 1 y 2"
    nombreP1 = document.getElementById('nombreP1Trivia').value || 'Jugador 1';
    nombreP2 = document.getElementById('nombreP2Trivia').value || 'Jugador 2';
    document.getElementById('etiquetaP1Trivia').textContent = nombreP1;
    document.getElementById('etiquetaP2Trivia').textContent = nombreP2;

    puntajeP1 = puntajeP2 = 0; // Puntos a cero
    actualizarPuntajes();
    turno = 1; // Empieza el jugador 1
    indicePreguntaActual = 0;
    
    // 📌 EDITAR AQUÍ: Cantidad de preguntas
    // Barajamos y sacamos solo 10 preguntas. ¿Quieres un juego más largo? Cambia ese 10.
    preguntas = mezclar(BD).slice(0, 10); 

    // Cambiamos la pantalla: Ocultamos el menú y mostramos las preguntas
    $configuracion.hidden = true;
    $victoria.hidden = true;
    $juego.hidden = false;
    
    cargarPregunta(); // Cargamos la primera pregunta
  }

  // 📊 Actualiza los puntos en la pantalla
  function actualizarPuntajes() {
    $puntajeP1UI.textContent = puntajeP1;
    $puntajeP2UI.textContent = puntajeP2;
    
    // Pinta la tarjeta del jugador al que le toca el turno
    $tarjetaP1.className = `jugador-trivia ${turno === 1 ? 'turno-activo' : ''}`;
    $tarjetaP2.className = `jugador-trivia ${turno === 2 ? 'turno-activo' : ''}`;
    $etiquetaTurno.textContent = `Turno de: ${turno === 1 ? nombreP1 : nombreP2}`;
  }

  // 📖 Pone una pregunta en la pantalla
  function cargarPregunta() {
    actualizarPuntajes();
    $btnSiguiente.hidden = true; // Esconde el botón "Siguiente" hasta que respondan
    
    const pre = preguntas[indicePreguntaActual]; // Sacamos la pregunta actual
    $contadorPregunta.textContent = `Pregunta ${indicePreguntaActual + 1} de ${preguntas.length}`;
    $textoPregunta.textContent = pre.p; // Escribimos la pregunta

    $opciones.innerHTML = ''; // Borramos las respuestas viejas
    
    // Ponemos las 4 respuestas nuevas
    pre.opcs.forEach((opc, idx) => {
      const btn = document.createElement('button'); // Creamos un botón
      btn.className = 'btn-opcion-trivia';
      btn.textContent = opc; // Le escribimos la respuesta
      
      // Si le hacen clic, llamamos a la función de responder
      btn.addEventListener('click', () => responder(idx, btn));
      $opciones.appendChild(btn); // Lo pegamos en la pantalla
    });
  }

  // ✔️ Revisa si respondiste bien o mal
  function responder(idx, btn) {
    const pre = preguntas[indicePreguntaActual];
    const botones = Array.from($opciones.children);
    
    // Apagamos todos los botones para que no puedan responder dos veces
    botones.forEach(b => b.disabled = true);

    // Si le atinaste al número secreto...
    if (idx === pre.resp) {
      btn.classList.add('correcto'); // Pinta verde
      btn.innerHTML += ' <i class="fa-solid fa-check" style="float:right"></i>'; // Pon un chulito
      
      // Dale un punto al jugador que tenga el turno
      if (turno === 1) puntajeP1++; else puntajeP2++;
      actualizarPuntajes();
    } else {
      // Si te equivocaste...
      btn.classList.add('incorrecto'); // Pinta rojo
      btn.innerHTML += ' <i class="fa-solid fa-xmark" style="float:right"></i>'; // Pon una X
      
      // ¡Y pinta de verde la que era correcta para que aprendan!
      botones[pre.resp].classList.add('correcto');
    }

    $btnSiguiente.hidden = false; // Muestra el botón para pasar al siguiente turno
  }

  // 🔄 Cambia de turno y de pregunta
  function siguienteTurno() {
    indicePreguntaActual++; // Pasamos a la siguiente pregunta
    turno = turno === 1 ? 2 : 1; // Si era el 1, pasa al 2. Si era el 2, pasa al 1.
    
    if (indicePreguntaActual >= preguntas.length) {
      finalizarJuego(); // Si ya no hay más preguntas, se acabó
    } else {
      cargarPregunta(); // Si hay más, ponla en pantalla
    }
  }

  // 🏆 ¡Fin de la partida! Da los resultados
  function finalizarJuego() {
    $juego.hidden = true; // Esconde las preguntas
    $victoria.hidden = false; // Muestra la copa
    
    const titulo = document.getElementById('tituloVictoriaTrivia');
    const desc = document.getElementById('descVictoriaTrivia');

    if (puntajeP1 > puntajeP2) {
      titulo.textContent = '¡Gana ' + nombreP1 + '!';
      desc.textContent = `${nombreP1} vence con ${puntajeP1} puntos frente a ${puntajeP2}.`;
    } else if (puntajeP2 > puntajeP1) {
      titulo.textContent = '¡Gana ' + nombreP2 + '!';
      desc.textContent = `${nombreP2} vence con ${puntajeP2} puntos frente a ${puntajeP1}.`;
    } else {
      titulo.textContent = '¡Empate!';
      desc.textContent = `Ambos consiguieron ${puntajeP1} puntos.`;
    }
  }

  // 🔌 Conecta todos los botones al encender el juego
  function init() {
    $configuracion = document.getElementById('configuracionTrivia');
    $juego  = document.getElementById('juegoTrivia');
    $victoria   = document.getElementById('victoriaTrivia');
    $tarjetaP1 = document.getElementById('tarjetaP1Trivia');
    $tarjetaP2 = document.getElementById('tarjetaP2Trivia');
    $puntajeP1UI = document.getElementById('puntajeP1Trivia');
    $puntajeP2UI = document.getElementById('puntajeP2Trivia');
    $etiquetaTurno = document.getElementById('etiquetaTurnoTrivia');
    $contadorPregunta = document.getElementById('contadorPreguntaTrivia');
    $textoPregunta    = document.getElementById('textoPreguntaTrivia');
    $opciones  = document.getElementById('opcionesTrivia');
    $btnSiguiente  = document.getElementById('btnSiguienteTrivia');

    document.getElementById('btnIniciarTrivia')?.addEventListener('click', arrancar);
    $btnSiguiente?.addEventListener('click', siguienteTurno);
    
    // Botón de jugar otra vez
    document.getElementById('btnReiniciarTrivia')?.addEventListener('click', () => {
      $victoria.hidden = true;
      $configuracion.hidden = false;
    });
  }

  // Guardamos el juego en nuestra maleta de módulos
  window.MODULES.trivia = { init };
})();
