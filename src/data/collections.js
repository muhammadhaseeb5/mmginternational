export const navItems = [
  ['Bedding', '/#bedding'],
  ['Ladies Suiting', '/#ladies-suiting'],
  ['Full Catalogue', '/catalogue'],
  ['Our Standard', '/#our-standard'],
  ['Contact', '/#contact'],
]

export const bedding = [
  {
    slug: 'royal-fit',
    title: 'Royal Fit',
    overline: 'Fitted comfort',
    description: 'A refined fitted-sheet collection designed for a precise finish and effortless presentation.',
    image: '/collections/royal-fit.jpg',
    position: 'center 42%',
    layout: 'lg:col-span-7',
    price: 'PKR 1,350',
    moq: '1 Box (20 pcs)',
  },
  {
    slug: 'elga-premium',
    title: 'Elga Premium',
    overline: 'Elevated essentials',
    description: 'Premium three-piece bedding with distinctive prints and a polished retail presence.',
    image: '/collections/elga-premium.jpg',
    position: 'center 43%',
    layout: 'lg:col-span-5',
    price: 'PKR 1,200',
    moq: '1 pc',
  },
  {
    slug: 'elga-signature',
    title: 'Elga Signature',
    overline: 'Signature florals',
    description: 'Statement designs, coordinated pillow covers and an unmistakably luxurious character.',
    image: '/collections/elga-signature.jpg',
    position: 'center 43%',
    layout: 'lg:col-span-5',
    price: 'PKR 1,150',
    moq: '1 pc',
  },
  {
    slug: 'checkmate',
    title: 'CheckMate',
    overline: 'Modern texture',
    description: 'A confident checkerboard weave with a sleek, contemporary bedroom aesthetic.',
    image: '/collections/checkmate.png',
    position: 'center',
    layout: 'lg:col-span-3',
    price: 'PKR 1,250',
    moq: '1 Box (20 pcs)',
  },
  {
    slug: 'demase',
    title: 'Demase',
    overline: 'Satin stripe',
    description: 'Rich colour and subtle stripe texture composed for an elegant, hotel-inspired finish.',
    image: '/collections/demase.jpeg',
    position: 'center',
    layout: 'lg:col-span-4',
    price: 'PKR 1,200 – 1,300',
    moq: '1 Box (20 pcs)',
  },
]

export const ladiesSuiting = [
  {
    slug: 'chamki-lawn',
    title: 'Chamki Lawn',
    overline: 'Shimmering lawn',
    description: 'Graceful floral detailing with a luminous finish for standout seasonal looks.',
    image: '/collections/chamki-lawn.jpeg',
    position: 'center',
    price: 'PKR 750/suit',
    moq: '1 suit',
  },
  {
    slug: '3d-digital-poly-lawn',
    title: '3D Digital Poly Lilan Lawn',
    overline: 'Dimensional print',
    description: 'Bold digital florals with depth, clarity and coordinated three-piece styling.',
    image: '/collections/3d-digital-poly-lilan-lawn.png',
    position: 'center top',
    price: 'PKR 700/suit',
    moq: '1 Volume (8 suits)',
  },
  {
    slug: 'elga-cotton-banadora-lawn',
    title: 'Elga Cotton BanaDora Lawn',
    overline: 'Cotton refinement',
    description: 'Soft cotton character paired with delicate florals and beautifully balanced colour.',
    image: '/collections/elga-cotton-banadora-lawn.jpeg',
    position: 'center top',
    price: 'PKR 1,100/suit',
    moq: '1 suit',
  },
  {
    slug: 'classic-digital-lilan-lawn',
    title: 'Classic Digital Lilan Lawn',
    overline: 'Classic elegance',
    description: 'Elegant digital florals created for timeless, versatile everyday dressing.',
    image: '/collections/classic-digital-lilan-lawn.jpeg',
    position: 'center top',
    price: 'PKR 999/suit',
    moq: '1 suit',
  },
  {
    slug: 'elga-summer-collection',
    title: 'Elga Summer Collection',
    overline: 'Summer edit',
    description: 'Fresh colour stories and expressive patterns made for the energy of summer.',
    image: '/collections/elga-summer-collection.jpg',
    position: 'center top',
    price: 'Contact for price',
    moq: 'Contact us',
  },
  {
    slug: 'snow-flake',
    title: 'Snow Flake',
    overline: 'Cool-touch style',
    description: 'A crisp floral story with rich colour contrast and an effortlessly graceful mood.',
    image: '/collections/snow-flake.jpg',
    position: 'center top',
    price: 'PKR 297/meter',
    moq: '1 meter',
  },
]

export const collectionsByType = { bedding, ladies: ladiesSuiting }

export const allCollectionItems = [
  ...bedding.map((item) => ({ ...item, type: 'bedding' })),
  ...ladiesSuiting.map((item) => ({ ...item, type: 'ladies' })),
]

export const findBySlug = (slug) => allCollectionItems.find((item) => item.slug === slug) ?? null

export const featuredList = [
  ['bedding', 'Royal Fit'],
  ['ladies', 'Chamki Lawn'],
  ['bedding', 'Elga Signature'],
  ['ladies', '3D Digital Poly Lilan Lawn'],
].map(([type, title]) => {
  const list = collectionsByType[type]
  const index = list.findIndex((entry) => entry.title === title)
  return { type, index, item: list[index] }
})

export const heroParticles = [
  { left: '8%', top: '22%', size: 5, delay: 0 },
  { left: '18%', top: '68%', size: 3, delay: 0.8 },
  { left: '32%', top: '14%', size: 4, delay: 1.6 },
  { left: '61%', top: '78%', size: 3, delay: 0.4 },
  { left: '74%', top: '30%', size: 5, delay: 2.1 },
  { left: '88%', top: '58%', size: 4, delay: 1.1 },
]
