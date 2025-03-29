export type Tour = {
  id: string
  title: string
  image: string
  locations: number
  description: string
  features: string[]
  duration: string
  difficulty: "Fácil" | "Moderado" | "Difícil" | "Extremo"
  price: string
  destination: string
  included: string[]
  notIncluded: string[]
  itinerary: {
    day: number
    title: string
    description: string
  }[]
  recommendations: string[]
}

export const tours: Tour[] = [
  {
    id: "senderismo",
    title: "Tour de Senderismo",
    image: "/placeholder.svg?height=300&width=400",
    locations: 4,
    description:
      "Explora los senderos más impresionantes a través de bosques, montañas y valles. Este tour de senderismo te llevará a través de paisajes espectaculares mientras disfrutas de la naturaleza en su estado más puro.",
    features: [
      "Rutas escénicas seleccionadas por expertos",
      "Guías locales con amplio conocimiento de la flora y fauna",
      "Grupos reducidos para una experiencia personalizada",
      "Paradas en miradores panorámicos",
    ],
    duration: "5 días / 4 noches",
    difficulty: "Moderado",
    price: "Desde €650 por persona",
    destination: "Parques Nacionales Seleccionados",
    included: [
      "Alojamiento en cabañas o campamentos de lujo",
      "Todas las comidas durante el recorrido",
      "Equipo de senderismo básico",
      "Transporte entre ubicaciones",
      "Guía especializado",
    ],
    notIncluded: ["Vuelos hacia/desde el punto de inicio", "Seguro de viaje", "Gastos personales", "Propinas"],
    itinerary: [
      {
        day: 1,
        title: "Llegada y Orientación",
        description:
          "Recepción en el punto de encuentro, introducción al equipo y briefing sobre la ruta. Caminata corta de aclimatación.",
      },
      {
        day: 2,
        title: "Bosque Ancestral",
        description:
          "Recorrido por un bosque centenario con árboles monumentales y diversa vida silvestre. Almuerzo junto a una cascada.",
      },
      {
        day: 3,
        title: "Ascenso a la Cumbre",
        description:
          "El día más desafiante con un ascenso a la cumbre principal. Vistas panorámicas de 360 grados y picnic en la cima.",
      },
      {
        day: 4,
        title: "Valle de los Lagos",
        description:
          "Descenso hacia el valle con paradas en varios lagos alpinos. Posibilidad de nadar en aguas cristalinas.",
      },
      {
        day: 5,
        title: "Regreso y Despedida",
        description:
          "Última caminata corta por la mañana y regreso al punto de partida. Comida de despedida y fin del tour.",
      },
    ],
    recommendations: [
      "Calzado de senderismo con buen agarre",
      "Ropa por capas adaptable al clima",
      "Protector solar y repelente de insectos",
      "Condición física básica",
    ],
  },
  {
    id: "rafting",
    title: "Rafting en Aguas Bravas",
    image: "/placeholder.svg?height=300&width=400",
    locations: 8,
    description:
      "Siente la adrenalina mientras navegas por rápidos emocionantes en algunos de los ríos más impresionantes. Este tour de rafting combina emoción, trabajo en equipo y paisajes espectaculares.",
    features: [
      "Descensos por ríos de diferentes niveles",
      "Equipo profesional de seguridad",
      "Instructores certificados internacionalmente",
      "Fotografías de la aventura incluidas",
    ],
    duration: "3 días / 2 noches",
    difficulty: "Difícil",
    price: "Desde €450 por persona",
    destination: "Ríos de Montaña",
    included: [
      "Alojamiento en campamentos junto al río",
      "Todas las comidas durante el tour",
      "Equipo completo de rafting",
      "Transporte desde el punto de encuentro",
      "Seguro de actividad",
    ],
    notIncluded: [
      "Transporte hasta el punto de encuentro",
      "Ropa de cambio y artículos personales",
      "Bebidas alcohólicas",
      "Propinas",
    ],
    itinerary: [
      {
        day: 1,
        title: "Introducción y Práctica",
        description:
          "Llegada al campamento base, introducción al equipo y técnicas básicas. Práctica en aguas tranquilas.",
      },
      {
        day: 2,
        title: "Descenso Intermedio",
        description:
          "Primer descenso completo por rápidos de nivel intermedio. Parada para almuerzo en una playa fluvial.",
      },
      {
        day: 3,
        title: "El Gran Descenso",
        description: "Desafío final con los rápidos más emocionantes. Celebración final y regreso al punto de partida.",
      },
    ],
    recommendations: [
      "Saber nadar es imprescindible",
      "Estar preparado para mojarse completamente",
      "Seguir siempre las instrucciones del guía",
      "Espíritu de aventura y trabajo en equipo",
    ],
  },
  {
    id: "kayak",
    title: "Kayak en Río",
    image: "/placeholder.svg?height=300&width=400",
    locations: 6,
    description:
      "Explora ríos serenos y rápidos emocionantes en tu propio kayak. Este tour te permite conectar con el agua de una manera única mientras mejoras tus habilidades de navegación.",
    features: [
      "Kayaks individuales de alta calidad",
      "Rutas adaptadas a diferentes niveles",
      "Instrucción personalizada",
      "Exploración de zonas solo accesibles por agua",
    ],
    duration: "4 días / 3 noches",
    difficulty: "Moderado",
    price: "Desde €550 por persona",
    destination: "Ríos y Lagos Seleccionados",
    included: [
      "Alojamiento en cabañas junto al agua",
      "Desayunos y almuerzos",
      "Equipo completo de kayak",
      "Clases de técnica y seguridad",
      "Guías especializados",
    ],
    notIncluded: [
      "Cenas (excepto la de bienvenida)",
      "Transporte hasta el punto de inicio",
      "Equipo personal",
      "Seguro de viaje",
    ],
    itinerary: [
      {
        day: 1,
        title: "Fundamentos del Kayak",
        description: "Introducción al equipo, técnicas básicas y prácticas de seguridad en aguas tranquilas.",
      },
      {
        day: 2,
        title: "Navegación en Lago",
        description: "Recorrido por un lago pintoresco, practicando maniobras y técnicas de remo eficiente.",
      },
      {
        day: 3,
        title: "Río de Clase I-II",
        description:
          "Primera experiencia en aguas en movimiento, aprendiendo a leer el río y navegar rápidos sencillos.",
      },
      {
        day: 4,
        title: "Aventura Final",
        description: "Descenso por un tramo más desafiante, aplicando todas las habilidades aprendidas.",
      },
    ],
    recommendations: [
      "Habilidad básica de natación",
      "Ropa que pueda mojarse y seque rápido",
      "Protección solar y gorra",
      "Actitud positiva y disposición para aprender",
    ],
  },
  {
    id: "escalada",
    title: "Escalada en Montaña",
    image: "/placeholder.svg?height=300&width=400",
    locations: 5,
    description:
      "Desafía tus límites escalando algunas de las formaciones rocosas más impresionantes. Este tour combina adrenalina, superación personal y vistas panorámicas incomparables.",
    features: [
      "Rutas de escalada para todos los niveles",
      "Equipo profesional certificado",
      "Instructores con amplia experiencia",
      "Localizaciones de escalada exclusivas",
    ],
    duration: "6 días / 5 noches",
    difficulty: "Difícil",
    price: "Desde €780 por persona",
    destination: "Paredes Rocosas Seleccionadas",
    included: [
      "Alojamiento en refugios de montaña",
      "Todas las comidas",
      "Equipo técnico de escalada",
      "Transporte entre zonas de escalada",
      "Formación técnica diaria",
    ],
    notIncluded: [
      "Vuelos al destino",
      "Equipo personal (ropa, calzado)",
      "Seguro de actividades extremas",
      "Gastos personales",
    ],
    itinerary: [
      {
        day: 1,
        title: "Introducción a la Escalada",
        description: "Llegada, presentación del equipo y primeras prácticas en rocódromo para evaluar nivel.",
      },
      {
        day: 2,
        title: "Escalada en Roca Básica",
        description: "Primera salida a roca natural, aprendiendo técnicas fundamentales en rutas sencillas.",
      },
      {
        day: 3,
        title: "Técnicas Avanzadas",
        description: "Progresión a rutas más desafiantes, aprendiendo anclajes y aseguramiento avanzado.",
      },
      {
        day: 4,
        title: "Escalada Multipitch",
        description: "Experiencia de escalada de varios largos, ascendiendo una pared de mayor altura.",
      },
      {
        day: 5,
        title: "El Gran Desafío",
        description: "Ascenso a la formación más emblemática de la zona, aplicando todas las técnicas aprendidas.",
      },
      {
        day: 6,
        title: "Consolidación y Despedida",
        description: "Última sesión de escalada y revisión de técnicas. Ceremonia de certificación y despedida.",
      },
    ],
    recommendations: [
      "Condición física adecuada, especialmente en brazos y core",
      "No tener miedo severo a las alturas",
      "Paciencia y capacidad de concentración",
      "Disposición para seguir estrictamente las normas de seguridad",
    ],
  },
  {
    id: "ciclismo",
    title: "Ciclismo de Montaña",
    image: "/ciclismo-montaña.webp",
    locations: 7,
    description:
      "Recorre senderos emocionantes y paisajes variados en dos ruedas. Este tour de ciclismo de montaña te llevará por terrenos diversos mientras disfrutas de la libertad que solo una bicicleta puede ofrecer.",
    features: [
      "Bicicletas de montaña de alta gama",
      "Rutas seleccionadas para diferentes niveles",
      "Vehículo de apoyo durante todo el recorrido",
      "Descensos emocionantes y ascensos panorámicos",
    ],
    duration: "5 días / 4 noches",
    difficulty: "Moderado",
    price: "Desde €690 por persona",
    destination: "Senderos de Montaña",
    included: [
      "Alojamiento en hoteles rurales",
      "Desayunos y almuerzos energéticos",
      "Alquiler de bicicleta y casco",
      "Transporte de equipaje entre alojamientos",
      "Guía mecánico especializado",
    ],
    notIncluded: [
      "Cenas (excepto la de bienvenida y despedida)",
      "Transporte hasta el punto de inicio",
      "Equipo personal específico",
      "Bebidas alcohólicas",
    ],
    itinerary: [
      {
        day: 1,
        title: "Introducción y Ruta Suave",
        description: "Ajuste de bicicletas, consejos técnicos y primera ruta suave para adaptarse al equipo.",
      },
      {
        day: 2,
        title: "Bosques y Valles",
        description: "Recorrido por densos bosques y valles panorámicos con algunas subidas moderadas.",
      },
      {
        day: 3,
        title: "El Gran Ascenso",
        description:
          "Día desafiante con un ascenso significativo y recompensa con vistas espectaculares y descenso emocionante.",
      },
      {
        day: 4,
        title: "Senderos Técnicos",
        description: "Ruta centrada en senderos más técnicos con obstáculos naturales y secciones de flow.",
      },
      {
        day: 5,
        title: "Ruta Final Panorámica",
        description: "Último recorrido combinando los mejores elementos de los días anteriores con final celebratorio.",
      },
    ],
    recommendations: [
      "Experiencia básica en ciclismo de montaña",
      "Condición física para pedalear varias horas",
      "Ropa adecuada para ciclismo y cambios de clima",
      "Actitud positiva ante desafíos técnicos",
    ],
  },
  {
    id: "buceo",
    title: "Buceo en Arrecife",
    image: "/buseo.webp",
    locations: 3,
    description:
      "Sumérgete en un mundo submarino lleno de color y vida. Este tour de buceo te permite explorar arrecifes de coral vibrantes y encontrarte cara a cara con fascinantes criaturas marinas.",
    features: [
      "Inmersiones en los mejores puntos de arrecife",
      "Equipo completo de buceo de calidad",
      "Instructores PADI certificados",
      "Barco exclusivo para el grupo",
    ],
    duration: "7 días / 6 noches",
    difficulty: "Moderado",
    price: "Desde €1200 por persona",
    destination: "Arrecifes Coralinos",
    included: [
      "Alojamiento en resort frente al mar",
      "Todas las comidas en régimen de pensión completa",
      "Equipo completo de buceo",
      "12 inmersiones guiadas (2 diarias)",
      "Curso de refresco para buceadores certificados",
    ],
    notIncluded: [
      "Vuelos internacionales",
      "Certificación PADI (disponible con coste adicional)",
      "Seguro de buceo",
      "Propinas y gastos personales",
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada y Orientación",
        description: "Recepción en el resort, configuración de equipos y briefing sobre el programa de buceo.",
      },
      {
        day: 2,
        title: "Inmersiones de Adaptación",
        description: "Primeras dos inmersiones en sitios sencillos para adaptarse al equipo y entorno.",
      },
      {
        day: 3,
        title: "Arrecife Interior",
        description: "Exploración del arrecife interior con gran diversidad de peces tropicales y corales blandos.",
      },
      {
        day: 4,
        title: "El Muro",
        description: "Inmersiones en un impresionante muro de coral que desciende a grandes profundidades.",
      },
      {
        day: 5,
        title: "Jardines de Coral",
        description: "Visita a los famosos jardines de coral con especies únicas y posibilidad de ver tortugas.",
      },
      {
        day: 6,
        title: "Pecios y Vida Marina Grande",
        description: "Inmersión en un pecio histórico y sitios conocidos por avistamientos de especies grandes.",
      },
      {
        day: 7,
        title: "Inmersión Final y Partida",
        description: "Última inmersión matutina, tiempo libre y preparativos para el regreso.",
      },
    ],
    recommendations: [
      "Certificación de buceo previa (mínimo Open Water)",
      "No volar 24 horas después de la última inmersión",
      "Seguro de buceo específico",
      "Cámara submarina para capturar los momentos",
    ],
  },
]

export function getTour(id: string): Tour | undefined {
  return tours.find((tour) => tour.id === id)
}

export function getAllTours(): Tour[] {
  return tours
}

