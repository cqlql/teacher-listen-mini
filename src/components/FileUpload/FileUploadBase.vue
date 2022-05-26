<template>
  <div class="FileUpload">
    <SelectBar icon="link" @click="selectFiles" />
    <div class="FileUpload_files">
      <div v-for="(name, i) of names" :key="i" class="FileUpload_files_item">
        <span class="name">{{ name }}</span>
        <span class="close" @click="del(i)">
          <nut-icon name="close-little" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelectBar from '../Select/SelectBar.vue'

defineProps<{
  names: string[]
}>()

const emits = defineEmits<{
  (e: 'select'): void
  (e: 'delete', index: number): void
}>()

function selectFiles() {
  emits('select')
}
function del(index: number) {
  emits('delete', index)
}
</script>
<style lang="scss">
.FileUpload_files_item {
  display: flex;
  // line-height: 18px;
  padding: 6px 0;

  .name {
    flex: 1;
    word-wrap: break-word;
    word-break: break-all;
  }

  .close {
    width: 38px;
    color: $danger-color;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;

    &:active {
      color: $color-orange;
    }
  }
}
</style>
