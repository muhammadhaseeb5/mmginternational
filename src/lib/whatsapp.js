export const phone = '923219658666'

export const whatsapp = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

export const catalogueMessage = (item, type) =>
  `Assalam-o-Alaikum. I am interested in the ${item.title} ${type === 'bedding' ? 'Bedding' : 'Ladies Suiting'} collection. Please share the catalogue, wholesale pricing and availability.`
