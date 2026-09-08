/**
 * trivia.js — Trivia Multijugador
 * ¡El juego de las preguntas sabihondas! 🧠✨
 * Invita a un amigo y veamos quién sabe más de ciencia.
 */
(function () {
  'use strict';

  // 📝 ZONA DE HACKEO: ¡Tu propio banco de preguntas!
  // Aquí están todas las preguntas del juego.
  // "q": Es la pregunta.
  // "opts": Son las 4 respuestas posibles (Opciones 0, 1, 2, 3).
  // "ans": Es el número de la respuesta correcta. ¡Recuerda que empezamos a contar desde CERO!
  // (Ejemplo: Si la correcta es la primera, ans es 0. Si es la tercera, ans es 2)
  const DB = [
    { q: "¿Cuál es el planeta más grande del sistema solar?", opts: ["Tierra", "Marte", "Júpiter", "Saturno"], ans: 2 },
    { q: "¿Qué gas respiramos principalmente?", opts: ["Oxígeno", "Nitrógeno", "Dióxido de Carbono", "Hidrógeno"], ans: 1 }, // ¡Sí, el aire es 78% Nitrógeno!
    { q: "¿Cuál es el hueso más largo del cuerpo humano?", opts: ["Fémur", "Tibia", "Húmero", "Radio"], ans: 0 },
    { q: "¿Qué órgano bombea la sangre?", opts: ["Cerebro", "Pulmón", "Corazón", "Hígado"], ans: 2 },
    { q: "¿Fórmula química del agua?", opts: ["HO", "H2O2", "H2O", "CO2"], ans: 2 },
    { q: "¿Quién formuló la teoría de la relatividad?", opts: ["Newton", "Galileo", "Tesla", "Einstein"], ans: 3 },
    { q: "¿Qué partícula tiene carga negativa?", opts: ["Protón", "Neutrón", "Electrón", "Quark"], ans: 2 },
    { q: "¿Cuál es el metal más abundante en la corteza terrestre?", opts: ["Hierro", "Aluminio", "Cobre", "Oro"], ans: 1 },
    { q: "¿Qué tipo de onda es la luz?", opts: ["Mecánica", "Sonora", "Electromagnética", "Gravitacional"], ans: 2 },
    { q: "¿Cuál es el elemento químico más ligero?", opts: ["Helio", "Oxígeno", "Hidrógeno", "Carbono"], ans: 2 }
    // ¡Añade tu propia pregunta aquí abajo copiando el formato!
  ];

  // Variables de los jugadores
  let p1Name, p2Name; // Nombres
  let p1Score = 0, p2Score = 0; // Puntos de cada uno
  let turn = 1; // ¿De quién es el turno? (1 o 2)
  
  // Variables del juego
  let questions = []; // Las preguntas que vamos a usar en esta partida
  let currentQIdx = 0; // ¿Por qué pregunta vamos? (Empezamos en la cero)

  // Las conexiones con la pantalla de la compu
  let $setup, $game, $win;
  let $p1Card, $p2Card, $p1Score, $p2Score, $turnLabel;
  let $qCounter, $qText, $options, $nextBtn;

  // 🌪️ El Mezclador: Desordena las preguntas para que no salgan siempre igual
  function shuffle(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // ¡Intercambio de lugares!
    }
    return arr;
  }

  // 🚀 ¡Empieza el juego!
  function start() {
    // Leemos los nombres que escribieron, si no escribieron nada, les ponemos "Jugador 1 y 2"
    p1Name = document.getElementById('trivP1Name').value || 'Jugador 1';
    p2Name = document.getElementById('trivP2Name').value || 'Jugador 2';
    document.getElementById('trivP1Label').textContent = p1Name;
    document.getElementById('trivP2Label').textContent = p2Name;

    p1Score = p2Score = 0; // Puntos a cero
    updateScores();
    turn = 1; // Empieza el jugador 1
    currentQIdx = 0;
    
    // 🎲 ZONA DE HACKEO: Cantidad de preguntas
    // Barajamos y sacamos solo 10 preguntas. ¿Quieres un juego más largo? Cambia ese 10.
    questions = shuffle(DB).slice(0, 10); 

    // Cambiamos la pantalla: Ocultamos el menú y mostramos las preguntas
    $setup.hidden = true;
    $win.hidden = true;
    $game.hidden = false;
    
    loadQuestion(); // Cargamos la primera pregunta
  }

  // 📊 Actualiza los puntos en la pantalla
  function updateScores() {
    $p1Score.textContent = p1Score;
    $p2Score.textContent = p2Score;
    
    // Pinta la tarjeta del jugador al que le toca el turno
    $p1Card.className = `triv-player ${turn === 1 ? 'active-turn' : ''}`;
    $p2Card.className = `triv-player ${turn === 2 ? 'active-turn' : ''}`;
    $turnLabel.textContent = `Turno de: ${turn === 1 ? p1Name : p2Name}`;
  }

  // 📖 Pone una pregunta en la pantalla
  function loadQuestion() {
    updateScores();
    $nextBtn.hidden = true; // Esconde el botón "Siguiente" hasta que respondan
    
    const q = questions[currentQIdx]; // Sacamos la pregunta actual
    $qCounter.textContent = `Pregunta ${currentQIdx + 1} de ${questions.length}`;
    $qText.textContent = q.q; // Escribimos la pregunta

    $options.innerHTML = ''; // Borramos las respuestas viejas
    
    // Ponemos las 4 respuestas nuevas
    q.opts.forEach((opt, idx) => {
      const btn = document.createElement('button'); // Creamos un botón
      btn.className = 'triv-opt-btn';
      btn.textContent = opt; // Le escribimos la respuesta
      
      // Si le hacen clic, llamamos a la función de responder
      btn.addEventListener('click', () => answer(idx, btn));
      $options.appendChild(btn); // Lo pegamos en la pantalla
    });
  }

  // ✔️ Revisa si respondiste bien o mal
  function answer(idx, btn) {
    const q = questions[currentQIdx];
    const btns = Array.from($options.children);
    
    // Apagamos todos los botones para que no puedan responder dos veces
    btns.forEach(b => b.disabled = true);

    // Si le atinaste al número secreto...
    if (idx === q.ans) {
      btn.classList.add('correct'); // Pinta verde
      btn.innerHTML += ' <i class="fa-solid fa-check" style="float:right"></i>'; // Pon un chulito
      
      // Dale un punto al jugador que tenga el turno
      if (turn === 1) p1Score++; else p2Score++;
      updateScores();
    } else {
      // Si te equivocaste...
      btn.classList.add('wrong'); // Pinta rojo
      btn.innerHTML += ' <i class="fa-solid fa-xmark" style="float:right"></i>'; // Pon una X
      
      // ¡Y pinta de verde la que era correcta para que aprendan!
      btns[q.ans].classList.add('correct');
    }

    $nextBtn.hidden = false; // Muestra el botón para pasar al siguiente turno
  }

  // 🔄 Cambia de turno y de pregunta
  function nextTurn() {
    currentQIdx++; // Pasamos a la siguiente pregunta
    turn = turn === 1 ? 2 : 1; // Si era el 1, pasa al 2. Si era el 2, pasa al 1.
    
    if (currentQIdx >= questions.length) {
      endGame(); // Si ya no hay más preguntas, se acabó
    } else {
      loadQuestion(); // Si hay más, ponla en pantalla
    }
  }

  // 🏆 ¡Fin de la partida! Da los resultados
  function endGame() {
    $game.hidden = true; // Esconde las preguntas
    $win.hidden = false; // Muestra la copa
    
    const title = document.getElementById('trivWinTitle');
    const desc = document.getElementById('trivWinDesc');

    if (p1Score > p2Score) {
      title.textContent = '¡Gana ' + p1Name + '!';
      desc.textContent = `${p1Name} vence con ${p1Score} puntos frente a ${p2Score}.`;
    } else if (p2Score > p1Score) {
      title.textContent = '¡Gana ' + p2Name + '!';
      desc.textContent = `${p2Name} vence con ${p2Score} puntos frente a ${p1Score}.`;
    } else {
      title.textContent = '¡Empate!';
      desc.textContent = `Ambos consiguieron ${p1Score} puntos.`;
    }
  }

  // 🔌 Conecta todos los botones al encender el juego
  function init() {
    $setup = document.getElementById('triviaSetup');
    $game  = document.getElementById('triviaGame');
    $win   = document.getElementById('triviaWin');
    $p1Card = document.getElementById('trivP1Card');
    $p2Card = document.getElementById('trivP2Card');
    $p1Score = document.getElementById('trivP1Score');
    $p2Score = document.getElementById('trivP2Score');
    $turnLabel = document.getElementById('trivTurnLabel');
    $qCounter = document.getElementById('trivQCounter');
    $qText    = document.getElementById('trivQText');
    $options  = document.getElementById('trivOptions');
    $nextBtn  = document.getElementById('trivNextBtn');

    document.getElementById('trivStartBtn')?.addEventListener('click', start);
    $nextBtn?.addEventListener('click', nextTurn);
    
    // Botón de jugar otra vez
    document.getElementById('trivRestartBtn')?.addEventListener('click', () => {
      $win.hidden = true;
      $setup.hidden = false;
    });
  }

  // Guardamos el juego en nuestra maleta de módulos
  window.MODULES.trivia = { init };
})();
