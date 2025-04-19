import {
  Box,
  Card,
  ColorSwatch,
  Flex,
  HStack,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { LuInfo } from 'react-icons/lu'
import { Link } from 'react-router'
import { z } from 'zod'

import { FileInput } from '@/components/file-input'
import {
  SectionBody,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from '@/components/section'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { Tooltip } from '@/components/ui/tooltip'
import { getWhiteLabel } from '@/http/setting/get-white-label'
import { updateWhiteLabel } from '@/http/setting/update-white-label'
import { queryClient } from '@/lib/react-query'
import { errorHandler } from '@/utils/error-handler'

import { EditColorButton } from './edit-color-button'
import { EditSystemButton } from './edit-system-button'
import { SettingsSkeleton } from './skeleton'

const settingsFormValidationSchema = z.object({
  pathWhiteLogo: z.string(),
  pathFullColorLogo: z.string(),
  urlWhiteLogo: z.string(),
  urlFullColorLogo: z.string(),
  systems: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      pathIcon: z.string(),
    })
  ),
  colors: z.array(
    z.object({
      name: z.string(),
      color: z.string(),
      description: z.string(),
      type: z.string(),
    })
  ),
})

export type SettingsFormData = z.infer<typeof settingsFormValidationSchema>

export function Settings() {
  const { data: whiteLabelData, isLoading: isWhiteLabelLoading } = useQuery({
    queryKey: ['white-label'],
    queryFn: getWhiteLabel,
  })

  const methods = useForm<SettingsFormData>({
    resolver: zodResolver(settingsFormValidationSchema),
  })

  const { mutateAsync: updateSettingsFn, isPending: isSettingsUpdating } =
    useMutation({
      mutationFn: updateWhiteLabel,
      onSuccess: () => {
        toaster.success({
          title: 'Configurações atualizadas com sucesso!',
        })
      },
      onError: (error) => {
        toaster.error({
          title: errorHandler(error),
        })
      },
      onSettled: async () =>
        await queryClient.invalidateQueries({ queryKey: ['white-label'] }),
    })

  async function onUpdateSettings(data: SettingsFormData) {
    await updateSettingsFn(data)
  }

  useEffect(() => {
    if (!whiteLabelData) return

    methods.reset(whiteLabelData)
  }, [whiteLabelData])

  return (
    <FormProvider {...methods}>
      <SectionRoot
        as="form"
        paddingBottom="6"
        onSubmit={methods.handleSubmit(onUpdateSettings)}
        height={{ base: 'auto', xl: 'full' }}
        overflow={{ base: 'visible', md: 'scroll' }}
      >
        <SectionHeader flexDirection="row" justifyContent="space-between">
          <SectionTitle>Configurações</SectionTitle>
        </SectionHeader>

        <SectionBody height={{ base: 'auto', xl: 'full' }} spaceY={0} gap="6">
          <HStack
            alignItems="flex-start"
            justifyContent="space-between"
            flexDirection={{ base: 'column', md: 'row' }}
            spaceX="2"
          >
            <VStack width="full" alignItems="flex-start">
              <Skeleton width="full" loading={isWhiteLabelLoading}>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  display="flex"
                  alignItems="center"
                  gap="1"
                >
                  Logo branca{' '}
                  <Tooltip
                    content="O tamanho máximo recomendado para a logo é 800x800 pixels."
                    showArrow
                  >
                    <LuInfo />
                  </Tooltip>
                </Text>
              </Skeleton>
              <Skeleton width="full" loading={isWhiteLabelLoading}>
                <Controller
                  name="urlWhiteLogo"
                  control={methods.control}
                  render={({ field: { value, onChange } }) => (
                    <FileInput
                      imageUrl={value}
                      onSelectedFile={({ url, path }) => {
                        onChange(url)
                        methods.setValue('pathWhiteLogo', path)
                      }}
                    />
                  )}
                />
              </Skeleton>
            </VStack>
            <VStack width="full" alignItems="flex-start">
              <Skeleton width="full" loading={isWhiteLabelLoading}>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  display="flex"
                  alignItems="center"
                  gap="1"
                >
                  Logo colorida{' '}
                  <Tooltip
                    content="O tamanho máximo recomendado para a logo é 800x800 pixels."
                    showArrow
                  >
                    <LuInfo />
                  </Tooltip>
                </Text>
              </Skeleton>
              <Skeleton width="full" loading={isWhiteLabelLoading}>
                <Controller
                  name="urlFullColorLogo"
                  control={methods.control}
                  render={({ field: { value, onChange } }) => (
                    <FileInput
                      imageUrl={value}
                      onSelectedFile={({ url, path }) => {
                        onChange(url)
                        methods.setValue('pathFullColorLogo', path)
                      }}
                    />
                  )}
                />
              </Skeleton>
            </VStack>
          </HStack>

          <VStack width="full" alignItems="flex-start" gap="4">
            <Text fontSize="xl" fontWeight="medium">
              Sistemas
            </Text>

            {isWhiteLabelLoading && <SettingsSkeleton />}

            <Box
              width="full"
              display="grid"
              gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
              gap="4"
            >
              {whiteLabelData?.systems.map((system, index) => (
                <Card.Root
                  key={system.id}
                  padding="3"
                  borderColor="zinc.200"
                  borderRadius="l3"
                >
                  <HStack
                    spaceX="2"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box display="flex" alignItems="center" gap="2">
                      <Avatar
                        src={system.icon}
                        name={system.title}
                        shape="rounded"
                        size="xl"
                        colorPalette="purple"
                      />
                      <Stack gap="0">
                        <Text fontSize="md" fontWeight="medium" lineClamp={1}>
                          {system.title}
                        </Text>
                        <Text fontSize="sm" color="gray.500" lineClamp={1}>
                          {system.description}
                        </Text>
                      </Stack>
                    </Box>

                    <EditSystemButton system={system} currentIndex={index} />
                  </HStack>
                </Card.Root>
              ))}
            </Box>
          </VStack>

          <VStack width="full" alignItems="flex-start" gap="4">
            <Text fontSize="xl" fontWeight="medium">
              Cores
            </Text>

            {isWhiteLabelLoading && <SettingsSkeleton />}

            <Box
              width="full"
              display="grid"
              gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
              gap="4"
            >
              {whiteLabelData?.colors.map((color, index) => (
                <Card.Root
                  key={color.name}
                  padding="3"
                  borderColor="zinc.200"
                  borderRadius="l3"
                >
                  <HStack
                    spaceX="2"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box display="flex" alignItems="flex-start" gap="2">
                      <ColorSwatch
                        rounded="l3"
                        size="2xl"
                        value={color.color}
                      />
                      <Stack gap="0">
                        <Text fontSize="md" fontWeight="medium">
                          {color.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500" lineClamp={5}>
                          {color.description}
                        </Text>
                      </Stack>
                    </Box>

                    <EditColorButton color={color} currentIndex={index} />
                  </HStack>
                </Card.Root>
              ))}
            </Box>
          </VStack>
          <Flex marginTop="auto" display="flex" justifyContent="space-between">
            <Skeleton loading={isWhiteLabelLoading}>
              <Button variant="outline" asChild>
                <Link to="/clients">Cancelar</Link>
              </Button>
            </Skeleton>
            <Skeleton loading={isWhiteLabelLoading}>
              <Button
                type="submit"
                loading={isSettingsUpdating}
                disabled={!methods.formState.isDirty}
              >
                Confirmar
              </Button>
            </Skeleton>
          </Flex>
        </SectionBody>
      </SectionRoot>
    </FormProvider>
  )
}
