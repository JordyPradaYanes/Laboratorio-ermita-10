/**
 * piramide.js — Pirámide Alimenticia
 * ¡Hola Chef! 👨‍🍳👩‍🍳
 * Aquí organizamos la comida. ¿Qué va en la punta y qué va en la base?
 */
(function () {
  'use strict';

  // 📌 EDITAR AQUÍ: ¡Agrega tu comida favorita!
  // Esta es la lista de alimentos. 
  // Cada alimento tiene un nombre, un dibujo (icon) y un nivel (1 al 4).
  // Nivel 4: Base (lo que más hay que comer, como arroz)
  // Nivel 1: Punta (lo que menos hay que comer, como dulces)
  const ALIMENTOS = [
    { id: 'f1', nombre: 'Pan', icono: 'fa-bread-slice', nivel: 4 },
    { id: 'f2', nombre: 'Arroz', icono: 'fa-bowl-rice', nivel: 4 },
    { id: 'f3', nombre: 'Manzana', icono: 'fa-apple-whole', nivel: 3 },
    { id: 'f4', nombre: 'Zanahoria', icono: 'fa-carrot', nivel: 3 },
    { id: 'f5', nombre: 'Leche', icono: 'fa-glass-water', nivel: 2 },
    { id: 'f6', nombre: 'Pescado', icono: 'fa-fish', nivel: 2 },
    { id: 'f7', nombre: 'Chocolate', icono: 'fa-cookie-bite', nivel: 1 },
    { id: 'f8', nombre: 'Gaseosa', icono: 'fa-bottle-water', nivel: 1 },
    // ¡Intenta agregar uno nuevo aquí! 
    // { id: 'f9', nombre: 'Queso', icono: 'fa-cheese', nivel: 2 },
  ];

  // Variables para controlar la pantalla
  let $zonaArrastre, $niveles, $boton, $retroalimentacion;

  // 📦 Función que saca la comida de la caja y la pone en la pantalla
  function dibujarAlimentos() {
    $zonaArrastre.innerHTML = ''; // Limpiamos la caja primero
    
    // Por cada comida en nuestra lista...
    ALIMENTOS.forEach(f => {
      const el = document.createElement('div'); // Creamos un cartelito
      el.className = 'elemento-comida'; // Le ponemos estilo de cartelito
      el.draggable = true; // ¡Le decimos que se puede arrastrar!
      el.id = f.id;
      el.dataset.nivelCorrecto = f.nivel; // Guardamos en secreto a qué nivel pertenece
      
      // Le dibujamos el icono y el nombre
      el.innerHTML = `<i class="fa-solid ${f.icono}"></i> ${f.nombre}`;
      
      // Cuando empezamos a arrastrarlo (hacemos clic y movemos el ratón)
      el.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', el.id); // Guardamos qué comida estamos agarrando
        el.classList.add('arrastrando'); // Le ponemos un efecto de "volando"
      });
      
      // Cuando lo soltamos
      el.addEventListener('dragend', () => el.classList.remove('arrastrando'));
      
      // Lo ponemos en la pantalla
      $zonaArrastre.appendChild(el);
    });
  }

  // 🖐️ ¡La magia de arrastrar y soltar (Drag and Drop)!
  function configurarArrastrarYSoltar() {
    // Buscamos todas las partes de la pirámide donde podemos soltar comida
    const zonasSoltar = document.querySelectorAll('.zona-soltar');
    const todasZonas = [...zonasSoltar, $zonaArrastre]; // La caja de inicio también cuenta

    // A cada zona le enseñamos qué hacer cuando le cae comida encima
    todasZonas.forEach(zona => {
      
      // Cuando la comida está volando por encima de la zona
      zona.addEventListener('dragover', e => {
        e.preventDefault(); // Magia necesaria para que nos deje soltarlo
        const padre = zona.closest('.nivel-piramide');
        if (padre) padre.classList.add('sobre-arrastre'); // Iluminamos la zona para que sepas que puedes soltar
      });
      
      // Cuando la comida se va de la zona sin soltarse
      zona.addEventListener('dragleave', e => {
        const padre = zona.closest('.nivel-piramide');
        if (padre) padre.classList.remove('sobre-arrastre'); // Apagamos la luz
      });
      
      // ¡Cuando soltamos la comida!
      zona.addEventListener('drop', e => {
        e.preventDefault();
        const padre = zona.closest('.nivel-piramide');
        if (padre) padre.classList.remove('sobre-arrastre'); // Apagamos la luz
        
        const id = e.dataTransfer.getData('text/plain'); // Vemos qué comida era
        const item = document.getElementById(id); // La buscamos en la pantalla
        
        if (item) {
          zona.appendChild(item); // ¡La pegamos en la nueva zona!
          $retroalimentacion.innerHTML = ''; // Borramos cualquier mensaje de error anterior
        }
      });
    });
  }

  // ✔️ Función para corregir si pusiste la comida en el lugar correcto
  function revisar() {
    let todoCorrecto = true; // Empezamos pensando que todo está bien
    let colocados = 0; // Cuánta comida hemos puesto en la pirámide
    
    // Revisamos cada piso de la pirámide
    document.querySelectorAll('.nivel-piramide').forEach(nivel => {
      const esperado = nivel.dataset.level; // ¿Qué número de nivel es este piso?
      const alimentos = nivel.querySelectorAll('.elemento-comida'); // ¿Qué comida hay aquí?
      
      // Por cada comida en este piso...
      alimentos.forEach(alimento => {
        colocados++;
        
        // Si el número secreto de la comida NO es el mismo del piso...
        if (alimento.dataset.nivelCorrecto !== esperado) {
          todoCorrecto = false; // ¡Hay un error!
          alimento.style.borderColor = 'var(--clr-error)'; // La pintamos roja
          alimento.style.backgroundColor = 'rgba(239,71,111,0.1)';
        } else {
          // Si está bien...
          alimento.style.borderColor = 'var(--clr-success)'; // La pintamos verde
          alimento.style.backgroundColor = 'rgba(6,214,160,0.1)';
        }
      });
    });

    // Avisos para el jugador
    if (colocados < ALIMENTOS.length) {
      // Si falta comida por colocar
      $retroalimentacion.style.color = 'var(--clr-warning)';
      $retroalimentacion.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Aún faltan alimentos por ubicar.';
    } else if (todoCorrecto) {
      // Si TODO está perfecto
      $retroalimentacion.style.color = 'var(--clr-success)';
      $retroalimentacion.innerHTML = '<i class="fa-solid fa-check-circle"></i> ¡Excelente! Has armado la pirámide correctamente.';
    } else {
      // Si hay comida en el lugar equivocado
      $retroalimentacion.style.color = 'var(--clr-error)';
      $retroalimentacion.innerHTML = '<i class="fa-solid fa-xmark"></i> Hay errores. Revisa los elementos marcados en rojo.';
    }
  }

  // 🚀 Función para preparar todo cuando empezamos
  function arrancar() {
    $zonaArrastre = document.getElementById('zonaArrastrePiramide');
    $niveles   = document.querySelectorAll('.nivel-piramide');
    $boton      = document.getElementById('btnRevisarPiramide');
    $retroalimentacion = document.getElementById('retroalimentacionPiramide');

    document.querySelectorAll('.zona-soltar').forEach(z => z.innerHTML = ''); // Limpiamos la pirámide
    dibujarAlimentos(); // Dibujamos la comida
    configurarArrastrarYSoltar(); // Activamos el poder de arrastrar y soltar
    
    $boton?.addEventListener('click', revisar); // Si hunden el botón, revisamos
  }

  // Guardamos nuestro juego de la pirámide para que funcione
  window.MODULES.piramide = { init: arrancar };
})();
