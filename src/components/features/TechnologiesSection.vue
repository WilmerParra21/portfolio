<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSupabase } from '../../composables/useSupabase';
import type { Technology, TechnologyCategory } from '../../types/portfolio';

const PAGE_SIZE = 6;

const { t } = useI18n();
const { portfolioState } = useSupabase();
const activeCategory = ref<TechnologyCategory>('web');
const currentPage = ref(0);
const touchStartX = ref<number | null>(null);
const touchCurrentX = ref<number | null>(null);
const slideDirection = ref<'next' | 'previous'>('next');

const categories: TechnologyCategory[] = ['web', 'mobile', 'desktop', 'automation'];
const hasDescriptions = computed(() => portfolioState.technologies.some((technology: Technology) => technology.description && String(technology.description).trim()));

const filteredTechnologies = computed(() =>
  portfolioState.technologies.filter((technology: Technology) => technology.category === activeCategory.value),
);

const technologyPages = computed(() => {
  const chunks = [] as typeof filteredTechnologies.value[];

  for (let index = 0; index < filteredTechnologies.value.length; index += PAGE_SIZE) {
    chunks.push(filteredTechnologies.value.slice(index, index + PAGE_SIZE));
  }

  return chunks;
});

const totalPages = computed(() => Math.max(technologyPages.value.length, 1));
const shouldUseCarousel = computed(() => filteredTechnologies.value.length > PAGE_SIZE);
const visibleTechnologies = computed(() =>
  shouldUseCarousel.value ? technologyPages.value[currentPage.value] ?? [] : filteredTechnologies.value,
);

function resetTechnologyState() {
  currentPage.value = 0;
}

function goToPreviousPage() {
  slideDirection.value = 'previous';
  currentPage.value = currentPage.value === 0 ? totalPages.value - 1 : currentPage.value - 1;
}

function goToNextPage() {
  slideDirection.value = 'next';
  currentPage.value = currentPage.value === totalPages.value - 1 ? 0 : currentPage.value + 1;
}

function goToPage(index: number) {
  slideDirection.value = index >= currentPage.value ? 'next' : 'previous';
  currentPage.value = index;
}

function handleTouchStart(event: TouchEvent) {
  if (!shouldUseCarousel.value) return;

  touchStartX.value = event.touches[0]?.clientX ?? null;
  touchCurrentX.value = touchStartX.value;
}

function handleTouchMove(event: TouchEvent) {
  if (touchStartX.value === null) return;

  touchCurrentX.value = event.touches[0]?.clientX ?? touchCurrentX.value;
}

function handleTouchEnd() {
  if (touchStartX.value === null || touchCurrentX.value === null) {
    touchStartX.value = null;
    touchCurrentX.value = null;
    return;
  }

  const deltaX = touchCurrentX.value - touchStartX.value;
  const swipeThreshold = 48;

  if (Math.abs(deltaX) >= swipeThreshold) {
    if (deltaX < 0) {
      goToNextPage();
    } else {
      goToPreviousPage();
    }
  }

  touchStartX.value = null;
  touchCurrentX.value = null;
}

watch(activeCategory, resetTechnologyState);
watch(filteredTechnologies, () => {
  if (currentPage.value >= totalPages.value) {
    currentPage.value = 0;
  }
});
</script>

