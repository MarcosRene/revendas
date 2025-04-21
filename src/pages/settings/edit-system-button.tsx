import { Controller, useFormContext } from 'react-hook-form'
import { LuInfo, LuPencil } from 'react-icons/lu'

import { FileInput } from '@/components/file-input'
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
import { Tooltip } from '@/components/ui/tooltip'

import { type SettingsFormData } from '.'

interface EditSystemButtonProps {
  system: {
    id: number
    title: string
    description: string
    icon: string
  }
  currentIndex: number
}

export function EditSystemButton({
  system,
  currentIndex,
}: EditSystemButtonProps) {
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext<SettingsFormData>()

  return (
    <DialogRoot lazyMount motionPreset="slide-in-bottom" placement="center">
      <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <LuPencil /> Editar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{system.title}</DialogTitle>
        </DialogHeader>
        <DialogBody spaceY="4">
          <Field
            invalid={!!errors.systems?.[currentIndex]?.type}
            errorText={errors.systems?.[currentIndex]?.title?.message}
            label="Tipo"
          >
            <TextInput
              {...register(`systems.${currentIndex}.title`)}
              placeholder="Adicione o tipo aqui..."
              disabled
            />
          </Field>

          <Field
            invalid={!!errors.systems?.[currentIndex]?.description}
            errorText={errors.systems?.[currentIndex]?.description?.message}
            label="Descrição"
          >
            <TextInput
              {...register(`systems.${currentIndex}.description`)}
              placeholder="Adicione uma descrição aqui..."
            />
          </Field>

          <Controller
            name={`systems.${currentIndex}.icon`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Field
                invalid={!!errors.systems?.[currentIndex]?.icon}
                errorText={errors.systems?.[currentIndex]?.icon?.message}
                optionalText={
                  <Tooltip
                    content="O tamanho máximo recomendado para o ícone é 180x180 pixels."
                    showArrow
                  >
                    <LuInfo />
                  </Tooltip>
                }
                label="Ícone"
              >
                <FileInput
                  imageUrl={value}
                  onSelectedFile={({ url, path }) => {
                    onChange(url)
                    setValue(`systems.${currentIndex}.pathIcon`, path)
                  }}
                  accept="image/x-icon"
                  fileType="ICO"
                  size="180x180"
                />
              </Field>
            )}
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancelar</Button>
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
