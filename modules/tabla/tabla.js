/**
 * tabla.js — Tabla Periódica Interactiva
 * ¡Bienvenido al abecedario del universo! 🌌
 * Aquí están todas las piezas de lego (elementos) con las que se construye todo lo que existe.
 */
(function () {
  "use strict";

  // 🧪 ZONA DE HACKEO: ¡El Gran Diccionario!
  // Aquí están todos los 118 elementos del universo.
  // Cada elemento tiene: Número, Símbolo, Nombre, Familia (color), Columna, Fila, Peso, Estado y una Historia.
  // ¡Busca tu elemento favorito (como el Oro o el Oxígeno) y cámbiale su historia!
  const ELEMENTS = [
    // Periodo 1
    [
      1,
      "H",
      "Hidrógeno",
      "no-metal",
      1,
      1,
      "1.008",
      "Gas",
      "El elemento más abundante y ligero del universo.",
    ],
    [
      2,
      "He",
      "Helio",
      "gas-noble",
      18,
      1,
      "4.003",
      "Gas",
      "Gas inerte ultraligero usado en refrigeración cuántica y globos.",
    ],

    // Periodo 2
    [
      3,
      "Li",
      "Litio",
      "metal-alcalino",
      1,
      2,
      "6.941",
      "Sólido",
      "Metal alcalino ultraligero fundamental en baterías recargables.",
    ],
    [
      4,
      "Be",
      "Berilio",
      "metal-alcalinoterreo",
      2,
      2,
      "9.012",
      "Sólido",
      "Metal ligero y resistente utilizado en telescopios espaciales.",
    ],
    [
      5,
      "B",
      "Boro",
      "semimetal",
      13,
      2,
      "10.811",
      "Sólido",
      "Semimetal duro clave en cristales de borosilicato y agricultura.",
    ],
    [
      6,
      "C",
      "Carbono",
      "no-metal",
      14,
      2,
      "12.011",
      "Sólido",
      "La base química de toda la vida orgánica terrestre (grafito y diamante).",
    ],
    [
      7,
      "N",
      "Nitrógeno",
      "no-metal",
      15,
      2,
      "14.007",
      "Gas",
      "Forma el 78% de la atmósfera terrestre; esencial en proteínas y ADN.",
    ],
    [
      8,
      "O",
      "Oxígeno",
      "no-metal",
      16,
      2,
      "15.999",
      "Gas",
      "Gas vital para la respiración aeróbica y procesos de combustión.",
    ],
    [
      9,
      "F",
      "Flúor",
      "halogens",
      17,
      2,
      "18.998",
      "Gas",
      "El elemento más electronegativo y reactivo de la tabla periódica.",
    ],
    [
      10,
      "Ne",
      "Neón",
      "gas-noble",
      18,
      2,
      "20.180",
      "Gas",
      "Gas noble brillante que produce luz naranja-rojiza en lámparas.",
    ],

    // Periodo 3
    [
      11,
      "Na",
      "Sodio",
      "metal-alcalino",
      1,
      3,
      "22.990",
      "Sólido",
      "Metal blando que reacciona con agua y forma la sal de cocina (NaCl).",
    ],
    [
      12,
      "Mg",
      "Magnesio",
      "metal-alcalinoterreo",
      2,
      3,
      "24.305",
      "Sólido",
      "Metal ligero esencial en la molécula de clorofila vegetal.",
    ],
    [
      13,
      "Al",
      "Aluminio",
      "metal-otro",
      13,
      3,
      "26.982",
      "Sólido",
      "Metal maleable y resistente a la corrosión; abundante en la corteza.",
    ],
    [
      14,
      "Si",
      "Silicio",
      "semimetal",
      14,
      3,
      "28.086",
      "Sólido",
      "Semiconductor pilar de la microelectrónica y la era digital.",
    ],
    [
      15,
      "P",
      "Fósforo",
      "no-metal",
      15,
      3,
      "30.974",
      "Sólido",
      "Esencial en las moléculas energéticas celulares (ATP) y los huesos.",
    ],
    [
      16,
      "S",
      "Azufre",
      "no-metal",
      16,
      3,
      "32.065",
      "Sólido",
      "No metal amarillo usado en vulcanización de neumáticos y ácido sulfúrico.",
    ],
    [
      17,
      "Cl",
      "Cloro",
      "halogens",
      17,
      3,
      "35.453",
      "Gas",
      "Halógeno desinfectante purificador del agua potable y piscinas.",
    ],
    [
      18,
      "Ar",
      "Argón",
      "gas-noble",
      18,
      3,
      "39.948",
      "Gas",
      "Gas noble inerte utilizado en soldaduras especiales e iluminación.",
    ],

    // Periodo 4
    [
      19,
      "K",
      "Potasio",
      "metal-alcalino",
      1,
      4,
      "39.098",
      "Sólido",
      "Electrolito esencial para el impulso nervioso y la función cardíaca.",
    ],
    [
      20,
      "Ca",
      "Calcio",
      "metal-alcalinoterreo",
      2,
      4,
      "40.078",
      "Sólido",
      "Componente estructural básico de huesos, dientes y conchas marinas.",
    ],
    [
      21,
      "Sc",
      "Escandio",
      "metal-transicion",
      3,
      4,
      "44.956",
      "Sólido",
      "Metal de transición usado en aleaciones aeroespaciales ligeras.",
    ],
    [
      22,
      "Ti",
      "Titanio",
      "metal-transicion",
      4,
      4,
      "47.867",
      "Sólido",
      "Metal ultrarresistente y biocompatible usado en prótesis y turbinas.",
    ],
    [
      23,
      "V",
      "Vanadio",
      "metal-transicion",
      5,
      4,
      "50.942",
      "Sólido",
      "Aumenta la tenacidad y resistencia de los aceros para herramientas.",
    ],
    [
      24,
      "Cr",
      "Cromo",
      "metal-transicion",
      6,
      4,
      "51.996",
      "Sólido",
      "Metal anticorrosivo que confiere el acabado brillante al acero inoxidable.",
    ],
    [
      25,
      "Mn",
      "Manganeso",
      "metal-transicion",
      7,
      4,
      "54.938",
      "Sólido",
      "Metal clave en la metalurgia del acero y enzimas antioxidantes.",
    ],
    [
      26,
      "Fe",
      "Hierro",
      "metal-transicion",
      8,
      4,
      "55.845",
      "Sólido",
      "El metal más empleado en la civilización; núcleo de la hemoglobina.",
    ],
    [
      27,
      "Co",
      "Cobalto",
      "metal-transicion",
      9,
      4,
      "58.933",
      "Sólido",
      "Pilar de la vitamina B12 y baterías modernas de vehículos eléctricos.",
    ],
    [
      28,
      "Ni",
      "Níquel",
      "metal-transicion",
      10,
      4,
      "58.693",
      "Sólido",
      "Metal resistente a la oxidación usado en monedas y baterías recargables.",
    ],
    [
      29,
      "Cu",
      "Cobre",
      "metal-transicion",
      11,
      4,
      "63.546",
      "Sólido",
      "Excepcional conductor de la electricidad y calor; base de tuberías y cables.",
    ],
    [
      30,
      "Zn",
      "Zinc",
      "metal-transicion",
      12,
      4,
      "65.380",
      "Sólido",
      "Metal de sacrificio usado en el galvanizado de aceros y sistema inmune.",
    ],
    [
      31,
      "Ga",
      "Galio",
      "metal-otro",
      13,
      4,
      "69.723",
      "Sólido",
      "Metal que se funde en la palma de la mano (29.7°C); usado en LEDs y láseres.",
    ],
    [
      32,
      "Ge",
      "Germanio",
      "semimetal",
      14,
      4,
      "72.630",
      "Sólido",
      "Semiconductor empleado en fibra óptica y lentes de visión nocturna.",
    ],
    [
      33,
      "As",
      "Arsénico",
      "semimetal",
      15,
      4,
      "74.922",
      "Sólido",
      "Semimetal célebre por su toxicidad y usado en dopaje de semiconductores.",
    ],
    [
      34,
      "Se",
      "Selenio",
      "no-metal",
      16,
      4,
      "78.960",
      "Sólido",
      "Fotoconductor esencial en fotocopiadoras y oligoelemento antioxidante.",
    ],
    [
      35,
      "Br",
      "Bromo",
      "halogens",
      17,
      4,
      "79.904",
      "Líquido",
      "Uno de los dos únicos elementos líquidos a temperatura ambiente; olor acre.",
    ],
    [
      36,
      "Kr",
      "Kriptón",
      "gas-noble",
      18,
      4,
      "83.798",
      "Gas",
      "Gas noble empleado en bombillas de alta velocidad y fotografía científica.",
    ],

    // Periodo 5
    [
      37,
      "Rb",
      "Rubidio",
      "metal-alcalino",
      1,
      5,
      "85.468",
      "Sólido",
      "Metal alcalino muy reactivo usado en relojes atómicos y fuegos artificiales.",
    ],
    [
      38,
      "Sr",
      "Estroncio",
      "metal-alcalinoterreo",
      2,
      5,
      "87.620",
      "Sólido",
      "Aporta el color rojo brillante característico en la pirotecnia.",
    ],
    [
      39,
      "Y",
      "Itrio",
      "metal-transicion",
      3,
      5,
      "88.906",
      "Sólido",
      "Metal de transición presente en superconductores y láseres YAG.",
    ],
    [
      40,
      "Zr",
      "Circonio",
      "metal-transicion",
      4,
      5,
      "91.224",
      "Sólido",
      "Metal extremadamente resistente al calor y la corrosión en reactores.",
    ],
    [
      41,
      "Nb",
      "Niobio",
      "metal-transicion",
      5,
      5,
      "92.906",
      "Sólido",
      "Utilizado en imanes superconductores de escáneres de resonancia magnética.",
    ],
    [
      42,
      "Mo",
      "Molibdeno",
      "metal-transicion",
      6,
      5,
      "95.950",
      "Sólido",
      "Metal con punto de fusión muy elevado usado en blindajes de alta temperatura.",
    ],
    [
      43,
      "Tc",
      "Tecnecio",
      "metal-transicion",
      7,
      5,
      "(98)",
      "Sólido",
      "El primer elemento químico producido sintéticamente; radiodiagnóstico médico.",
    ],
    [
      44,
      "Ru",
      "Rutenio",
      "metal-transicion",
      8,
      5,
      "101.07",
      "Sólido",
      "Metal del grupo del platino usado como catalizador químico de precisión.",
    ],
    [
      45,
      "Rh",
      "Rodio",
      "metal-transicion",
      9,
      5,
      "102.91",
      "Sólido",
      "Uno de los metales preciosos más caros del mundo; catalizador de vehículos.",
    ],
    [
      46,
      "Pd",
      "Paladio",
      "metal-transicion",
      10,
      5,
      "106.42",
      "Sólido",
      "Absorbe enormes volúmenes de gas hidrógeno; catalizador y joyería.",
    ],
    [
      47,
      "Ag",
      "Plata",
      "metal-transicion",
      11,
      5,
      "107.87",
      "Sólido",
      "El metal con la mayor conductividad eléctrica y térmica conocida.",
    ],
    [
      48,
      "Cd",
      "Cadmio",
      "metal-transicion",
      12,
      5,
      "112.41",
      "Sólido",
      "Metal pesado tóxico utilizado históricamente en baterías de Ni-Cd.",
    ],
    [
      49,
      "In",
      "Indio",
      "metal-otro",
      13,
      5,
      "114.82",
      "Sólido",
      "Metal maleable fundamental en pantallas táctiles (Óxido de Indio y Estaño).",
    ],
    [
      50,
      "Sn",
      "Estaño",
      "metal-otro",
      14,
      5,
      "118.71",
      "Sólido",
      "Metal maleable que evita la corrosión; base del bronce y soldaduras eléctricas.",
    ],
    [
      51,
      "Sb",
      "Antimonio",
      "semimetal",
      15,
      5,
      "121.76",
      "Sólido",
      "Semimetal usado como retardante de llama y en baterías de plomo.",
    ],
    [
      52,
      "Te",
      "Telurio",
      "semimetal",
      16,
      5,
      "127.60",
      "Sólido",
      "Utilizado en paneles solares de película delgada de teluro de cadmio.",
    ],
    [
      53,
      "I",
      "Yodo",
      "halogens",
      17,
      5,
      "126.90",
      "Sólido",
      "Sólido de vapores violetas indispensable para el funcionamiento tiroideo.",
    ],
    [
      54,
      "Xe",
      "Xenón",
      "gas-noble",
      18,
      5,
      "131.29",
      "Gas",
      "Gas noble pesado empleado en faros xenón y propulsión iónica espacial.",
    ],

    // Periodo 6
    [
      55,
      "Cs",
      "Cesio",
      "metal-alcalino",
      1,
      6,
      "132.91",
      "Sólido",
      "El estándar oficial del segundo en el Sistema Internacional (relojes atómicos).",
    ],
    [
      56,
      "Ba",
      "Bario",
      "metal-alcalinoterreo",
      2,
      6,
      "137.33",
      "Sólido",
      "Su sulfato se ingiere como medio de contraste en radiografías digestivas.",
    ],
    // 57-71 son Lantánidos (fila 8)
    [
      72,
      "Hf",
      "Hafnio",
      "metal-transicion",
      4,
      6,
      "178.49",
      "Sólido",
      "Excelente absorbente de neutrones para barras de control nuclear.",
    ],
    [
      73,
      "Ta",
      "Tántalo",
      "metal-transicion",
      5,
      6,
      "180.95",
      "Sólido",
      "Inerte y biocompatible; vital en condensadores de teléfonos móviles.",
    ],
    [
      74,
      "W",
      "Wolframio",
      "metal-transicion",
      6,
      6,
      "183.84",
      "Sólido",
      "Tiene el punto de fusión más alto de todos los metales (3422°C).",
    ],
    [
      75,
      "Re",
      "Renio",
      "metal-transicion",
      7,
      6,
      "186.21",
      "Sólido",
      "Metal ultradenso empleado en superaleaciones de turborreactores de aviación.",
    ],
    [
      76,
      "Os",
      "Osmio",
      "metal-transicion",
      8,
      6,
      "190.23",
      "Sólido",
      "El elemento natural con mayor densidad del universo conocido (22.59 g/cm³).",
    ],
    [
      77,
      "Ir",
      "Iridio",
      "metal-transicion",
      9,
      6,
      "192.22",
      "Sólido",
      "Metal extremadamente resistente a la corrosión; marca el límite K-Pg de dinosaurios.",
    ],
    [
      78,
      "Pt",
      "Platino",
      "metal-transicion",
      10,
      6,
      "195.08",
      "Sólido",
      "Metal noble de altísimo valor usado en convertidores catalíticos y quimioterapia.",
    ],
    [
      79,
      "Au",
      "Oro",
      "metal-transicion",
      11,
      6,
      "196.97",
      "Sólido",
      "Metal precioso inalterable; supremo conductor resistente a cualquier oxidación.",
    ],
    [
      80,
      "Hg",
      "Mercurio",
      "metal-transicion",
      12,
      6,
      "200.59",
      "Líquido",
      "El único metal líquido a temperatura ambiente; empleado en termómetros antiguos.",
    ],
    [
      81,
      "Tl",
      "Talio",
      "metal-otro",
      13,
      6,
      "204.38",
      "Sólido",
      "Metal sumamente venenoso que altera los procesos metabólicos del potasio.",
    ],
    [
      82,
      "Pb",
      "Plomo",
      "metal-otro",
      14,
      6,
      "207.20",
      "Sólido",
      "Metal pesado blando y denso; escudo de protección contra radiación ionizante.",
    ],
    [
      83,
      "Bi",
      "Bismuto",
      "metal-otro",
      15,
      6,
      "208.98",
      "Sólido",
      "Metal con cristales geométricos irisados; casi no tóxico a diferencia del plomo.",
    ],
    [
      84,
      "Po",
      "Polonio",
      "semimetal",
      16,
      6,
      "(209)",
      "Sólido",
      "Elemento intensamente radiactivo descubierto por Marie y Pierre Curie.",
    ],
    [
      85,
      "At",
      "Ástato",
      "halogens",
      17,
      6,
      "(210)",
      "Sólido",
      "El elemento natural más escaso de la corteza terrestre (menos de 30 gramos totales).",
    ],
    [
      86,
      "Rn",
      "Radón",
      "gas-noble",
      18,
      6,
      "(222)",
      "Gas",
      "Gas noble radiactivo natural emanado del suelo por desintegración del radio.",
    ],

    // Periodo 7
    [
      87,
      "Fr",
      "Francio",
      "metal-alcalino",
      1,
      7,
      "(223)",
      "Sólido",
      "Metal alcalino extraordinariamente inestable y radiactivo.",
    ],
    [
      88,
      "Ra",
      "Radio",
      "metal-alcalinoterreo",
      2,
      7,
      "(226)",
      "Sólido",
      "Famoso elemento luminiscente radiactivo aislado por Marie Curie.",
    ],
    // 89-103 son Actínidos (fila 9)
    [
      104,
      "Rf",
      "Rutherfordio",
      "metal-transicion",
      4,
      7,
      "(267)",
      "Sólido",
      "Elemento sintético superpesado nombrado en honor a Ernest Rutherford.",
    ],
    [
      105,
      "Db",
      "Dubnio",
      "metal-transicion",
      5,
      7,
      "(268)",
      "Sólido",
      "Elemento radiactivo sintético producido por bombardeo nuclear en Dubna.",
    ],
    [
      106,
      "Sg",
      "Seaborgio",
      "metal-transicion",
      6,
      7,
      "(269)",
      "Sólido",
      "Nombrado en honor a Glenn Seaborg, pionero en química de transuránicos.",
    ],
    [
      107,
      "Bh",
      "Bohrio",
      "metal-transicion",
      7,
      7,
      "(270)",
      "Sólido",
      "Elemento sintético nombrado en tributo al físico cuántico Niels Bohr.",
    ],
    [
      108,
      "Hs",
      "Hassio",
      "metal-transicion",
      8,
      7,
      "(269)",
      "Sólido",
      "Elemento artificial superpesado con química análoga al osmio.",
    ],
    [
      109,
      "Mt",
      "Meitnerio",
      "metal-transicion",
      9,
      7,
      "(278)",
      "Sólido",
      "Homenaje a Lise Meitner, codescubridora fundamental de la fisión nuclear.",
    ],
    [
      110,
      "Ds",
      "Darmstadtio",
      "metal-transicion",
      10,
      7,
      "(281)",
      "Sólido",
      "Sintetizado en el centro de investigación GSI en Darmstadt, Alemania.",
    ],
    [
      111,
      "Rg",
      "Roentgenio",
      "metal-transicion",
      11,
      7,
      "(282)",
      "Sólido",
      "Nombrado en honor a Wilhelm Röntgen, descubridor de los rayos X.",
    ],
    [
      112,
      "Cn",
      "Copernicio",
      "metal-transicion",
      12,
      7,
      "(285)",
      "Sólido",
      "Elemento 112 en honor al astrónomo Nicolás Copérnico.",
    ],
    [
      113,
      "Nh",
      "Nihonio",
      "metal-otro",
      13,
      7,
      "(286)",
      "Sólido",
      "Primer elemento sintetizado en Asia (Japón / Nihon en RIKEN).",
    ],
    [
      114,
      "Fl",
      "Flerovio",
      "metal-otro",
      14,
      7,
      "(289)",
      "Sólido",
      "Elemento superpesado sintetizado en el Laboratorio Flerov de Dubna.",
    ],
    [
      115,
      "Mc",
      "Moscovio",
      "metal-otro",
      15,
      7,
      "(290)",
      "Sólido",
      "Nombrado en reconocimiento al Óblast de Moscú donde se descubrió.",
    ],
    [
      116,
      "Lv",
      "Livermorio",
      "metal-otro",
      16,
      7,
      "(293)",
      "Sólido",
      "En homenaje al Laboratorio Nacional Lawrence Livermore de California.",
    ],
    [
      117,
      "Ts",
      "Tenesino",
      "halogens",
      17,
      7,
      "(294)",
      "Sólido",
      "El halógeno más pesado conocido; nombrado en honor al estado de Tennessee.",
    ],
    [
      118,
      "Og",
      "Oganesón",
      "gas-noble",
      18,
      7,
      "(294)",
      "Gas",
      "Elemento 118, el más pesado de la tabla; nombrado por Yuri Oganessian.",
    ],

    // Serie de Lantánidos (Fila 8, Columnas 4 a 18)
    [
      57,
      "La",
      "Lantano",
      "lanthanide",
      4,
      8,
      "138.91",
      "Sólido",
      "Da nombre a la serie de los lantánidos; usado en electrodos de arco de carbón.",
    ],
    [
      58,
      "Ce",
      "Cerio",
      "lanthanide",
      5,
      8,
      "140.12",
      "Sólido",
      "El lantánido más común; componente del pedernal de encendedores y pulido de vidrio.",
    ],
    [
      59,
      "Pr",
      "Praseodimio",
      "lanthanide",
      6,
      8,
      "140.91",
      "Sólido",
      "Crea pigmentos amarillos de alta pureza para vidrios y gafas de soplador.",
    ],
    [
      60,
      "Nd",
      "Neodimio",
      "lanthanide",
      7,
      8,
      "144.24",
      "Sólido",
      "Base de los imanes permanentes más potentes del planeta (NdFeB).",
    ],
    [
      61,
      "Pm",
      "Prometio",
      "lanthanide",
      8,
      8,
      "(145)",
      "Sólido",
      "El único lantánido puramente radiactivo; fuentes de energía atómica diminutas.",
    ],
    [
      62,
      "Sm",
      "Samario",
      "lanthanide",
      9,
      8,
      "150.36",
      "Sólido",
      "Utilizado en imanes de samario-cobalto resistentes a temperaturas extremas.",
    ],
    [
      63,
      "Eu",
      "Europio",
      "lanthanide",
      10,
      8,
      "151.96",
      "Sólido",
      "Elemento fosforescente crucial en las medidas de seguridad antifalsificación de billetes.",
    ],
    [
      64,
      "Gd",
      "Gadolinio",
      "lanthanide",
      11,
      8,
      "157.25",
      "Sólido",
      "Excelente contraste paramagnético para resonancias magnéticas hospitalarias.",
    ],
    [
      65,
      "Tb",
      "Terbio",
      "lanthanide",
      12,
      8,
      "158.93",
      "Sólido",
      "Productor de luminiscencia verde en pantallas de dispositivos electrónicos.",
    ],
    [
      66,
      "Dy",
      "Disprosio",
      "lanthanide",
      13,
      8,
      "162.50",
      "Sólido",
      "Evita la desmagnetización a altas temperaturas en motores de coches híbridos.",
    ],
    [
      67,
      "Ho",
      "Holmio",
      "lanthanide",
      14,
      8,
      "164.93",
      "Sólido",
      "Posee el momento magnético más alto entre todos los elementos naturales.",
    ],
    [
      68,
      "Er",
      "Erbio",
      "lanthanide",
      15,
      8,
      "167.26",
      "Sólido",
      "Amplificador de señales ópticas en cables submarinos de internet por fibra.",
    ],
    [
      69,
      "Tm",
      "Tulio",
      "lanthanide",
      16,
      8,
      "168.93",
      "Sólido",
      "El lantánido natural más escaso; utilizado en fuentes portátiles de rayos X.",
    ],
    [
      70,
      "Yb",
      "Iterbio",
      "lanthanide",
      17,
      8,
      "173.05",
      "Sólido",
      "Utilizado en relojes atómicos de red óptica de extrema precisión.",
    ],
    [
      71,
      "Lu",
      "Lutecio",
      "lanthanide",
      18,
      8,
      "174.97",
      "Sólido",
      "El más denso y duro de los lantánidos; empleado en tomografía PET médica.",
    ],

    // Serie de Actínidos (Fila 9, Columnas 4 a 18)
    [
      89,
      "Ac",
      "Actinio",
      "actinide",
      4,
      9,
      "(227)",
      "Sólido",
      "Emisor radiactivo potente; brilla en la oscuridad con una tenue luz azul.",
    ],
    [
      90,
      "Th",
      "Torio",
      "actinide",
      5,
      9,
      "232.04",
      "Sólido",
      "Alternativa prometedora al uranio para reactores de fisión nuclear más seguros.",
    ],
    [
      91,
      "Pa",
      "Protactinio",
      "actinide",
      6,
      9,
      "231.04",
      "Sólido",
      "Elemento pesado muy escaso y altamente tóxico por su intensa radiactividad.",
    ],
    [
      92,
      "U",
      "Uranio",
      "actinide",
      7,
      9,
      "238.03",
      "Sólido",
      "Combustible de centrales nucleares comerciales (isótopo U-235 fisionable).",
    ],
    [
      93,
      "Np",
      "Neptunio",
      "actinide",
      8,
      9,
      "(237)",
      "Sólido",
      "El primer elemento transuránico sintético producido en laboratorio.",
    ],
    [
      94,
      "Pu",
      "Plutonio",
      "actinide",
      9,
      9,
      "(244)",
      "Sólido",
      "Fisionable y fuente térmica en generadores de sondas espaciales lejanas (RTG).",
    ],
    [
      95,
      "Am",
      "Americio",
      "actinide",
      10,
      9,
      "(243)",
      "Sólido",
      "Presente en pequeñas dosis en los detectores domésticos de humo.",
    ],
    [
      96,
      "Cm",
      "Curio",
      "actinide",
      11,
      9,
      "(247)",
      "Sólido",
      "Nombrado en memoria de Marie y Pierre Curie; potente emisor alfa.",
    ],
    [
      97,
      "Bk",
      "Berkelio",
      "actinide",
      12,
      9,
      "(247)",
      "Sólido",
      "Sintetizado en la Universidad de California en Berkeley en 1949.",
    ],
    [
      98,
      "Cf",
      "Californio",
      "actinide",
      13,
      9,
      "(251)",
      "Sólido",
      "Emisor intensivo de neutrones usado para detectar grietas en metales y minería.",
    ],
    [
      99,
      "Es",
      "Einstenio",
      "actinide",
      14,
      9,
      "(252)",
      "Sólido",
      "Descubierto en los restos de la primera detonación termonuclear en 1952.",
    ],
    [
      100,
      "Fm",
      "Fermio",
      "actinide",
      15,
      9,
      "(257)",
      "Sólido",
      "Homenaje a Enrico Fermi, creador del primer reactor nuclear artificial.",
    ],
    [
      101,
      "Md",
      "Mendelevio",
      "actinide",
      16,
      9,
      "(258)",
      "Sólido",
      "Nombrado en honor a Dmitri Mendeléyev, creador de la tabla periódica.",
    ],
    [
      102,
      "No",
      "Nobelio",
      "actinide",
      17,
      9,
      "(259)",
      "Sólido",
      "En homenaje a Alfred Nobel, inventor de la dinamita y fundador de los premios Nobel.",
    ],
    [
      103,
      "Lr",
      "Laurencio",
      "actinide",
      18,
      9,
      "(266)",
      "Sólido",
      "Nombrado por Ernest Lawrence, pionero del ciclotrón y la física de partículas.",
    ],
  ];

  // 🎯 Variables para recordar qué estamos haciendo
  let currentFamily = "all"; // ¿Qué familia estamos viendo? Al principio "all" (todas)
  let $table, $modal; // Nuestras conexiones con la pantalla

  // 🎨 Esta es la función que dibuja toda la tabla en tu pantalla
  function render() {
    $table.innerHTML = ""; // Limpiamos la mesa antes de dibujar

    // Renderizar períodos 1 al 7
    for (let row = 1; row <= 7; row++) {
      for (let col = 1; col <= 18; col++) {
        // Marcador visual de serie de lantánidos en (col 3, fila 6)
        if (col === 3 && row === 6) {
          const marker = document.createElement("div");
          marker.className = "cell-series-marker";
          marker.innerHTML = "<span>57-71</span><small>La-Lu</small>";
          marker.title = "Lantánidos (ver serie abajo)";
          marker.style.cursor = "pointer";
          marker.addEventListener("click", () => {
            selectFamily("lanthanide");
          });
          $table.appendChild(marker);
          continue;
        }

        // Marcador visual de serie de actínidos en (col 3, fila 7)
        if (col === 3 && row === 7) {
          const marker = document.createElement("div");
          marker.className = "cell-series-marker";
          marker.innerHTML = "<span>89-103</span><small>Ac-Lr</small>";
          marker.title = "Actínidos (ver serie abajo)";
          marker.style.cursor = "pointer";
          marker.addEventListener("click", () => {
            selectFamily("actinide");
          });
          $table.appendChild(marker);
          continue;
        }

        const el = ELEMENTS.find((e) => e[4] === col && e[5] === row);
        const cell = document.createElement("div");

        if (el) {
          createCell(cell, el);
        } else {
          cell.className = "element-cell fam-placeholder";
        }

        $table.appendChild(cell);
      }
    }

    // Separador visual entre la tabla principal y las series F
    const spacer = document.createElement("div");
    spacer.className = "cell-series-spacer";
    $table.appendChild(spacer);

    // Renderizar filas 8 (Lantánidos) y 9 (Actínidos)
    for (let row = 8; row <= 9; row++) {
      for (let col = 1; col <= 18; col++) {
        const cell = document.createElement("div");
        if (col < 4) {
          // Espacio a la izquierda
          if (col === 2) {
            cell.className = "cell-series-marker";
            cell.textContent = row === 8 ? "Lantánidos" : "Actínidos";
            cell.style.gridColumn = "span 2";
            col++; // Salta la columna 3
          } else {
            cell.className = "element-cell fam-placeholder";
          }
        } else {
          const el = ELEMENTS.find((e) => e[4] === col && e[5] === row);
          if (el) {
            createCell(cell, el);
          } else {
            cell.className = "element-cell fam-placeholder";
          }
        }
        $table.appendChild(cell);
      }
    }
  }

  // 🛠️ Función para fabricar un cuadrito (celda) de un elemento
  function createCell(cell, el) {
    const [num, sym, name, family] = el;
    const show = currentFamily === "all" || currentFamily === family;
    cell.className = `element-cell fam-${family} ${show ? "" : "dimmed"}`;
    cell.tabIndex = 0;
    cell.setAttribute("role", "button");
    cell.setAttribute("aria-label", `${name}, número ${num}`);
    cell.innerHTML = `
      <span class="cell-num">${num}</span>
      <span class="cell-sym">${sym}</span>
      <span class="cell-name">${name}</span>
    `;
    cell.addEventListener("click", () => openModal(el));
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openModal(el);
    });
  }

  // 🔍 Función para cuando haces clic en un filtro (ej: "Solo Metales")
  function selectFamily(family) {
    const filters = document.getElementById("periodicFilters");
    if (!filters) return;
    filters.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.family === family);
    });
    currentFamily = family;
    render();
  }

  // 📖 ¡Abre el libro de secretos! Muestra la ventanita con la historia del elemento
  function openModal([num, sym, name, family, col, row, mass, state, desc]) {
    const familyLabels = {
      "metal-alcalino": "Metal alcalino (Grupo 1)",
      "metal-alcalinoterreo": "Metal alcalinotérreo (Grupo 2)",
      "metal-transicion": "Metal de transición (Bloque d)",
      "metal-otro": "Otro metal / Post-transición (Bloque p)",
      semimetal: "Semimetal / Metaloide",
      "no-metal": "No metal reactivo",
      halogens: "Halógeno (Grupo 17)",
      "gas-noble": "Gas noble inerte (Grupo 18)",
      lanthanide: "Lantánido (Tierras raras, Bloque f)",
      actinide: "Actínido (Radiactivo, Bloque f)",
    };

    document.getElementById("modalSymbol").textContent = sym;
    document.getElementById("modalElementTitle").textContent =
      `${name} (${sym})`;
    document.getElementById("modalElementSub").textContent =
      `Número atómico: ${num} · ${familyLabels[family] || family}`;

    document.getElementById("modalElementBody").innerHTML = `
      <div class="detail-item"><small>Masa atómica</small><strong>${mass} u</strong></div>
      <div class="detail-item"><small>Estado estándar</small><strong>${state}</strong></div>
      <div class="detail-item"><small>Grupo / Período</small><strong>Grupo ${col <= 18 ? col : "—"} · Período ${row <= 7 ? row : row === 8 ? "6 (Lantánidos)" : "7 (Actínidos)"}</strong></div>
      <div class="detail-item"><small>Clasificación</small><strong>${family.replace(/-/g, " ")}</strong></div>
      <div class="detail-item" style="grid-column:1/-1">
        <small>Propiedades y Relevancia Científica</small>
        <strong style="font-weight:400; color:var(--clr-text); line-height:1.5; margin-top:0.3rem;">${desc}</strong>
      </div>
    `;

    $modal.hidden = false;
  }

  // 🚀 Enciende el laboratorio de elementos
  function init() {
    $table = document.getElementById("periodicTable");
    $modal = document.getElementById("elementModal");
    render();

    const filters = document.getElementById("periodicFilters");
    if (filters) {
      filters.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          filters
            .querySelectorAll(".filter-btn")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          currentFamily = btn.dataset.family;
          render();
        });
      });
    }

    document
      .getElementById("closeElementModal")
      ?.addEventListener("click", () => ($modal.hidden = true));
    $modal.addEventListener("click", (e) => {
      if (e.target === $modal) $modal.hidden = true;
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$modal.hidden) $modal.hidden = true;
    });
  }

  window.MODULES.tabla = { init };
})();
