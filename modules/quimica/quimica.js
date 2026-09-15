/**
 * quimica.js — Simulador de Química (versión andamiada)
 * ¡Combina elementos para formar moléculas! 🧪
 *
 * ════════════════════════════════════════════════════════════════════
 *  📖 PARA EL PROFESOR — Resumen del motor (léelo antes de clase)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Este archivo tiene DOS partes:
 *
 *  PARTE 1 — MOTOR (ya hecho, no tocar):
 *    • MOLECULAS_VALIDAS: una lista (array) de objetos. Cada objeto
 *      tiene un array "elementos" con los átomos ordenados
 *      alfabéticamente (ej: ["H","H","O"]), más el nombre, fórmula
 *      y descripción de la molécula.
 *    • verificarMolecula(): toma el array del estudiante
 *      (elementosSeleccionados), lo ordena alfabéticamente y lo
 *      compara contra cada molécula válida.
 *      Si hay coincidencia, llama a mostrarExito(). Si no, llama
 *      a mostrarFracaso().
 *    • mostrarExito(molecula): muestra el nombre, fórmula y
 *      descripción de la molécula encontrada en el HTML.
 *    • mostrarFracaso(): muestra un mensaje de "combinación inválida".
 *    • actualizarZonaVisual(): redibuja los tokens de elementos en la
 *      zona de combinación del HTML.
 *    • limpiar(): vacía elementosSeleccionados y actualiza la vista.
 *
 *  PARTE 2 — LO QUE PROGRAMA EL ESTUDIANTE:
 *    • El array elementosSeleccionados = []
 *    • Los event listeners de los 6 botones de elemento (agregan al array)
 *    • El event listener del botón "Formar Molécula" (llama verificarMolecula)
 *    • El event listener del botón "Limpiar" (llama limpiar)
 *
 * ════════════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  //  CÓDIGO YA HECHO — No lo modifiques
  // ══════════════════════════════════════════════════════════════════

  /**
   * Lista de moléculas válidas.
   * Cada molécula tiene sus elementos ORDENADOS ALFABÉTICAMENTE.
   * La función verificarMolecula() también ordenará el array del estudiante
   * antes de comparar, así "H, O, H" y "H, H, O" son la misma combinación.
   */
  const MOLECULAS_VALIDAS = [
    {
      elementos: ['H', 'H', 'O'],          // H₂O — ordenados: H, H, O
      nombre:    'Agua',
      formula:   'H₂O',
      desc:      '¡El líquido más importante de la vida! Dos átomos de hidrógeno y uno de oxígeno.'
    },
    {
      elementos: ['C', 'O', 'O'],          // CO₂ — ordenados: C, O, O
      nombre:    'Dióxido de Carbono',
      formula:   'CO₂',
      desc:      'El gas que exhalamos al respirar. También lo usan las plantas para hacer fotosíntesis.'
    },
    {
      elementos: ['Cl', 'Na'],             // NaCl — ordenados: Cl, Na
      nombre:    'Cloruro de Sodio (Sal de mesa)',
      formula:   'NaCl',
      desc:      '¡La sal que pones en la comida! Se forma cuando el sodio y el cloro reaccionan.'
    },
    {
      elementos: ['H', 'H', 'H', 'N'],    // NH₃ — ordenados: H, H, H, N
      nombre:    'Amoníaco',
      formula:   'NH₃',
      desc:      'Un gas con olor fuerte. Se usa para hacer fertilizantes y productos de limpieza.'
    },
    {
      elementos: ['H', 'H'],              // H₂ — ordenados: H, H
      nombre:    'Hidrógeno Molecular',
      formula:   'H₂',
      desc:      'El elemento más ligero del universo. Se usa como combustible de cohetes espaciales.'
    },
    {
      elementos: ['O', 'O'],              // O₂ — ordenados: O, O
      nombre:    'Oxígeno Molecular',
      formula:   'O₂',
      desc:      'El gas que respiramos. Representa el 21% del aire que nos rodea.'
    },
  ];

  // Referencias a elementos del HTML (el motor las necesita)
  const zonaVisual  = document.getElementById('zonaCombinacion');
  const placeholder = document.getElementById('placeholderTexto');
  const panelResult = document.getElementById('resultado');
  const resultIcono = document.getElementById('resultadoIcono');
  const resultNombre= document.getElementById('resultadoNombre');
  const resultForm  = document.getElementById('resultadoFormula');
  const resultDesc  = document.getElementById('resultadoDesc');

  /**
   * actualizarZonaVisual()
   * Redibuja los tokens de elementos en la zona visual del HTML.
   * Lee el array elementosSeleccionados para saber qué mostrar.
   * Esta función se llama automáticamente después de cada cambio.
   */
  function actualizarZonaVisual() {
    // Primero borramos el contenido actual de la zona
    zonaVisual.innerHTML = '';

    if (elementosSeleccionados.length === 0) {
      // Si el array está vacío, mostramos el texto de ayuda
      const span = document.createElement('span');
      span.className = 'chem-placeholder';
      span.id = 'placeholderTexto';
      span.textContent = 'Agrega elementos haciendo clic arriba ↑';
      zonaVisual.appendChild(span);
    } else {
      // Si hay elementos, creamos un token visual por cada uno
      elementosSeleccionados.forEach(function (elem, indice) {
        const token = document.createElement('div');
        token.className = 'chem-token';
        token.textContent = elem;
        // Al hacer clic en un token, se elimina del array
        token.addEventListener('click', function () {
          elementosSeleccionados.splice(indice, 1);
          actualizarZonaVisual();
          panelResult.hidden = true; // Ocultamos resultado si cambian
        });
        zonaVisual.appendChild(token);
      });
    }
  }

  /**
   * verificarMolecula()
   * Compara el array del estudiante con la lista de moléculas válidas.
   * Ordena ambos arrays alfabéticamente antes de comparar,
   * así el orden en que el estudiante agregó los elementos no importa.
   */
  function verificarMolecula() {
    if (elementosSeleccionados.length === 0) return; // Nada que verificar

    // Ordenamos el array del estudiante alfabéticamente (copia para no modificar el original)
    const intento = elementosSeleccionados.slice().sort();

    // Buscamos si hay alguna molécula cuyo array de elementos coincida
    const encontrada = MOLECULAS_VALIDAS.find(function (mol) {
      // La molécula ya está ordenada, así que comparamos directamente
      if (mol.elementos.length !== intento.length) return false;
      return mol.elementos.every(function (elem, i) {
        return elem === intento[i];
      });
    });

    if (encontrada) {
      mostrarExito(encontrada);
    } else {
      mostrarFracaso();
    }
  }

  /**
   * mostrarExito(molecula)
   * Muestra el resultado cuando la combinación es válida.
   */
  function mostrarExito(molecula) {
    resultIcono.textContent  = '✅';
    resultNombre.textContent = '¡Molécula válida! ' + molecula.nombre;
    resultForm.textContent   = 'Fórmula: ' + molecula.formula;
    resultDesc.textContent   = molecula.desc;
    panelResult.className    = 'chem-resultado exito';
    panelResult.hidden       = false;
  }

  /**
   * mostrarFracaso()
   * Muestra el resultado cuando la combinación no es una molécula conocida.
   */
  function mostrarFracaso() {
    resultIcono.textContent  = '❌';
    resultNombre.textContent = 'Combinación inválida';
    resultForm.textContent   = 'Esa combinación de elementos no forma una molécula de nuestra lista.';
    resultDesc.textContent   = '¡Sigue intentando! Prueba con H+H+O o Na+Cl.';
    panelResult.className    = 'chem-resultado fracaso';
    panelResult.hidden       = false;
  }

  /**
   * limpiar()
   * Vacía el array de elementos y resetea la vista.
   */
  function limpiar() {
    elementosSeleccionados.length = 0; // Vaciamos el array sin reemplazarlo
    actualizarZonaVisual();
    panelResult.hidden = true;
  }

  // ══════════════════════════════════════════════════════════════════
  //  TU CÓDIGO AQUÍ — Completa las secciones marcadas con TODO
  // ══════════════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────────────
  // TODO 1: Declara el array donde guardarás los elementos elegidos.
  // Un array vacío se escribe así: let miArray = [];
  // Nómbralo exactamente: elementosSeleccionados
  // (Las funciones del motor ya usan ese nombre exacto)
  // ──────────────────────────────────────────────────────────────────


  function init() {
    if (!zonaVisual) return; // Seguridad: verificar que el HTML cargó

    actualizarZonaVisual(); // Mostramos la zona vacía al iniciar

    // ──────────────────────────────────────────────────────────────
    // TODO 2: Event listeners de los botones de ELEMENTOS
    // Hay 6 botones con la clase 'chem-elem-btn' (H, O, C, N, Na, Cl).
    // Selecciónalos todos con: document.querySelectorAll('.chem-elem-btn')
    // Para CADA botón (usa .forEach):
    //   a) Agrega un addEventListener de tipo 'click'
    //   b) Dentro, lee el elemento del botón con: btn.dataset.elemento
    //      (eso te dará el string 'H', 'O', 'C', etc.)
    //   c) Agrégalo al array con: elementosSeleccionados.push(elemento)
    //   d) Llama a actualizarZonaVisual() para que se muestre en pantalla
    //   e) Oculta el resultado anterior: panelResult.hidden = true
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 3: Event listener del botón "Formar Molécula" (id: "btnFormar")
    // Cuando se haga clic, llama a la función verificarMolecula().
    // Pista: document.getElementById('btnFormar').addEventListener('click', ...)
    // ──────────────────────────────────────────────────────────────


    // ──────────────────────────────────────────────────────────────
    // TODO 4: Event listener del botón "Limpiar" (id: "btnLimpiar")
    // Cuando se haga clic, llama a la función limpiar().
    // ──────────────────────────────────────────────────────────────

  }

  // Registramos el módulo en la aplicación
  window.MODULES.quimica = { init };
})();
