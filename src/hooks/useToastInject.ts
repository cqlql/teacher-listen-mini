import { inject } from 'vue'
import type { UseToast } from './useToast'
import useToast from './useToast'

export default function useToastInject(): UseToast {
  const toastOptions = useToast()

  const injectToast = inject('toast')

  if (injectToast) {
    return injectToast as typeof toastOptions
  }

  return toastOptions
}
