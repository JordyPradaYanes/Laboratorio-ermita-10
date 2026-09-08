/**
 * memoria.js — Juego de Memoria en Inglés
 * ¡Bienvenido al gimnasio del cerebro! 🧠
 * Aquí vas a entrenar tu memoria juntando parejas de palabras en inglés y español.
 */
(function () {
  'use strict';

  // 📝 ZONA DE HACKEO: ¡Tu propio diccionario!
  // Esta es la lista de palabras del juego.
  // "en" significa English (Inglés) y "es" Español.
  // ¡Agrega tus propias palabras favoritas siguiendo el mismo formato!
  const VOCAB = [
    { en: 'Science',    es: 'Ciencia' },
    { en: 'Atom',       es: 'Átomo' },
    { en: 'Gravity',    es: 'Gravedad' },
    { en: 'Brain',      es: 'Cerebro' },
    { en: 'Heart',      es: 'Corazón' },
    { en: 'Planet',     es: 'Planeta' },
    { en: 'Energy',     es: 'Energía' },
    { en: 'Cell',       es: 'Célula' },
    { en: 'Light',      es: 'Luz' },
    { en: 'Water',      es: 'Agua' },
    { en: 'Space',      es: 'Espacio' },
    { en: 'Earth',      es: 'Tierra' },
    // { en: 'Dog',        es: 'Perro' }, // ¡Prueba descomentar (quitar las dos barras) esta línea!
  ];

  // Variables para controlar cómo va la partida
  let cards = [];       // Aquí guardamos todas las cartas revueltas de la mesa
  let flipped = [];     // Las cartas que están boca arriba ahora mismo (máximo 2)
  let matched = 0;      // Cuántas parejas has encontrado
  let attempts = 0;     // Cuántos intentos has hecho (¡trata de que sean pocos!)
  let time = 0;         // El tiempo que llevas jugando (en segundos)
  let timerInt = null;  // Nuestro cronómetro
  let playing = false;  // ¿El juego está funcionando?

  // Las conexiones con la pantalla
  let $board, $att, $pairs, $time, $win, $winTime, $winAtt;

  // 🌪️ ¡El mezclador mágico de cartas!
  // Esta función toma una lista y le da vuelta a todo para que sea diferente cada vez.
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Escoge un lugar al azar
      // ¡Puf! Intercambia los elementos
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // ⏱️ Arranca el reloj
  function startTimer() {
    if (timerInt) clearInterval(timerInt); // Si había un reloj viejo, lo apaga
    
    // Cada 1 segundo (1000 milisegundos), sube el tiempo
    timerInt = setInterval(() => {
      time++;
      $time.textContent = time + 's'; // Muestra "1s", "2s" en pantalla
    }, 1000);
  }

  // 🚀 ¡Empieza un juego nuevo!
  function initGame() {
    $win.hidden = true; // Esconde el trofeo de victoria
    playing = true;     // ¡A jugar!
    matched = 0;
    attempts = 0;
    time = 0;
    
    // Reseteamos los números en la pantalla a cero
    $att.textContent = attempts;
    $pairs.textContent = '0 / 8';
    $time.textContent = '0s';

    // Elegimos solo 8 palabras al azar de nuestro diccionario gigante
    const selectedVocab = shuffle([...VOCAB]).slice(0, 8);
    const deck = []; // Nuestra baraja vacía
    
    // Por cada palabra, metemos 2 cartas: una en inglés y otra en español
    selectedVocab.forEach((v, idx) => {
      deck.push({ id: idx, text: v.en, lang: 'en' });
      deck.push({ id: idx, text: v.es, lang: 'es' });
    });

    // Barajamos todo junto para que sea difícil
    cards = shuffle(deck);
    
    // Repartimos las cartas en la mesa
    renderBoard();
    startTimer();
  }

  // 🃏 Reparte las cartas en la pantalla (dibuja los cuadritos)
  function renderBoard() {
    $board.innerHTML = ''; // Limpia la mesa
    
    cards.forEach((card, i) => {
      const el = document.createElement('div'); // Crea un cartón vacío
      el.className = 'memory-card'; // Le pone la clase CSS para que se vea bonito
      el.dataset.idx = i;
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      
      // La tarjeta tiene dos caras: el frente (un misterio) y la parte de atrás (la palabra)
      el.innerHTML = `
        <div class="memory-card-inner">
          <div class="memory-card-front"><i class="fa-solid fa-question"></i></div>
          <div class="memory-card-back">${card.text}</div>
        </div>`;
      
      // Cuando haces clic en la tarjeta, llama a "flipCard" (dar vuelta a la carta)
      el.addEventListener('click', () => flipCard(el, card));
      el.addEventListener('keydown', e => { if (e.key==='Enter') flipCard(el, card); });
      
      $board.appendChild(el); // La pone en la mesa
    });
  }

  // 🔄 ¡Voltea una carta!
  function flipCard(el, card) {
    // Si el juego no empezó, o ya hay 2 cartas volteadas, o esta carta ya está volteada... no hacemos nada.
    if (!playing || flipped.length >= 2 || el.classList.contains('flipped') || el.classList.contains('matched')) return;

    el.classList.add('flipped'); // Le decimos a CSS que haga el giro 3D
    flipped.push({ el, card });  // La anotamos en la lista de cartas boca arriba

    // Si ya volteamos dos cartas, es hora de ver si ganamos o perdimos el turno
    if (flipped.length === 2) {
      attempts++; // Usaste un intento
      $att.textContent = attempts;
      checkMatch(); // ¡Revisa si son pareja!
    }
  }

  // 🔍 Revisa si las dos cartas boca arriba significan lo mismo
  function checkMatch() {
    const [c1, c2] = flipped; // Las dos cartas
    
    // Si tienen el mismo ID (significan lo mismo) pero diferente idioma... ¡Es pareja!
    if (c1.card.id === c2.card.id && c1.card.lang !== c2.card.lang) {
      
      // Esperamos medio segundito (500ms) para que sea suave
      setTimeout(() => {
        c1.el.classList.add('matched'); // Las pinta de color especial
        c2.el.classList.add('matched');
        matched++; // Sumamos un acierto
        $pairs.textContent = `${matched} / 8`;
        flipped = []; // Vaciamos las manos
        
        // ¡Si encontraste las 8 parejas, ganaste!
        if (matched === 8) winGame();
      }, 500);
      
    } else {
      // Si te equivocaste...
      // ⏱️ ZONA DE HACKEO: Tiempo de penalización
      // Esperamos 1 segundo (1000ms) para que veas tu error antes de esconderlas
      // ¡Cambia 1000 por 3000 (3 segundos) si necesitas más tiempo para memorizar!
      setTimeout(() => {
        c1.el.classList.remove('flipped'); // Las volvemos a poner boca abajo
        c2.el.classList.remove('flipped');
        flipped = [];
      }, 1000);
    }
  }

  // 🏆 ¡Felicidades! Ganaste el juego
  function winGame() {
    playing = false;
    clearInterval(timerInt); // Paramos el reloj
    timerInt = null;
    
    // Mostramos tus estadísticas en la pantalla de trofeo
    $winTime.textContent = time + ' segundos';
    $winAtt.textContent = attempts;
    setTimeout(() => { $win.hidden = false; }, 500); // Aparece la pantalla final
  }

  // Pausa el reloj (útil para cuando cambias de módulo)
  function pause() {
    if (timerInt) { clearInterval(timerInt); timerInt = null; }
  }

  // 🔌 Conectamos el código con los botones de la pantalla
  function init() {
    $board = document.getElementById('memoryBoard');
    $att   = document.getElementById('memAttempts');
    $pairs = document.getElementById('memPairs');
    $time  = document.getElementById('memTimer');
    $win   = document.getElementById('memWin');
    $winTime = document.getElementById('memWinTime');
    $winAtt  = document.getElementById('memWinAttempts');

    // Botones para volver a empezar
    document.getElementById('memRestart')?.addEventListener('click', initGame);
    document.getElementById('memWinRestart')?.addEventListener('click', initGame);

    initGame(); // Arrancamos la primera partida solitos
  }

  // Guardamos el juego para que todo el sitio pueda usarlo
  window.MODULES.memoria = { init, pause };
})();
