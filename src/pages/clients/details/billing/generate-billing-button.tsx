import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field } from '@/components/ui/field'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { toaster } from '@/components/ui/toaster'
import { generateBilling } from '@/http/clients/generate-billing'
import { queryClient } from '@/lib/react-query'
import { errorHandler } from '@/utils/error-handler'

const quantityList = createListCollection({
  items: Array.from({ length: 12 }, (_, index) => ({
    label: String(index + 1),
    value: String(index + 1),
  })),
})

const generateBillingButtonFormSchema = z.object({
  clientId: z.string(),
  quantity: z.string({ message: 'A quantidade é obrigatória' }),
})

type GenerateBillingButtonFormData = z.infer<
  typeof generateBillingButtonFormSchema
>

interface GenerateInvoiceButtonProps {
  clientId?: string
}

export function GenerateBillingButton({
  clientId,
}: GenerateInvoiceButtonProps) {
  const [openBillingDialog, setOpenBillingDialog] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
    resetField,
  } = useForm<GenerateBillingButtonFormData>({
    resolver: zodResolver(generateBillingButtonFormSchema),
    defaultValues: {
      clientId,
    },
  })

  function handleResetField() {
    resetField('quantity')
  }

  const { mutateAsync: generateBillingFn, isPending: isBillingSending } =
    useMutation({
      mutationFn: generateBilling,
      onSuccess: () => {
        setOpenBillingDialog(false)
        handleResetField()

        toaster.success({
          title: 'Cobrança(s) gerada(s) com sucesso!',
        })
      },
      onError: (error) => {
        toaster.error({
          title: errorHandler(error),
        })
      },
      onSettled: () =>
        queryClient.invalidateQueries({ queryKey: ['billings'] }),
    })

  async function onGenerateBilling(data: GenerateBillingButtonFormData) {
    await generateBillingFn(data)
  }

  return (
    <DialogRoot
      lazyMount
      open={openBillingDialog}
      onOpenChange={({ open }) => setOpenBillingDialog(open)}
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        <Button colorPalette="purple" size="md">
          Gerar cobranças
        </Button>
      </DialogTrigger>
      <DialogContent as="form" onSubmit={handleSubmit(onGenerateBilling)}>
        <DialogHeader flexDirection="column">
          <DialogTitle>Gerar cobranças</DialogTitle>
          <DialogDescription>
            Você pode gerar no máximo 12 cobranças.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field
            label="Quantidade"
            invalid={!!errors.quantity}
            errorText={errors.quantity?.message}
          >
            <Controller
              name="quantity"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <SelectRoot
                  value={[value]}
                  onValueChange={({ value }) => onChange(value[0])}
                  onInteractOutside={() => onBlur()}
                  collection={quantityList}
                  maxWidth="full"
                  size="md"
                >
                  <SelectTrigger>
                    <SelectValueText placeholder="Selecione a quantidade" />
                  </SelectTrigger>
                  <SelectContent zIndex="max">
                    {quantityList.items.map((quantity) => (
                      <SelectItem item={quantity} key={quantity.value}>
                        {quantity.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleResetField}>
              Cancelar
            </Button>
          </DialogActionTrigger>
          <Button type="submit" loading={isBillingSending}>
            Confirmar
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={handleResetField} />
      </DialogContent>
    </DialogRoot>
  )
}
