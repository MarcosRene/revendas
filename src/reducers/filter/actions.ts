export type Action =
  | { type: 'SET_CREATION_START_DATE'; payload: Date | undefined }
  | { type: 'SET_CREATION_END_DATE'; payload: Date | undefined }
  | { type: 'SET_DUE_DATE_START'; payload: Date | undefined }
  | { type: 'SET_DUE_DATE_END'; payload: Date | undefined }
  | { type: 'SET_BLOCK_START_DATE'; payload: Date | undefined }
  | { type: 'SET_BLOCK_END_DATE'; payload: Date | undefined }
  | { type: 'SET_DUE_DAY'; payload: string }
  | { type: 'SET_BLOCKED'; payload: string }
  | { type: 'SET_BLOCKED_TYPE'; payload: string }
  | { type: 'SET_BILLING_STATUS'; payload: string }
  | { type: 'SET_PLAN_IDS'; payload: string[] }
  | { type: 'SET_MODULE_IDS'; payload: string[] }
  | { type: 'CLEAR_PARAMS' }
