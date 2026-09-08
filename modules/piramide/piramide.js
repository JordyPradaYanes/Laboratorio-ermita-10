/**
 * piramide.js — Pirámide Alimenticia
 * ¡Hola Chef! 👨‍🍳👩‍🍳
 * Aquí organizamos la comida. ¿Qué va en la punta y qué va en la base?
 */
(function () {
  'use strict';

  // 🍎 ZONA DE HACKEO: ¡Agrega tu comida favorita!
  // Esta es la lista de alimentos. 
  // Cada alimento tiene un nombre, un dibujo (icon) y un nivel (1 al 4).
  // Nivel 4: Base (lo que más hay que comer, como arroz)
  // Nivel 1: Punta (lo que menos hay que comer, como dulces)
  const FOODS = [
    { id: 'f1', name: 'Pan', icon: 'fa-bread-slice', level: 4 },
    { id: 'f2', name: 'Arroz', icon: 'fa-bowl-rice', level: 4 },
    { id: 'f3', name: 'Manzana', icon: 'fa-apple-whole', level: 3 },
    { id: 'f4', name: 'Zanahoria', icon: 'fa-carrot', level: 3 },
    { id: 'f5', name: 'Leche', icon: 'fa-glass-water', level: 2 },
    { id: 'f6', name: 'Pescado', icon: 'fa-fish', level: 2 },
    { id: 'f7', name: 'Chocolate', icon: 'fa-cookie-bite', level: 1 },
    { id: 'f8', name: 'Gaseosa', icon: 'fa-bottle-water', level: 1 },
    // ¡Intenta agregar uno nuevo aquí! 
    // { id: 'f9', name: 'Queso', icon: 'fa-cheese', level: 2 },
  ];

  // Variables para controlar la pantalla
  let $dragZone, $levels, $btn, $feedback;

  // 📦 Función que saca la comida de la caja y la pone en la pantalla
  function renderItems() {
    $dragZone.innerHTML = ''; // Limpiamos la caja primero
    
    // Por cada comida en nuestra lista...
    FOODS.forEach(f => {
      const el = document.createElement('div'); // Creamos un cartelito
      el.className = 'food-item'; // Le ponemos estilo de cartelito
      el.draggable = true; // ¡Le decimos que se puede arrastrar!
      el.id = f.id;
      el.dataset.correct = f.level; // Guardamos en secreto a qué nivel pertenece
      
      // Le dibujamos el icono y el nombre
      el.innerHTML = `<i class="fa-solid ${f.icon}"></i> ${f.name}`;
      
      // Cuando empezamos a arrastrarlo (hacemos clic y movemos el ratón)
      el.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', el.id); // Guardamos qué comida estamos agarrando
        el.classList.add('dragging'); // Le ponemos un efecto de "volando"
      });
      
      // Cuando lo soltamos
      el.addEventListener('dragend', () => el.classList.remove('dragging'));
      
      // Lo ponemos en la pantalla
      $dragZone.appendChild(el);
    });
  }

  // 🖐️ ¡La magia de arrastrar y soltar (Drag and Drop)!
  function setupDragAndDrop() {
    // Buscamos todas las partes de la pirámide donde podemos soltar comida
    const dropZones = document.querySelectorAll('.drop-zone');
    const allZones = [...dropZones, $dragZone]; // La caja de inicio también cuenta

    // A cada zona le enseñamos qué hacer cuando le cae comida encima
    allZones.forEach(zone => {
      
      // Cuando la comida está volando por encima de la zona
      zone.addEventListener('dragover', e => {
        e.preventDefault(); // Magia necesaria para que nos deje soltarlo
        const parent = zone.closest('.pyr-level');
        if (parent) parent.classList.add('drag-over'); // Iluminamos la zona para que sepas que puedes soltar
      });
      
      // Cuando la comida se va de la zona sin soltarse
      zone.addEventListener('dragleave', e => {
        const parent = zone.closest('.pyr-level');
        if (parent) parent.classList.remove('drag-over'); // Apagamos la luz
      });
      
      // ¡Cuando soltamos la comida!
      zone.addEventListener('drop', e => {
        e.preventDefault();
        const parent = zone.closest('.pyr-level');
        if (parent) parent.classList.remove('drag-over'); // Apagamos la luz
        
        const id = e.dataTransfer.getData('text/plain'); // Vemos qué comida era
        const item = document.getElementById(id); // La buscamos en la pantalla
        
        if (item) {
          zone.appendChild(item); // ¡La pegamos en la nueva zona!
          $feedback.innerHTML = ''; // Borramos cualquier mensaje de error anterior
        }
      });
    });
  }

  // ✔️ Función para corregir si pusiste la comida en el lugar correcto
  function check() {
    let allCorrect = true; // Empezamos pensando que todo está bien
    let placed = 0; // Cuánta comida hemos puesto en la pirámide
    
    // Revisamos cada piso de la pirámide
    document.querySelectorAll('.pyr-level').forEach(lvl => {
      const expected = lvl.dataset.level; // ¿Qué número de nivel es este piso?
      const items = lvl.querySelectorAll('.food-item'); // ¿Qué comida hay aquí?
      
      // Por cada comida en este piso...
      items.forEach(item => {
        placed++;
        
        // Si el número secreto de la comida NO es el mismo del piso...
        if (item.dataset.correct !== expected) {
          allCorrect = false; // ¡Hay un error!
          item.style.borderColor = 'var(--clr-error)'; // La pintamos roja
          item.style.backgroundColor = 'rgba(239,71,111,0.1)';
        } else {
          // Si está bien...
          item.style.borderColor = 'var(--clr-success)'; // La pintamos verde
          item.style.backgroundColor = 'rgba(6,214,160,0.1)';
        }
      });
    });

    // Avisos para el jugador
    if (placed < FOODS.length) {
      // Si falta comida por colocar
      $feedback.style.color = 'var(--clr-warning)';
      $feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Aún faltan alimentos por ubicar.';
    } else if (allCorrect) {
      // Si TODO está perfecto
      $feedback.style.color = 'var(--clr-success)';
      $feedback.innerHTML = '<i class="fa-solid fa-check-circle"></i> ¡Excelente! Has armado la pirámide correctamente.';
    } else {
      // Si hay comida en el lugar equivocado
      $feedback.style.color = 'var(--clr-error)';
      $feedback.innerHTML = '<i class="fa-solid fa-xmark"></i> Hay errores. Revisa los elementos marcados en rojo.';
    }
  }

  // 🚀 Función para preparar todo cuando empezamos
  function init() {
    $dragZone = document.getElementById('pyrDragZone');
    $levels   = document.querySelectorAll('.pyr-level');
    $btn      = document.getElementById('pyrCheckBtn');
    $feedback = document.getElementById('pyrFeedback');

    document.querySelectorAll('.drop-zone').forEach(z => z.innerHTML = ''); // Limpiamos la pirámide
    renderItems(); // Dibujamos la comida
    setupDragAndDrop(); // Activamos el poder de arrastrar y soltar
    
    $btn?.addEventListener('click', check); // Si hunden el botón, revisamos
  }

  // Guardamos nuestro juego de la pirámide para que funcione
  window.MODULES.piramide = { init };
})();
