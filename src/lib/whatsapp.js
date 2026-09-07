export const phone = '923219658666'
export const siteUrl = 'https://mmginternational.store'

export const whatsapp = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

const typeLabels = {
  bedding: 'Bedding',
  ladies: 'Ladies Suiting',
  curtains: 'Curtains',
  clothes: 'Clothes Collections',
}

const absoluteImageUrl = (image) => {
  try {
    return new URL(image, siteUrl).href
  } catch {
    return image
  }
}

export const designPriceMessage = (item, type, image, design) => [
  'Assalam-o-Alaikum. Please share the wholesale price and availability for this design.',
  '',
  `Collection: ${item.title}`,
  `Category: ${typeLabels[type] || 'Textiles'}`,
  `Design: ${design || item.title}`,
  `Image: ${absoluteImageUrl(image)}`,
].join('\n')

export const catalogueMessage = (item, type) => {
  if (item.productDetails) {
    const { heading, icon, items } = item.productDetails
    return [
      'Assalam-o-Alaikum. I am interested in this collection:',
      '',
      `${icon} *${heading}* ${icon}`,
      ...items.map((detail) => `✔ ${detail}`),
      '',
      'Please share the wholesale price and current availability.',
    ].join('\n')
  }

  const category = type === 'bedding' ? ' Bedding' : type === 'ladies' ? ' Ladies Suiting' : type === 'clothes' ? ' Clothes' : ''
  return `Assalam-o-Alaikum. I am interested in the ${item.title}${category} collection. Please share the catalogue, wholesale pricing and availability.`
}
