import {
  GridItem,
  Group,
  InputAddon,
  Separator,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { FiInstagram } from 'react-icons/fi'
import { LuInfo } from 'react-icons/lu'

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
import { Tooltip } from '@/components/ui/tooltip'
import { type FormData } from '@/dtos/types'
import { useGetCities } from '@/hooks/use-get-cities'
import { useGetStates } from '@/hooks/use-get-states'

interface ProfileFormData extends FormData {
  instagram: string
}

export function ProfileForm() {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProfileFormData>()

  const uf = watch('address.state')
  const { stateList } = useGetStates()
  const { cityList, isCitiesLoading } = useGetCities({ uf })

  return (
    <>
      <Stack gap="4">
        <Field
          invalid={!!errors.name}
          errorText={errors.name?.message}
          label="Razão social"
        >
          <TextInput
            {...register('name')}
            placeholder="Razão social da empresa"
          />
        </Field>

        <Field
          invalid={!!errors.description}
          errorText={errors.description?.message}
          label="Nome fantasia"
        >
          <TextInput
            {...register('description')}
            placeholder="Nome fantasia da empresa"
          />
        </Field>

        <Field invalid={!!errors.ie} errorText={errors.ie?.message} label="IE">
          <TextInput
            {...register('ie')}
            pattern="[\-0-9_.]+"
            maxLength={20}
            placeholder="Inscrição Estadual"
          />
        </Field>

        <SimpleGrid columns={{ base: 1, md: 6 }} gap="4">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Field
              invalid={!!errors.responsibleName}
              errorText={errors.responsibleName?.message}
              label="Nome responsável"
            >
              <TextInput
                {...register('responsibleName')}
                placeholder="Responsável para contato"
              />
            </Field>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Field
              invalid={!!errors.phone}
              errorText={errors.phone?.message}
              label="Telefone"
              optionalText={
                <Tooltip
                  content="Número de telefone de suporte que será exibido no software."
                  showArrow
                >
                  <LuInfo />
                </Tooltip>
              }
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
              label="Celular"
              invalid={!!errors.cell}
              errorText={errors.cell?.message}
              optionalText={
                <Tooltip
                  content="Número de celular de suporte que será exibido no software."
                  showArrow
                >
                  <LuInfo />
                </Tooltip>
              }
            >
              <Controller
                name="cell"
                control={control}
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
            disabled
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
                name="address.zipCode"
                control={control}
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
                placeholder="Praça José Osterne"
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
              <TextInput {...register('address.number')} placeholder="999" />
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
                placeholder="Casa, Apto"
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
                placeholder="Centro"
              />
            </Field>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Field
              invalid={!!errors.address?.state}
              errorText={errors.address?.state?.message}
              label="Estado"
            >
              <Controller
                control={control}
                name="address.state"
                render={({ field }) => (
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
                )}
              />
            </Field>
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
                      {cityList.items.map((city, index) => (
                        <SelectItem item={city} key={`${city.value}-${index}`}>
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
        invalid={!!errors.instagram}
        errorText={errors.instagram?.message}
        label="Instagram"
      >
        <Group attached>
          <InputAddon>
            <FiInstagram />
          </InputAddon>
          <TextInput {...register('instagram')} placeholder="@johndoe" />
        </Group>
      </Field>
    </>
  )
}
