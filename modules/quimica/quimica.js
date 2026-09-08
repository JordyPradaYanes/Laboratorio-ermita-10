/**
 * quimica.js — Laboratorio de Reacciones
 * ¡Bienvenido al laboratorio virtual! 🧪
 * Combina reactivos para descubrir qué pasa.
 */
(function () {
    'use strict';

    // 🧪 ZONA DE HACKEO: Reactivos disponibles
    // // 📌 EDITAR AQUÍ: Agrega nuevos reactivos o cambia sus colores
    const REACTIVOS = [
        { id: 'Na', nombre: 'Sodio', color: '#e2e8f0', symbol: 'Na' },
        { id: 'Cl2', nombre: 'Cloro', color: '#bbf7d0', symbol: 'Cl₂' },
        { id: 'H2', nombre: 'Hidrógeno', color: '#fef08a', symbol: 'H₂' },
        { id: 'O2', nombre: 'Oxígeno', color: '#bfdbfe', symbol: 'O₂' },
        { id: 'HCl', nombre: 'Ácido Clorhídrico', color: '#fca5a5', symbol: 'HCl' },
        { id: 'NaOH', nombre: 'Hidróxido de Sodio', color: '#d9f99d', symbol: 'NaOH' },
    ];

    // 💥 ZONA DE HACKEO: Base de datos de reacciones
    // // 📌 EDITAR AQUÍ: Define cómo reaccionan las sustancias entre sí.
    // El orden de r1 y r2 no importa, el código busca la combinación en cualquier orden.
    const REACCIONES = [
        {
            r1: 'Na', r2: 'Cl2',
            eq: '2Na + Cl₂ ➔ 2NaCl',
            type: 'Síntesis',
            product: 'Cloruro de Sodio (Sal de mesa)',
            desc: 'Una reacción muy exotérmica. El sodio metálico reacciona violentamente con el gas cloro para formar sal de mesa común.'
        },
        {
            r1: 'H2', r2: 'O2',
            eq: '2H₂ + O₂ ➔ 2H₂O',
            type: 'Síntesis / Combustión',
            product: 'Agua',
            desc: '¡BOOM! El hidrógeno gaseoso es altamente inflamable y al reaccionar con oxígeno produce una explosión, formando vapor de agua.'
        },
        {
            r1: 'HCl', r2: 'NaOH',
            eq: 'HCl + NaOH ➔ NaCl + H₂O',
            type: 'Neutralización',
            product: 'Sal y Agua',
            desc: 'Un ácido fuerte (HCl) se mezcla con una base fuerte (NaOH). Se neutralizan entre sí formando agua inofensiva y sal.'
        },
        // Añade tus propias reacciones químicas aquí
    ];

    // Estado del módulo
    let sel1 = null;
    let sel2 = null;

    // Referencias al DOM
    let $grid1, $grid2, $mixBtn, $resetBtn;
    let $beakerLiq1, $beakerLbl1, $beaker1;
    let $beakerLiq2, $beakerLbl2, $beaker2;
    let $resultPanel, $noReactionPanel;

    function renderButtons() {
        $grid1.innerHTML = '';
        $grid2.innerHTML = '';

        REACTIVOS.forEach(r => {
            // Botones para el reactivo 1
            const btn1 = document.createElement('button');
            btn1.className = 'chem-btn';
            btn1.textContent = r.symbol;
            btn1.title = r.nombre;
            btn1.addEventListener('click', () => selectReactive(1, r, btn1));
            $grid1.appendChild(btn1);

            // Botones para el reactivo 2
            const btn2 = document.createElement('button');
            btn2.className = 'chem-btn';
            btn2.textContent = r.symbol;
            btn2.title = r.nombre;
            btn2.addEventListener('click', () => selectReactive(2, r, btn2));
            $grid2.appendChild(btn2);
        });
    }

    function selectReactive(beakerNum, reactive, btnEl) {
        // Deseleccionar botones previos en esa cuadrícula
        const grid = beakerNum === 1 ? $grid1 : $grid2;
        grid.querySelectorAll('.chem-btn').forEach(b => b.classList.remove('selected'));
        btnEl.classList.add('selected');

        // Actualizar el vaso de precipitados
        const liq = beakerNum === 1 ? $beakerLiq1 : $beakerLiq2;
        const lbl = beakerNum === 1 ? $beakerLbl1 : $beakerLbl2;
        const beaker = beakerNum === 1 ? $beaker1 : $beaker2;

        liq.style.backgroundColor = reactive.color;
        lbl.textContent = reactive.symbol;
        beaker.classList.add('has-liquid');

        // Guardar selección
        if (beakerNum === 1) sel1 = reactive.id;
        if (beakerNum === 2) sel2 = reactive.id;

        // Habilitar botón de mezclar si ambos están seleccionados
        if (sel1 && sel2) {
            $mixBtn.disabled = false;
        }

        // Ocultar resultados previos si cambian la selección
        hideResults();
    }

    function mix() {
        if (!sel1 || !sel2) return;

        // Buscar reacción (en cualquier orden)
        const reaction = REACCIONES.find(r => 
            (r.r1 === sel1 && r.r2 === sel2) || (r.r1 === sel2 && r.r2 === sel1)
        );

        hideResults();
        $resetBtn.style.display = 'inline-flex';
        $mixBtn.style.display = 'none';

        if (reaction) {
            document.getElementById('reactionEquation').textContent = reaction.eq;
            document.getElementById('reactionTypeBadge').textContent = reaction.type;
            document.getElementById('reactionProduct').textContent = reaction.product;
            document.getElementById('reactionDescription').textContent = reaction.desc;
            $resultPanel.hidden = false;
        } else {
            $noReactionPanel.hidden = false;
        }
    }

    function hideResults() {
        if($resultPanel) $resultPanel.hidden = true;
        if($noReactionPanel) $noReactionPanel.hidden = true;
    }

    function reset() {
        sel1 = null;
        sel2 = null;
        
        $beaker1.classList.remove('has-liquid');
        $beaker2.classList.remove('has-liquid');
        $beakerLbl1.textContent = '?';
        $beakerLbl2.textContent = '?';
        
        $grid1.querySelectorAll('.chem-btn').forEach(b => b.classList.remove('selected'));
        $grid2.querySelectorAll('.chem-btn').forEach(b => b.classList.remove('selected'));

        $mixBtn.disabled = true;
        $mixBtn.style.display = 'inline-flex';
        $resetBtn.style.display = 'none';
        hideResults();
    }

    function init() {
        $grid1 = document.getElementById('reactiveButtons1');
        $grid2 = document.getElementById('reactiveButtons2');
        $mixBtn = document.getElementById('mixBtn');
        $resetBtn = document.getElementById('resetBtn');
        
        $beakerLiq1 = document.getElementById('beakerLiquid1');
        $beakerLbl1 = document.getElementById('beakerLabel1');
        $beaker1 = document.getElementById('beaker1');
        
        $beakerLiq2 = document.getElementById('beakerLiquid2');
        $beakerLbl2 = document.getElementById('beakerLabel2');
        $beaker2 = document.getElementById('beaker2');

        $resultPanel = document.getElementById('reactionResult');
        $noReactionPanel = document.getElementById('noReaction');

        if (!$grid1) return; // Salvaguarda si el HTML no cargó

        renderButtons();
        
        $mixBtn.addEventListener('click', mix);
        $resetBtn.addEventListener('click', reset);
    }

    // Registrar módulo
    window.MODULES.quimica = { init };
})();
