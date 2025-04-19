function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Erro ao carregar a imagem'))
    img.src = src
  })
}

export async function checkImageDimensions(
  file: File,
  expectedWidth: string,
  expectedHeight: string
) {
  const imageUrl = URL.createObjectURL(file)

  try {
    const image = await loadImage(imageUrl)
    const { width, height } = image
    if (width > parseInt(expectedWidth) || height > parseInt(expectedHeight)) {
      throw new Error(
        `A imagem deve ter o tamanho de no máximo ${expectedWidth}x${expectedHeight} pixels.`
      )
    }
  } finally {
    URL.revokeObjectURL(imageUrl)
  }
}
