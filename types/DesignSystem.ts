export const colors = [
  'neutral',
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
] as const
export type TColor = typeof colors[number]

export const colorWeights = [
  100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const

export type TColorWeights = typeof colorWeights[number]

export const colorWithWeights = [
  'neutral-100',
  'neutral-200',
  'neutral-300',
  'neutral-400',
  'neutral',
  'neutral-600',
  'neutral-700',
  'neutral-800',
  'neutral-900',
  'primary-100',
  'primary-200',
  'primary-300',
  'primary-400',
  'primary',
  'primary-600',
  'primary-700',
  'primary-800',
  'primary-900',
  'secondary-100',
  'secondary-200',
  'secondary-300',
  'secondary-400',
  'secondary',
  'secondary-600',
  'secondary-700',
  'secondary-800',
  'secondary-900',
  'success-100',
  'success-200',
  'success-300',
  'success-400',
  'success',
  'success-600',
  'success-700',
  'success-800',
  'success-900',
  'info-100',
  'info-200',
  'info-300',
  'info-400',
  'info',
  'info-600',
  'info-700',
  'info-800',
  'info-900',
  'warning-100',
  'warning-200',
  'warning-300',
  'warning-400',
  'warning',
  'warning-600',
  'warning-700',
  'warning-800',
  'warning-900',
  'error-100',
  'error-200',
  'error-300',
  'error-400',
  'error',
  'error-600',
  'error-700',
  'error-800',
  'error-900',
]

export type TColorWithWeight = `${TColor}-${TColorWeights}` | TColor
export type TElevation =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'txs'
  | 'tsm'
  | 'tmd'
  | 'tlg'
  | 'txl'
export type TRadius = '0' | '1' | '2' | '3' | '4' | '5' | 'pill' | 'circle'

export const Radiuses = ['0', '1', '2', '3', '4', '5', 'pill', 'circle']
export const spacings = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120, 136, 160, 200, 240,
]
