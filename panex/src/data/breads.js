// Catálogo inicial de PANEX. Esto es lo que se sube a la tabla "products" de
// Supabase la primera vez (ver README, sección "Cargar el catálogo inicial").
//
// PARA PONER TUS PROPIAS FOTOS:
// Busca la línea "image: '...'" de cada pan y reemplaza SOLO el texto que está
// entre comillas por el link directo de tu imagen (el que copiaste con
// "Copiar dirección de la imagen"). Ejemplo:
//   image: 'https://ejemplo.com/fotos/marraqueta.jpg',
// Deja las comillas y la coma al final tal cual están.

export const categories = [
  { slug: 'tradicionales', name: 'Panes tradicionales', description: 'Los clásicos de toda la vida, de panadería de barrio' },
  { slug: 'dulces', name: 'Panes dulces', description: 'Para el desayuno o la merienda con algo dulce' },
  { slug: 'rellenos', name: 'Panes rellenos', description: 'Salteñas, empanadas y panes con relleno salado' },
  { slug: 'andinos', name: 'Panes integrales y andinos', description: 'Con quinua, maíz, trigo integral y otros granos andinos' },
  { slug: 'especiales', name: 'Panes de fiesta y horno especial', description: 'Para ocasiones especiales y pedidos grandes' },
]

