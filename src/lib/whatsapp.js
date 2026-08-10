export const phone = '923219658666'

export const whatsapp = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

export const catalogueMessage = (item, type) => {
  const category = type === 'bedding' ? ' Bedding' : type === 'ladies' ? ' Ladies Suiting' : type === 'clothes' ? ' Clothes' : ''
  return `Assalam-o-Alaikum. I am interested in the ${item.title}${category} collection. Please share the catalogue, wholesale pricing and availability.`
}
