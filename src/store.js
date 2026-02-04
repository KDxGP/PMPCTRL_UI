import { defineStore } from "pinia"
import { computed, ref } from 'vue'

export const usePmpctrlStore = defineStore('pmpctrl', () => {
  const MBAR_TO_INHG = 33.86389
  const PRESSURE_HISTORY_LENGTH = 120

  const sessionBool = ref(false)
  const session = ref('UNKNOWN')
  const timeUtcNow = ref()
  const timeUtcSessionStart = ref()
  const lastSessionDuration = ref()
  const pump = ref('UNKNOWN')
  const valve = ref('UNKNOWN')

  const pressure = {
      actual : ref(),
      actual_history : ref([]),
      setpoint : ref(),
      auto_setpoint : ref(),
      min : ref(),
      max : ref(),
      target : {
        target : ref(),
        target_history : ref([]),
        tolerance_minus : ref(),
        tolerance_plus : ref()
      }
    }
  const mode = {
    active : ref('UNKNOWN'),
    available : ref(),
    interval : {
      peak_pressure : ref(),
      interval_time : ref()
    },
    pulsating : {
      pump_time : ref(),
      release_time : ref()
    }
  }

  for (let i = 0; i < PRESSURE_HISTORY_LENGTH; i++) {
    pressure.actual_history.value.push(0.0)
    pressure.target.target_history.value.push(0.0)
  }

  const getSession = computed(() => {
    if (session.value == 'on') { return 'STARTED' }
    else if (session.value == 'off') { return 'STOPPED' }
    return session
  })

  function formatDuration(duration) {
    let hours = Math.floor(duration / 3600)
    let minutes = Math.floor((duration - (hours * 3600)) / 60)
    let seconds = duration - (hours * 3600) - (minutes * 60)
    if (hours   < 10) { hours   = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    return hours + ':' + minutes + ':' + seconds
  }

  const getSessionDuration = computed(() => {
    if (!sessionBool.value) { return '--:--:--' }
    let start = new Date(timeUtcSessionStart.value).getTime()
    let now = new Date(timeUtcNow.value).getTime()
    let diffSeconds = Math.floor((now - start) / 1000)
    return formatDuration(diffSeconds)
  })

  const getLastSessionDuration = computed(() => {
    if(lastSessionDuration.value === undefined || lastSessionDuration.value === null) { return '--:--:--' }
    return formatDuration(lastSessionDuration.value)
  })

  const getPump = computed(() => {
    if (pump.value == 'on' ) { return 'PUMPING' }
    else if (pump.value == 'off' ) { return 'OFF' }
    return pump
  })

  const getValve = computed(() => {
    return valve.value.toUpperCase()
  })

  const getPressureActual = computed(() => {
    if (pressure.actual.value === undefined) { return 'N/A' }
    return pressure.actual.value.toFixed(2)
  })

  const getPressureActualInhg = computed(() => {
    if (pressure.actual.value === undefined) { return 'N/A' }
    return (pressure.actual.value / MBAR_TO_INHG).toFixed(2)
  })

  const getPressureSetpoint = computed(() => {
    if (pressure.setpoint.value === undefined) { return 'N/A' }
    return pressure.setpoint.value.toFixed(2)
  })

  const getPressureSetpointInhg = computed(() => {
    if (pressure.setpoint.value === undefined) { return 'N/A' }
    return (pressure.setpoint.value / MBAR_TO_INHG).toFixed(2)
  })

  const getPressureDiff = computed(() => {
    let diff = 'N/A'
    if (pressure.actual.value || pressure.setpoint.value ) {
      diff = (pressure.actual.value - pressure.setpoint.value).toFixed(2)
      diff = ( diff < 0 ? "" : "+" ) + diff
    }
    return diff
  })

  const getPressureDiffInhg = computed(() => {
    let diff = 'N/A'
    if (pressure.actual.value || pressure.setpoint.value ) {
      diff = ((pressure.actual.value - pressure.setpoint.value) / MBAR_TO_INHG).toFixed(2)
      diff = ( diff < 0 ? "" : "+" ) + diff
    }
    return diff
  })

  const getPressureTarget = computed(() => {
    if (pressure.target.target.value === undefined) { return 'N/A'}
    return pressure.target.target.value.toFixed(2)
  })

  const getPressureTargetInhg = computed(() => {
    if (pressure.target.target.value === undefined) { return 'N/A'}
    return (pressure.target.target.value / MBAR_TO_INHG).toFixed(2)
  })

  const getPressureTargetDiff = computed(() => {
    let diff = 'N/A'
    if (pressure.target.target.value || pressure.setpoint.value) {
      diff = (pressure.target.target.value - pressure.setpoint.value).toFixed(2)
      diff = ( diff < 0 ? "" : "+" ) + diff
    }
    return diff
  })

  const getPressureTargetDiffInhg = computed(() => {
    let diff = 'N/A'
    if (pressure.target.target.value || pressure.setpoint.value) {
      diff = ((pressure.target.target.value - pressure.setpoint.value) / MBAR_TO_INHG).toFixed(2)
      diff = ( diff < 0 ? "" : "+" ) + diff
    }
    return diff
  })

  const getModeActive = computed(() => {
    return mode.active.value.toUpperCase()
  })

  function pushPressureHistoryValues(actual, target) {
    pressure.actual_history.value.shift()
    pressure.actual_history.value.push(actual)
    pressure.target.target_history.value.shift()
    pressure.target.target_history.value.push(target)

  }

  return { sessionBool,
           session,
           timeUtcNow,
           timeUtcSessionStart,
           lastSessionDuration,
           pump,
           valve,
           pressure,
           mode,
           getSession,
           getPump,
           getValve,
           getSessionDuration,
           getLastSessionDuration,
           getPressureActual,
           getPressureActualInhg,
           getPressureSetpoint,
           getPressureSetpointInhg,
           getPressureDiff,
           getPressureDiffInhg,
           getPressureTarget,
           getPressureTargetInhg,
           getPressureTargetDiff,
           getPressureTargetDiffInhg,
           getModeActive,
           pushPressureHistoryValues
         }
})
