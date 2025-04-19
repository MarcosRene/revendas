import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  globalCss: {
    'html, body, #root': {
      fontFamily: 'Be Vietnam Pro, sans-serif',
      color: '{colors.gray.950}',
    },
    '&::-webkit-scrollbar': { height: '0.375rem', width: '0.375rem' },
    '&::-webkit-scrollbar-track': {
      background: '{colors.zinc.50}',
      borderRadius: '0.5rem',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'hsl(240, 5%, 65%)',
      borderRadius: '0.5rem',
    },
  },
  theme: {
    tokens: {
      animations: {
        'pulse-loader': {
          value: 'loader 1.4s infinite',
        },
      },
      sizes: {
        dashboard: {
          'max-sidebar-width': { value: '18.5rem' },
          'max-dashboard-width': { value: '90rem' },
        },
        36: {
          value: '9.25rem',
        },
      },
      spacing: {
        'max-sidebar-width': { value: '{sizes.dashboard.max-sidebar-width}' },
      },
      colors: {
        zinc: {
          ['50']: { value: 'hsl(0, 0.00%, 98.00%)' },
          ['100']: { value: 'hsl(240, 5%, 96%)' },
          ['200']: { value: 'hsl(240, 6%, 90%)' },
          ['300']: { value: 'hsl(240, 5%, 84%)' },
          ['400']: { value: 'hsl(240, 5%, 65%)' },
          ['500']: { value: 'hsl(240, 4%, 46%)' },
          ['600']: { value: 'hsl(240, 5%, 34%)' },
          ['700']: { value: 'hsl(240, 5%, 26%)' },
          ['800']: { value: 'hsl(240, 4%, 16%)' },
          ['900']: { value: 'hsl(240, 6%, 10%)' },
          ['950']: { value: 'hsl(240, 10%, 4%)' },
        },
        gray: {
          ['50']: { value: 'hsl(0, 0%, 96%)' },
          ['100']: { value: 'hsl(0, 0%, 91%)' },
          ['200']: { value: 'hsl(0, 0%, 82%)' },
          ['300']: { value: 'hsl(0, 0%, 69%)' },
          ['400']: { value: 'hsl(0, 0%, 53%)' },
          ['500']: { value: 'hsl(0, 0%, 43%)' },
          ['600']: { value: 'hsl(0, 0%, 37%)' },
          ['700']: { value: 'hsl(0, 0%, 31%)' },
          ['800']: { value: 'hsl(0, 0%, 27%)' },
          ['900']: { value: 'hsl(0, 0%, 24%)' },
          ['950']: { value: 'hsl(0, 0.00%, 5.90%)' },
        },
        green: {
          ['50']: { value: 'hsl(115.4, 76.5%, 96.7%)' },
          ['100']: { value: 'hsl(116.2, 84.2%, 92.5%)' },
          ['200']: { value: 'hsl(117.0, 78.9%, 85.1%)' },
          ['300']: { value: 'hsl(117.7, 76.6%, 73.1%)' },
          ['400']: { value: 'hsl(117.5, 68.2%, 58.0%)' },
          ['500']: { value: 'hsl(117.8, 69.7%, 45.3%)' },
          ['600']: { value: 'hsl(117.9, 75.7%, 37.1%)' },
          ['700']: { value: 'hsl(118.3, 71.8%, 29.2%)' },
          ['800']: { value: 'hsl(118.5, 64.2%, 24.1%)' },
          ['900']: { value: 'hsl(120.0, 61.2%, 20.2%)' },
          ['950']: { value: 'hsl(120.0, 80.4%, 10.0%)' },
        },
        purple: {
          ['50']: { value: 'hsl(260, 100%, 97%)' },
          ['100']: { value: 'hsl(262, 100%, 95%)' },
          ['200']: { value: 'hsl(260, 100%, 90%)' },
          ['300']: { value: 'hsl(263, 100%, 83%)' },
          ['400']: { value: 'hsl(266, 100%, 73%)' },
          ['500']: { value: 'hsl(269, 100%, 62%)' },
          ['600']: { value: 'hsl(273, 100%, 54%)' },
          ['700']: { value: 'hsl(272, 100%, 50%)' },
          ['800']: { value: 'hsl(272, 99%, 42%)' },
          ['900']: { value: 'hsl(272, 97%, 35%)' },
          ['950']: { value: 'hsl(269, 100%, 23%)' },
        },
      },
    },
    keyframes: {
      loader: {
        '0%, 80%, 100%': { transform: 'scale(0)' },
        '40%': { transform: 'scale(1)' },
      },
    },
    semanticTokens: {
      animations: {
        loader: {
          value: '{animations.pulse-loader}',
        },
      },
      sizes: {
        'max-sidebar-width': { value: '{sizes.dashboard.max-sidebar-width}' },
        'max-dashboard-width': {
          value: '{sizes.dashboard.max-dashboard-width}',
        },
      },
      colors: {
        'primary.50': { value: '{colors.purple.50}' },
        'primary.100': { value: '{colors.purple.100}' },
        'primary.200': { value: '{colors.purple.200}' },
        'primary.300': { value: '{colors.purple.300}' },
        'primary.400': { value: '{colors.purple.400}' },
        'primary.500': { value: '{colors.purple.500}' },
        'primary.600': { value: '{colors.purple.600}' },
        'primary.700': { value: '{colors.purple.700}' },
        'primary.800': { value: '{colors.purple.800}' },
        'primary.900': { value: '{colors.purple.900}' },
        'primary.950': { value: '{colors.purple.950}' },
      },
    },
  },
})

export default createSystem(defaultConfig, customConfig)
