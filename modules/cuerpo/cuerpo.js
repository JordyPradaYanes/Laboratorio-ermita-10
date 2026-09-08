/**
 * cuerpo.js — Explora el Cuerpo Humano
 * ¡Bienvenido a la clase de anatomía! 🩻
 * Vamos a explorar qué tenemos por dentro y cómo funciona nuestro motor.
 */
(function () {
  'use strict';

  // 🫀 ZONA DE HACKEO: El Gran Diccionario Médico
  // Aquí están guardados todos los secretos de los órganos.
  // Puedes cambiar el nombre, lo que hacen, o los datos curiosos ("fact").
  // Por ejemplo, busca el cerebro y ponle un dato curioso tuyo.
  const ORGANS = {
    corazon: {
      icon: 'fa-heart', 
      name: 'Corazón',
      function: 'Bombear sangre por todo el cuerpo mediante contracciones rítmicas. Late aproximadamente 100,000 veces al día.',
      fact: 'Un corazón adulto late entre 60 y 100 veces por minuto en reposo, bombeando unos 5 litros de sangre por minuto.',
      disease: 'Cuidalo comiendo sano y haciendo ejercicio para que sus mangueras (arterias) no se tapen.',
    },
    pulmon: {
      icon: 'fa-lungs', 
      name: 'Pulmones',
      function: 'Son como dos globos que toman el aire limpio (Oxígeno) y sacan el aire sucio (Dióxido de carbono).',
      fact: 'Los pulmones tienen unos 300 millones de bolsitas de aire. Si los extendieras, cubrirían una cancha de tenis.',
      disease: 'Asma: cuando los tubitos de aire se inflaman y cuesta respirar.',
    },
    estomago: {
      icon: 'fa-circle', 
      name: 'Estómago', 
      function: 'Es la licuadora del cuerpo. Mezcla la comida con unos jugos especiales para derretirla.',
      fact: 'El estómago cambia su "pared" por dentro cada dos semanas para no derretirse a sí mismo con sus propios jugos ácidos.',
      disease: 'Gastritis: cuando comes mucho picante y se inflama la barriga por dentro.',
    },
    intestino: {
      icon: 'fa-arrows-spin', 
      name: 'Intestinos',
      function: 'Son un tubo laaaargo que chupa todas las vitaminas de la comida y deja solo lo que no sirve.',
      fact: '¡Están todos enrollados! Si los estiramos, medirían entre 6 y 7 metros (¡más altos que una jirafa!).',
      disease: 'Dolor de barriga cuando comemos algo en mal estado.',
    },
    higado: {
      icon: 'fa-shield', 
      name: 'Hígado',
      function: 'Es el filtro gigante. Limpia la sangre de cosas malas y guarda energía para cuando corres.',
      fact: '¡Es como Deadpool! Es el único órgano que puede volver a crecer si le cortas un pedacito.',
      disease: 'Hay que cuidarlo comiendo verduras y no tomando cosas dañinas.',
    },
    rinon: {
      icon: 'fa-leaf', 
      name: 'Riñones',
      function: 'Son dos frijoles gigantes que lavan tu sangre y sacan la basura en forma de orina (pipí).',
      fact: 'Filtran un montón de sangre al día: ¡casi 180 litros! Como llenar una bañera pequeña.',
      disease: 'Toma mucha agua todos los días para que no se formen "piedras" adentro.',
    },
    cerebro: {
      icon: 'fa-brain', 
      name: 'Cerebro',
      function: 'El jefe de operaciones. Es la computadora que te hace pensar, moverte, soñar y recordar.',
      fact: 'Tiene 86 mil millones de "cables" (neuronas) conectados. ¡Más conexiones que todas las computadoras del mundo juntas!',
      disease: 'Usa casco cuando andes en bici para proteger esta súper computadora.',
    },
  };

  // 🚀 Función para encender la máquina de rayos X
  function init() {
    // Buscamos los botoncitos redondos en el dibujo del niño
    const dots         = document.querySelectorAll('.organ-dot');
    
    // Buscamos la pantalla donde mostraremos la información
    const $placeholder = document.getElementById('organPlaceholder'); // Mensaje de "Haz clic"
    const $detail      = document.getElementById('organDetail'); // La tarjeta con info
    const $icon        = document.getElementById('organIcon');
    const $title       = document.getElementById('organTitle');
    const $func        = document.getElementById('organFunction');
    const $fact        = document.getElementById('organFact');
    const $disease     = document.getElementById('organDisease');

    // 🔍 Función que se activa cuando tocas un órgano
    function showOrgan(key) {
      const organ = ORGANS[key]; // Buscamos en nuestro diccionario el órgano que tocaste
      if (!organ) return; // Si no existe, no hace nada

      // Le quitamos el círculo brillante a todos los órganos...
      dots.forEach(d => d.classList.remove('active-organ'));
      // ...y se lo ponemos solo al que tocaste
      document.querySelector(`.organ-dot[data-organ="${key}"]`)?.classList.add('active-organ');

      // Escribimos la información en la tarjeta de la derecha
      $icon.className = `organ-icon fa-solid ${organ.icon}`; // Cambia el dibujo
      $title.textContent   = organ.name; // Escribe el nombre
      $func.textContent    = organ.function; // Escribe qué hace
      $fact.textContent    = organ.fact; // El dato curioso
      $disease.textContent = organ.disease; // Cómo cuidarlo

      // Escondemos el mensaje de bienvenida y mostramos la tarjeta
      $placeholder.hidden = true;
      $detail.hidden = false;
    }

    // A cada botoncito del cuerpo le enseñamos a avisarnos cuando le hacen clic
    dots.forEach(dot => {
      dot.addEventListener('click',  () => showOrgan(dot.dataset.organ)); // Clic del ratón
      // Esto es por si usan el teclado (Enter o Espacio)
      dot.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') showOrgan(dot.dataset.organ); });
    });

    // También podemos hacer clic en los nombres que están al lado
    document.querySelectorAll('.organ-lbl').forEach(lbl => {
      lbl.addEventListener('click', () => showOrgan(lbl.dataset.organ));
    });
  }

  // Guardamos nuestro atlas de anatomía para poder usarlo
  window.MODULES.cuerpo = { init };
})();
