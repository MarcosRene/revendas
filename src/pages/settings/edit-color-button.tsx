import {
  ColorPicker,
  For,
  getColorChannels,
  HStack,
  parseColor,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { LuPencil } from 'react-icons/lu'

import { TextInput } from '@/components/text-input'
import { Button } from '@/components/ui/button'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field } from '@/components/ui/field'

import { type SettingsFormData } from '.'

interface EditColorButtonProps {
  color: {
    name: string
    description: string
    color: string
  }
  currentIndex: number
}

export function EditColorButton({ color, currentIndex }: EditColorButtonProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<SettingsFormData>()

  const ChannelInputs = (props: { format: ColorPicker.ColorFormat }) => {
    const channels = getColorChannels(props.format)
    return (
      <ColorPicker.View format={props.format}>
        <For each={channels}>
          {(channel) => (
            <VStack gap="1" key={channel} flex="1">
              <ColorPicker.ChannelInput
                channel={channel}
                px="0"
                height="7"
                textStyle="xs"
                textAlign="center"
              />
              <ColorPicker.ChannelText>
                {channel.charAt(0).toUpperCase()}
              </ColorPicker.ChannelText>
            </VStack>
          )}
        </For>
      </ColorPicker.View>
    )
  }

  return (
    <DialogRoot lazyMount motionPreset="slide-in-bottom" placement="center">
      <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <LuPencil /> Editar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{color.name}</DialogTitle>
        </DialogHeader>
        <DialogBody spaceY="4">
          <Field
            invalid={!!errors.colors?.[currentIndex]?.name}
            errorText={errors.colors?.[currentIndex]?.name?.message}
            label="Nome"
          >
            <TextInput
              {...register(`colors.${currentIndex}.name`)}
              placeholder="Adicione o tipo aqui..."
              disabled
            />
          </Field>

          <Field
            invalid={!!errors.colors?.[currentIndex]?.description}
            errorText={errors.colors?.[currentIndex]?.description?.message}
            label="Descrição"
          >
            <Textarea
              {...register(`colors.${currentIndex}.description`)}
              placeholder="Adicione uma descrição aqui..."
              minHeight="28"
              disabled
            />
          </Field>

          <Controller
            name={`colors.${currentIndex}.color`}
            control={control}
            render={({ field: { value, onChange, name } }) => (
              <ColorPicker.Root
                name={name}
                defaultValue={parseColor(value)}
                onValueChange={(event) => onChange(event.valueAsString)}
                width="full"
              >
                <ColorPicker.HiddenInput />
                <ColorPicker.Label>Color</ColorPicker.Label>
                <ColorPicker.Control>
                  <ColorPicker.Trigger px="2">
                    <ColorPicker.ValueSwatch boxSize="6" />
                    <ColorPicker.ValueText minWidth="40" />
                  </ColorPicker.Trigger>
                </ColorPicker.Control>
                <ColorPicker.Positioner zIndex={10001}>
                  <ColorPicker.Content>
                    <ColorPicker.Area />
                    <HStack>
                      <ColorPicker.EyeDropper variant="outline" />
                      <ColorPicker.Sliders />
                      <ColorPicker.ValueSwatch />
                    </HStack>
                    <ChannelInputs format="rgba" />
                  </ColorPicker.Content>
                </ColorPicker.Positioner>
              </ColorPicker.Root>
            )}
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancenlar</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button>Confirmar</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
