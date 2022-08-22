<template>
  <FileUploadBase :names="fileNames" @select="select" @delete="delFile" />
  <nut-toast v-bind="toast" v-model:visible="toast.show" />
</template>

<script lang="ts" setup>
import useFileUpload from '@/hooks/useFileUpload'
import useToast from '@/hooks/useToast'
import { computed } from 'vue'

import fileTypeId from './file-type-id'
import FileUploadBase from './FileUploadBase.vue'
import type { FileObject } from './types'

const props = defineProps<{
  modelValue: FileObject[]
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', files: FileObject[]): void
}>()

let { toast, toastLoading, toastClose } = useToast()
let { fileUpload } = useFileUpload()

const fileNames = computed(() => {
  return props.modelValue.map((file) => {
    return file.name
  })
})

function delFile(index) {
  let files = props.modelValue
  files.splice(index, 1)
  emits('update:modelValue', files)
}

function select() {
  // 文档: https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html
  wx.chooseImage({
    async success(res) {
      // const { token, base_url } = await getQiniuToken()
      const tempFilePaths = res.tempFilePaths
      const files: FileObject[] = []

      for (let i = 0, len = tempFilePaths.length; i < len; i++) {
        const path = tempFilePaths[i]

        function msg(v) {
          // return `${path} ${index}/${fileNumber} ${v}%`;
          return `${i}/${len} ${v}%`
        }
        try {
          toastLoading(msg(0))
          const fileInfo = await fileUpload(
            path,
            {
              thmType: 1,
              bizId: 0,
            },
            {
              progress(res) {
                toast.msg = msg(res.progress)
              },
            },
          ).finally(() => {
            toastClose()
          })
          let fileUrl = fileInfo.url
          files.push({
            name: getFileNameByPath(path),
            url: fileUrl,
            type: fileTypeId(fileUrl),
          })
        } catch (e) {
          console.error(e)
        }
      }
      emits('update:modelValue', files)
    },
  })
}

function getFileNameByPath(path: string) {
  return path.match(/[^/]+$/)?.[0] || 'file'
}

// function req() {
//   return fileUpload()
// }
</script>
<style lang="scss">
.FileUpload_files_item {
  display: flex;

  .name {
    flex: 1;
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
