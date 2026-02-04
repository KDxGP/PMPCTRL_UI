<template>
  <v-sheet class="bg-grey-darken-4 pa-2" min-width="380">
    <div class="ml-2 mr-2">
      PRESSURE_TARGET [{{ disableSlider ? 'DISABLED' : 'ENABLED' }}]
    </div>
    <div :class="{'text-grey-darken-3': disableSlider}">
      <div class="ml-2 mr-2 d-flex flex-row justify-space-between">
        <div>
          <span class="text-h4 font-weight-black">
            {{ displayPressureTarget }}
          </span><strong>MBAR</strong>
        </div>
        <div>
          <span class="text-h4">
            {{ displayPressureDiff }}
          </span>MBAR
        </div>
      </div>
      <div class="ml-2 mr-2" style="line-height: 0.2;">
          <strong>{{ displayPressureTolerance }}</strong>
      </div>
      <div class="ml-2 mr-2 pt-2 d-flex flex-row justify-space-between">
        <div>
          <span class="text-h4 font-weight-black">
            {{ displayPressureTargetInhg }}
          </span><strong>INHG</strong>
        </div>
        <div>
          <span class="text-h4">
            {{ displayPressureDiffInhg }}
          </span><span>INHG</span>
        </div>
      </div>
      <div class="ml-2 pb-2" style="line-height: 0.2;">
          <strong>{{ displayPressureToleranceInhg }}</strong>
      </div>
    </div>
    <div class="ma-2 pt-2 pb-2 bg-grey-darken-3">
      <v-slider
        v-model="pressureTarget"
        :disabled="disableSlider"
        hide-details="true"
        step="1"
        max="1084"
        min="450"
        @pointerup="changePressureTarget">
        <template v-slot:prepend>
          <v-btn icon="mdi-minus" size="medium" variant="text" @click="pressureTargetDecrement"></v-btn>
        </template>
        <template v-slot:append>
          <v-btn icon="mdi-plus" size="medium" variant="text" @click="pressureTargetIncrement"></v-btn>
        </template>
      </v-slider>
    </div>
  </v-sheet>
</template>


<script setup>
  import { usePmpctrlStore } from '@/store'
  import { computed, ref, onBeforeUpdate } from 'vue'

  const MBAR_TO_INHG = 33.86389

  const store = usePmpctrlStore()

  const props = defineProps(['target'])

  const emit = defineEmits(['updatePressureTarget'])

  let pressureTarget = ref()

  let disableSlider = computed(() => {
    return store.getModeActive == "PULSATING" ? true : false
  })

  const displayPressureTarget = computed(() => {
    if (pressureTarget.value === undefined) { return 'N/A' }
    return pressureTarget.value.toFixed(2)
  })

  const displayPressureTargetInhg = computed(() => {
    if (pressureTarget.value === undefined) { return 'N/A' }
    return (pressureTarget.value / MBAR_TO_INHG).toFixed(2)
  })

  const displayPressureTolerance = computed(() => {
    if (store.pressure.target.tolerance_minus === undefined || store.pressure.target.tolerance_plus === undefined) { return '+_._/-_._' }
    let tolPlus = store.pressure.target.tolerance_plus.toFixed(1)
    let tolMinus = store.pressure.target.tolerance_minus.toFixed(1)
    return '+'.concat(tolPlus).concat('/-').concat(tolMinus)
  })

  const displayPressureToleranceInhg = computed(() => {
    if (store.pressure.target.tolerance_minus === undefined || store.pressure.target.tolerance_plus === undefined) { return '+_._/-_._' }
    let tolPlus = (store.pressure.target.tolerance_plus / MBAR_TO_INHG).toFixed(1)
    let tolMinus = (store.pressure.target.tolerance_minus / MBAR_TO_INHG).toFixed(1)
    return '+'.concat(tolPlus).concat('/-').concat(tolMinus)
  })

  const displayPressureDiff = computed(() => {
    let diff = 'N/A'
    if (pressureTarget.value === undefined || store.pressure.setpoint === undefined) { return diff }
    diff = (pressureTarget.value - store.pressure.setpoint).toFixed(2)
    diff = ( diff < 0 ? "" : "+" ) + diff
    return diff

  })

  const displayPressureDiffInhg = computed(() => {
    let diff = 'N/A'
    if (pressureTarget.value === undefined || store.pressure.setpoint === undefined) { return diff }
    diff = ((pressureTarget.value - store.pressure.setpoint) / MBAR_TO_INHG).toFixed(2)
    diff = ( diff < 0 ? "" : "+" ) + diff
    return diff

  })

  function pressureTargetDecrement() {
    pressureTarget.value--
    changePressureTarget()
  }

  function pressureTargetIncrement() {
    pressureTarget.value++
    changePressureTarget()
  }

  function changePressureTarget() {
    emit('updatePressureTarget', pressureTarget.value)
  }

  onBeforeUpdate(() => {
    pressureTarget.value = props.target
  })
</script>
