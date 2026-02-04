<template>
  <div class="bg-grey-darken-4 pa-2" color="">
    <div class="ml-2 mr-2">
      VALVE_CONTROL [{{ store.sessionBool ? 'AUTO' : 'MANUAL' }}]
    </div>
    <div class="ml-2 mr-2">
      <span class="text-h4 font-weight-black">
        {{ store.getValve }}
      </span>
    </div>
    <div class="ma-2 d-flex justify-center">
      <v-btn
        class="text-h5 w-100"
        height="70"
        color="grey-darken-3"
        prepend-icon="mdi-gesture-tap-hold"
        :disabled="store.sessionBool"
        @pointerdown="openValve"
        @pointerup="closeValve"
        @pointerout="handleFocusOut"
      ><b>OPEN</b></v-btn>
    </div>
  </div>
</template>

<script setup>
  import { usePmpctrlStore } from '@/store'

  const store = usePmpctrlStore()

  const emit = defineEmits(['open', 'close'])
  let pointerDown = false

  function closeValve() {
    if (pointerDown) {
      pointerDown = false
      emit('close')
    }
  }

  function openValve() {
    pointerDown = true
    emit('open')
  }

  function handleFocusOut() {
    if (pointerDown) {
      pointerDown = false
      emit('close')
    }
  }
</script>
