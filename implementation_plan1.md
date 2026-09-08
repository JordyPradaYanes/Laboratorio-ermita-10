# Portal de Ciencias e Interactividad — Plan de Implementación

## Arquitectura General

```
Proyectos_Ermita/
├── index.html          ← SPA Shell + todos los módulos como <section>
├── css/
│   └── style.css       ← Design system completo (variables, dark mode, animaciones)
└── js/
    └── main.js         ← Router SPA + 10 módulos encapsulados como objetos ES6
```

## Stack
- **HTML5 semántico** con ARIA roles
- **CSS3** con custom properties, Grid/Flexbox, animaciones, modo oscuro por defecto
- **JS Vanilla ES6+** con módulos en objeto literal (sin bundler, sin npm)

## Los 10 Módulos

| # | Módulo | Tecnología principal |
|---|--------|---------------------|
| 1 | Simulador de Química | DOM manipulation + reactions map |
| 2 | Simulador de Ondas | Canvas 2D + requestAnimationFrame |
| 3 | Cuerpo Humano | SVG overlay + modal system |
| 4 | Tabla Periódica | CSS Grid + filter system |
| 5 | Misión Matemática | Timer + random expression generator |
| 6 | Memoria en Inglés | CSS 3D flip cards + match logic |
| 7 | Pitágoras | Canvas 2D + Pythagorean theorem |
| 8 | Trivia Multijugador | Turn-based state machine |
| 9 | Pirámide Alimenticia | Drag & Drop API |
| 10 | Laboratorio de Gravedad | Canvas physics simulation |
