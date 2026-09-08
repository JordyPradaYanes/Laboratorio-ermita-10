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
    const appContainer    = document.getElementById('app');
    const navLinks        = document.querySelectorAll('.nav-link');
    const themeToggleBtn  = document.getElementById('theme-toggle');

    // ── Estado global ───────────────────────────────────────────────────────
    const state = {
        theme: localStorage.getItem('theme') || 'light',
        // 📌 Nombre del módulo activo (para poder pausarlo al salir)
        currentModule: null
    };

    /**
     * Inicialización de la aplicación
     */
    const initApp = () => {
        applyTheme(state.theme);
        setupEventListeners();
        handleRouting(); // Cargar la ruta inicial desde el hash de la URL
    };

    /**
     * Configuración de Event Listeners Globales (solo se registran UNA vez)
     */
    const setupEventListeners = () => {
        // Escucha cambios en el hash de la URL (ej: #/ondas → #/gravedad)
        window.addEventListener('hashchange', handleRouting);
        // Botón de Modo Oscuro/Claro
        themeToggleBtn.addEventListener('click', toggleTheme);
    };

    /**
     * Manejador de Rutas — Se ejecuta en cada cambio de hash
     */
    const handleRouting = async () => {
        // Extraer la ruta del hash (ej: "#/quimica" → "/quimica")
        let route = window.location.hash.slice(1) || '/';

        // ── CORRECCIÓN: Detener el módulo anterior antes de navegar ──────────
        // Esto limpia timers, animaciones y listeners del módulo que se abandona.
        if (state.currentModule && window.MODULES[state.currentModule]) {
            window.MODULES[state.currentModule]?.stop?.();
            window.MODULES[state.currentModule]?.pause?.();
        }

        // Actualizar el enlace activo en el menú lateral
        updateActiveNav(route);

        if (route === '/') {
            // Pantalla de bienvenida
            state.currentModule = null;
            appContainer.innerHTML = `
                <h1>Bienvenido al Portal de Ciencias</h1>
                <p>Selecciona un módulo en el menú lateral para comenzar a aprender.</p>
            `;
        } else {
            // Cargar el módulo correspondiente a la ruta
            await loadModule(route);
        }
    };

    /**
     * Carga dinámica de un Módulo (HTML + CSS + JS)
     * @param {string} route - Ruta del módulo (ej: "/ondas")
     */
    const loadModule = async (route) => {
        // Extraer el nombre del módulo de la ruta (ej: "/ondas" → "ondas")
        const moduleName = route.replace('/', '');
        const modulePath = `modules/${moduleName}/${moduleName}`;

        try {
            // Indicar que está cargando
            appContainer.innerHTML = `<p style="color:var(--text-secondary); padding:2rem;">
                <i class="fas fa-spinner fa-spin"></i> Cargando módulo <strong>${moduleName}</strong>...
            </p>`;

            // ── PASO 1: Obtener y inyectar el HTML del módulo ────────────────
            const response = await fetch(`${modulePath}.html`);
            if (!response.ok) throw new Error(`Módulo "${moduleName}" no encontrado (HTTP ${response.status})`);
            const html = await response.text();
            appContainer.innerHTML = html;

            // ── PASO 2: Cargar el CSS del módulo (solo una vez) ──────────────
            if (!document.getElementById(`css-${moduleName}`)) {
                const link  = document.createElement('link');
                link.id     = `css-${moduleName}`;
                link.rel    = 'stylesheet';
                link.href   = `${modulePath}.css`;
                document.head.appendChild(link);
            }

            // ── PASO 3: Recargar y ejecutar el JS del módulo ─────────────────
            // Se elimina el script anterior para forzar una re-ejecución limpia.
            const oldScript = document.getElementById(`js-${moduleName}`);
            if (oldScript) oldScript.remove();

            const script   = document.createElement('script');
            script.id      = `js-${moduleName}`;
            script.src     = `${modulePath}.js`;

            // ── CORRECCIÓN CRÍTICA: Llamar init() DESPUÉS de que el JS cargue ──
            // Sin este onload, el script se añade al DOM pero init() nunca se llama.
            script.onload = () => {
                state.currentModule = moduleName;
                // Llama a la función de inicio del módulo si está registrada
                if (window.MODULES[moduleName]?.init) {
                    window.MODULES[moduleName].init();
                } else {
                    console.warn(`[Router] El módulo "${moduleName}" no registró una función init() en window.MODULES.`);
                }
            };

            script.onerror = () => {
                console.error(`[Router] No se pudo cargar el script: ${modulePath}.js`);
            };

            document.body.appendChild(script);

        } catch (error) {
            console.error('[Router]', error);
            appContainer.innerHTML = `
                <h2 style="color:var(--clr-error);">Error 404</h2>
                <p>El módulo <strong>"${moduleName}"</strong> no está disponible o el archivo no se encontró.</p>
                <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">
                    Detalle: ${error.message}
                </p>
            `;
        }
    };

    /**
     * Actualizar el enlace activo en el Sidebar
     */
    const updateActiveNav = (route) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-route') === route) {
                link.classList.add('active');
            }
        });
    };

    /**
     * Alternar entre Modo Oscuro y Modo Claro
     */
    const toggleTheme = () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        applyTheme(state.theme);
    };

    /**
     * Aplicar el tema al documento
     */
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
        }
    };

    // ── Arrancar la aplicación cuando el DOM esté listo ────────────────────
    document.addEventListener('DOMContentLoaded', initApp);

})();
