<template>
  <div class="HomePage_FixedButtons" :class="boxClassName">
    <div class="anm"> </div>
    <a
      class="btn one"
      @click="
        () => {
          boxClassName = ''
          $emit('clickOne')
        }
      "
    >
      <span class="rotate">我要开课</span>
    </a>
    <a
      class="btn two"
      @click="
        () => {
          boxClassName = ''
          $emit('clickTwo')
        }
      "
    >
      <span class="rotate">开课记录</span>
    </a>
    <a class="btn add" @click="toggle">
      <nut-icon name="close" />
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineEmits<{
  (e: 'clickOne')
  (e: 'clickTwo')
}>()

const boxClassName = ref<'' | 'open'>('')
function toggle() {
  boxClassName.value = boxClassName.value ? '' : 'open'
}

function close() {
  boxClassName.value = ''
}
</script>
<style lang="scss">
.HomePage_FixedButtons {
  position: fixed;
  right: 10px;
  bottom: 20px;
  width: 46px;
  height: 46px;

  .btn {
    width: 46px;
    height: 46px;
    background-color: #81b3fd;
    box-shadow: -1px 1px 3px 0 rgba(1, 67, 202, 0.1);
    // display: block;
    color: #fff;
    // line-height: 46px;
    // text-align: center;
    border-radius: 46px;
    // display: inline-block;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 8px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: ease 0.4s;
    font-size: 12px;
  }

  .add {
    opacity: 0.63 !important;
    transform: rotateZ(45deg);
  }

  .rotate {
    display: inline-block;
    transform: rotateZ(720deg);
    transition: ease 0.4s;
  }

  &.open {
    .btn {
      opacity: 1;
    }

    .add {
      transform: rotateZ(0);
    }

    .one {
      transform: translate(0, -80px);
    }

    .two {
      transform: translate(-80px, 0);
    }

    .rotate {
      transform: rotateZ(0);
    }
  }
}
</style>
