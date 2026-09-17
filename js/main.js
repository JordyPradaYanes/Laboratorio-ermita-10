/**
 * main.js — Router y Lógica Global del Portal de Ciencias
 * Arquitectura SPA con Vanilla JS y Hash Routing
 *
 * CORRECCIONES APLICADAS:
 * 1. window.MODULES se inicializa aquí para evitar errores en los módulos.
 * 2. script.onload garantiza que init() se llama DESPUÉS de que el JS se ejecuta.
 * 3. Se llama stop()/pause() al módulo anterior para limpiar timers y animaciones.
 */

// ── Registro global de módulos ─────────────────────────────────────────────
// Cada módulo se registra aquí con: window.MODULES.nombre = { init, stop, pause }
window.MODULES = {};

(() => {
    // ── Referencias al DOM ──────────────────────────────────────────────────
    const contenedorApp       = document.getElementById('app');
    const enlacesNav          = document.querySelectorAll('.nav-link');
    const botonTema           = document.getElementById('theme-toggle');

    // ── Estado global ───────────────────────────────────────────────────────
    const estado = {
        tema: localStorage.getItem('theme') || 'light',
        // 📌 Nombre del módulo activo (para poder pausarlo al salir)
        moduloActual: null
    };

    /**
     * Inicialización de la aplicación
     */
    const iniciarApp = () => {
        aplicarTema(estado.tema);
        configurarEventos();
        manejarRuta(); // Cargar la ruta inicial desde el hash de la URL
    };

    /**
     * Configuración de Event Listeners Globales (solo se registran UNA vez)
     */
    const configurarEventos = () => {
        // Escucha cambios en el hash de la URL (ej: #/ondas → #/gravedad)
        window.addEventListener('hashchange', manejarRuta);
        // Botón de Modo Oscuro/Claro
        botonTema.addEventListener('click', alternarTema);
    };

    /**
     * Manejador de Rutas — Se ejecuta en cada cambio de hash
     */
    const manejarRuta = async () => {
        // Extraer la ruta del hash (ej: "#/quimica" → "/quimica")
        let ruta = window.location.hash.slice(1) || '/';

        // ── CORRECCIÓN: Detener el módulo anterior antes de navegar ──────────
        // Esto limpia timers, animaciones y listeners del módulo que se abandona.
        if (estado.moduloActual && window.MODULES[estado.moduloActual]) {
            window.MODULES[estado.moduloActual]?.stop?.();
            window.MODULES[estado.moduloActual]?.pause?.();
        }

        // Actualizar el enlace activo en el menú lateral
        actualizarNavActivo(ruta);

        if (ruta === '/') {
            // Pantalla de bienvenida
            estado.moduloActual = null;
            contenedorApp.innerHTML = `
                <h1>Bienvenido al Portal de Ciencias</h1>
                <p>Selecciona un módulo en el menú lateral para comenzar a aprender.</p>
            `;
        } else {
            // Cargar el módulo correspondiente a la ruta
            await cargarModulo(ruta);
        }
    };

    /**
     * Carga dinámica de un Módulo (HTML + CSS + JS)
     * @param {string} ruta - Ruta del módulo (ej: "/ondas")
     */
    const cargarModulo = async (ruta) => {
        // Extraer el nombre del módulo de la ruta (ej: "/ondas" → "ondas")
        const nombreModulo = ruta.replace('/', '');
        const rutaModulo = `modules/${nombreModulo}/${nombreModulo}`;

        try {
            // Indicar que está cargando
            contenedorApp.innerHTML = `<p style="color:var(--text-secondary); padding:2rem;">
                <i class="fas fa-spinner fa-spin"></i> Cargando módulo <strong>${nombreModulo}</strong>...
            </p>`;

            // ── PASO 1: Obtener y inyectar el HTML del módulo ────────────────
            const respuesta = await fetch(`${rutaModulo}.html`);
            if (!respuesta.ok) throw new Error(`Módulo "${nombreModulo}" no encontrado (HTTP ${respuesta.status})`);
            const html = await respuesta.text();
            contenedorApp.innerHTML = html;

            // ── PASO 2: Cargar el CSS del módulo (solo una vez) ──────────────
            if (!document.getElementById(`css-${nombreModulo}`)) {
                const enlaceCSS  = document.createElement('link');
                enlaceCSS.id     = `css-${nombreModulo}`;
                enlaceCSS.rel    = 'stylesheet';
                enlaceCSS.href   = `${rutaModulo}.css`;
                document.head.appendChild(enlaceCSS);
            }

            // ── PASO 3: Recargar y ejecutar el JS del módulo ─────────────────
            // Se elimina el script anterior para forzar una re-ejecución limpia.
            const scriptAnterior = document.getElementById(`js-${nombreModulo}`);
            if (scriptAnterior) scriptAnterior.remove();

            const nuevoScript   = document.createElement('script');
            nuevoScript.id      = `js-${nombreModulo}`;
            nuevoScript.src     = `${rutaModulo}.js`;

            // ── CORRECCIÓN CRÍTICA: Llamar init() DESPUÉS de que el JS cargue ──
            // Sin este onload, el script se añade al DOM pero init() nunca se llama.
            nuevoScript.onload = () => {
                estado.moduloActual = nombreModulo;
                // Llama a la función de inicio del módulo si está registrada
                if (window.MODULES[nombreModulo]?.init) {
                    window.MODULES[nombreModulo].init();
                } else {
                    console.warn(`[Router] El módulo "${nombreModulo}" no registró una función init() en window.MODULES.`);
                }
            };

            nuevoScript.onerror = () => {
                console.error(`[Router] No se pudo cargar el script: ${rutaModulo}.js`);
            };

            document.body.appendChild(nuevoScript);

        } catch (error) {
            console.error('[Router]', error);
            contenedorApp.innerHTML = `
                <h2 style="color:var(--clr-error);">Error 404</h2>
                <p>El módulo <strong>"${nombreModulo}"</strong> no está disponible o el archivo no se encontró.</p>
                <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">
                    Detalle: ${error.message}
                </p>
            `;
        }
    };

    /**
     * Actualizar el enlace activo en el Sidebar
     */
    const actualizarNavActivo = (ruta) => {
        enlacesNav.forEach(enlace => {
            enlace.classList.remove('active');
            if (enlace.getAttribute('data-route') === ruta) {
                enlace.classList.add('active');
            }
        });
    };

    /**
     * Alternar entre Modo Oscuro y Modo Claro
     */
    const alternarTema = () => {
        estado.tema = estado.tema === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', estado.tema);
        aplicarTema(estado.tema);
    };

    /**
     * Aplicar el tema al documento
     */
    const aplicarTema = (tema) => {
        if (tema === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            botonTema.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
        } else {
            document.documentElement.removeAttribute('data-theme');
            botonTema.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
        }
    };

    // ── Arrancar la aplicación cuando el DOM esté listo ────────────────────
    document.addEventListener('DOMContentLoaded', iniciarApp);

})();
