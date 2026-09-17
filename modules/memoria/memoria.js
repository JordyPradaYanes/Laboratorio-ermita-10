/**
 * memoria.js — Juego de Memoria en Inglés
 * ¡Bienvenido al gimnasio del cerebro! 🧠
 * Aquí vas a entrenar tu memoria juntando parejas de palabras en inglés y español.
 */
(function () {
  'use strict';

  // 📌 EDITAR AQUÍ: ¡Tu propio diccionario!
  // Esta es la lista de palabras del juego.
  // "ingles" es la palabra en Inglés y "espanol" es la traducción en Español.
  // ¡Agrega tus propias palabras favoritas siguiendo el mismo formato!
  const VOCABULARIO = [
    { ingles: 'Science',    espanol: 'Ciencia' },
    { ingles: 'Atom',       espanol: 'Átomo' },
    { ingles: 'Gravity',    espanol: 'Gravedad' },
    { ingles: 'Brain',      espanol: 'Cerebro' },
    { ingles: 'Heart',      espanol: 'Corazón' },
    { ingles: 'Planet',     espanol: 'Planeta' },
    { ingles: 'Energy',     espanol: 'Energía' },
    { ingles: 'Cell',       espanol: 'Célula' },
    { ingles: 'Light',      espanol: 'Luz' },
    { ingles: 'Water',      espanol: 'Agua' },
    { ingles: 'Space',      espanol: 'Espacio' },
    { ingles: 'Earth',      espanol: 'Tierra' },
    // { ingles: 'Dog',        espanol: 'Perro' }, // ¡Prueba descomentar (quitar las dos barras) esta línea!
  ];

  // Variables para controlar cómo va la partida
  let cartas = [];       // Aquí guardamos todas las cartas revueltas de la mesa
  let volteadas = [];     // Las cartas que están boca arriba ahora mismo (máximo 2)
  let parejasEncontradas = 0;      // Cuántas parejas has encontrado
  let intentos = 0;     // Cuántos intentos has hecho (¡trata de que sean pocos!)
  let tiempo = 0;         // El tiempo que llevas jugando (en segundos)
  let intervaloTiempo = null;  // Nuestro cronómetro
  let jugando = false;  // ¿El juego está funcionando?

  // Las conexiones con la pantalla
  let $tablero, $intentosUI, $parejasUI, $tiempoUI, $victoria, $tiempoVictoria, $intentosVictoria;

  // 🌪️ ¡El mezclador mágico de cartas!
  // Esta función toma una lista y le da vuelta a todo para que sea diferente cada vez.
  function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Escoge un lugar al azar
      // ¡Puf! Intercambia los elementos
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // ⏱️ Arranca el reloj
  function iniciarReloj() {
    if (intervaloTiempo) clearInterval(intervaloTiempo); // Si había un reloj viejo, lo apaga
    
    // Cada 1 segundo (1000 milisegundos), sube el tiempo
    intervaloTiempo = setInterval(() => {
      tiempo++;
      $tiempoUI.textContent = tiempo + 's'; // Muestra "1s", "2s" en pantalla
    }, 1000);
  }

  // 🚀 ¡Empieza un juego nuevo!
  function iniciarJuego() {
    $victoria.hidden = true; // Esconde el trofeo de victoria
    jugando = true;     // ¡A jugar!
    parejasEncontradas = 0;
    intentos = 0;
    tiempo = 0;
    
    // Reseteamos los números en la pantalla a cero
    $intentosUI.textContent = intentos;
    $parejasUI.textContent = '0 / 8';
    $tiempoUI.textContent = '0s';

    // Elegimos solo 8 palabras al azar de nuestro diccionario gigante
    const vocabularioSeleccionado = mezclar([...VOCABULARIO]).slice(0, 8);
    const baraja = []; // Nuestra baraja vacía
    
    // Por cada palabra, metemos 2 cartas: una en inglés y otra en español
    vocabularioSeleccionado.forEach((v, idx) => {
      baraja.push({ id: idx, texto: v.ingles, idioma: 'ingles' });
      baraja.push({ id: idx, texto: v.espanol, idioma: 'espanol' });
    });

    // Barajamos todo junto para que sea difícil
    cartas = mezclar(baraja);
    
    // Repartimos las cartas en la mesa
    dibujarTablero();
    iniciarReloj();
  }

  // 🃏 Reparte las cartas en la pantalla (dibuja los cuadritos)
  function dibujarTablero() {
    $tablero.innerHTML = ''; // Limpia la mesa
    
    cartas.forEach((carta, i) => {
      const el = document.createElement('div'); // Crea un cartón vacío
      el.className = 'carta-memoria'; // Le pone la clase CSS para que se vea bonito
      el.dataset.idx = i;
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      
      // La tarjeta tiene dos caras: el frente (un misterio) y la parte de atrás (la palabra)
      el.innerHTML = `
        <div class="interior-carta-memoria">
          <div class="frente-carta-memoria"><i class="fa-solid fa-question"></i></div>
          <div class="dorso-carta-memoria">${carta.texto}</div>
        </div>`;
      
      // Cuando haces clic en la tarjeta, llama a "voltearCarta" (dar vuelta a la carta)
      el.addEventListener('click', () => voltearCarta(el, carta));
      el.addEventListener('keydown', e => { if (e.key==='Enter') voltearCarta(el, carta); });
      
      $tablero.appendChild(el); // La pone en la mesa
    });
  }

  // 🔄 ¡Voltea una carta!
  function voltearCarta(el, carta) {
    // Si el juego no empezó, o ya hay 2 cartas volteadas, o esta carta ya está volteada... no hacemos nada.
    if (!jugando || volteadas.length >= 2 || el.classList.contains('volteada') || el.classList.contains('emparejada')) return;

    el.classList.add('volteada'); // Le decimos a CSS que haga el giro 3D
    volteadas.push({ el, carta });  // La anotamos en la lista de cartas boca arriba

    // Si ya volteamos dos cartas, es hora de ver si ganamos o perdimos el turno
    if (volteadas.length === 2) {
      intentos++; // Usaste un intento
      $intentosUI.textContent = intentos;
      revisarPareja(); // ¡Revisa si son pareja!
    }
  }

  // 🔍 Revisa si las dos cartas boca arriba significan lo mismo
  function revisarPareja() {
    const [c1, c2] = volteadas; // Las dos cartas
    
    // Si tienen el mismo ID (significan lo mismo) pero diferente idioma... ¡Es pareja!
    if (c1.carta.id === c2.carta.id && c1.carta.idioma !== c2.carta.idioma) {
      
      // Esperamos medio segundito (500ms) para que sea suave
      setTimeout(() => {
        c1.el.classList.add('emparejada'); // Las pinta de color especial
        c2.el.classList.add('emparejada');
        parejasEncontradas++; // Sumamos un acierto
        $parejasUI.textContent = `${parejasEncontradas} / 8`;
        volteadas = []; // Vaciamos las manos
        
        // ¡Si encontraste las 8 parejas, ganaste!
        if (parejasEncontradas === 8) ganarJuego();
      }, 500);
      
    } else {
      // Si te equivocaste...
      // 📌 EDITAR AQUÍ: Tiempo de penalización
      // Esperamos 1 segundo (1000ms) para que veas tu error antes de esconderlas
      // ¡Cambia 1000 por 3000 (3 segundos) si necesitas más tiempo para memorizar!
      setTimeout(() => {
        c1.el.classList.remove('volteada'); // Las volvemos a poner boca abajo
        c2.el.classList.remove('volteada');
        volteadas = [];
      }, 1000);
    }
  }

  // 🏆 ¡Felicidades! Ganaste el juego
  function ganarJuego() {
    jugando = false;
    clearInterval(intervaloTiempo); // Paramos el reloj
    intervaloTiempo = null;
    
    // Mostramos tus estadísticas en la pantalla de trofeo
    $tiempoVictoria.textContent = tiempo + ' segundos';
    $intentosVictoria.textContent = intentos;
    setTimeout(() => { $victoria.hidden = false; }, 500); // Aparece la pantalla final
  }

  // Pausa el reloj (útil para cuando cambias de módulo)
  function pausar() {
    if (intervaloTiempo) { clearInterval(intervaloTiempo); intervaloTiempo = null; }
  }

  // 🔌 Conectamos el código con los botones de la pantalla
  function arrancar() {
    $tablero = document.getElementById('tableroMemoria');
    $intentosUI   = document.getElementById('intentosMemoria');
    $parejasUI = document.getElementById('parejasMemoria');
    $tiempoUI  = document.getElementById('tiempoMemoria');
    $victoria   = document.getElementById('victoriaMemoria');
    $tiempoVictoria = document.getElementById('tiempoVictoriaMemoria');
    $intentosVictoria  = document.getElementById('intentosVictoriaMemoria');

    // Botones para volver a empezar
    document.getElementById('btnReiniciarMemoria')?.addEventListener('click', iniciarJuego);
    document.getElementById('btnReiniciarVictoriaMemoria')?.addEventListener('click', iniciarJuego);

    iniciarJuego(); // Arrancamos la primera partida solitos
  }

  // Guardamos el juego para que todo el sitio pueda usarlo
  window.MODULES.memoria = { init: arrancar, pause: pausar };
})();
