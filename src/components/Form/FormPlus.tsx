import { defineComponent } from '@vue/runtime-core'
import { ref } from 'vue'
import FormItem from '@/components/Form/FormItem.vue'
import FormList from '@/components/Form/FormList.vue'
// import FormInput from './FormInput.vue';

export default defineComponent({
  name: 'FormPlus',
  props: {
    setting: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const form = ref<any>({ course_name: '123' })
    return () => {
      const vFormItem: any[] = []
      Object.entries(props.setting).forEach(([, item]) => {
        vFormItem.push(
          <FormItem label={item.label}>
            <input
              type="text"
              value={form.value.course_name}
              placeholder="x"
              onInput={() => {
                console.log(1)
              }}
            />
          </FormItem>,
        )
      })

      console.log(props.setting)
      return (
        <div>
          {form.value.course_name}123123
          <FormList label-width="130rpx">{vFormItem}</FormList>
        </div>
      )
    }
  },
})
