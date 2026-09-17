/**
 * cuerpo.js — Explora el Cuerpo Humano
 * ¡Bienvenido a la clase de anatomía! 🩻
 * Vamos a explorar qué tenemos por dentro y cómo funciona nuestro motor.
 */
(function () {
  'use strict';

  // 📌 EDITAR AQUÍ: El Gran Diccionario Médico
  // Aquí están guardados todos los secretos de los órganos.
  // Puedes cambiar el nombre, lo que hacen, o los datos curiosos ("dato").
  // Por ejemplo, busca el cerebro y ponle un dato curioso tuyo.
  const ORGANOS = {
    corazon: {
      icono: 'fa-heart', 
      nombre: 'Corazón',
      funcion: 'Bombear sangre por todo el cuerpo mediante contracciones rítmicas. Late aproximadamente 100,000 veces al día.',
      dato: 'Un corazón adulto late entre 60 y 100 veces por minuto en reposo, bombeando unos 5 litros de sangre por minuto.',
      enfermedad: 'Cuidalo comiendo sano y haciendo ejercicio para que sus mangueras (arterias) no se tapen.',
    },
    pulmon: {
      icono: 'fa-lungs', 
      nombre: 'Pulmones',
      funcion: 'Son como dos globos que toman el aire limpio (Oxígeno) y sacan el aire sucio (Dióxido de carbono).',
      dato: 'Los pulmones tienen unos 300 millones de bolsitas de aire. Si los extendieras, cubrirían una cancha de tenis.',
      enfermedad: 'Asma: cuando los tubitos de aire se inflaman y cuesta respirar.',
    },
    estomago: {
      icono: 'fa-circle', 
      nombre: 'Estómago', 
      funcion: 'Es la licuadora del cuerpo. Mezcla la comida con unos jugos especiales para derretirla.',
      dato: 'El estómago cambia su "pared" por dentro cada dos semanas para no derretirse a sí mismo con sus propios jugos ácidos.',
      enfermedad: 'Gastritis: cuando comes mucho picante y se inflama la barriga por dentro.',
    },
    intestino: {
      icono: 'fa-arrows-spin', 
      nombre: 'Intestinos',
      funcion: 'Son un tubo laaaargo que chupa todas las vitaminas de la comida y deja solo lo que no sirve.',
      dato: '¡Están todos enrollados! Si los estiramos, medirían entre 6 y 7 metros (¡más altos que una jirafa!).',
      enfermedad: 'Dolor de barriga cuando comemos algo en mal estado.',
    },
    higado: {
      icono: 'fa-shield', 
      nombre: 'Hígado',
      funcion: 'Es el filtro gigante. Limpia la sangre de cosas malas y guarda energía para cuando corres.',
      dato: '¡Es como Deadpool! Es el único órgano que puede volver a crecer si le cortas un pedacito.',
      enfermedad: 'Hay que cuidarlo comiendo verduras y no tomando cosas dañinas.',
    },
    rinon: {
      icono: 'fa-leaf', 
      nombre: 'Riñones',
      funcion: 'Son dos frijoles gigantes que lavan tu sangre y sacan la basura en forma de orina (pipí).',
      dato: 'Filtran un montón de sangre al día: ¡casi 180 litros! Como llenar una bañera pequeña.',
      enfermedad: 'Toma mucha agua todos los días para que no se formen "piedras" adentro.',
    },
    cerebro: {
      icono: 'fa-brain', 
      nombre: 'Cerebro',
      funcion: 'El jefe de operaciones. Es la computadora que te hace pensar, moverte, soñar y recordar.',
      dato: 'Tiene 86 mil millones de "cables" (neuronas) conectados. ¡Más conexiones que todas las computadoras del mundo juntas!',
      enfermedad: 'Usa casco cuando andes en bici para proteger esta súper computadora.',
    },
  };

  // 🚀 Función para encender la máquina de rayos X
  function arrancar() {
    // Buscamos los botoncitos redondos en el dibujo del niño
    const puntos         = document.querySelectorAll('.punto-organo');
    
    // Buscamos la pantalla donde mostraremos la información
    const $pantallaVacia = document.getElementById('marcadorPosicionOrgano'); // Mensaje de "Haz clic"
    const $detalle       = document.getElementById('detalleOrgano'); // La tarjeta con info
    const $icono         = document.getElementById('iconoOrgano');
    const $titulo        = document.getElementById('tituloOrgano');
    const $funcion       = document.getElementById('funcionOrgano');
    const $dato          = document.getElementById('datoOrgano');
    const $enfermedad    = document.getElementById('enfermedadOrgano');

    // 🔍 Función que se activa cuando tocas un órgano
    function mostrarOrgano(clave) {
      const organo = ORGANOS[clave]; // Buscamos en nuestro diccionario el órgano que tocaste
      if (!organo) return; // Si no existe, no hace nada

      // Le quitamos el círculo brillante a todos los órganos...
      puntos.forEach(p => p.classList.remove('organo-activo'));
      // ...y se lo ponemos solo al que tocaste
      document.querySelector(`.punto-organo[data-organ="${clave}"]`)?.classList.add('organo-activo');

      // Escribimos la información en la tarjeta de la derecha
      $icono.className     = `icono-organo fa-solid ${organo.icono}`; // Cambia el dibujo
      $titulo.textContent  = organo.nombre; // Escribe el nombre
      $funcion.textContent = organo.funcion; // Escribe qué hace
      $dato.textContent    = organo.dato; // El dato curioso
      $enfermedad.textContent = organo.enfermedad; // Cómo cuidarlo

      // Escondemos el mensaje de bienvenida y mostramos la tarjeta
      $pantallaVacia.hidden = true;
      $detalle.hidden = false;
    }

    // A cada botoncito del cuerpo le enseñamos a avisarnos cuando le hacen clic
    puntos.forEach(punto => {
      punto.addEventListener('click',  () => mostrarOrgano(punto.dataset.organ)); // Clic del ratón
      // Esto es por si usan el teclado (Enter o Espacio)
      punto.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') mostrarOrgano(punto.dataset.organ); });
    });

    // También podemos hacer clic en los nombres que están al lado
    document.querySelectorAll('.etiqueta-organo').forEach(etiqueta => {
      etiqueta.addEventListener('click', () => mostrarOrgano(etiqueta.dataset.organ));
    });
  }

  // Guardamos nuestro atlas de anatomía para poder usarlo (el router espera init)
  window.MODULES.cuerpo = { init: arrancar };
})();
