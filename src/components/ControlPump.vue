<template>
  <div class="bg-grey-darken-4 pa-2">
    <div class="ml-2 mr-2">
      PUMP_CONTROL [{{ store.sessionBool ? 'AUTO' : 'MANUAL' }}]
    </div>
    <div class="ml-2 mr-2">
      <span class="text-h4 font-weight-black">
        {{  store.getPump }}
      </span>
    </div>
    <div class="ma-2 d-flex justify-center">
      <v-btn
        class="text-h5 w-100"
        height="70"
        color="grey-darken-3"
        :disabled="store.sessionBool"
        @click="onOff">
        <template v-slot:prepend>
          <v-icon
            :class="{
                      'text-red': (store.getPump == 'PUMPING' && !store.sessionBool),
                      'text-green': (store.getPump == 'OFF'  && !store.sessionBool)
          }">
            {{ store.getPump == 'PUMPING'  ? 'mdi-power-off' : 'mdi-power' }}
          </v-icon>
        </template>
          <b>{{ store.getPump == 'PUMPING'  ? 'OFF' : 'ON' }}</b>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
  import { usePmpctrlStore } from '@/store';

  const store = usePmpctrlStore()

  const emit = defineEmits(['pumpOn', 'pumpOff'])

  function onOff() {
    store.getPump == 'PUMPING' ? emit('pumpOff') : emit('pumpOn')
  }
</script>
