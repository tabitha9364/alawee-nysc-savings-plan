<script setup lang="ts">
import { MONTH_NAMES, PLAN } from "../data/plan";
defineProps<{ currentMonth: number }>();
</script>

<template>
  <section class="timeline" aria-label="12-month NYSC service journey">
    <div class="timeline-head">
      <span class="eyebrow">YOUR SERVICE YEAR</span
      ><span class="timeline-state"
        >{{ currentMonth }} of {{ PLAN.months }} months</span
      >
    </div>
    <div class="timeline-grid">
      <div
        v-for="(month, index) in MONTH_NAMES"
        :key="month"
        class="month-node"
        :class="{
          complete: index + 1 < currentMonth,
          current: index + 1 === currentMonth,
        }"
        :aria-label="`${month}${index + 1 < currentMonth ? ', complete' : index + 1 === currentMonth ? ', current month' : ''}`"
      >
        <span class="node-dot"
          ><svg
            v-if="index + 1 < currentMonth"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="m3 8 3 3 7-7" /></svg
          ><span v-else-if="index + 1 === currentMonth"
        /></span>
        <span class="month-label">{{
          String(index + 1).padStart(2, "0")
        }}</span>
      </div>
      <div class="pop-node">
        <span class="pop-seal">✳</span><span class="month-label">POP</span>
      </div>
    </div>
    <div class="timeline-rail" aria-hidden="true">
      <span
        :style="{ width: `${((currentMonth - 1) / PLAN.months) * 100}%` }"
      />
    </div>
  </section>
</template>
