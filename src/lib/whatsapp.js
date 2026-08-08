export const phone = '923239658666'

export const whatsapp = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

export const catalogueMessage = (item, type) => {
  const typeLabel = type === 'bedding' ? 'Bedding' : 'Ladies Suiting'
  const priceLine = item.price ? `\n💰 Price: ${item.price}` : ''
  const moqLine = item.moq ? `\n📦 MOQ: ${item.moq}` : ''
  return `Assalam-o-Alaikum. I am interested in the ${item.title} ${typeLabel} collection.${priceLine}${moqLine}\n\nPlease share the catalogue, wholesale pricing and availability.`
}
