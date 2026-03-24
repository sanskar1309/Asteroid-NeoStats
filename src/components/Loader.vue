<template>
  <div class="loader-overlay">
    <div class="loader-body">
      <!-- Spinning rings -->
      <div class="ring-wrap">
        <div class="ring ring--outer"></div>
        <div class="ring ring--inner"></div>
        <div class="ring-core">☄️</div>
      </div>
      <!-- Text -->
      <p class="loader-label">Scanning Near-Earth Objects</p>
      <div class="loader-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "Loader" };
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(3, 7, 18, 0.96);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9999;
}

.loader-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

/* Ring container */
.ring-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid transparent;
  animation: spin 1.2s linear infinite;
}

.ring--outer {
  border-top-color: #3b82f6;
  border-right-color: rgba(59, 130, 246, 0.2);
}

.ring--inner {
  inset: 12px;
  border-top-color: #06b6d4;
  border-left-color:  rgba(6, 182, 212, 0.2);
  animation-duration: 0.8s;
  animation-direction: reverse;
}

.ring-core {
  position: relative;
  font-size: 1.5rem;
  animation: float 2.5s ease-in-out infinite;
}

/* Label */
.loader-label {
  color: #475569;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.04em;
}

/* Animated dots */
.loader-dots {
  display: flex;
  gap: 6px;
}

.loader-dots span {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #1e3a5f;
  animation: dot-pulse 1.4s ease-in-out infinite both;
}

.loader-dots span:nth-child(1) { animation-delay: 0s; }
.loader-dots span:nth-child(2) { animation-delay: 0.2s; }
.loader-dots span:nth-child(3) { animation-delay: 0.4s; }

/* Keyframes */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-5px); }
}

@keyframes dot-pulse {
  0%, 80%, 100% { background: #1e3a5f; transform: scale(1); }
  40%           { background: #3b82f6; transform: scale(1.4); }
}
</style>
