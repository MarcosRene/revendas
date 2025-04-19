import {
  type DrawerRootProps,
  GridItem,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { type FieldValues, useFormContext } from 'react-hook-form'
import { LuKeyRound } from 'react-icons/lu'

import { Button } from '@/components/ui/button'
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'

type PasswordUpdateFormData = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

interface PasswordUpdateFormProps {
  onSubmit(data: FieldValues): void
  open: DrawerRootProps['open']
  onOpenChange: DrawerRootProps['onOpenChange']
  isLoading: boolean
}

export function PasswordUpdateForm({
  onSubmit,
  open,
  onOpenChange,
  isLoading,
}: PasswordUpdateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<PasswordUpdateFormData>()

  return (
    <DrawerRoot lazyMount open={open} onOpenChange={onOpenChange} size="sm">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <LuKeyRound /> Alterar senha
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <Stack
          as="form"
          flex="1"
          padding="0"
          gap="0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DrawerHeader>
            <DrawerTitle>Alterar sua senha</DrawerTitle>
          </DrawerHeader>

          <DrawerBody spaceY="4">
            <Field
              invalid={!!errors.currentPassword}
              errorText={errors.currentPassword?.message}
              label="Sua senha"
            >
              <PasswordInput
                {...register('currentPassword')}
                placeholder="Sua senha atual"
              />
            </Field>

            <Field
              invalid={!!errors.newPassword}
              errorText={errors.newPassword?.message}
              label="Nova senha"
            >
              <PasswordInput
                {...register('newPassword')}
                placeholder="Sua nova senha"
              />
            </Field>

            <Field
              invalid={!!errors.confirmNewPassword}
              errorText={errors.confirmNewPassword?.message}
              label="Confirme sua nova senha"
            >
              <PasswordInput
                {...register('confirmNewPassword')}
                placeholder="Confirme nova senha"
              />
            </Field>
          </DrawerBody>
          <DrawerFooter>
            <SimpleGrid width="full" columns={12} gap="4">
              <GridItem colSpan={6}>
                <DrawerActionTrigger asChild>
                  <Button width="full" variant="outline">
                    Cancel
                  </Button>
                </DrawerActionTrigger>
              </GridItem>
              <GridItem colSpan={6}>
                <Button width="full" type="submit" loading={isLoading}>
                  Confirmar
                </Button>
              </GridItem>
            </SimpleGrid>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </Stack>
      </DrawerContent>
    </DrawerRoot>
  )
}
