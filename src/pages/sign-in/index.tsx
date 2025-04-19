import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuth } from '@/hooks/use-auth'

import { SignInForm } from './sign-in-form'

const signInValidationSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter ao menos 6 caracteres' }),
})

type SignInFormData = z.infer<typeof signInValidationSchema>

export function SignIn() {
  const { signIn } = useAuth()

  const methods = useForm<SignInFormData>({
    resolver: zodResolver(signInValidationSchema),
  })

  return (
    <FormProvider {...methods}>
      <SignInForm onSubmit={signIn} />
    </FormProvider>
  )
}
