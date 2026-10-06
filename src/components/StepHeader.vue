<script setup lang="ts">
defineProps<{ activeStep: number; onBack?: () => void }>();
</script>

<template>
  <header class="step-header">
    <button
      v-if="activeStep > 1"
      class="icon-button back-button"
      type="button"
      aria-label="Go back"
      @click="onBack"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m15 18-6-6 6-6M9 12h11" />
      </svg>
    </button>
    <a
      class="wordmark"
      href="#"
      aria-label="Alawee home"
      @click.prevent="onBack ? onBack() : undefined"
    >
      <span class="brand-mark" aria-hidden="true"
        ><span /><span /><span
      /></span>
      <span>alawee</span>
    </a>
    <div class="step-count">
      {{ String(activeStep).padStart(2, "0") }} <span>/ 03</span>
    </div>
    <div class="step-track" aria-label="Journey progress">
      <span
        v-for="step in 3"
        :key="step"
        :class="{ filled: step <= activeStep }"
      />
    </div>
  </header>
</template>
