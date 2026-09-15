# 🌊 Guía del Estudiante — Simulador de Ondas

## ¿Qué debes lograr?

Tu módulo muestra una ola animada en pantalla. Ya tiene el motor que dibuja y mueve la ola. Tu trabajo es **conectar los controles** (los sliders y los botones del HTML) con las variables que controlan cómo se ve la ola.

Cuando termines, el usuario podrá:
- Mover el slider de **Frecuencia** y ver cómo las olas se juntan o se separan.
- Mover el slider de **Amplitud** y ver cómo las olas crecen o se achican.
- Mover el slider de **Velocidad** y ver si las olas van rápido o lento.
- Hacer clic en los botones **Senoidal / Cuadrada / Triangular** para cambiar la forma de la ola.

---

## ¿Qué conceptos de JS vas a usar?

| Concepto | ¿Para qué lo usas aquí? |
|---|---|
| **Variable** (`let freq = 1`) | Para guardar el valor actual de frecuencia, amplitud, etc. |
| **Event listener** | Para "escuchar" cuando el usuario mueve un slider o hace clic en un botón. |
| **`addEventListener('input', ...)`** | Tipo de evento que se dispara cada vez que el slider cambia. |
| **`addEventListener('click', ...)`** | Tipo de evento para botones. |
| **`element.value`** | Para leer el valor actual de un slider (`<input type="range">`). |
| **`parseFloat()`** | Convierte texto a número decimal (ej: `"1.5"` → `1.5`). |
| **`parseInt()`** | Convierte texto a número entero (ej: `"80"` → `80`). |
| **`classList.add/remove('active')`** | Para resaltar el botón seleccionado. |
| **`dataset.wave`** | Leer el atributo `data-wave` de un botón HTML. |

---

## Mini-ejemplo: cómo conectar un slider con una variable

Imagina que tienes este control de volumen en tu HTML:

```html
<input type="range" id="sliderVolumen" min="0" max="100" value="50" />
<span id="valorVolumen">50</span>
```

Y en tu JS tienes una variable:
```js
let volumen = 50;
```

Para que cuando el usuario mueva el slider, la variable se actualice y el número en pantalla cambie:

```js
const $sliderVolumen = document.getElementById('sliderVolumen');

$sliderVolumen.addEventListener('input', function () {
  volumen = parseInt($sliderVolumen.value);  // Guardamos el nuevo valor
  document.getElementById('valorVolumen').textContent = volumen;  // Lo mostramos
});
```

> 💡 Aquí `'input'` significa "cada vez que el usuario mueve el slider".  
> `$sliderVolumen.value` da el valor actual como texto, por eso usamos `parseInt()`.

---

## Mini-ejemplo: cómo resaltar el botón clickeado

Imagina 3 botones de color:

```html
<button class="btn-color" data-color="rojo">Rojo</button>
<button class="btn-color" data-color="azul">Azul</button>
<button class="btn-color" data-color="verde">Verde</button>
```

Para resaltar el botón que el usuario elige (y des-resaltar los demás):

```js
let colorElegido = 'rojo';

document.querySelectorAll('.btn-color').forEach(function (btn) {
  btn.addEventListener('click', function () {
    // Quitamos el resaltado de TODOS
    document.querySelectorAll('.btn-color').forEach(function (b) {
      b.classList.remove('active');
    });
    // Resaltamos SOLO el que se clickeó
    btn.classList.add('active');
    // Guardamos la elección
    colorElegido = btn.dataset.color;
  });
});
```

---

## ¿Cómo saber que tu código funciona?

✅ Mover el slider de Frecuencia → las olas se juntan o separan  
✅ Mover el slider de Amplitud → las olas crecen o se aplanan  
✅ Mover el slider de Velocidad → la ola va más rápido o lento  
✅ Hacer clic en "Cuadrada" → la ola cambia de forma y el botón se resalta  
✅ Los números al lado de cada slider se actualizan al moverlo  

---

## TODOs que debes completar

Busca en `ondas.js` los comentarios `// TODO 1`, `// TODO 2`, `// TODO 3` y `// TODO 4`.
Son los 4 únicos lugares donde debes escribir código.
