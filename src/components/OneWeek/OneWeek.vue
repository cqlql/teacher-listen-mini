<template>
  <div class="calendar-week-contain">
    <div class="c-head c-row">
      <div v-for="(v, key) of head" :key="key" class="c-cell">
        {{ v }}
      </div>
    </div>
    <div v-for="(row, key) of rows" :key="key" class="c-row">
      <div v-for="(item, i) of row" :key="key + i" class="c-cell">
        <div
          v-if="item.value"
          class="c-cell-content"
          :class="{
            today: item.isToday,
            selected: Number(item.value) === value,
          }"
          @click="handleSelect(item)"
        >
          <div>{{ item.value }}</div>
          <div v-if="item.info" class="c-cell-info">{{ item.info }}</div>
          <div v-else class="c-cell-info no">无</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useOneWeek from './hooks/useOneWeek'
import type { DateItem } from './typing'

const props = defineProps<{
  value: number
}>()

const emits = defineEmits<{
  (e: 'update:value', v: string): void
  (e: 'change', item: DateItem): void
  (e: 'select', item: DateItem): void
  (e: 'update:itemsData', itemsData: DateItem[][]): void
}>()

const { head, rows } = useOneWeek()

emits('update:itemsData', rows)

function handleSelect(item: DateItem) {
  if (Number(item.value) !== props.value) {
    emits('update:value', item.value)
    emits('change', item)
  }
  emits('select', item)
}
</script>

<style lang="scss">
.calendar-week-contain {
  border: 1px solid #ddd;
  text-align: center;

  .c-row {
    display: flex;
  }

  .c-cell {
    flex: 1;
  }

  .c-cell-content {
    display: inline-block;
    width: 38px;
    height: 38px;
    border-radius: 38px;
    padding: 4px;
    border: 1px solid #fff;
    box-sizing: content-box;
    cursor: pointer;

    &:active {
      background-color: #f5f5f5;
    }

    &.today {
      border-color: #4baaff;
    }

    &.selected {
      background-color: #4baaff;
      color: #fff;

      .c-cell-info {
        color: #fff;
      }
    }

    &.toselectedday:active {
      background-color: rgba(75, 171, 255, 0.8);
    }
  }

  .c-head .c-cell {
    height: 40px;
    line-height: 40px;
  }

  .c-cell-info {
    color: #4baaff;
    font-size: 12px;

    &.no {
      color: #a8a8a8;
    }
  }
}
</style>
