import { Grid, GridItem, Image, Separator, Text } from '@chakra-ui/react'
import { type FieldValues, useFormContext } from 'react-hook-form'
import { Link } from 'react-router'

import coverCilos from '@/assets/images/cover.png'
import logo1x1Cilos from '@/assets/images/logo1x1.svg'
import { TextInput } from '@/components/text-input'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'

type SignInFormData = {
  email: string
  password: string
}

interface SingInFormProps {
  onSubmit(data: FieldValues): void
}

export function SignInForm({ onSubmit }: SingInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SignInFormData>()

  const isFieldEmailError = !!errors.email?.message
  const isFieldPasswordError = !!errors.password?.message

  return (
    <Grid
      width="full"
      height="vh"
      gridAutoColumns={{ base: '1fr', md: '1fr minmax(28rem, 30rem)' }}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <GridItem
        backgroundImage={`url(${coverCilos})`}
        backgroundRepeat="no-repeat"
        backgroundPosition="left"
        backgroundSize="cover"
        display={{ base: 'none', lg: 'block' }}
      />

      <GridItem
        colStart={{ base: 'auto', lg: 0 }}
        colEnd={{ base: 'auto', lg: 3 }}
        spaceY="10"
        padding={{ base: '10', md: '16' }}
        placeContent="center"
      >
        <GridItem spaceY="12">
          <Image
            src={logo1x1Cilos}
            alt="Logo Cilos"
            height={{ base: '3.75rem', md: '8.5' }}
            objectFit="contain"
          />

          <Text fontSize="2xl" fontWeight="extrabold">
            Acesse sua conta
          </Text>
        </GridItem>

        <GridItem spaceY="4">
          <Field
            label="E-mail"
            invalid={isFieldEmailError}
            errorText={errors.email?.message}
          >
            <TextInput
              {...register('email')}
              placeholder="Seu e-mail"
              focusRingColor={isFieldEmailError ? 'red.600' : 'purple.700'}
              autoFocus
              size="lg"
            />
          </Field>

          <Field
            label="Senha"
            invalid={isFieldPasswordError}
            errorText={errors.password?.message}
          >
            <PasswordInput
              {...register('password')}
              placeholder="Sua senha"
              focusRingColor={isFieldPasswordError ? 'red.600' : 'purple.700'}
              size="lg"
            />
          </Field>

          <Text
            fontSize="sm"
            fontWeight="medium"
            color="zinc.800"
            transition={['colors']}
            _hover={{
              color: 'zinc.600',
            }}
            asChild
          >
            <Link
              style={{
                display: 'block',
                marginTop: '0.375rem',
              }}
              to="/forgot-password"
            >
              Esqueci minha senha
            </Link>
          </Text>
        </GridItem>

        <Separator borderColor="zinc.200" />

        <Button colorPalette="purple" width="full" size="lg" type="submit">
          Entrar
        </Button>
      </GridItem>
    </Grid>
  )
}