<template>
  <section id="technologies" class="relative overflow-hidden py-10 sm:py-12">
    <div class="section-shell">
      <div class="mb-4 section-label">
        <span class="tech-label">// 04</span>
        <div class="section-label-line"></div>
        <span class="muted-label">{{ t('sections.technologies') }}</span>
      </div>
      <div class="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 class="font-display text-[36px] md:text-[42px] font-black leading-[1.08] tracking-[-0.02em] text-offWhite mb-4">
            Stack <span class="gradient-volt">técnico</span>
          </h2>
          <p class="text-[17px] leading-[1.65] text-offWhite/75 mb-4">{{ t('technologies.intro') }}</p>

          <div class="flex flex-wrap gap-2" role="tablist" :aria-label="t('technologies.categoriesAria')">
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              role="tab"
              class="font-mono text-xs font-semibold tracking-[0.1em] uppercase px-4 py-2 rounded-full transition-all"
              :class="
                activeCategory === category
                  ? 'bg-volt text-obsidian shadow-voltGlow'
                  : 'border border-white/10 bg-carbon/40 text-offWhite/70 hover:border-volt/30 hover:text-volt'
              "
              @click="activeCategory = category"
            >
              {{ t('technologies.' + category) }}
            </button>
          </div>
        </div>

        <div>
          <div class="mb-4 flex items-center justify-between gap-4">
            <p class="font-mono text-[13px] leading-6 text-offWhite/55">
              {{ t('technologies.carouselHint', { visible: Math.min(PAGE_SIZE, filteredTechnologies.length), total: filteredTechnologies.length }) }}
            </p>
            <div v-if="shouldUseCarousel" class="flex items-center gap-2">
              <button
                type="button"
                class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-offWhite transition-all hover:border-volt/40 hover:text-volt"
                :aria-label="t('technologies.previousPage')"
                @click="goToPreviousPage"
              >
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-offWhite transition-all hover:border-volt/40 hover:text-volt"
                :aria-label="t('technologies.nextPage')"
                @click="goToNextPage"
              >
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div
            class="technology-carousel-stage"
            @touchstart.passive="handleTouchStart"
            @touchmove.passive="handleTouchMove"
            @touchend="handleTouchEnd"
            @touchcancel="handleTouchEnd"
          >
            <transition :name="slideDirection === 'next' ? 'technology-page-next' : 'technology-page-previous'" mode="out-in">
              <div
                :key="activeCategory + '-' + currentPage"
                class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                <article
                  v-for="technology in visibleTechnologies"
                  :key="technology.id"
                  class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-sm shadow-[0_16px_50px_rgba(0,0,0,0.28)] transition-all hover:-translate-y-1 hover:border-volt/30 hover:bg-white/[0.04]"
                >
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center">
                      <img class="h-8 w-8 object-contain" :src="technology.icon_url" :alt="technology.name" loading="lazy" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-[17px] font-black leading-tight text-offWhite">{{ technology.name }}</h3>
                      <p class="mt-0.5 font-mono text-[10px] tracking-[0.28em] uppercase text-offWhite/45">
                        {{ t('technologies.' + technology.category) }}
                      </p>
                    </div>
                  </div>

                  <div
                    v-if="(technology.description || '').trim()"
                    class="tech-tooltip"
                  >
                    {{ technology.description }}
                  </div>
                </article>
              </div>
            </transition>
          </div>

          <div v-if="shouldUseCarousel" class="mt-6 flex justify-center gap-2">
            <button
              v-for="(_, index) in technologyPages"
              :key="'page-' + index"
              type="button"
              class="h-2.5 transition-all"
              :class="currentPage === index ? 'w-8 bg-volt' : 'w-2.5 bg-white/20 hover:bg-white/40'"
              :aria-label="t('technologies.goToPage', { page: index + 1 })"
              @click="goToPage(index)"
            />
          </div>
        </div>
      </div>

      <div class="mt-10">
        <div class="section-label mb-6">
          <span class="tech-label">// Tools</span>
          <div class="section-label-line"></div>
          <span class="muted-label">{{ t('sections.tools') }}</span>
        </div>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="tool in portfolioState.tools"
            :key="tool.id"
            class="group flex items-center gap-3 overflow-hidden rounded-[1.75rem] border border-white/10 bg-carbon/20 px-4 py-3 hover:border-volt/30 transition-all"
          >
            <img class="h-8 w-8 object-contain" :src="tool.icon_url" :alt="tool.name" loading="lazy" />
            <span class="font-mono text-sm font-medium text-offWhite/90 group-hover:text-volt transition-colors">
              {{ tool.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-tooltip {
  position: absolute;
  left: 0;
  bottom: calc(100% + 8px);
  z-index: 30;
  width: max-content;
  max-width: 240px;
  padding: 8px 12px;
  border-radius: 10px;
  background: #14140f;
  border: 1px solid rgba(204, 255, 0, 0.3);
  color: rgba(245, 245, 247, 0.85);
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;
  pointer-events: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

article:hover .tech-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>
