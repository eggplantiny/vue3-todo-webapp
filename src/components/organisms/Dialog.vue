<template>
  <TransitionRoot appear :show="value" as="template">
    <Dialog as="div" @close="events.onClickClose">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <DialogOverlay class="fixed bg-gray-700 opacity-50 inset-0" />

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="dark:text-gray-50 bg-container inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
              >
                {{ dialogInstance?.title }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ dialogInstance?.text }}
                </p>
              </div>

              <div class="mt-4 flex justify-end">
                <Button
                  class="btn-error mr-2"
                  @click="events.onClickClose"
                >
                  {{ dialogInstance?.isConfirm ? 'NO' : 'Got it.' }}
                </Button>
                <template v-if="dialogInstance?.isConfirm">
                  <Button
                    class="btn-success"
                    @click="events.onClickConfirm"
                  >
                    OK
                  </Button>
                </template>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useDialog } from '@/store/dialog'

import Button from '@/components/atoms/Button.vue'

const dialogStore = useDialog()
const { value, dialogInstance } = storeToRefs(dialogStore)

const events = {
  onClickClose () {
    dialogStore.closeDialog(false)
  },
  onClickConfirm () {
    dialogStore.closeDialog(true)
  }
}
</script>

<style scoped>

</style>
