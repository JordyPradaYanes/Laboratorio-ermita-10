# 🪐 Guía del Estudiante — Laboratorio de Gravedad

## ¿Qué debes lograr?

Tu módulo tiene una "bola" (un `div` en HTML) que cae dentro de un canal. Ya tienes el motor que la anima. Tu trabajo es:

1. Crear un **objeto** que guarde los 3 valores de gravedad (Tierra, Luna, Júpiter).
2. Conectar los **3 botones de planeta** para que guarden qué gravedad está activa.
3. Conectar el botón **"Soltar objeto"** para que inicie la animación con la gravedad correcta.
4. Conectar el botón **"Reiniciar"** para devolver la bola a su posición inicial.

Cuando termines, el usuario podrá elegir un planeta, soltar la bola y ver cuánto tarda en caer, comparando entre planetas.

---

## ¿Qué conceptos de JS vas a usar?

| Concepto | ¿Para qué lo usas aquí? |
|---|---|
| **Objeto** (`{ clave: valor }`) | Para guardar los 3 valores de gravedad en un solo lugar. |
| **Variable** (`let`) | Para recordar qué planeta y qué gravedad está seleccionada. |
| **Event listener `'click'`** | Para detectar cuándo el usuario hace clic en un botón. |
| **`document.getElementById()`** | Para encontrar un botón por su `id` en el HTML. |
| **`querySelectorAll` + `forEach`** | Para quitar el resaltado de TODOS los botones a la vez. |
| **`classList.add/remove()`** | Para resaltar el botón del planeta elegido. |
| **Llamar a una función** | Para iniciar la caída llamando a `animarCaida(...)`. |

---

## Mini-ejemplo: cómo crear y usar un objeto

Imagina que quieres guardar las velocidades máximas de 3 vehículos:

```js
const velocidades = {
  bicicleta: 30,
  auto:      120,
  avion:     900
};

// Para leer un valor del objeto:
console.log(velocidades.auto);      // muestra: 120
console.log(velocidades['avion']);  // también muestra: 900
```

En tu caso, harás lo mismo con las gravedades de los planetas.

---

## Mini-ejemplo: cómo conectar botones que cambian una variable activa

Imagina 3 botones de idioma:

```html
<button class="btn-idioma" id="btnEspanol">Español</button>
<button class="btn-idioma" id="btnIngles">Inglés</button>
<button class="btn-idioma" id="btnFrances">Francés</button>
```

```js
let idiomaActual = 'Español';

document.getElementById('btnEspanol').addEventListener('click', function () {
  // Quitamos el resaltado de todos los botones de idioma
  document.querySelectorAll('.btn-idioma').forEach(function (b) {
    b.classList.remove('active-mode');
  });
  // Resaltamos solo el botón clickeado
  document.getElementById('btnEspanol').classList.add('active-mode');
  // Guardamos el idioma elegido
  idiomaActual = 'Español';
  // (aquí podrías llamar a alguna función que use idiomaActual)
});
```

Debes hacer lo mismo para los 3 botones de planeta, actualizando `planetaActual` y `gravedadActual`.

---

## ¿Cómo saber que tu código funciona?

✅ Al hacer clic en "Luna", el botón se resalta y los otros se apagan  
✅ Al hacer clic en "Soltar objeto", la bola cae (lento en Luna, rapidísimo en Júpiter)  
✅ Al terminar la caída, aparece el panel de resultados con el tiempo en segundos  
✅ Al hacer clic en "Reiniciar", la bola vuelve arriba  
✅ Se puede repetir el experimento con otro planeta  

---

## TODOs que debes completar

Busca en `gravedad.js` los comentarios `// TODO 1` hasta `// TODO 6`.
Son los 6 únicos lugares donde debes escribir código.
