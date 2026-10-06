<script setup lang="ts">
import { PLAN } from "../data/plan";
import { formatNaira } from "../utils/currency";

defineProps<{ modelValue: number }>();
const emit = defineEmits<{ "update:modelValue": [value: number] }>();

function update(raw: string | number) {
  const numeric = Number(raw);
  if (!Number.isFinite(numeric)) return;
  const bounded = Math.min(
    PLAN.maxMonthlySaving,
    Math.max(PLAN.minMonthlySaving, numeric),
  );
  emit(
    "update:modelValue",
    Math.round(bounded / PLAN.savingStep) * PLAN.savingStep,
  );
}

function saveFullAlawee() {
  emit("update:modelValue", PLAN.monthlyAlawee);
}
</script>

<template>
  <section class="amount-control" aria-labelledby="amount-label">
    <div class="amount-line">
      <span id="amount-label" class="eyebrow">YOUR MONTHLY SAVE</span>
      <div class="amount-entry">
        <span aria-hidden="true">₦</span>
        <input
          :value="modelValue"
          type="number"
          inputmode="numeric"
          :min="PLAN.minMonthlySaving"
          :max="PLAN.maxMonthlySaving"
          :step="PLAN.savingStep"
          aria-label="Monthly savings amount in naira"
          @change="update(($event.target as HTMLInputElement).value)"
          @blur="update(($event.target as HTMLInputElement).value)"
        />
      </div>
      <span class="amount-period">per month</span>
    </div>
    <input
      class="amount-slider"
      type="range"
      :min="PLAN.minMonthlySaving"
      :max="PLAN.maxMonthlySaving"
      :step="PLAN.savingStep"
      :value="modelValue"
      :style="{
        '--range-progress': `${((modelValue - PLAN.minMonthlySaving) / (PLAN.maxMonthlySaving - PLAN.minMonthlySaving)) * 100}%`,
      }"
      aria-label="Adjust monthly savings amount"
      @input="update(($event.target as HTMLInputElement).value)"
    />
    <div class="range-labels">
      <span>{{ formatNaira(PLAN.minMonthlySaving) }}</span
      ><span>{{ formatNaira(PLAN.maxMonthlySaving) }}</span>
    </div>
    <button
      class="full-alawee-button"
      type="button"
      :aria-pressed="modelValue === PLAN.monthlyAlawee"
      @click="saveFullAlawee"
    >
      <span class="uniform-pocket" aria-hidden="true"><i /></span>
      <span
        >Save full Alawee
        <small>{{ formatNaira(PLAN.monthlyAlawee) }} / month</small></span
      >
      <span class="full-alawee-arrow" aria-hidden="true">↗</span>
    </button>
  </section>
</template>
