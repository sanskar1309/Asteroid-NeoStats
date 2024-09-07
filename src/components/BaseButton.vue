<template>
  <button
    class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    @click="$emit('click')"
  > <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
};
</script>

