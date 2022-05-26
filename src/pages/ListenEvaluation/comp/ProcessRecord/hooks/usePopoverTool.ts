import { reactive, ref, watch } from 'vue'

export interface PopoverType {
  visible: boolean
  show: () => void
  hide: () => void
  trigger: () => void
}

const outsideTime = ref(0)
export function clickOutside() {
  outsideTime.value += 1
}

export default function usePopoverTool() {
  let clickInside = false

  watch(outsideTime, () => {
    if (clickInside) {
      clickInside = false
    } else {
      popover.visible = false
    }
  })

  const popover = reactive<PopoverType>({
    visible: false,
    show() {
      clickInside = true
      popover.visible = true
    },
    hide() {
      clickInside = true
      popover.visible = false
    },
    trigger() {
      clickInside = true
      popover.visible = !popover.visible
    },
    // clickOutside() {
    //   if (clickInside) {
    //     clickInside = false
    //   } else {
    //     popover.visible = false
    //   }
    // },
  })

  return popover
}
