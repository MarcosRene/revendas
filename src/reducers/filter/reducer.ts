import { type Action } from './actions'

type FilterState = {
  creationStartDate?: Date
  creationEndDate?: Date
  dueDateStart?: Date
  dueDateEnd?: Date
  blockStartDate?: Date
  blockEndDate?: Date
  dueDay: string
  blocked: string
  blockedType: string
  billingStatus: string
  planIds: string[]
  moduleIds: string[]
}

export const initialFilterState: FilterState = {
  creationStartDate: undefined,
  creationEndDate: undefined,
  dueDateStart: undefined,
  dueDateEnd: undefined,
  blockStartDate: undefined,
  blockEndDate: undefined,
  dueDay: '',
  blocked: '',
  blockedType: '',
  billingStatus: '',
  planIds: [],
  moduleIds: [],
}

export function filterReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case 'SET_CREATION_START_DATE':
      return { ...state, creationStartDate: action.payload }
    case 'SET_CREATION_END_DATE':
      return { ...state, creationEndDate: action.payload }
    case 'SET_DUE_DATE_START':
      return { ...state, dueDateStart: action.payload }
    case 'SET_DUE_DATE_END':
      return { ...state, dueDateEnd: action.payload }
    case 'SET_BLOCK_START_DATE':
      return { ...state, blockStartDate: action.payload }
    case 'SET_BLOCK_END_DATE':
      return { ...state, blockEndDate: action.payload }
    case 'SET_DUE_DAY':
      return { ...state, dueDay: action.payload }
    case 'SET_BLOCKED':
      return { ...state, blocked: action.payload }
    case 'SET_BLOCKED_TYPE':
      return { ...state, blockedType: action.payload }
    case 'SET_BILLING_STATUS':
      return { ...state, billingStatus: action.payload }
    case 'SET_PLAN_IDS':
      return { ...state, planIds: action.payload }
    case 'SET_MODULE_IDS':
      return { ...state, moduleIds: action.payload }
    case 'CLEAR_PARAMS':
      return initialFilterState
    default:
      return state
  }
}
