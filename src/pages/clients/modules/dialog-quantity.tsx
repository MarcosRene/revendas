import { FormatNumber, Text } from '@chakra-ui/react'
import { type ChangeEvent, type KeyboardEvent, useState } from 'react'

import { TextInput } from '@/components/text-input'
import { Alert } from '@/components/ui/alert'
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

import { type Module, type ModuleItemType, type QuantitiesType } from './types'

interface DialogQuantityProps {
  module: Module
  selectedModuleIds: number[]
  errorMessage: string
  onQuantityChange: (
    event: ChangeEvent<HTMLInputElement>,
    moduleId: number
  ) => void
  quantities: QuantitiesType
  moduleItem: ModuleItemType
}

export function DialogQuantity({
  module,
  selectedModuleIds,
  errorMessage,
  onQuantityChange,
  quantities,
  moduleItem,
}: DialogQuantityProps) {
  const [isDialogQuantityOpen, setIsDialogQuantityOpen] = useState(false)

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setIsDialogQuantityOpen(false)
    }
  }

  return (
    <DialogRoot
      lazyMount
      open={isDialogQuantityOpen && selectedModuleIds.includes(module.id)}
      onOpenChange={({ open }) => setIsDialogQuantityOpen(open)}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          disabled={!selectedModuleIds.includes(module.id)}
        >
          Alterar quantidade
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar quantidade</DialogTitle>
          <DialogDescription>
            Informe a quantidade que você deseja.
          </DialogDescription>
        </DialogHeader>
        <DialogBody spaceY="4">
          {!!errorMessage && (
            <Alert
              size="sm"
              status="error"
              variant="outline"
              title={errorMessage}
            />
          )}

          <Field
            label="Quantidade"
            helperText={
              <Text fontSize="sm" color="zinc.800">
                Valor unitário:{' '}
                <FormatNumber
                  value={moduleItem[module.id]?.unitPrice || 0}
                  style="currency"
                  currency="BRL"
                />
              </Text>
            }
          >
            <TextInput
              placeholder="0"
              value={quantities[module.id] || ''}
              onChange={(event) => onQuantityChange(event, module.id)}
              onKeyUp={handleKeyUp}
              maxLength={3}
            />
          </Field>
          <Field label="Quantidade gratuita">
            <TextInput
              placeholder="0"
              defaultValue={module.quantityFree}
              disabled
              readOnly
            />
          </Field>
        </DialogBody>
        <DialogFooter paddingBottom="6" justifyContent="space-between">
          <DialogActionTrigger asChild>
            <Button variant="outline">Fechar</Button>
          </DialogActionTrigger>
          <Text
            as="span"
            fontSize="md"
            fontWeight="500"
            textDecoration="underline"
          >
            Total:{' '}
            <FormatNumber
              value={moduleItem[module.id]?.totalUnitPrice || 0}
              style="currency"
              currency="BRL"
            />
            <Text fontSize="xs" display="inline">
              {' '}
              /módulo
            </Text>
          </Text>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
