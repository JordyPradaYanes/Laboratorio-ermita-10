/**
 * Router y Lógica Global - Portal de Ciencias
 * Arquitectura SPA con Vanilla JS
 */

(() => {
    // Referencias al DOM
    const appContainer = document.getElementById('app');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Estado global
    const state = {
        theme: localStorage.getItem('theme') || 'light'
    };

    /**
     * Inicialización de la aplicación
     */
    const initApp = () => {
        applyTheme(state.theme);
        setupEventListeners();
        handleRouting(); // Cargar la ruta inicial
    };

    /**
     * Configuración de Event Listeners Globales
     */
    const setupEventListeners = () => {
        // Escuchar cambios en la URL (Hash)
        window.addEventListener('hashchange', handleRouting);

        // Botón de Modo Oscuro
        themeToggleBtn.addEventListener('click', toggleTheme);
    };

    /**
     * Manejador de Rutas
     */
    const handleRouting = async () => {
        // Obtener la ruta actual desde el hash (ej. "#/quimica" -> "/quimica")
        let route = window.location.hash.slice(1) || '/';

        // Actualizar UI del menú activo
        updateActiveNav(route);

        // Renderizar vista correspondiente
        if (route === '/') {
            appContainer.innerHTML = `
                <h1>Bienvenido al Portal de Ciencias</h1>
                <p>Selecciona un módulo en el menú lateral para comenzar a aprender.</p>
            `;
        } else {
            // Cargar el módulo dinámicamente
            await loadModule(route);
        }
    };

    /**
     * Cargar un Módulo HTML, CSS y JS dinámicamente
     * @param {string} route - Ruta del módulo
     */
    const loadModule = async (route) => {
        const moduleName = route.replace('/', '');
        const modulePath = `modules/${moduleName}/${moduleName}`;

        try {
            // Mostrar estado de carga (OPCIONAL)
            appContainer.innerHTML = `<p>Cargando módulo ${moduleName}...</p>`;

            // 1. Obtener el HTML del módulo
            const response = await fetch(`${modulePath}.html`);
            if (!response.ok) throw new Error('Módulo no encontrado');
            const html = await response.text();
            
            // 2. Inyectar HTML
            appContainer.innerHTML = html;

            // 3. Cargar CSS del módulo si no existe
            if (!document.getElementById(`css-${moduleName}`)) {
                const link = document.createElement('link');
                link.id = `css-${moduleName}`;
                link.rel = 'stylesheet';
                link.href = `${modulePath}.css`;
                document.head.appendChild(link);
            }

            // 4. Cargar y ejecutar JS del módulo
            const oldScript = document.getElementById(`js-${moduleName}`);
            if (oldScript) {
                oldScript.remove();
            }
            
            const script = document.createElement('script');
            script.id = `js-${moduleName}`;
            script.src = `${modulePath}.js`;
            document.body.appendChild(script);

        } catch (error) {
            console.error(error);
            appContainer.innerHTML = `
                <h2>Error 404</h2>
                <p>El módulo "${moduleName}" aún no está disponible o ocurrió un error al cargarlo.</p>
            `;
        }
    };

    /**
     * Actualizar enlace activo en el Sidebar
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
     * Alternar Modo Oscuro / Claro
     */
    const toggleTheme = () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        applyTheme(state.theme);
    };

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
        }
    };

    // Iniciar aplicación al cargar el DOM
    document.addEventListener('DOMContentLoaded', initApp);

})();
