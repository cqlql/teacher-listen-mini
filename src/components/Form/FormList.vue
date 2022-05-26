<script lang="tsx">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    labelWidth: String,
  },
  setup() {},
  render() {
    const defSlots = this.$slots.default?.()
    defSlots?.forEach((slot) => {
      if ((slot.type as any).name === 'FormItem') {
        let props = slot.props
        // CellItem 本身有值不处理
        if (props && (props.labelWidth || props['label-width'])) {
          return
        }
        // CellItem 本身没有 labelWidth
        let { labelWidth } = this
        if (labelWidth) {
          if (slot.props) {
            slot.props.labelWidth = labelWidth
          } else {
            slot.props = {
              labelWidth,
            }
          }
        }
      }
    })

    return defSlots
  },
})
</script>
