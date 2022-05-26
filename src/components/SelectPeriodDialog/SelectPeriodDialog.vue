<script lang="ts" setup>
import { ref, watch } from 'vue'
import SelectCheckPopup from '../SelectCheck/SelectCheckPopup.vue'
const props =defineProps<{
  modelValue: string
  label: string
  visible: boolean
}>()
defineEmits<{
  (e: 'update:visible', visible: boolean)
}>()
  type Option = { id: string; name: string }
const loading = ref(true)

const periodOptions = ref<Option[]>()

async function getPeriodList () {


}

watch(() =>props.visible,(visible)=>{
  if(visible){
    loading.value =true
      getPeriodList().then((

      )).finally(() =>{
        loading.value =false
      })
  }
})
</script>
<template>
  <SelectCheckPopup
    :loading="loading"
    :visible="visible"
    @update:visible="(v) => $emit('update:visible', v)"
  >
  </SelectCheckPopup>
</template>

<!-- <style lang="scss"></style> -->
