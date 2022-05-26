<template>
  <nut-popup
    pop-class="SelectCheck_popup"
    position="bottom"
    :visible="visible"
    @update:visible="updateVisible"
  >
    <div class="SelectCheck_top-btns" style="height: 38px">
      <a @click="close">取消</a>
      <span class="SelectCheck_popup-title">{{ popTitle }}</span>
      <a @click="confirm" class="SelectCheck_confirm-btn">确定</a>
    </div>
    <div class="SelectCheck_cont">
      <div v-show="loading" class="SelectCheck_loading">
        <nut-icon name="refresh2" class="nut-icon-am-rotate nut-icon-am-infinite"></nut-icon>
      </div>
      <div class="SelectCheck_option-list">
        <VOptionsData
          :selectedId="selectedId"
          :idProp="idProp"
          :nameProp="nameProp"
          :options="options"
        >
          <template #default="{ id, name: optionLabel, checked }">
            <div class="SelectCheck_option" :class="{ checked }" :key="id" @click="select(id)">
              {{ optionLabel }}
            </div>
          </template>
        </VOptionsData>
        <!-- <div class="SelectCheck_option">xxx</div>
        <div class="SelectCheck_option">xxx</div>
        <div class="SelectCheck_option">xxx</div>
        <div class="SelectCheck_option">xxx</div> -->
      </div>
    </div>
  </nut-popup>
</template>

<script lang="ts">
export default {
  components: {
    VOptionsData: {
      render() {
        let { selectedId, options, idProp, nameProp } = this.$attrs
        let defaultSlot = this.$slots.default

        let vnodes = options.map((option) => {
          let id = option[idProp]
          let checked = option.checked
          if (selectedId !== undefined) {
            checked = id === selectedId
          }
          return defaultSlot({
            checked,
            id: option[idProp],
            name: option[nameProp],
          })
        })

        return vnodes
      },
    },
  },
}
</script>

<script lang="ts" setup>
import useSelectCheck from './useSelectCheck'

type OptionType = {
  [key: string]: string
}

const props = withDefaults(
  defineProps<{
    visible: boolean
    modelValue?: string
    options?: OptionType[] | []
    idProp?: string
    nameProp?: string
    loading?: boolean

    popTitle?: string
    placeholder?: string
  }>(),
  {
    options: () => [],
    idProp: 'id',
    nameProp: 'name',
    popTitle: '',
  },
)

const emits = defineEmits<{
  (e: 'update:modelValue', id: string): void
  (e: 'update:label', name: string): void
  (e: 'change', id: string): void
  (e: 'confirm', id: string): void
  (e: 'update:visible', visible: boolean): void
}>()

const { select, updateVisible, selectedId, close, confirm } = useSelectCheck(props, emits)
</script>
<style lang="scss">
.SelectCheck_popup {
  .checked {
    background-color: red;
  }
}
.SelectCheck_cont {
  position: relative;
}
.SelectCheck_loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
}

.SelectCheck_top-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  .h5-a {
    padding: 10px;
  }
}

.SelectCheck_popup-title {
  font-size: 16px;
  color: $gray-8;
}

.SelectCheck_confirm-btn {
  color: $primary-color;
}

.SelectCheck_option-list {
  padding: 10px;
  height: 280px;
  overflow-y: auto;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.SelectCheck_option {
  display: inline-block;
  // height: 38px;
  padding: 0 10px;
  // margin: 10px 0 10px 10px;
  margin: 5px;
  line-height: 2;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  border: 1px solid #f6f6f6;
  color: #666;
  background-color: #f6f6f6;
}

.SelectCheck_option.checked {
  color: #e96036;
  background-color: #fff7f5;
  border-color: #e96036;
}
</style>
