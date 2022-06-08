<!-- 此组件只用作声明类型 -->
<script lang="ts">
export default {
  name: 'PickerVue',
}
</script>
<script lang="ts" setup>
import type { EventChange, EventColumnchange, OptionType } from './picker'

defineProps<{
  mode: 'multiSelector' | 'selector'
  value: number[] | number
  range: OptionType[][] | string[] | OptionType[]
  rangeKey?: string
}>()
defineEmits<{
  (type: 'change', event: EventChange): void
  (type: 'columnchange', event: EventColumnchange): void
}>()
</script>
