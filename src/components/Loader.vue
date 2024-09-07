<template>
    <div class="loader-container">
      <img src="/src/assets/loader.gif" alt="Loading..." class="loader" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loader',
  };
  </script>
  
  <style scoped>
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }
  
  .loader {
    width: 200px; 
  }
  </style>
  