/**
 * gravedad.js — Laboratorio de Gravedad
 * ¡Observa cómo caen las cosas en distintos planetas! 🪐
 *
 * ════════════════════════════════════════════════════════════════════
 *  📖 PARA EL PROFESOR — Resumen del motor (léelo antes de clase)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Este archivo tiene DOS partes:
 *
 *  PARTE 1 — MOTOR (ya hecho, no tocar):
 *    • Canal de caída: en el HTML hay un <div id="canalCaida"> que actúa
 *      como el tubo donde cae la bola, y un <div id="objeto"> que es la bola.
 *    • animarCaida(gravedad): recibe un número de gravedad (ej: 9.8) y
 *      hace que la bola baje moviéndola con "objeto.style.top".
 *      Usa setInterval (cada 16ms = ~60 fps) y física simple:
 *        velocidad += gravedad * dt   → la gravedad acelera la bola
 *        posicion  += velocidad * dt  → la velocidad mueve la bola
 *      Cuando la bola llega al fondo, llama a mostrarResultado().
 *    • mostrarResultado(planeta, tiempoMs): calcula los segundos
 *      y los muestra en el panel de resultados del HTML.
 *    • reiniciar(): devuelve la bola arriba y limpia los resultados.
 *
 *  PARTE 2 — LO QUE PROGRAMA EL ESTUDIANTE:
 *    • Un objeto "gravedades" con los valores de cada planeta.
 *    • Los event listeners de los 3 botones de planeta.
 *    • El event listener del botón "Soltar objeto", que debe guardar
 *      el tiempo de inicio con Date.now() y llamar a animarCaida().
 *    • El event listener del botón "Reiniciar".
 *
 * ════════════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  //  CÓDIGO YA HECHO — No lo modifiques
  // ══════════════════════════════════════════════════════════════════

  // Referencias a los elementos del HTML
  const objeto    = document.getElementById('objeto');       // La bola
  const canal     = document.getElementById('canalCaida');   // El tubo de caída
  const gravStats = document.getElementById('gravStats');    // Panel de resultados
  const gravTime  = document.getElementById('gravTime');     // Etiqueta de tiempo
  const gravPlan  = document.getElementById('gravPlaneta');  // Etiqueta de planeta

  // Estado interno del motor
  let intervalo    = null;   // Referencia al setInterval activo
  let cayendo      = false;  // ¿Está cayendo la bola ahora mismo?

  // Altura máxima del canal en píxeles (el objeto va de 0 hasta aquí)
  const ALTURA_CANAL = 356; // canal de 400px - objeto de 44px

  /**
   * animarCaida(gravedad)
   * Motor físico que mueve la bola hacia abajo usando style.top.
   * Recibe la gravedad del planeta elegido por el estudiante.
   * Internamente guarda el tiempo de inicio para calcular la duración.
   */
  function animarCaida(gravedad, nombrePlaneta) {
    if (cayendo) return; // Evita doble clic
    cayendo = true;

    let posicion  = 0;   // Posición actual en píxeles (0 = arriba)
    let velocidad = 0;   // Velocidad en px/s
    const dt      = 0.016; // 16ms por fotograma (~60fps)
    const escala  = 25;  // 1 m/s² = 25 px/s² (para que se vea bien en pantalla)

    const inicio = Date.now(); // Guardamos el momento exacto en que empieza

    intervalo = setInterval(function () {
      // Física: la gravedad aumenta la velocidad
      velocidad += gravedad * escala * dt;
      // La velocidad mueve la bola hacia abajo
      posicion  += velocidad * dt;

      // Mover la bola en el HTML
      objeto.style.top = posicion + 'px';

      // Si llegó al fondo, detener
      if (posicion >= ALTURA_CANAL) {
        objeto.style.top = ALTURA_CANAL + 'px';
        clearInterval(intervalo);
        intervalo = null;
        cayendo   = false;

        // Calcular tiempo transcurrido en milisegundos
        const tiempoMs = Date.now() - inicio;
        mostrarResultado(nombrePlaneta, tiempoMs);
      }
    }, 16);
  }

  /**
   * mostrarResultado(planeta, tiempoMs)
   * Muestra el panel de resultados con el tiempo de caída.
   */
  function mostrarResultado(planeta, tiempoMs) {
    const segundos = (tiempoMs / 1000).toFixed(2);
    if (gravPlan)  gravPlan.textContent  = planeta;
    if (gravTime)  gravTime.textContent  = segundos;
    if (gravStats) gravStats.hidden = false;
  }

  /**
   * reiniciar()
   * Devuelve la bola a su posición inicial y oculta los resultados.
   */
  function reiniciar() {
    if (intervalo) {
      clearInterval(intervalo);
      intervalo = null;
    }
    cayendo          = false;
    objeto.style.top = '0px';
    if (gravStats) gravStats.hidden = true;
    if (gravTime)  gravTime.textContent  = '0.00';
    if (gravPlan)  gravPlan.textContent  = '—';
  }

  // ══════════════════════════════════════════════════════════════════
  //  TU CÓDIGO AQUÍ — Completa las secciones marcadas con TODO
  // ══════════════════════════════════════════════════════════════════

  function init() {
    // Verificamos que los elementos del HTML existan
    if (!objeto || !canal) return;

    reiniciar(); // Ponemos la bola arriba al cargar el módulo

    // ──────────────────────────────────────────────────────────────
    // TODO 1: Crea el objeto "gravedades" con los 3 planetas
    // Un objeto en JS se escribe así:
    //   const miObjeto = { clave1: valor1, clave2: valor2 };
    // Tu objeto debe tener estas 3 propiedades:
    //   tierra: 9.8,  luna: 1.6,  jupiter: 24.8
    // Pista: const gravedades = { tierra: ???, luna: ???, jupiter: ??? };
    // ──────────────────────────────────────────────────────────────


    // Variable que guarda qué planeta está seleccionado actualmente
    let planetaActual     = 'Tierra';
    let gravedadActual    = 9.8; // Valor por defecto (Tierra)

    // ──────────────────────────────────────────────────────────────
    // TODO 2: Event listener del botón TIERRA
    // Cuando se haga clic en el botón con id "btnTierra":
    //   a) Guarda 'Tierra' en la variable planetaActual
    //   b) Guarda el valor de gravedad de la Tierra en gravedadActual
    //      (usa el objeto "gravedades" que creaste en el TODO 1)
    //   c) Cambia los estilos de los botones:
    //      - Quítale la clase 'active-mode' a TODOS los botones .env-btns button
    //        (usa querySelectorAll y forEach)
    //      - Agrégale la clase 'active-mode' al botón que se clickeó
    //   d) Llama a reiniciar() para resetear la bola
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 3: Event listener del botón LUNA
    // Igual que el TODO 2, pero para el botón con id "btnLuna".
    // planetaActual = 'Luna', gravedadActual = gravedades.luna
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 4: Event listener del botón JÚPITER
    // Igual que el TODO 2, pero para el botón con id "btnJupiter".
    // planetaActual = 'Júpiter', gravedadActual = gravedades.jupiter
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 5: Event listener del botón "Soltar objeto" (id: "gravDropBtn")
    // Cuando se haga clic:
    //   a) Llama a animarCaida(gravedadActual, planetaActual)
    //      (las variables ya las tienes guardadas de los TODOs anteriores)
    // Pista: document.getElementById('gravDropBtn').addEventListener('click', ...)
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 6: Event listener del botón "Reiniciar" (id: "gravResetBtn")
    // Cuando se haga clic, llama a la función reiniciar().
    // ──────────────────────────────────────────────────────────────

  }

  // Función para detener todo al cambiar de módulo
  function stop() {
    if (intervalo) { clearInterval(intervalo); intervalo = null; }
  }

  // Registramos el módulo en la aplicación
  window.MODULES.gravedad = { init, stop };
})();
