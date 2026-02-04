<template>
  <div class="bg-grey-darken-4 pa-2">
    <div class="ml-2 mr-2">
      SESSION_CONTROL [{{ store.getModeActive }}]
    </div>
    <div class="ml-2 mr-2 d-flex flex-row justify-space-between">
      <div>
        <span class="text-h4 font-weight-black">
          {{ store.getSession }}
        </span>
      </div>
      <div>
        <span class="text-h4">
          {{ store.getSessionDuration }}
        </span>
      </div>
    </div>
    <div class="ml-2 mr-2 pb-2 font-weight-black" style="line-height: 0.2;">
      LAST: {{ store.getLastSessionDuration }}
    </div>
    <div class="ma-2 d-flex justify-center">
      <v-btn class="text-h5 w-100" height="70" color="grey-darken-3" @click="startStop">
        <template v-slot:prepend>
          <v-icon :class="{ 'text-red': store.sessionBool, 'text-green': !store.sessionBool }">
            {{ store.sessionBool == true ? 'mdi-stop' : 'mdi-play' }}
          </v-icon>
        </template>
          <b>{{ store.sessionBool == true ? 'STOP' : 'START' }}</b>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
  import { usePmpctrlStore } from '@/store'

  const store = usePmpctrlStore()

  const emit = defineEmits(['start', 'stop'])

  function startStop() {
    if (store.sessionBool) {
      emit('stop')
     }
     else { emit('start') }
  }
</script>
