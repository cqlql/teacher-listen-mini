<!-- <template>
  <VEach :settingList="settingArray">
    <template #default="{ settingItem, prop }">
      <FormItem :key="prop" :label="settingItem.label">
        <input
          type="text"
          placeholder="请输入课程名称"
          :value="form[prop]"
          @input="
            (e:any) => {
              formSelf[prop] = e.detail.value;
            }
          "
        />
        <FormInput />
      </FormItem>
    </template>
  </VEach>
</template> -->

<script lang="tsx">
import { defineComponent } from '@vue/runtime-core'
import FormItem from './FormItem.vue'
import FormList from './FormList.vue'

// const VEach = defineComponent({
//   props: {
//     settingList: {
//       type: Array,
//       default: () => [],
//     },
//   },

//   render() {
//     let slotDef = this.$slots.default as Slot;
//     let vList: any[] = [];
//     this.settingList.forEach(([prop, settingItem]) => {
//       vList.push(
//         slotDef({
//           prop,
//           settingItem,
//         }),
//       );
//     });
//     return vList;
//   },
// });

export default defineComponent({
  components: {
    FormList,
    FormItem,
    // VEach,
  },
  props: {
    setting: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formSelf: {},
    }
  },
  computed: {
    settingArray() {
      return Object.entries(this.setting)
    },
  },
  created() {},
  render() {
    let { formSelf } = this

    // let slotDef = this.$slots.default as Slot;
    let vList: any[] = []
    this.settingArray.forEach(([prop, settingItem]) => {
      vList.push(
        <FormItem key={prop} label={settingItem.label}>
          <input
            type="text"
            placeholder="请输入课程名称"
            value={formSelf[prop]}
            onInput={(e: any) => {
              formSelf[prop] = e.detail.value
              console.log(formSelf)
            }}
          />
        </FormItem>,
      )
    })
    return vList
  },
})
</script>

<!-- <script lang="ts" setup>
import { defineComponent } from '@vue/runtime-core';
import FormItem from './FormItem.vue';
import FormList from './FormList.vue';
defineProps<{
  setting: any;
  form: any;
}>();
</script> -->
<!-- <style lang="scss"></style> -->
