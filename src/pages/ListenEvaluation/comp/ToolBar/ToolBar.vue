<template>
  <div class="tool-bar">
    <div
      v-for="item of list"
      :key="item.type"
      class="tool-bar-item"
      :class="item.class"
      @click="select(item.type)"
    >
      <div class="icon">
        <nut-icon v-bind="item.icon" />
      </div>
      <div class="name">{{ item.name }}</div>
    </div>
    <!-- <div class="tool-bar-item think" @click="select('think')">
      <div class="icon">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="think" />
      </div>
      <div class="name">思考</div>
    </div>
    <div class="tool-bar-item success" @click="select('camera')">
      <div class="icon">
        <nut-icon name="photograph" />
      </div>
      <div class="name">拍照</div>
    </div>

    <div class="tool-bar-item success" @click="select('album')">
      <div class="icon">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="picture" />
      </div>
      <div class="name">相册</div>
    </div>
    <div class="tool-bar-item success" @click="select('video')">
      <div class="icon">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="video" />
      </div>
      <div class="name">视频</div>
    </div>

    <div class="tool-bar-item success" @click="select('drawing')">
      <div class="icon">
        <nut-icon name="edit" />
      </div>
      <div class="name">画板</div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
let emit = defineEmits<{
  (e: 'select', type: string): void
}>()

const props = defineProps<{
  selectBefore: (type: string) => boolean | void
}>()

function select(type: string) {
  if (props.selectBefore(type) === false) return
  emit('select', type)
}

const list = [
  {
    name: '思考',
    type: 'think',
    class: 'think',
    icon: {
      'font-class-name': 'iconfont',
      'class-prefix': 'icon',
      name: 'think',
    },
  },
  {
    name: '拍照',
    type: 'camera',
    class: 'success',
    icon: {
      name: 'photograph',
    },
  },
  {
    name: '相册',
    type: 'album',
    class: 'success',
    icon: {
      'font-class-name': 'iconfont',
      'class-prefix': 'icon',
      name: 'picture',
    },
  },
  {
    name: '视频',
    type: 'video',
    class: 'success',
    icon: {
      'font-class-name': 'iconfont',
      'class-prefix': 'icon',
      name: 'video',
    },
  },
  {
    name: '画板',
    type: 'drawing',
    class: 'success',
    icon: {
      name: 'edit',
    },
  },
]
</script>

<style lang="scss">
.tool-bar {
  display: flex;
  background-color: #f9fcff;
  height: 60px;
}

.tool-bar-item {
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  flex: 1;
  position: relative;
  background-color: #f9fcff;

  .icon {
    border: 1px solid #999;
    // background-color: #50d89e;
    color: #999;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border-radius: 30px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .iconfont {
    font-size: 20px;
  }

  .name {
    color: #999;
    font-size: 12px;
  }

  &.think {
    // background-color: #f9fcff;
    // padding: 0 20px;

    .icon {
      border-color: #50d89e;
      background-color: #50d89e;
      color: #fff;
    }
  }

  &.success {
    // background-color: #f9fcff;
    // padding: 0 20px;

    .icon {
      border-color: #6da5ff;
      background-color: #6da5ff;
      color: #fff;
    }
  }
}
</style>
