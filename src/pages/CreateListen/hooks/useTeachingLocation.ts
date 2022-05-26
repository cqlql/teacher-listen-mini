import { getClassrooms } from '@/api/select'
import { ref } from 'vue'

export default function useTeachingLocation() {
  const visible = ref(false)
  return {
    visible,
    async resList() {
      return getClassrooms()
    },
  }
}
