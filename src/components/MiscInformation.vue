<template>
  <div class="bg-grey-darken-4 pa-2">
    <div class="ml-2 mr-2">
      INFORMATION
    </div>
    <div class="ml-2 mr-2">
      <span class="text-h4 font-weight-black">
        SETTINGS
      </span>
    </div>
    <table class="ml-2 mr-2 w-100">
      <tbody>
        <tr>
          <td>
            MODE
          </td>
          <td>
            <b>{{ props.mode }}</b>
          </td>
        </tr>
        <tr>
          <td>
            PRESSURE MIN/MAX [MBAR]
          </td>
          <td>
            <b>{{ props.pressureMin }} / {{ props.pressureMax }}</b>
          </td>
        </tr>
        <tr>
          <td>
            TARGET TOLERANCE [MBAR]
          </td>
          <td>
            <b>+{{ props.targetTolerancePlus }}/-{{ props.targetToleranceMinus }}</b>
          </td>
        </tr>
        <tr>
          <td>
            SETPOINT [MBAR]
          </td>
          <td>
            <b>{{ setpoint }}</b>
          </td>
        </tr>
        <tr>
          <td>
            AUTO-SETPOINT
          </td>
          <td>
            <b>{{ props.autoSetpoint }}</b>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['mode',
                           'pressureMax',
                           'pressureMin',
                           'targetTolerancePlus',
                           'targetToleranceMinus',
                           'setpoint',
                           'autoSetpoint'
                         ])

const setpoint = computed(() => {
  let setpoint = 'N/A'
  if (typeof props.setpoint != "string") {
    setpoint = props.setpoint.toFixed(2)
  }
  return setpoint
})
</script>
