# Plan de Corrección Integral de UI/UX y Lógica - Portal de Ciencias

Este plan describe las correcciones y mejoras específicas solicitadas por el usuario para los módulos interactivos del proyecto.

## Análisis de Problemas Detectados

1. **Memoria en Inglés**:
   - **Problema**: La pantalla de victoria (`#memWin`) se muestra sobre el tablero desde el inicio y no deja jugar.
   - **Causa raíz**: En `memoria.css`, `.memory-win { display: flex; }` tiene mayor especificidad que la regla nativa `[hidden] { display: none; }` del navegador.
   - **Solución**: Añadir `[hidden] { display: none !important; }` globalmente en `css/style.css` y en `memoria.css`, asegurando que `#memWin` solo aparezca al completar los 8 pares.

2. **Misión Matemática**:
   - **Problema**: En la zona del medio no se ve bien, el campo de respuesta está cortado ("Tu respue!") y hay elementos apretados.
   - **Causa raíz**: En `matematica.css`, `.math-start-screen, .math-play-screen, .math-result-screen { display: flex; }` provoca que las 3 pantallas estén activas simultáneamente en el mismo contenedor al anular `[hidden]`. Además, el input `.math-input` tiene un ancho de 200px con padding excesivo que recorta el placeholder.
   - **Solución**: Añadir reglas específicas para respetar `[hidden]` en las 3 pantallas, ensanchar `.math-input` a 260px con placeholder limpio, y mejorar la estética de la tarjeta de operaciones.

3. **Pirámide Alimenticia**:
   - **Problema**: No se ve el texto que va en la punta roja de la pirámide (aparece cortado "...RA... NAL)").
   - **Causa raíz**: En `piramide.css`, `.pyr-l1` tiene `clip-path: polygon(50% 0, 100% 100%, 0 100%)` y la etiqueta `.level-lbl` está fijada en `top: 4px;`, donde el ancho del polígono triangular es casi nulo, recortando el texto en los extremos.
   - **Solución**: Ajustar el diseño del nivel superior: dar mayor altura y espacio al nivel 1, situar la etiqueta `.level-lbl` en una posición segura con fondo translúcido tipo badge o distribuida adecuadamente para que "Dulces / Grasas (Ocasional)" se lea con nitidez y elegancia.

4. **Teorema de Pitágoras**:
   - **Problema**: El triángulo en el canvas se ve minúsculo.
   - **Causa raíz**: En `pitagoras.js`, la escala se calculaba como `(Math.min(W, H) - padding * 2) / (maxVal * 2)`, dividiendo por 30 en lugar de ajustar dinámicamente al tamaño del triángulo actual o a las dimensiones reales de los catetos (hasta 15). Para $a=3, b=4$, el triángulo medía apenas 28×37 píxeles en un canvas de 400×400.
   - **Solución**: Aumentar el tamaño del canvas (460×460), recalcular la escala para que el triángulo y los cuadrados geométricos asociados ($a^2$, $b^2$, $c^2$) aprovechen el espacio, y añadir visualización de cuadrados o escala interactiva óptima con sombras, hipotenusa destacada y etiquetas flotantes grandes.

5. **Simulador de Química**:
   - **Problema**: Se requiere un apartado completo con las reacciones químicas que se pueden realizar y hacer el simulador mucho más interactivo.
   - **Solución**:
     - Añadir un **Recetario / Catálogo Completo de Reacciones Químicas** desplegable o en pestaña/panel con todas las combinaciones posibles ($H_2O$, $CO_2$, $NaCl$, $CH_4$, $NH_3$, $H_2O_2$, $CaO$, $Fe_2O_3$, etc.), con fórmula balanceada, tipo de reacción (síntesis, combustión, etc.) y botón interactivo "Cargar reactivos al matraz" para experimentar al instante.
     - Añadir animación interactiva de efervescencia/reacción en el matraz al presionar "Reaccionar", efectos de luz y sonido visual/badge de estado.
     - Ampliar el catálogo de elementos y combinaciones con reacciones educativas.

6. **Tabla Periódica**:
   - **Problema**: No están todos los elementos (solo había 34 de los 118).
   - **Solución**:
     - Incorporar la base de datos completa de los **118 elementos químicos** (del Hidrógeno 1 al Oganesón 118) con símbolo, nombre en español, masa atómica, período, grupo, estado y familia química.
     - Ajustar la cuadrícula para renderizar la tabla estándar IUPAC incluyendo la serie de Lantánidos y Actínidos en las filas inferiores (filas 8 y 9) con botones de filtro completos (alcalinos, alcalinotérreos, transición, otros metales, semimetales, no metales, halógenos, gases nobles, lantánidos y actínidos).

