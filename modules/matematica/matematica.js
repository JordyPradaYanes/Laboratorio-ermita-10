/**
 * matematica.js — Misión Matemática
 * ¡Bienvenido al control de la nave espacial matemática! 🚀
 * Aquí generamos las preguntas y vemos cuántos puntos ganas.
 */
(function () {
  'use strict';

  // 📝 Estas son nuestras "cajas" para guardar los puntos y el tiempo.
  let score = 0;       // Tus puntos totales
  let streak = 0;      // Tu racha (cuántas correctas seguidas llevas)
  let correct = 0;     // Cuántas has respondido bien en total
  
  // ⏱️ ZONA DE HACKEO: ¡Más tiempo!
  // Aquí decimos que el juego dura 30 segundos.
  // ¿Qué pasa si pones 60 (un minuto) o 10 (súper rápido)?
  let timerLeft = 30;  
  let timerInterval = null; // Nuestro cronómetro interno
  
  let answer = 0; // Aquí guardamos la respuesta secreta correcta
  let difficulty = 'facil'; // El nivel de dificultad ('facil', 'medio', 'dificil')
  let running = false; // ¿Estamos jugando ahorita mismo?

  // Variables para conectar nuestro código con las partes de la pantalla
  let $score, $timer, $streak, $question, $input, $feedback, $finalScore, $correct, $resultIcon;
  let screens = {}; // Aquí guardamos las "páginas" de nuestro juego (inicio, juego, resultado)

  // 📺 Función para mostrar una pantalla y esconder las demás
  function show(screenName) {
    Object.values(screens).forEach(s => { if(s) s.hidden = true; }); // Esconde todas
    if (screens[screenName]) screens[screenName].hidden = false; // Muestra solo la que queremos
  }

  // 🎲 ¡La fábrica de preguntas!
  function generateQuestion() {
    let a, b, op, result, questionStr;
    
    // Si elegimos "Fácil" (Solo sumas y restas)
    if (difficulty === 'facil') {
      a = Math.floor(Math.random() * 20) + 1; // Número al azar entre 1 y 20
      b = Math.floor(Math.random() * 20) + 1;
      op = Math.random() < 0.5 ? '+' : '-'; // Cara o cruz: ¿Suma o resta?
      
      // Calculamos la respuesta correcta para guardarla
      result = op === '+' ? a + b : a - b;
      questionStr = `${a} ${op} ${b}`; // Escribimos el problema bonito
    
    // Si elegimos "Medio" (Sumas, restas y multiplicaciones)
    } else if (difficulty === 'medio') {
      a = Math.floor(Math.random() * 15) + 2;
      b = Math.floor(Math.random() * 15) + 2;
      const ops = ['+', '-', '×']; // Nuestras opciones
      op = ops[Math.floor(Math.random() * ops.length)]; // Elige una al azar
      
      // Calculamos el resultado según el símbolo
      result = op === '+' ? a+b : op === '-' ? a-b : a*b;
      questionStr = `${a} ${op} ${b}`;
    
    // Si elegimos "Difícil" (¡De todo, hasta división!)
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
      const ops = ['+', '-', '×', '÷'];
      op = ops[Math.floor(Math.random() * ops.length)];
      
      // Truco para las divisiones: creamos divisiones exactas
      if (op === '÷') {
        result = b; // El resultado será b
        a = b * (Math.floor(Math.random() * 10) + 2); // a es múltiplo de b
        questionStr = `${a} ÷ ${b}`;
      } else {
        result = op === '+' ? a+b : op === '-' ? a-b : a*b;
        questionStr = `${a} ${op} ${b}`;
      }
    }

    // Mostramos la pregunta en la pantalla
    $question.textContent = `${questionStr} = ?`;
    answer = result; // ¡Guardamos el secreto!
    $input.value = ''; // Borramos lo que habías escrito antes
    $input.focus(); // Ponemos el palito parpadeando para que escribas rápido
    $feedback.innerHTML = ''; // Borramos el mensaje de "Correcto" o "Incorrecto"
    $feedback.className = 'math-feedback';
  }

  // ✔️ Función para revisar tu respuesta
  function checkAnswer() {
    const val = parseInt($input.value); // Leemos el número que escribiste
    if (isNaN(val)) return; // Si no escribiste un número, no hace nada

    // Si tu respuesta es igual al secreto...
    if (val === answer) {
      streak++; // ¡Subes tu racha de fuego!
      
      // 🌟 ZONA DE HACKEO: ¡Súper Puntos!
      // Si aciertas 3 seguidas, te da 2 puntos extra.
      // ¿Y si quieres que dé 100 puntos extra? ¡Cambia ese 2 por 100!
      const bonus = streak >= 3 ? 2 : 0; 
      score += 10 + bonus; // Sumamos a tus puntos totales
      correct++; // Cuentas una más como correcta
      
      // Mostramos un mensaje feliz
      $feedback.innerHTML = streak >= 3 ? `<i class="fa-solid fa-check"></i> ¡Correcto! +${10+bonus} pts (racha ×${streak})` : '<i class="fa-solid fa-check"></i> ¡Correcto!';
      $feedback.className = 'math-feedback correct'; // Le pone color verde
    
    // Si te equivocaste...
    } else {
      streak = 0; // Oh no, pierdes tu racha
      // Mostramos el mensaje triste y te decimos cuál era
      $feedback.innerHTML = `<i class="fa-solid fa-xmark"></i> Incorrecto. La respuesta era ${answer}`;
      $feedback.className = 'math-feedback wrong'; // Le pone color rojo
    }

    // Actualizamos los números grandes en la pantalla
    $score.textContent = score;
    $streak.innerHTML = `<i class="fa-solid fa-fire"></i> ${streak}`;
    
    // Esperamos un poquitito (600 milisegundos) y ponemos otra pregunta
    setTimeout(generateQuestion, 600);
  }

  // ⏰ Arranca el cronómetro
  function startTimer() {
    timerLeft = 30; // ⏱️ ZONA DE HACKEO: Si cambiaste arriba, cámbialo aquí también (ej: 60)
    $timer.textContent = timerLeft;
    document.querySelector('.timer-card')?.classList.remove('urgent');

    // Cada segundo (1000 milisegundos), se ejecuta esto:
    timerInterval = setInterval(() => {
      timerLeft--; // Le restamos 1 al tiempo
      $timer.textContent = timerLeft; // Lo mostramos en pantalla
      
      // Si quedan 10 segundos o menos, ¡se pone rojo parpadeando!
      if (timerLeft <= 10) document.querySelector('.timer-card')?.classList.add('urgent');
      
      // ¡Se acabó el tiempo!
      if (timerLeft <= 0) endGame();
    }, 1000);
  }

  // 🏁 Fin del juego
  function endGame() {
    clearInterval(timerInterval); // Apagamos el reloj
    timerInterval = null;
    running = false; // Ya no estamos jugando
    show('result'); // Mostramos la pantalla final de trofeos
    $finalScore.textContent = score; // Mostramos tu puntuación
    $correct.textContent = correct; // Mostramos cuántas acertaste
    
    // Te damos una medalla de Oro, Plata o Bronce según tus puntos
    $resultIcon.className = 'fa-solid big-icon ' + (score >= 100 ? 'fa-trophy' : score >= 50 ? 'fa-medal' : 'fa-award');
  }

  // 🚀 ¡Prepara todo para despegar un juego nuevo!
  function startGame(diff) {
    difficulty = diff; // Escogemos el nivel
    score = streak = correct = 0; // Todo a cero
    running = true;
    $score.textContent = 0;
    $streak.innerHTML = '<i class="fa-solid fa-fire"></i> 0';
    show('play'); // Muestra la pantalla para jugar
    generateQuestion(); // Crea la primera pregunta
    startTimer(); // Enciende el reloj
  }

  // Función para pausar el juego (útil si cambias de módulo)
  function pause() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  }

  // 🔌 Conectamos los cables de HTML al JavaScript
  function init() {
    // Buscamos las partes de la pantalla
    $score    = document.getElementById('mathScore');
    $timer    = document.getElementById('mathTimer');
    $streak   = document.getElementById('mathStreak');
    $question = document.getElementById('mathQuestion');
    $input    = document.getElementById('mathInput');
    $feedback = document.getElementById('mathFeedback');
    $finalScore = document.getElementById('mathFinalScore');
    $correct    = document.getElementById('mathCorrect');
    $resultIcon = document.getElementById('mathResultIcon');

    // Las tres pantallas
    screens = {
      start:  document.getElementById('mathStartScreen'),
      play:   document.getElementById('mathPlayScreen'),
      result: document.getElementById('mathResultScreen'),
    };

    // Conectamos los botones de los niveles
    document.getElementById('mathStartEasy')?.addEventListener('click', () => startGame('facil'));
    document.getElementById('mathStartMed')?.addEventListener('click',  () => startGame('medio'));
    document.getElementById('mathStartHard')?.addEventListener('click', () => startGame('dificil'));

    // Conectamos el botón de responder y la tecla "Enter"
    document.getElementById('mathSubmit')?.addEventListener('click', checkAnswer);
    $input?.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });

    // Conectamos el botón de volver a jugar
    document.getElementById('mathRestart')?.addEventListener('click', () => {
      show('start');
      document.querySelector('.timer-card')?.classList.remove('urgent');
    });

    // Muestra la pantalla inicial
    show('start');
  }

  // Guardamos nuestro juego en la mochila de módulos para arrancarlo
  window.MODULES.matematica = { init, pause };
})();
