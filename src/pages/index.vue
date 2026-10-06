<script setup lang="ts">
import { computed, ref } from "vue";
import { PLAN } from "../data/plan";
import { calculateProjection } from "../services/projection";
import { formatNaira } from "../utils/currency";

const step = ref(1);
const monthlySaving = ref<number>(PLAN.defaultMonthlySaving);
const autoSplit = ref(false);
const autoSave = ref(false);
const savingsGoal = ref("Business");
const usedPasses = ref<number[]>([]);
const emergencyWithdrawals = ref<Record<number, number>>({});
const withdrawalAmount = ref(5000);
const projection = computed(() => calculateProjection(monthlySaving.value));
const annualRateLabel = (PLAN.annualEstimateRate * 100).toFixed(1);
const savedSoFar = computed(() =>
  Math.max(
    monthlySaving.value * (PLAN.illustrativeCurrentMonth - 1) -
      Object.values(emergencyWithdrawals.value).reduce(
        (sum, amount) => sum + amount,
        0,
      ),
    0,
  ),
);
const targetSaved = computed(() => monthlySaving.value * PLAN.months);
const remaining = computed(() =>
  Math.max(targetSaved.value - savedSoFar.value, 0),
);
const savingPercent = computed(() => Math.round(projection.value.savingsShare));

function restart() {
  monthlySaving.value = PLAN.defaultMonthlySaving;
  autoSplit.value = false;
  autoSave.value = false;
  usedPasses.value = [];
  emergencyWithdrawals.value = {};
  step.value = 1;
}

function chooseSplit(enabled: boolean) {
  autoSplit.value = enabled;
  monthlySaving.value = enabled
    ? Math.round((PLAN.monthlyAlawee * PLAN.suggestedSavingShare) / 100)
    : PLAN.defaultMonthlySaving;
}

function useEmergencyPass(quarter: number) {
  if (usedPasses.value.includes(quarter) || savedSoFar.value <= 0) return;
  const amount = Math.min(
    Math.max(1_000, withdrawalAmount.value || 1_000),
    savedSoFar.value,
  );
  emergencyWithdrawals.value = {
    ...emergencyWithdrawals.value,
    [quarter]: amount,
  };
  usedPasses.value = [...usedPasses.value, quarter];
}
</script>

