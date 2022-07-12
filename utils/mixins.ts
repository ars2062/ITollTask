import Vue, { VueConstructor } from 'vue'
import { ExtendedVue } from 'vue/types/vue'

export const mixins = function <T extends Vue>(
  ...args: ExtendedVue<T, any, any, any, any, any>[]
): VueConstructor<T> {
  return Vue.extend({
    mixins: args,
  }) as VueConstructor<T>
}