export const breads = [
  // ---------- Tradicionales ----------
  {
    id: 'marraqueta',
    name: 'Marraqueta',
    category: 'tradicionales',
    price: 0.8,
    description: 'El pan boliviano por excelencia: corteza crujiente y miga suave, hecho con harina de trigo, agua, sal y levadura, horneado a leña.',
    image: 'https://i.ibb.co/k6rxrmmy/images-q-tbn-ANd9-Gc-Q88n-C5-QXHn-Fu-OTk-RSA7f-F3im2-ESKsd4e-J-l-Hf-F4m-HLZQ-s-10.jpg',
  },
  {
    id: 'pan-de-batalla',
    name: 'Pan de batalla',
    category: 'tradicionales',
    price: 0.8,
    description: 'Pan redondo de corteza dorada, primo hermano de la marraqueta, ideal para el desayuno con café o mate.',
    image: 'https://i.ibb.co/pvdCHhKY/images-q-tbn-ANd9-Gc-TPQGzpfe5-BMNx-Lv-Qd0-NU5-Moha-OKcj00-YD-E-wigdbpe-Q-s-10.jpg',
  },
  {
    id: 'sarnita',
    name: 'Sarnita paceña',
    category: 'tradicionales',
    price: 0.7,
    description: 'Panecito pequeño y crocante típico de La Paz, hecho con harina de trigo y un toque extra de horneado.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=small+bread+rolls+basket',
  },
  {
    id: 'pan-de-manteca',
    name: 'Pan de manteca',
    category: 'tradicionales',
    price: 1.2,
    description: 'Pan suave y hojaldrado hecho con manteca vegetal, harina de trigo y huevo, con un dorado parejo por fuera.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=soft+bread+rolls',
  },
  {
    id: 'cachito',
    name: 'Cachito',
    category: 'tradicionales',
    price: 2.5,
    description: 'Medialuna de masa hojaldrada rellena de jamón y queso, horneada hasta dorar.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=croissant+ham+cheese',
  },

  // ---------- Dulces ----------
  {
    id: 'rosca-de-pascua',
    name: 'Rosca de Pascua',
    category: 'dulces',
    price: 15,
    description: 'Pan dulce trenzado en forma de rosca, con anís, fruta confitada y un baño de azúcar por encima.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=sweet+bread+wreath',
  },
  {
    id: 'bizcochuelo',
    name: 'Bizcochuelo casero',
    category: 'dulces',
    price: 3,
    description: 'Pan esponjoso y ligeramente dulce, hecho con huevo, azúcar y esencia de vainilla, perfecto para acompañar el té.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=sponge+cake+bread',
  },
  {
    id: 'rollo-de-canela',
    name: 'Rollo de canela',
    category: 'dulces',
    price: 4,
    description: 'Masa enrollada con relleno de canela y azúcar morena, cubierta con un glaseado dulce.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=cinnamon+roll',
  },
  {
    id: 'pan-de-coco',
    name: 'Pan de coco',
    category: 'dulces',
    price: 3.5,
    description: 'Pan suave con relleno de coco rallado y un toque de leche condensada.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=coconut+bread',
  },
  {
    id: 'pan-de-queso-dulce',
    name: 'Pan de queso dulce',
    category: 'dulces',
    price: 3,
    description: 'Masa dulce horneada con trozos de queso fresco por dentro, un contraste típico de las panaderías bolivianas.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=sweet+cheese+bread',
  },

  // ---------- Rellenos ----------
  {
    id: 'saltena',
    name: 'Salteña',
    category: 'rellenos',
    price: 6,
    description: 'Empanada horneada de masa ligeramente dulce, rellena de guiso jugoso de pollo o carne, papa, arveja y aceituna.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=bolivian+salteña+empanada',
  },
  {
    id: 'tucumana',
    name: 'Tucumana',
    category: 'rellenos',
    price: 5,
    description: 'Empanada frita de masa crocante rellena de carne o pollo guisado con especias.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=fried+empanada',
  },
  {
    id: 'empanada-de-queso',
    name: 'Empanada de queso',
    category: 'rellenos',
    price: 4,
    description: 'Masa horneada rellena de queso fundido, sencilla y clásica para cualquier hora del día.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=cheese+empanada',
  },
  {
    id: 'cunape-relleno',
    name: 'Cuñapé relleno',
    category: 'rellenos',
    price: 4.5,
    description: 'Pancito a base de almidón de yuca y queso, con un relleno extra de queso derretido en el centro.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=cheese+bread+roll',
  },
  {
    id: 'pan-con-chicharron',
    name: 'Pan con relleno de chicharrón',
    category: 'rellenos',
    price: 7,
    description: 'Pan de batalla horneado con relleno de chicharrón de cerdo y un toque de llajua.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=pulled+pork+sandwich+bread',
  },

  // ---------- Andinos ----------
  {
    id: 'pan-de-quinua',
    name: 'Pan de quinua',
    category: 'andinos',
    price: 2,
    description: 'Pan integral elaborado con harina de trigo y quinua real boliviana, con más fibra y un sabor ligeramente tostado.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=quinoa+bread',
  },
  {
    id: 'pan-de-maiz',
    name: 'Pan de maíz (choclo)',
    category: 'andinos',
    price: 2.2,
    description: 'Pan suave y húmedo hecho con choclo molido, típico de los valles bolivianos.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=corn+bread',
  },
  {
    id: 'pan-integral-trigo',
    name: 'Pan integral de trigo',
    category: 'andinos',
    price: 2,
    description: 'Pan de miga densa hecho con harina de trigo integral, ideal para un desayuno más completo.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=whole+wheat+bread',
  },
  {
    id: 'pan-de-amaranto',
    name: 'Pan de amaranto',
    category: 'andinos',
    price: 2.5,
    description: 'Pan nutritivo con semillas de amaranto andino mezcladas en la masa, con una textura ligeramente crocante.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=seeded+grain+bread',
  },
  {
    id: 'cunape',
    name: 'Cuñapé',
    category: 'andinos',
    price: 1.5,
    description: 'Pancito de almidón de yuca y queso, sin harina de trigo, típico del oriente boliviano.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=cheese+bread+bites',
  },

  // ---------- Especiales ----------
  {
    id: 'tantawawa',
    name: 'Tantawawa',
    category: 'especiales',
    price: 8,
    description: 'Pan dulce con forma de bebé, decorado con caritas de yeso comestible, tradicional para la fiesta de Todos Santos.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=decorated+sweet+bread+figure',
  },
  {
    id: 'pan-trenzado-fiesta',
    name: 'Pan trenzado de fiesta',
    category: 'especiales',
    price: 12,
    description: 'Pan grande trenzado a mano, dorado con huevo, pensado para compartir en reuniones familiares.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=braided+bread+loaf',
  },
  {
    id: 'rosca-navidena',
    name: 'Rosca navideña',
    category: 'especiales',
    price: 18,
    description: 'Rosca festiva rellena de frutos secos y fruta confitada, decorada con azúcar glas.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=christmas+bread+wreath',
  },
  {
    id: 'pan-de-boda',
    name: 'Pan de boda por encargo',
    category: 'especiales',
    price: 25,
    description: 'Pan decorativo grande, elaborado a pedido para bodas y eventos, con decoración personalizada.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=decorative+bread+centerpiece',
  },
  {
    id: 'torta-de-pan',
    name: 'Torta de pan gigante',
    category: 'especiales',
    price: 30,
    description: 'Preparación festiva a base de pan remojado, especias, pasas y queso, horneada como una gran torta salada-dulce.',
    image: 'https://placehold.co/600x450/D9A441/3B2A21?text=bread+pudding+cake',
  },
]
