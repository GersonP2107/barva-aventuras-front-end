export type Activity = {
  id: string
  name: string
  image: string
  description: string
  features: string[]
  duration: string
  difficulty: "Fácil" | "Moderado" | "Difícil" | "Extremo" | "Fácil a Difícil (según ruta)" | "Moderado a Difícil"
  price: string
  location: string
  included: string[]
  notIncluded: string[]
  recommendations: string[]
}

export const activities: Activity[] = [
  {
    id: "camping",
    name: "CAMPING",
    image: "/camping-actividad.webp",
    description:
      "Disfruta de una experiencia única en la naturaleza con nuestro servicio de camping premium. Desconecta de la rutina y conecta con el entorno natural en ubicaciones cuidadosamente seleccionadas por su belleza y seguridad.",
    features: [
      "Tiendas de campaña de alta calidad",
      "Áreas designadas para fogatas",
      "Guías expertos en supervivencia",
      "Experiencia gastronómica al aire libre",
    ],
    duration: "2-5 días",
    difficulty: "Moderado",
    price: "Desde €120 por persona",
    location: "Múltiples ubicaciones en parques naturales",
    included: [
      "Equipo de camping completo",
      "Comidas preparadas por chef especializado",
      "Actividades guiadas",
      "Transporte desde puntos de encuentro",
    ],
    notIncluded: ["Equipo personal (sacos de dormir, ropa)", "Bebidas alcohólicas", "Seguro de viaje"],
    recommendations: [
      "Llevar ropa adecuada para cambios de temperatura",
      "Calzado cómodo e impermeable",
      "Protector solar y repelente de insectos",
      "Linterna personal",
    ],
  },
  {
    id: "escalada",
    name: "ESCALADA",
    image: "/escalada-actividad.webp",
    description:
      "Desafía tus límites con nuestras experiencias de escalada diseñadas para todos los niveles. Desde principiantes hasta escaladores experimentados, ofrecemos rutas espectaculares con vistas incomparables y la máxima seguridad.",
    features: [
      "Rutas para todos los niveles",
      "Equipo profesional certificado",
      "Instructores certificados internacionalmente",
      "Técnicas de seguridad avanzadas",
    ],
    duration: "Medio día a día completo",
    difficulty: "Fácil",
    price: "Desde €80 por persona",
    location: "Formaciones rocosas naturales y paredes artificiales",
    included: [
      "Equipo completo de escalada",
      "Sesión de entrenamiento previa",
      "Refrigerios y agua",
      "Fotografías de la experiencia",
    ],
    notIncluded: ["Transporte al punto de escalada", "Comidas principales", "Equipo personal específico"],
    recommendations: [
      "Ropa cómoda que permita movimiento",
      "Evitar joyas o accesorios sueltos",
      "Nivel básico de condición física",
      "Actitud positiva y disposición para aprender",
    ],
  },
  {
    id: "senderismo",
    name: "SENDERISMO",
    image: "/senderistas-actividad.webp",
    description:
      "Explora paisajes impresionantes a través de nuestras rutas de senderismo cuidadosamente seleccionadas. Camina entre bosques, montañas y valles mientras descubres la flora y fauna local con guías expertos en naturaleza.",
    features: [
      "Rutas panorámicas exclusivas",
      "Guías naturalistas certificados",
      "Grupos reducidos para mejor experiencia",
      "Paradas en puntos de interés cultural y natural",
    ],
    duration: "3-8 horas",
    difficulty: "Fácil a Difícil (según ruta)",
    price: "Desde €45 por persona",
    location: "Parques nacionales y reservas naturales",
    included: [
      "Guía especializado",
      "Pack de refrigerios saludables",
      "Bastones de trekking",
      "Mapa detallado de la ruta",
    ],
    notIncluded: ["Calzado especializado", "Transporte hasta el punto de inicio", "Comidas principales"],
    recommendations: [
      "Calzado de senderismo con buen agarre",
      "Ropa por capas adaptable al clima",
      "Mochila pequeña para efectos personales",
      "Cámara para capturar los paisajes",
    ],
  },
  {
    id: "parapente",
    name: "PARAPENTE",
    image: "/parapente-actividad.webp",
    description:
      "Experimenta la libertad absoluta volando como un pájaro con nuestras experiencias de parapente. Siente la adrenalina mientras disfrutas de vistas aéreas espectaculares de paisajes que solo pueden apreciarse desde el cielo.",
    features: [
      "Vuelos en tándem con pilotos expertos",
      "Equipos de última generación",
      "Briefing completo de seguridad",
      "Opciones de vuelo acrobático disponibles",
    ],
    duration: "1-2 horas (incluyendo preparación)",
    difficulty: "Moderado",
    price: "Desde €120 por persona",
    location: "Zonas montañosas con condiciones óptimas para el vuelo",
    included: ["Equipo completo de vuelo", "Seguro de actividad", "Vídeo y fotos del vuelo", "Certificado de vuelo"],
    notIncluded: ["Transporte al punto de despegue", "Equipo personal (gafas de sol, protector solar)"],
    recommendations: [
      "Ropa cómoda y abrigada (hace frío en altura)",
      "Calzado cerrado con buen agarre",
      "No consumir alcohol antes del vuelo",
      "Informar de cualquier condición médica relevante",
    ],
  },
  {
    id: "rafting",
    name: "RAFTING",
    image: "/rafting-actividad.webp",
    description:
      "Vive la emoción de descender por rápidos de aguas bravas en nuestras experiencias de rafting. Trabaja en equipo para navegar por ríos caudalosos mientras disfrutas de la belleza natural de los cañones y valles fluviales.",
    features: [
      "Descensos por ríos de diferentes niveles",
      "Balsas profesionales para 6-8 personas",
      "Guías especializados en cada balsa",
      "Paradas para nadar en zonas seguras",
    ],
    duration: "2-5 horas",
    difficulty: "Moderado a Difícil",
    price: "Desde €65 por persona",
    location: "Ríos con rápidos de clase II a IV",
    included: [
      "Equipo completo (chaleco, casco, traje de neopreno)",
      "Briefing de seguridad y técnica",
      "Refrigerio durante la actividad",
      "Fotos de la aventura",
    ],
    notIncluded: ["Transporte al punto de inicio", "Ropa de cambio", "Toallas"],
    recommendations: [
      "Saber nadar es imprescindible",
      "Llevar bañador debajo del neopreno",
      "Calzado que pueda mojarse",
      "Actitud positiva y espíritu de equipo",
    ],
  },
  {
    id: "esqui",
    name: "BICI MONTAÑA",
    image: "/bici-montaña.webp",
    description:
      "Deslízate por las mejores pistas de esquí con nuestros paquetes diseñados para todos los niveles. Disfruta de la nieve perfecta, paisajes alpinos impresionantes y el mejor servicio para que tu experiencia de esquí sea inolvidable.",
    features: [
      "Acceso a las mejores estaciones",
      "Clases con instructores certificados",
      "Grupos por nivel de habilidad",
      "Equipo de alta calidad",
    ],
    duration: "Medio día a semana completa",
    difficulty: "Extremo",
    price: "Desde €90 por día",
    location: "Estaciones de esquí premium en montañas seleccionadas",
    included: ["Forfait para remontes", "Alquiler de equipo básico", "Seguro de pistas", "Almacenamiento de equipo"],
    notIncluded: ["Transporte a la estación", "Alojamiento", "Comidas", "Equipo especializado"],
    recommendations: [
      "Ropa térmica e impermeable",
      "Protección solar (la nieve refleja los rayos UV)",
      "Guantes y gorro impermeables",
      "Condición física básica",
    ],
  },
]

export function getActivity(id: string): Activity | undefined {
  return activities.find((activity) => activity.id === id)
}

export function getAllActivities(): Activity[] {
  return activities
}

