import {
  createListCollection,
  GridItem,
  Separator,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Controller, useFormContext } from 'react-hook-form'

import { MaskedInput } from '@/components/masked-input'
import { TextInput } from '@/components/text-input'
import { Field } from '@/components/ui/field'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { type FormData } from '@/dtos/types'
import { useGetCities } from '@/hooks/use-get-cities'
import { useGetStates } from '@/hooks/use-get-states'
import { getSegments } from '@/http/clients/get-segments'

interface NewClientFormData extends FormData {
  responsiblePhone: string
  segment: number
  im: string
}

export function NewClientForm() {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext<NewClientFormData>()

  const { data: segments } = useQuery({
    queryKey: ['segments'],
    queryFn: getSegments,
  })

  const uf = watch('address.state')
  const { stateList } = useGetStates()
  const { cityList, isCitiesLoading } = useGetCities({ uf })

  const segmentList = createListCollection({
    items: segments
      ? segments.map((item) => ({
          label: item.description,
          value: item.id,
        }))
      : [],
  })

  return (
    <VStack alignItems="stretch" gap="10" key="new-client-form">
      <Stack gap="4">
        <Field
          invalid={!!errors.name}
          errorText={errors.name?.message}
          label="Razão social da empresa"
        >
          <TextInput
            {...register('name')}
            placeholder="Razão social da empresa"
          />
        </Field>

        <Field
          invalid={!!errors.description}
          errorText={errors.description?.message}
          label="Fantasia"
        >
          <TextInput
            {...register('description')}
            placeholder="Nome fantasia da empresa"
          />
        </Field>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="4">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Field
              invalid={!!errors.ie}
              errorText={errors.ie?.message}
              label="IE"
            >
              <TextInput
                {...register('ie')}
                pattern="[\-0-9_.]+"
                maxLength={20}
                placeholder="Inscrição Estadual"
              />
            </Field>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Field
              invalid={!!errors.im}
              errorText={errors.im?.message}
              label="IM"
            >
              <TextInput
                {...register('im')}
                pattern="[\-0-9_.]+"
                maxLength={20}
                placeholder="Inscrição Municipal"
              />
            </Field>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="4">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Field
              invalid={!!errors.responsibleName}
              errorText={errors.responsibleName?.message}
              label="Contato"
            >
              <TextInput
                {...register('responsibleName')}
                placeholder="Responsável para contato"
              />
            </Field>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Field
              invalid={!!errors.responsiblePhone}
              errorText={errors.responsiblePhone?.message}
              label="Telefone do contato"
            >
              <Controller
                control={control}
                name="responsiblePhone"
                render={({ field }) => (
                  <TextInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Telefone do responsável"
                    asChild
                  >
                    <MaskedInput format="(##) #####-####" />
                  </TextInput>
                )}
              />
            </Field>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="4">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Field
              invalid={!!errors.phone}
              errorText={errors.phone?.message}
              label="Telefone"
            >
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <TextInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="(99) 99999-9999"
                    asChild
                  >
                    <MaskedInput format="(##) #####-####" />
                  </TextInput>
                )}
              />
            </Field>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Field
              invalid={!!errors.cell}
              errorText={errors.cell?.message}
              label="Celular"
            >
              <Controller
                control={control}
                name="cell"
                render={({ field }) => (
                  <TextInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="(99) 99999-9999"
                    asChild
                  >
                    <MaskedInput format="(##) #####-####" />
                  </TextInput>
                )}
              />
            </Field>
          </GridItem>
        </SimpleGrid>

        <Field
          invalid={!!errors.email}
          errorText={errors.email?.message}
          label="E-mail"
        >
          <TextInput
            {...register('email')}
            placeholder="Endereço de e-mail empresa/responsável"
          />
        </Field>
      </Stack>

      <Separator borderColor="zinc.200" />

      <Stack gap="4">
        <SimpleGrid columns={{ base: 1, md: 4 }} gap="4">
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <Field
              invalid={!!errors.address?.zipCode}
              errorText={errors.address?.zipCode?.message}
              label="CEP"
            >
              <Controller
                control={control}
                name="address.zipCode"
                render={({ field }) => (
                  <TextInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="99999-999"
                    asChild
                  >
                    <MaskedInput format="#####-###" />
                  </TextInput>
                )}
              />
            </Field>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Field
              invalid={!!errors.address?.street}
              errorText={errors.address?.street?.message}
              label="Rua"
            >
              <TextInput
                {...register('address.street')}
                placeholder="Nome da rua"
              />
            </Field>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="4">
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <Field
              invalid={!!errors.address?.number}
              errorText={errors.address?.number?.message}
              label="Número"
            >
              <TextInput {...register('address.number')} placeholder="000" />
            </Field>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Field
              invalid={!!errors.address?.complement}
              errorText={errors.address?.complement?.message}
              label="Complemento"
            >
              <TextInput
                {...register('address.complement')}
                placeholder="Casa, Apto etc"
              />
            </Field>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 6 }} gap="4">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Field
              invalid={!!errors.address?.neighborhood}
              errorText={errors.address?.neighborhood?.message}
              label="Bairro"
            >
              <TextInput
                {...register('address.neighborhood')}
                placeholder="Nome do bairro"
              />
            </Field>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Controller
              control={control}
              name="address.state"
              render={({ field }) => (
                <Field
                  invalid={!!errors.address?.state}
                  errorText={errors.address?.state?.message}
                  label="Estado"
                >
                  <SelectRoot
                    name={field.name}
                    value={[field.value]}
                    onValueChange={({ value }) => field.onChange(value[0])}
                    onInteractOutside={() => field.onBlur()}
                    collection={stateList}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Selecione o Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {stateList.items.map((state) => (
                        <SelectItem item={state} key={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>
              )}
            />
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }} alignSelf="stretch">
            <Field
              invalid={!!errors.address?.city}
              errorText={errors.address?.city?.message}
              label="Cidade"
            >
              <Controller
                control={control}
                name="address.city"
                render={({ field }) => (
                  <SelectRoot
                    name={field.name}
                    value={[field.value]}
                    onValueChange={({ value }) => field.onChange(value[0])}
                    onInteractOutside={() => field.onBlur()}
                    collection={cityList}
                    disabled={isCitiesLoading}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Selecione a Cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityList.items.map((city) => (
                        <SelectItem item={city} key={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
            </Field>
          </GridItem>
        </SimpleGrid>
      </Stack>
      <Separator borderColor="zinc.200" />

      <Field
        invalid={!!errors.segment}
        errorText={errors.segment?.message}
        label="Segmento"
      >
        <Controller
          control={control}
          name="segment"
          render={({ field }) => (
            <SelectRoot
              name={field.name}
              value={[field.value as unknown as string]}
              onValueChange={({ value }) =>
                field.onChange(value[0] as unknown as number)
              }
              onInteractOutside={() => field.onBlur()}
              collection={segmentList}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Selecione um segmento" />
              </SelectTrigger>
              <SelectContent>
                {segmentList.items.map((city) => (
                  <SelectItem item={city} key={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          )}
        />
      </Field>
    </VStack>
  )
}
