export type BlogPost = {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  author: string
  date: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "sustainable-travel",
    title: "Viajes Sostenibles: Aventuras Ecológicas",
    excerpt: "Descubre cómo minimizar tu impacto ambiental mientras exploras el mundo.",
    content: `
      <p>Los viajes sostenibles son cada vez más importantes a medida que tomamos conciencia de nuestro impacto en el medio ambiente. Aquí hay algunas formas de hacer que tus aventuras sean más ecológicas:</p>
      
      <h3>Elige Alojamientos Ecológicos</h3>
      <p>Busca hoteles y albergues que tengan certificaciones ambientales o prácticas claras de sostenibilidad. Muchos lugares ahora utilizan energía renovable, tienen sistemas de conservación de agua y minimizan los residuos.</p>
      
      <h3>Empaca Ligero y Correcto</h3>
      <p>Lleva contigo artículos reutilizables como botellas de agua, bolsas de compras y utensilios. Cuanto más ligero sea tu equipaje, menos combustible se necesitará para transportarlo, especialmente en vuelos.</p>
      
      <h3>Utiliza Transporte Público</h3>
      <p>Siempre que sea posible, utiliza trenes, autobuses o transporte compartido en lugar de coches privados o taxis. No solo es mejor para el medio ambiente, sino que a menudo proporciona una experiencia local más auténtica.</p>
      
      <h3>Apoya a las Comunidades Locales</h3>
      <p>Compra recuerdos a artesanos locales, come en restaurantes de propiedad local y reserva tours con guías locales. Esto ayuda a garantizar que tus dólares turísticos beneficien a las comunidades que visitas.</p>
      
      <h3>Respeta la Vida Silvestre y las Áreas Naturales</h3>
      <p>Mantente en los senderos designados, mantén una distancia segura de la vida silvestre y nunca alimentes a los animales salvajes. Sigue el principio de "no dejar rastro" llevándote toda la basura contigo.</p>
      
      <p>Al hacer estos pequeños cambios en la forma en que viajas, puedes reducir significativamente tu huella ambiental mientras sigues disfrutando de increíbles aventuras alrededor del mundo.</p>
    `,
    category: "Aventura",
    image: "/placeholder.svg?height=400&width=600",
    author: "Elena Rodríguez",
    date: "15 de marzo, 2023",
    readTime: "5 min de lectura",
  },
  {
    id: "family-friendly-destinations",
    title: "Destinos de Aventura para Familias",
    excerpt: "Los mejores lugares para viajar con niños que tanto padres como hijos disfrutarán.",
    content: `
      <p>Planificar una aventura familiar puede ser un desafío, pero estos destinos ofrecen actividades que mantendrán felices a todos, desde niños pequeños hasta adolescentes y padres:</p>
      
      <h3>Costa Rica</h3>
      <p>Con su combinación de playas, selvas tropicales y vida silvestre, Costa Rica es perfecta para familias. A los niños les encantará avistar monos y perezosos, hacer tirolesa a través del dosel (opciones apropiadas para cada edad disponibles) y nadar en aguas oceánicas cálidas.</p>
      
      <h3>Japón</h3>
      <p>Japón ofrece una fascinante mezcla de tradiciones antiguas y tecnología futurista. Visita Disneyland de Tokio, explora castillos de samuráis, viaja en el tren bala y prueba actividades prácticas como hacer sushi u origami.</p>
      
      <h3>Islandia</h3>
      <p>Los paisajes de otro mundo de Islandia son como patios de recreo naturales. Las familias pueden caminar hasta cascadas, ver erupciones de géiseres, bañarse en aguas termales e incluso observar ballenas. En invierno, las auroras boreales añaden magia a la experiencia.</p>
      
      <h3>Nueva Zelanda</h3>
      <p>Desde Hobbiton hasta cuevas de luciérnagas, Nueva Zelanda parece un mundo de fantasía cobrado vida. El país ofrece muchos senderos de senderismo suaves, estancias en granjas donde los niños pueden alimentar animales y experiencias culturales maoríes.</p>
      
      <h3>Consejos para Aventuras Familiares</h3>
      <p>No importa a dónde vayas, recuerda tomarte las cosas con calma con mucho tiempo de descanso, llevar snacks familiares y hacer participar a los niños en el proceso de planificación para que estén entusiasmados con el viaje.</p>
      
      <p>Con el destino y la preparación adecuados, viajar de aventura con niños puede crear recuerdos familiares inolvidables.</p>
    `,
    category: "Vacaciones Familiares",
    image: "/placeholder.svg?height=400&width=600",
    author: "Marcos Jiménez",
    date: "28 de febrero, 2023",
    readTime: "6 min de lectura",
  },
  {
    id: "scenic-road-trips",
    title: "Elige Viajes por Carretera Escénicos en Lugar de Vuelos",
    excerpt: "Descubre joyas ocultas y vistas impresionantes cuando viajas por carretera.",
    content: `
      <p>Aunque volar puede llevarte a tu destino más rápido, los viajes por carretera ofrecen un viaje lleno de descubrimientos inesperados y paisajes impresionantes. Aquí están algunas de las rutas más escénicas del mundo:</p>
      
      <h3>Pacific Coast Highway, California</h3>
      <p>Esta ruta icónica a lo largo de la costa de California ofrece impresionantes vistas al océano, con paradas en encantadores pueblos costeros, bosques de secuoyas y hermosas playas. No te pierdas Big Sur, donde las montañas se encuentran con el mar de manera dramática.</p>
      
      <h3>Great Ocean Road, Australia</h3>
      <p>Este tramo de 243 kilómetros a lo largo de la costa sureste de Australia presenta las famosas formaciones de piedra caliza de los Doce Apóstoles, exuberantes selvas tropicales y oportunidades para avistar koalas en la naturaleza.</p>
      
      <h3>Ring Road, Islandia</h3>
      <p>Rodeando toda la isla, la Ring Road de Islandia te lleva junto a volcanes, glaciares, aguas termales y cascadas. El paisaje en constante cambio hace que cada hora de conducción sea una nueva experiencia.</p>
      
      <h3>Cabot Trail, Canadá</h3>
      <p>Este circuito de 298 kilómetros en la Isla de Cabo Bretón en Nueva Escocia serpentea a través de las tierras altas, ofreciendo espectaculares vistas al océano, especialmente impresionantes durante la temporada de follaje de otoño.</p>
      
      <h3>Consejos para Viajes por Carretera</h3>
      <p>Planifica tu ruta pero sé lo suficientemente flexible para tomar desvíos. Prepara una buena lista de reproducción, descarga mapas sin conexión e investiga miradores y restaurantes locales con antelación. Lo más importante, recuerda que el viaje en sí es parte de la aventura.</p>
      
      <p>Al elegir la ruta escénica, crearás recuerdos no solo en tu destino, sino a lo largo de cada kilómetro del camino.</p>
    `,
    category: "Consejos de Viaje",
    image: "/placeholder.svg?height=400&width=600",
    author: "Sara Williams",
    date: "12 de enero, 2023",
    readTime: "4 min de lectura",
  },
  {
    id: "backpacking-first-timers",
    title: "Mochilero Para Principiantes",
    excerpt: "Consejos esenciales y recomendaciones de equipo para tu primer viaje de mochilero.",
    content: `
      <p>Viajar como mochilero ofrece libertad, aventura y una oportunidad para conectar con la naturaleza. Si eres nuevo en el mochilero, esto es lo que necesitas saber antes de salir al sendero:</p>
      
      <h3>Equipo Esencial</h3>
      <p>Comienza con los "cuatro grandes": una mochila (50-65 litros es buena para principiantes), una tienda de campaña ligera, un saco de dormir adecuado para el clima de tu destino y una colchoneta para comodidad y aislamiento. Añade un sistema de filtración de agua, una linterna frontal, una multiherramienta, un botiquín de primeros auxilios y capas de ropa apropiadas.</p>
      
      <h3>Planificando Tu Viaje</h3>
      <p>Para tu primer viaje, elige un sendero popular con caminos bien marcados y campamentos establecidos. Planifica distancias más cortas de lo que crees que puedes manejar: 8-10 kilómetros por día es suficiente para principiantes, especialmente en terreno montañoso.</p>
      
      <h3>Comida y Agua</h3>
      <p>Los alimentos ligeros y altos en calorías son ideales. Piensa en avena, mezcla de frutos secos, cecina, fideos instantáneos y comidas deshidratadas. Lleva siempre más agua de la que crees que necesitarás y conoce dónde están las fuentes de agua a lo largo de tu ruta.</p>
      
      <h3>Consideraciones de Seguridad</h3>
      <p>Informa a alguien sobre tu itinerario y fecha de regreso esperada. Aprende habilidades básicas de navegación y lleva un mapa y una brújula (y sabe cómo usarlos), incluso si tienes GPS. Investiga posibles encuentros con vida silvestre en tu área y cómo manejarlos.</p>
      
      <h3>No Dejar Rastro</h3>
      <p>Llévate toda la basura, mantente en los senderos establecidos y sigue las prácticas adecuadas de eliminación de desechos. Respeta la vida silvestre observando desde la distancia y almacenando adecuadamente tu comida.</p>
      
      <p>Con la preparación adecuada, tu primer viaje de mochilero puede ser el comienzo de una pasión de por vida por la aventura en la naturaleza.</p>
    `,
    category: "Mochilero",
    image: "/placeholder.svg?height=400&width=600",
    author: "Alejandro Chen",
    date: "5 de abril, 2023",
    readTime: "7 min de lectura",
  },
  {
    id: "food-tasting-tours",
    title: "Tours de Degustación Gastronómica Alrededor del Mundo",
    excerpt: "Explora delicias culinarias de diferentes culturas y regiones.",
    content: `
      <p>Para muchos viajeros, experimentar la cocina de un destino es tan importante como ver sus lugares de interés. Los tours gastronómicos ofrecen una deliciosa manera de entender la cultura y tradiciones locales. Aquí están algunos de los mejores destinos culinarios:</p>
      
      <h3>Tailandia</h3>
      <p>Desde los puestos de comida callejera de Bangkok hasta las clases de cocina en Chiang Mai, Tailandia ofrece una explosión de sabores. No te pierdas probar el auténtico pad thai, curry verde, arroz pegajoso con mango y las innumerables variedades de frutas tropicales.</p>
      
      <h3>Italia</h3>
      <p>Cada región italiana tiene sus propias tradiciones culinarias. Recorre la Toscana por su vino y cocina rústica, Nápoles por la mejor pizza del mundo, Bolonia por pasta fresca y Sicilia por mariscos y cannoli. Las clases de cocina están ampliamente disponibles y son muy recomendables.</p>
      
      <h3>México</h3>
      <p>La cocina mexicana varía dramáticamente según la región. En Oaxaca, prueba salsas mole y chapulines (saltamontes); en Yucatán, prueba cochinita pibil; y en la Ciudad de México, explora la vasta escena de comida callejera con tacos, tamales y elote (maíz a la parrilla).</p>
      
      <h3>Japón</h3>
      <p>Más allá del sushi, Japón ofrece ramen, tempura, okonomiyaki y un sinfín de especialidades regionales. Considera un tour por una fábrica de sake, visita el Mercado Exterior de Tsukiji en Tokio o prueba el kaiseki (comida tradicional de varios platos) en Kioto.</p>
      
      <h3>Consejos para Tours Gastronómicos</h3>
      <p>Investiga la seguridad alimentaria en tu destino y ve con hambre pero no famélico. Tómate tu tiempo a través de múltiples degustaciones y no tengas miedo de probar platos desconocidos, ¡eso es parte de la aventura!</p>
      
      <p>El turismo culinario crea algunos de los recuerdos de viaje más vívidos, conectándote con la cultura local a través de todos tus sentidos.</p>
    `,
    category: "Gastronomía",
    image: "/placeholder.svg?height=400&width=600",
    author: "María González",
    date: "20 de mayo, 2023",
    readTime: "5 min de lectura",
  },
  {
    id: "connect-with-natives",
    title: "Conecta Con Los Nativos",
    excerpt: "Cómo experimentar auténticamente las culturas locales durante tus viajes.",
    content: `
      <p>Conectar con la gente local transforma el turismo ordinario en un intercambio cultural significativo. Aquí te mostramos cómo crear interacciones auténticas durante tus viajes:</p>
      
      <h3>Aprende Frases Básicas del Idioma</h3>
      <p>Incluso dominar solo "hola", "gracias" y "por favor" en el idioma local muestra respeto y abre puertas. Los locales aprecian el esfuerzo, incluso si tu pronunciación no es perfecta.</p>
      
      <h3>Alójate en Alojamientos Basados en la Comunidad</h3>
      <p>Elige casas de familia, albergues administrados por la comunidad o B&B de propiedad local en lugar de cadenas hoteleras internacionales. Estos proporcionan oportunidades naturales para interactuar con residentes y a menudo incluyen comidas caseras.</p>
      
      <h3>Participa en Talleres y Clases</h3>
      <p>Inscríbete en clases de cocina, talleres de artesanía, lecciones de baile o experiencias agrícolas dirigidas por expertos locales. Estas actividades prácticas facilitan el intercambio cultural mientras apoyan los medios de vida locales.</p>
      
      <h3>Visita Mercados y Espacios Comunitarios</h3>
      <p>Los mercados locales, centros comunitarios, parques públicos y festivales de barrio son donde ocurre la vida cotidiana. Pasa tiempo en estos espacios, observa respetuosamente y está abierto a conversaciones.</p>
      
      <h3>Practica la Fotografía Ética</h3>
      <p>Siempre pide permiso antes de fotografiar a personas, especialmente en comunidades indígenas. Mejor aún, interactúa primero y deja que la fotografía sea secundaria a la conexión humana.</p>
      
      <h3>Escucha Más de lo que Hablas</h3>
      <p>Aborda el intercambio cultural con humildad y curiosidad. Haz preguntas abiertas sobre la vida local y las tradiciones, luego escucha atentamente las respuestas.</p>
      
      <p>Al priorizar conexiones genuinas sobre listas de verificación turísticas, obtendrás conocimientos más profundos sobre los lugares que visitas y crearás recuerdos duraderos de entendimiento cultural.</p>
    `,
    category: "Inmersión Cultural",
    image: "/placeholder.svg?height=400&width=600",
    author: "David Okafor",
    date: "8 de junio, 2023",
    readTime: "6 min de lectura",
  },
]

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id)
}

export function getRecentBlogPosts(count = 3): BlogPost[] {
  return blogPosts.slice(0, count)
}

export function getRelatedBlogPosts(currentPostId: string, count = 2): BlogPost[] {
  const currentPost = getBlogPost(currentPostId)
  if (!currentPost) return []

  return blogPosts.filter((post) => post.id !== currentPostId && post.category === currentPost.category).slice(0, count)
}

