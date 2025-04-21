import { Navigate, Route, Routes } from 'react-router'

import AuthLayout from '@/pages/_layouts/auth'
import DashboardLayout from '@/pages/_layouts/dashboard'
import ForgotLayout from '@/pages/_layouts/forgot'
import { NotFound } from '@/pages/404'
import { Clients } from '@/pages/clients'
import { ClientDetails } from '@/pages/clients/details'
import { EditClient } from '@/pages/clients/edit-client'
import { EditModules } from '@/pages/clients/modules/edit/edit'
import { NewModules } from '@/pages/clients/modules/new'
import { NewClient } from '@/pages/clients/new-client'
import { EditPlans } from '@/pages/clients/plans/edit'
import { NewPlans } from '@/pages/clients/plans/new'
import { ValidateDocument } from '@/pages/clients/validate-document'
import { ForgotPassword } from '@/pages/forgot-password'
import { NewPassword } from '@/pages/forgot-password/new-password'
import { ValidateCode } from '@/pages/forgot-password/validate-code'
import { Profile } from '@/pages/profile'
import { Settings } from '@/pages/settings'
import { SignIn } from '@/pages/sign-in'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index path="/sign-in" element={<SignIn />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route index path="/" element={<Navigate to="/clients" />} />
        <Route path="clients/*">
          <Route index element={<Clients />} />
          <Route path="plans" element={<NewPlans />} />
          <Route path=":id/plans/:planId" element={<EditPlans />} />
          <Route path="modules" element={<NewModules />} />
          <Route path=":id/modules" element={<EditModules />} />
          <Route path="validate-document" element={<ValidateDocument />} />
          <Route path=":document/new" element={<NewClient />} />
          <Route path=":id/edit" element={<EditClient />} />
          <Route path=":id/details" element={<ClientDetails />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route element={<ForgotLayout />}>
        <Route path="forgot-password/*">
          <Route index element={<ForgotPassword />} />
          <Route path="code" element={<ValidateCode />} />
          <Route path=":code/new" element={<NewPassword />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
