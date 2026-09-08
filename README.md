# 🔬 Portal de Ciencias e Interactividad

Un proyecto educativo interactivo pensado para estudiantes de **10° y 11° grado**, diseñado como una Single Page Application (SPA) modular. Este portal permite a los estudiantes explorar conceptos científicos y matemáticos mediante simulaciones, minijuegos y herramientas visuales.

## 🚀 Características Principales

*   **Arquitectura SPA Modular**: La aplicación está construida desde cero sin frameworks externos (React, Angular, etc.), utilizando HTML, CSS y JavaScript "Vanilla". Solo carga los recursos de los módulos que el usuario visita.
*   **10 Módulos Interactivos**: Diferentes áreas del conocimiento encapsuladas de manera independiente.
*   **0 Dependencias Externas**: No requiere `npm install`, Node.js o Webpack. Está listo para ejecutarse directamente en el navegador.
*   **Design System Moderno**: Incluye modo oscuro por defecto (con soporte a modo claro), animaciones fluidas, paletas de colores variables y diseño responsivo adaptado a móviles, tablets y escritorio.
*   **Íconos Profesionales**: Integra **Font Awesome 6** y tipografías modernas de Google Fonts (*Outfit* y *JetBrains Mono*).

---

## 🧩 Módulos Incluidos

El portal se divide en las siguientes 10 herramientas y juegos:

1.  **⚗️ Simulador de Química**: Combina elementos (H, O, C, etc.) para descubrir y formar moléculas reales.
2.  **〰️ Simulador de Ondas**: Visualiza ondas senoidales, cuadradas y triangulares ajustando su frecuencia y amplitud en un canvas animado.
3.  **🫀 Explora el Cuerpo Humano**: Un mapa SVG interactivo con información sobre las funciones, datos curiosos y enfermedades de 7 órganos principales.
4.  **🧪 Tabla Periódica Interactiva**: Visualiza los elementos por familia química y accede a información detallada como masa atómica y estado natural.
5.  **🧮 Misión Matemática**: Pon a prueba tu velocidad mental resolviendo operaciones matemáticas contra el reloj (3 niveles de dificultad).
6.  **🃏 Memoria en Inglés**: Clásico juego de voltear cartas para emparejar vocabulario científico en inglés con su traducción al español.
7.  **📐 Teorema de Pitágoras**: Visualización dinámica de la fórmula geométrica modificando los catetos del triángulo.
8.  **🏆 Trivia Multijugador**: Responde preguntas de ciencia de cultura general por turnos (ideal para 2 personas en un mismo dispositivo).
9.  **🥗 Pirámide Alimenticia**: Juego de arrastrar y soltar (Drag & Drop) para categorizar alimentos según su nivel de consumo saludable.
10. **🌍 Laboratorio de Gravedad**: Simulación de físicas para observar el tiempo y velocidad de caída de un objeto en la Tierra, Luna y Júpiter.

---

## 🛠️ Tecnologías Usadas

*   **HTML5 Semántico**: Estructuras accesibles y limpias.
*   **CSS3**: Variables globales, Grid, Flexbox, transiciones suaves y `backdrop-filter`.
*   **JavaScript (ES6+)**:
    *   **Vanilla JS Router**: Manipulación de la API de *History* (`pushState`) para actualizar la URL.
    *   **Fetch API**: Carga asíncrona de archivos (`.html`, `.css`, `.js`) bajo demanda.
    *   **Canvas API**: Simulaciones dibujadas y renderizadas a ~60fps (Gravedad, Ondas, Pitágoras).
    *   **Patrón IIFE**: Los scripts de cada módulo se envuelven en una función anónima autoejecutable para evitar contaminar el ámbito global.

---

## 📂 Estructura de Archivos

```text
Proyectos_Ermita/
├── index.html              # Shell principal (barra lateral y contenedor SPA)
├── README.md               # Documentación del proyecto
├── css/
│   └── style.css           # Design system general (variables, layout global)
├── js/
│   └── main.js             # Router principal y lógica de inyección de módulos
└── modules/                # Archivos encapsulados por módulo
    ├── quimica/            # (HTML, CSS y JS del módulo de Química)
    ├── ondas/              # (HTML, CSS y JS del módulo de Ondas)
    ├── cuerpo/             # ...
    ├── tabla/
    ├── matematica/
    ├── memoria/
    ├── pitagoras/
    ├── trivia/
    ├── piramide/
    └── gravedad/
```

---

## 💻 Instalación y Ejecución

Al no requerir compilación, es extremadamente fácil de ejecutar:

### 1. Ejecución Local (Recomendado)
Usa **Visual Studio Code**:
1. Clona o descarga este repositorio.
2. Abre la carpeta raíz en VS Code.
3. Instala la extensión **Live Server**.
4. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

*(Nota: Si abres el `index.html` haciendo doble clic desde el explorador de archivos con protocolo `file://`, la carga dinámica de módulos (`fetch`) bloqueará los scripts por políticas de seguridad de CORS del navegador. Siempre usa un servidor local).*

### 2. Despliegue Público en GitHub Pages
1. Sube este proyecto a tu repositorio de GitHub.
2. Ve a la pestaña **Settings** > **Pages**.
3. Bajo *Build and deployment*, selecciona tu rama principal (ej. `main` o `master`) y la carpeta raíz (`/root`).
4. Haz clic en **Save**. En unos minutos tu portal estará en vivo.
