<template>
  <button class="btn-glow" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default { name: "BaseButton" };
</script>
