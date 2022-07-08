import Vue, { PropType } from 'vue'

export interface ISizable {
  height?: number | string
  width?: number | string
  maxHeight?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  minWidth?: number | string
}

export default Vue.extend({
  props: {
    height: {
      type: String as PropType<string | number>,
      default: undefined,
    },
    width: {
      type: String as PropType<string | number>,
      default: undefined,
    },
    maxHeight: {
      type: String as PropType<string | number>,
      default: undefined,
    },
    maxWidth: {
      type: String as PropType<string | number>,
      default: undefined,
    },
    minHeight: {
      type: String as PropType<string | number>,
      default: undefined,
    },
    minWidth: {
      type: String as PropType<string | number>,
      default: undefined,
    },
  },
})

export const cssUnit = (value: number | string): string => {
  if (!isNaN(Number(value))) return `${value}px`
  return value as string
}

export const makeSizableStyle = function <T extends ISizable>(
  props: T
): Partial<Record<keyof ISizable, string>> {
  const { width, height, maxHeight, maxWidth, minHeight, minWidth } = props
  return Object.fromEntries(
    Object.entries({
      width: width && cssUnit(width),
      height: height && cssUnit(height),
      maxHeight: maxHeight && cssUnit(maxHeight),
      maxWidth: maxWidth && cssUnit(maxWidth),
      minHeight: minHeight && cssUnit(minHeight),
      minWidth: minWidth && cssUnit(minWidth),
    }).filter(([_, value]) => Boolean(value))
  )
}
