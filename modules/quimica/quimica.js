/**
 * ========================================================
 * PLANTILLA DE MÓDULO: JS
 * Lógica específica del módulo. 
 * Usamos una IIFE para no chocar con variables de otros módulos.
 * ========================================================
 */

(() => {
    // 1. VARIABLES PRINCIPALES
    // EDITAR AQUÍ: Selecciona los elementos HTML con document.getElementById o querySelector
    const btnAccion = document.getElementById('btn-accion');
    const inputEjemplo = document.getElementById('input-ejemplo');
    const areaResultados = document.getElementById('area-resultados');
    
    // Variables de estado interno del módulo (ej: datos calculados)
    let datosLocales = []; 

    // 2. FUNCIONES LÓGICAS
    // EDITAR AQUÍ: Escribe las funciones que resuelven las fórmulas o manejan el juego
    const procesarDatos = (valorEntrada) => {
        // Ejemplo de validación y cálculo
        if(!valorEntrada) {
            return "Por favor ingresa un valor.";
        }
        
        // Simulación de un cálculo o proceso
        const resultado = `Procesaste el valor: ${valorEntrada}`;
        return resultado;
    };

    const actualizarVista = (mensaje) => {
        // EDITAR AQUÍ: Actualiza el DOM para mostrar resultados al usuario
        if (areaResultados) {
            areaResultados.innerHTML = `<p>${mensaje}</p>`;
        }
    };

    // 3. EVENTOS
    // EDITAR AQUÍ: Conecta la interacción del usuario con las funciones
    const inicializarEventos = () => {
        
        // Qué hacer cuando se hace click en el botón principal
        if (btnAccion) {
            btnAccion.addEventListener('click', () => {
                // Paso 1: Leer el input
                const valor = inputEjemplo ? inputEjemplo.value : null;
                
                // Paso 2: Procesar lógica
                const respuesta = procesarDatos(valor);
                
                // Paso 3: Mostrar en pantalla
                actualizarVista(respuesta);
            });
        }

        // Puedes agregar más eventos (mousemove, teclado, etc.)
    };

    // 4. INICIAR MÓDULO
    // Llamar a los eventos al momento de inyectar el script
    inicializarEventos();

    console.log("Módulo cargado exitosamente.");
})();
