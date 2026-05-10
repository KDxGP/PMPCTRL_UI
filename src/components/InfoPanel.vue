<template>
  <div class="bg-grey-darken-4 pa-2">
    <div class="ml-2 mr-2">
      INFO
    </div>
    <div class="ml-2 mr-2 d-flex flex-row justify-space-between">
    <a href="https://www.kdxgp.com" target="_blank" class="text-h4 font-weight-black d-flex align-center text-decoration-none">
        <img src="/logo.webp" alt="KDxGP logo" height="28" class="mr-2"> KDxGP
      </a>
      <div class="text-h4 font-weight-black">
        PMPCTRL
      </div>
    </div>
    <div class="d-flex flex-row justify-space-between align-center mr-2 ml-2">
      <div class="text-caption">© 2026. All rights resevred.</div>
      <div class="text-caption"">
        <a class="text-decoration-none hover:text-decoration-underline" href="" target="_blank">Manual</a> |
        <a class="text-decoration-none" href="https://github.com/KDxGP/PMPCTRL" target="_blank">v{{ props.pmpctrlVersion }}</a> |
        <a class="text-decoration-none" href="https://github.com/KDxGP/PMPCTRL_UI" target="_blank">UI v{{ props.pmpctrlUiVersion }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['pmpctrlVersion', 'pmpctrlUiVersion'])
</script>