7. **Revisión General de UI/UX**:
   - Asegurar que `[hidden] { display: none !important; }` esté en `style.css` para proteger cualquier modal, alerta o pantalla.
   - Validar responsividad en dispositivos móviles para todos los módulos.

## Cambios Propuestos

### Componente Global
#### [MODIFY] [style.css](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/css/style.css)
- Añadir `[hidden] { display: none !important; }` para blindar todos los componentes interactivos.

### 1. Misión Matemática
#### [MODIFY] [matematica.css](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/matematica/matematica.css)
- Asegurar que `.math-start-screen[hidden]`, `.math-play-screen[hidden]`, `.math-result-screen[hidden]` tengan `display: none !important;`.
- Aumentar el ancho y diseño de `.math-input` y `.math-question` para evitar que el placeholder o números queden truncados.

### 2. Memoria en Inglés
#### [MODIFY] [memoria.css](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/memoria/memoria.css)
- Corregir `.memory-win[hidden] { display: none !important; }`.

### 3. Pirámide Alimenticia
#### [MODIFY] [piramide.css](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/piramide/piramide.css)
- Corregir el corte de texto en el nivel 1 (`.pyr-l1`). Ajustar padding, tipografía y estilo de los badges para que todo el texto sea 100% visible.
#### [MODIFY] [piramide.html](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/piramide/piramide.html)
- Mejorar la estructura de etiquetas para máxima legibilidad.

### 4. Teorema de Pitágoras
#### [MODIFY] [pitagoras.js](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/pitagoras/pitagoras.js)
- Optimizar la escala del canvas para que el triángulo sea amplio, centrado, claro y visible en todo momento.
- Añadir sombreado, cuadrícula nítida y cotas con valores grandes y legibles.
#### [MODIFY] [pitagoras.html](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/pitagoras/pitagoras.html)
- Ajustar dimensiones del canvas a 460×460.

### 5. Simulador de Química
#### [MODIFY] [quimica.html](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/quimica/quimica.html)
- Añadir sección/panel interactivo "Catálogo de Reacciones Químicas" con selector rápido de recetas.
#### [MODIFY] [quimica.css](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/quimica/quimica.css)
- Estilos para la guía de reacciones, efectos visuales de reacción en el matraz (burbujas/glow) y badges informativos.
#### [MODIFY] [quimica.js](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/quimica/quimica.js)
- Expandir la lista de reacciones y elementos.
- Añadir función para cargar automáticamente una receta al matraz al hacer clic en el catálogo.

### 6. Tabla Periódica
#### [MODIFY] [tabla.js](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/tabla/tabla.js)
- Incorporar los 118 elementos químicos completos con coordenadas de columna y fila (1 a 18, períodos 1 a 7 y lantánidos/actínidos en filas 8 y 9).
#### [MODIFY] [tabla.html](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/tabla/tabla.html)
- Actualizar botones de filtro para incluir todas las familias químicas.
#### [MODIFY] [tabla.css](file:///c:/Users/Jordy/Documents/Github/Proyectos_Ermita/modules/tabla/tabla.css)
- Soporte visual para filas de lantánidos/actínidos y desplazamiento suave horizontal en pantallas pequeñas.

## Plan de Verificación
1. **Verificación visual y de interacción**:
   - Comprobar que en Misión Matemática solo se ve una pantalla a la vez y el texto "Tu respuesta..." se lee completo.
   - Comprobar que en Memoria en Inglés el juego inicia sin el cartel de victoria y permite voltear cartas.
   - Comprobar que en Pirámide Alimenticia el texto del nivel rojo se lee perfectamente sin cortarse.
   - Comprobar que en Teorema de Pitágoras el triángulo es grande, legible y responde fluidamente a los sliders.
   - Comprobar que en Simulador de Química el catálogo de reacciones está disponible, se pueden cargar recetas con un clic y el matraz reacciona con feedback visual.
   - Comprobar que en la Tabla Periódica están los 118 elementos, se pueden filtrar por todas sus familias y abrir el modal con sus detalles.