<template>
  <main class="app-shell">
    <div class="ambient ambient-one" aria-hidden="true" />
    <div class="ambient ambient-two" aria-hidden="true" />
    <section class="app-frame" :class="`screen-${step}`">
      <StepHeader
        :active-step="step"
        :on-back="step > 1 ? () => step-- : undefined"
      />
      <Transition name="screen" mode="out-in">
        <div :key="step" class="screen-content">
          <template v-if="step === 1">
            <div class="intro-layout">
              <div class="intro-copy">
                <p class="kicker">
                  <span class="kicker-dot" /> MADE FOR YOUR SERVICE YEAR
                </p>
                <h1>Your Alawee<br />can <span>go further.</span></h1>
                <p class="intro-description">
                  PPA transport, data bundles, and that “small expense” that
                  grows legs. Wherever your posting is, give POP-you a head
                  start.
                </p>
                <button class="primary-button" type="button" @click="step = 2">
                  Start saving <span aria-hidden="true">↗</span>
                </button>
              </div>
              <div
                class="service-art"
                aria-label="A 12-month savings journey illustration"
              >
                <div class="art-topline">
                  <span>YOUR NYSC YEAR</span><span>01 — 12</span>
                </div>
                <div class="sun-disc" />
                <div class="route-line">
                  <span class="route-start">YOUR POSTING</span
                  ><span class="route-end">FUTURE YOU</span
                  ><span class="route-point point-a" /><span
                    class="route-point point-b"
                  /><span class="route-point point-c" />
                </div>
                <div class="art-cap">
                  <span class="cap-crest">A</span><span class="cap-rim" />
                </div>
                <div class="art-ticket">
                  <span class="ticket-number">12</span
                  ><span>months<br />to POP</span>
                </div>
                <span class="art-caption">A LITTLE, EVERY MONTH.</span>
              </div>
            </div>
            <div class="overview-strip">
              <div class="overview-item">
                <span class="eyebrow">MONTHLY ALAWEE</span
                ><strong>{{ formatNaira(PLAN.monthlyAlawee) }}</strong
                ><span class="item-note">your monthly allowance</span>
              </div>
              <div class="overview-divider" />
              <div class="overview-item">
                <span class="eyebrow">A YEAR OF SMALL WINS</span
                ><strong>{{ formatNaira(projection.projectedTotal) }}</strong
                ><span class="item-note"
                  >projected from {{ formatNaira(monthlySaving) }}/month</span
                >
              </div>
              <div class="service-chip">
                <span class="chip-icon">↗</span
                ><span
                  ><b>Month 1 of 12</b
                  ><small>Your service year, in progress</small></span
                >
              </div>
            </div>
          </template>

          <template v-else-if="step === 2">
            <div class="setup-heading">
              <p class="kicker">
                <span class="kicker-dot" /> FOR CORPERS, EVERYWHERE
              </p>
              <h1>Start with what<br /><span>works for you.</span></h1>
              <p>
                PPA pay can be patchy, and no two service years run the same.
                Choose what works for you, wherever your posting takes you.
              </p>
            </div>
            <div class="preferences-row">
              <label
                >Saving towards
                <select v-model="savingsGoal">
                  <option>Business</option>
                  <option>Relocation</option>
                  <option>Masters</option>
                  <option>My next chapter</option>
                </select>
              </label>
            </div>
            <div class="setup-grid">
              <div class="setup-main">
                <div class="allowance-bar">
                  <span class="allowance-symbol" aria-hidden="true"
                    ><span class="uniform-pocket"><i /></span></span
                  ><span
                    ><small>YOUR MONTHLY ALAWEE</small
                    ><strong>{{
                      formatNaira(PLAN.monthlyAlawee)
                    }}</strong></span
                  ><span class="allowance-context"
                    >A steady start.<br />A future buffer.</span
                  >
                </div>
                <div class="mode-switch" aria-label="Savings method">
                  <button
                    type="button"
                    :aria-pressed="!autoSplit"
                    @click="chooseSplit(false)"
                  >
                    I’ll choose
                  </button>
                  <button
                    type="button"
                    :aria-pressed="autoSplit"
                    @click="chooseSplit(true)"
                  >
                    Auto-split
                  </button>
                </div>
                <div v-if="autoSplit" class="split-panel">
                  <div>
                    <span>Upkeep</span
                    ><b>50% · {{ formatNaira(PLAN.monthlyAlawee * 0.5) }}</b>
                  </div>
                  <div>
                    <span>Locked savings</span
                    ><b>30% · {{ formatNaira(monthlySaving) }}</b>
                  </div>
                  <div>
                    <span>Emergency buffer</span
                    ><b>20% · {{ formatNaira(PLAN.monthlyAlawee * 0.2) }}</b>
                  </div>
                  <p>
                    Suggested split. Switch to “I’ll choose” to set another
                    amount.
                  </p>
                </div>
                <AmountControl v-else v-model="monthlySaving" />
                <label class="auto-save-toggle"
                  ><input v-model="autoSave" type="checkbox" /><span
                    ><b>Automate my saving</b
                    ><small
                      >Watch for Alawee in the last week of each month</small
                    ></span
                  ></label
                >
                <p v-if="autoSave" class="demo-note">
                  Opt-in concept only: no account connection or transfer is
                  active in this demo.
                </p>
                <div class="share-note">
                  <span
                    class="share-ring"
                    :style="{
                      '--share': `${Math.min(projection.savingsShare, 100)}%`,
                    }"
                    ><span>{{ savingPercent }}%</span></span
                  ><span
                    >of your Alawee set aside<br /><small
                      >{{
                        formatNaira(PLAN.monthlyAlawee - monthlySaving)
                      }}
                      stays for the month</small
                    ></span
                  >
                </div>
              </div>
              <aside class="projection-panel">
                <p class="eyebrow">AT THE END OF 12 MONTHS</p>
                <div class="projection-total">
                  {{ formatNaira(projection.projectedTotal) }}
                </div>
                <p class="projection-subtitle">your projected amount at POP</p>
                <div class="projection-line">
                  <span>Contributions</span
                  ><strong>{{ formatNaira(projection.contributions) }}</strong>
                </div>
                <div class="projection-line return-line">
                  <span
                    >Estimated returns
                    <button
                      class="info-button"
                      type="button"
                      :title="`Target illustration: ${annualRateLabel}% annual rate, prorated daily on each contribution. Not a live rate or guaranteed.`"
                      aria-label="About estimated returns"
                    >
                      i
                    </button></span
                  ><strong
                    >+{{ formatNaira(projection.estimatedReturns) }}</strong
                  >
                </div>
                <div class="projection-footnote">
                  Target illustration: {{ annualRateLabel }}% p.a., prorated
                  daily for each monthly contribution. Not a live Cowrywise rate
                  or guaranteed return.
                </div>
              </aside>
            </div>
            <div class="setup-bottom">
              <p>
                <span class="tiny-spark">✳</span> Your plan can change as life
                does.
              </p>
              <button class="primary-button" type="button" @click="step = 3">
                See my progress <span aria-hidden="true">↗</span>
              </button>
            </div>
          </template>

          <template v-else>
            <div class="journey-heading">
              <div>
                <p class="kicker">
                  <span class="kicker-dot" />
                  {{ savingsGoal.toUpperCase() }} FUND, IN PROGRESS
                </p>
                <h1>You’re building<br /><span>something.</span></h1>
              </div>
              <div class="month-stamp">
                <strong>04</strong><span>OF 12<br />MONTHS</span>
              </div>
            </div>
            <JourneyTimeline :current-month="PLAN.illustrativeCurrentMonth" />
            <section class="reality-panel">
              <div>
                <b>Reality mode</b
                ><small
                  >One emergency pass each quarter. Life no dey always follow
                  spreadsheet.</small
                >
              </div>
              <label
                >Amount
                <input
                  v-model.number="withdrawalAmount"
                  type="number"
                  min="1000"
                  step="1000"
                  :max="Math.max(savedSoFar, 1000)"
              /></label>
              <div class="quarter-passes">
                <button
                  v-for="quarter in 4"
                  :key="quarter"
                  type="button"
                  :disabled="usedPasses.includes(quarter) || savedSoFar <= 0"
                  @click="useEmergencyPass(quarter)"
                >
                  Q{{ quarter }} ·
                  {{ usedPasses.includes(quarter) ? "used" : "pass" }}
                </button>
              </div>
            </section>
            <div class="journey-summary">
              <div class="saved-panel">
                <span class="eyebrow">YOU’VE PUT ASIDE</span
                ><strong>{{ formatNaira(savedSoFar) }}</strong
                ><span class="saved-caption"
                  >{{ PLAN.illustrativeCurrentMonth - 1 }} months ×
                  {{ formatNaira(monthlySaving) }}</span
                >
                <div class="progress-track">
                  <span
                    :style="{
                      width: `${((PLAN.illustrativeCurrentMonth - 1) / PLAN.months) * 100}%`,
                    }"
                  />
                </div>
                <div class="progress-meta">
                  <span>Progress so far</span
                  ><b
                    >{{
                      Math.round(
                        ((PLAN.illustrativeCurrentMonth - 1) / PLAN.months) *
                          100,
                      )
                    }}%</b
                  >
                </div>
              </div>
              <div class="target-panel">
                <span class="eyebrow">YOUR 12-MONTH CONTRIBUTION TARGET</span
                ><strong>{{ formatNaira(targetSaved) }}</strong>
                <div class="target-row">
                  <span>Still to set aside</span
                  ><b>{{ formatNaira(remaining) }}</b>
                </div>
                <div class="target-row pop-row">
                  <span
                    >Projected at POP
                    <small>incl. estimated returns</small></span
                  ><b>{{ formatNaira(projection.projectedTotal) }}</b>
                </div>
              </div>
            </div>
            <div class="journey-bottom">
              <p>
                <span class="tiny-spark">✳</span> Small-small, Future You is
                looking better.
              </p>
              <button class="secondary-button" type="button" @click="restart">
                Start again <span aria-hidden="true">↺</span>
              </button>
            </div>
          </template>
        </div>
      </Transition>
      <footer class="app-footer">Alawee project</footer>
    </section>
  </main>
</template>
