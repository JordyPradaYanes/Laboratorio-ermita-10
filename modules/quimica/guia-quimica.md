# 🧪 Guía del Estudiante — Simulador de Química

## ¿Qué debes lograr?

Tu módulo permite combinar elementos químicos para formar moléculas. Ya tienes la función que compara tu combinación con la lista de moléculas válidas. Tu trabajo es:

1. Crear el **array** donde se guardarán los elementos que el usuario elige.
2. Conectar los **6 botones de elementos** (H, O, C, N, Na, Cl) para que agreguen al array.
3. Conectar el botón **"Formar Molécula"** para verificar la combinación.
4. Conectar el botón **"Limpiar"** para reiniciar la combinación.

Cuando termines, el usuario podrá hacer clic en H + H + O y al presionar "Formar Molécula" verá que formó **Agua (H₂O)**.

---

## ¿Qué conceptos de JS vas a usar?

| Concepto | ¿Para qué lo usas aquí? |
|---|---|
| **Array** (`[]`) | Para guardar la lista de elementos elegidos. |
| **`array.push(valor)`** | Para agregar un nuevo elemento al array. |
| **Event listener `'click'`** | Para detectar clics en los botones de elementos. |
| **`querySelectorAll` + `forEach`** | Para conectar todos los botones de un solo tipo a la vez. |
| **`dataset.elemento`** | Para leer qué elemento representa cada botón (ej: `'H'`, `'O'`). |
| **Llamar a una función** | Para verificar la molécula o limpiar la combinación. |
| **`element.hidden = true/false`** | Para mostrar u ocultar el panel de resultado. |

---

## Mini-ejemplo: cómo usar un array para guardar elementos

Imagina que tienes un carrito de compras donde vas agregando frutas:

```js
let carrito = [];  // Empieza vacío

// El usuario hace clic en "Manzana"
carrito.push('Manzana');
console.log(carrito);  // ['Manzana']

// El usuario hace clic en "Pera"
carrito.push('Pera');
console.log(carrito);  // ['Manzana', 'Pera']

// El usuario hace clic en "Manzana" otra vez
carrito.push('Manzana');
console.log(carrito);  // ['Manzana', 'Pera', 'Manzana']

// Para vaciar el carrito:
carrito.length = 0;
console.log(carrito);  // []
```

En tu caso, en vez de frutas, guardarás letras de elementos químicos como `'H'`, `'O'`, `'Na'`.

---

## Mini-ejemplo: cómo conectar varios botones a la vez

Imagina que tienes botones de colores y quieres que al hacer clic en cada uno, se agregue a una lista:

```html
<button class="btn-color" data-color="rojo">🔴 Rojo</button>
<button class="btn-color" data-color="azul">🔵 Azul</button>
<button class="btn-color" data-color="verde">🟢 Verde</button>
```

```js
let coloresElegidos = [];

document.querySelectorAll('.btn-color').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const color = btn.dataset.color;  // Lee el atributo data-color del botón
    coloresElegidos.push(color);       // Lo agrega al array
    console.log(coloresElegidos);      // Para verificar que funcionó
  });
});
```

Debes hacer exactamente lo mismo con los botones de elementos, usando `'chem-elem-btn'` como clase y `btn.dataset.elemento` para leer el símbolo químico.

---

## Las moléculas que puedes formar

| Elementos que debes elegir | Molécula que formas |
|---|---|
| H + H + O | Agua (H₂O) |
| C + O + O | Dióxido de Carbono (CO₂) |
| Na + Cl | Sal de mesa (NaCl) |
| H + H + H + N | Amoníaco (NH₃) |
| H + H | Hidrógeno Molecular (H₂) |
| O + O | Oxígeno Molecular (O₂) |

> 💡 El orden en que haces clic no importa — la función ya lo maneja.  
> También puedes hacer clic en un token para quitarlo de tu combinación.

---

## ¿Cómo saber que tu código funciona?

✅ Al hacer clic en "H", aparece un token "H" en la zona de combinación  
✅ Al hacer clic en "H" + "H" + "O" y luego "Formar Molécula" → aparece "¡Agua!"  
✅ Al escribir una combinación inválida (ej: H + Na) → aparece "Combinación inválida"  
✅ Al hacer clic en un token, se elimina de la zona  
✅ Al hacer clic en "Limpiar", la zona queda vacía  

---

## TODOs que debes completar

Busca en `quimica.js` los comentarios `// TODO 1` hasta `// TODO 4`.
Son los 4 únicos lugares donde debes escribir código.
