import Vue, { PropType } from 'vue'
import { TColorWithWeight } from '~/types/DesignSystem'

export interface IColorableMixin {
  color: TColorWithWeight
}

export default Vue.extend({
  name: 'MColorable',
  props: {
    color: {
      type: String as PropType<TColorWithWeight>,
      default: 'neutral-100',
    },
  },
})
