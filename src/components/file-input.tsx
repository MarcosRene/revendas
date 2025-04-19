import {
  Box,
  type BoxProps,
  Image as ImageChakra,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { type ChangeEvent, forwardRef, useMemo, useState } from 'react'
import { FiUploadCloud } from 'react-icons/fi'
import { LuPencil } from 'react-icons/lu'

import { api } from '@/lib/axios'
import { errorHandler } from '@/utils/error-handler'
import { checkImageDimensions } from '@/utils/image-dimension'

import { TextInput } from './text-input'
import { Button } from './ui/button'
import { toaster } from './ui/toaster'

type FileResponse = {
  nome: string
  base64: string
  caminho: string
  urlPublica: string
}

interface FileInputProps extends BoxProps {
  accept?: string
  fileType?: string
  size?: string
  imageUrl?: string
  onSelectedFile?: (data: { url: string; path: string }) => void
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      id = Math.random().toString(),
      accept = 'image/png',
      fileType = 'PNG',
      size = '800x800',
      imageUrl = '',
      onSelectedFile = () => {},
      ...rest
    },
    ref
  ) => {
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    async function uploadFile(file: File) {
      try {
        setIsUploading(true)

        const [, rest] = file.type.split('/')
        const mimeType = rest === 'png' ? 'png' : 'ico'

        const fileUploadResponse = await api.post<FileResponse>(
          `${import.meta.env.VITE_API_BASE_URL}/revendas/arquivos`,
          file,
          {
            headers: {
              'Content-Type': 'application/octet-stream',
              'X-Filename': `${file.name}.${mimeType}`,
            },
          }
        )

        return fileUploadResponse.data
      } catch (error: unknown) {
        toaster.error({
          title:
            errorHandler(error) ||
            'Não foi possível realizar o upload do arquivo. Tente novamente!',
        })
      } finally {
        setIsUploading(false)
      }
    }

    async function handleSelectedFile(event: ChangeEvent<HTMLInputElement>) {
      if (!event.target.files?.length) return

      const selectedFile = event.target.files[0]

      if (selectedFile.type.startsWith('image/')) {
        try {
          const [width, height] = size.split('x')

          await checkImageDimensions(selectedFile, width, height)
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          toaster.error({
            title: message,
          })
          return
        }
      }

      const data = await uploadFile(selectedFile)

      if (!data) return

      setFile(selectedFile)
      onSelectedFile({ url: data.urlPublica, path: data.caminho })
    }

    const imagePreview = useMemo(() => {
      if (!file) return
      return URL.createObjectURL(file)
    }, [file])

    return (
      <Box
        position="relative"
        width="full"
        display="flex"
        flexDirection="column"
        gap="2"
        {...rest}
      >
        {isUploading ? (
          <Skeleton height="56" borderRadius="lg" />
        ) : imagePreview || imageUrl ? (
          <>
            <ImageChakra
              height="56"
              src={imagePreview || imageUrl}
              alt="Preview"
              objectFit="contain"
              borderRadius="lg"
              shadow="xs"
              shadowColor="zinc.200"
              overflow="hidden"
              bgColor="zinc.200"
            />

            <Button
              type="button"
              marginLeft="auto"
              maxWidth="fit-content"
              size="xs"
              variant="outline"
              asChild
            >
              <label htmlFor={id}>
                <LuPencil />
                Editar
              </label>
            </Button>
          </>
        ) : (
          <Text
            height="56"
            borderWidth={2}
            borderStyle="dashed"
            borderColor="purple.800"
            borderRadius="l3"
            cursor="pointer"
            paddingX="3"
            paddingY="4"
            textAlign="center"
            color="purple.500"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="3"
            asChild
          >
            <label htmlFor={id}>
              <Box
                rounded="full"
                padding="2"
                backgroundColor="purple.100"
                borderWidth="thick"
                borderColor="purple.50"
              >
                <FiUploadCloud size={20} />
              </Box>

              <VStack gap={1}>
                <Text fontSize="xs" fontWeight="semibold" color="purple.700">
                  Clique para upload
                </Text>
                <Text marginTop={0} fontSize="xs" color="zinc.400">
                  {fileType} (máx. {size})
                </Text>
              </VStack>
            </label>
          </Text>
        )}

        <TextInput
          ref={ref}
          id={id}
          type="file"
          accept={accept}
          onChange={handleSelectedFile}
          srOnly
        />
      </Box>
    )
  }
)

FileInput.displayName = 'FileInput'
