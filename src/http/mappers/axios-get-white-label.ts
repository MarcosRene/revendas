interface Colors {
  nome: string
  red: number
  green: number
  blue: number
  tipo: string
  descricao: string
}

interface SystemResponse {
  id: number
  tipo: string
  descricao: string
  caminhoIcone: string
  urlIcone: string
}

export interface GetWhiteLabelResponse {
  nome: string
  telefone: string
  celular: string
  instagram: string
  caminhoLogoBranca: string
  urlLogoBranca: string
  caminhoLogoColorida: string
  urlLogoColorida: string
  sistemas: SystemResponse[]
  cores: Colors[]
}

interface SystemRequest {
  id: number
  description: string
  icon: string
  pathIcon: string
}

interface ColorRequest {
  color: string
  type: string
}

export interface UpdateWhiteLabelRequest {
  pathWhiteLogo: string
  pathFullColorLogo: string
  urlWhiteLogo: string
  urlFullColorLogo: string
  systems: SystemRequest[]
  colors: ColorRequest[]
}

export class AxiosGetWhiteLabelMapper {
  static toDomain(data: GetWhiteLabelResponse) {
    return {
      name: data.nome,
      phone: data.telefone,
      cell: data.celular,
      instagram: data.instagram,
      pathWhiteLogo: data.caminhoLogoBranca,
      pathFullColorLogo: data.caminhoLogoColorida,
      urlWhiteLogo: data.urlLogoBranca,
      urlFullColorLogo: data.urlLogoColorida,
      systems: data.sistemas.map((system) => ({
        id: system.id,
        title: system.tipo,
        description: system.descricao,
        icon: system.urlIcone,
        pathIcon: system.caminhoIcone,
      })),
      colors: data.cores.map((color) => ({
        name: color.nome,
        type: color.tipo,
        color: `rgba(${color.red}, ${color.green}, ${color.blue}, 1)`,
        description: color.descricao,
      })),
    }
  }

  static toPersistence(data: UpdateWhiteLabelRequest) {
    return {
      caminhoLogoBranca: data.pathWhiteLogo,
      caminhoLogoColorida: data.pathFullColorLogo,
      urlLogoBranca: data.urlWhiteLogo,
      urlLogoColorida: data.urlFullColorLogo,
      sistemas: data.systems.map((system) => ({
        id: system.id,
        descricao: system.description,
        urlIcone: system.icon,
        caminhoIcone: system.pathIcon,
      })),
      cores: data.colors.map(({ color, type }) => {
        const rgba = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)

        if (!rgba) return { red: 0, green: 0, blue: 0 }

        const [, red, green, blue] = rgba

        return {
          red: parseInt(red, 10),
          green: parseInt(green, 10),
          blue: parseInt(blue, 10),
          tipo: type,
        }
      }),
    }
  }
}
