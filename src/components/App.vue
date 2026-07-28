<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import AboutSection from '@/components/features/AboutSection.vue';
import ContactSection from '@/components/features/ContactSection.vue';
import CurriculumSection from '@/components/features/CurriculumSection.vue';
import HeroSection from '@/components/features/HeroSection.vue';
import ProjectsSection from '@/components/features/ProjectsSection.vue';
import ServicesSection from '@/components/features/ServicesSection.vue';
import TechnologiesSection from '@/components/features/TechnologiesSection.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import SiteHeader from '@/components/layout/SiteHeader.vue';
import { useSupabase } from '@/composables/useSupabase';

const { locale } = useI18n();
const { init: initSupabase } = useSupabase();
const isDark = ref(true);
const animationsEnabled = ref(true);
const scrollDepth = ref(0);
const showBackToTop = ref(false);
let motionMedia: MediaQueryList | null = null;

const parallaxStyle = computed(() => ({
  '--scroll-depth': scrollDepth.value.toFixed(2),
}));

const fondoBgStyle = "background-image: url('/images/fondo.webp')";

function updateParallaxDepth() {
  scrollDepth.value = window.scrollY;
  showBackToTop.value = window.scrollY > 400;
}

function enableParallaxListener() {
  updateParallaxDepth();
  window.addEventListener('scroll', updateParallaxDepth, { passive: true });
}

function disableParallaxListener() {
  window.removeEventListener('scroll', updateParallaxDepth);
  scrollDepth.value = 0;
}

function handleReducedMotionChange(event: MediaQueryListEvent) {
  animationsEnabled.value = !event.matches;
}

watch(
  animationsEnabled,
  (enabled) => {
    if (enabled) {
      enableParallaxListener();
    } else {
      disableParallaxListener();
    }
  },
  { immediate: true },
);

onMounted(async () => {
  document.documentElement.classList.toggle('dark', isDark.value);
  document.documentElement.lang = locale.value;
  motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionMedia.matches) {
    animationsEnabled.value = false;
  }
  motionMedia.addEventListener('change', handleReducedMotionChange);
  try {
    await initSupabase();
  } catch (err) {
    console.warn('[App] initSupabase failed:', err);
  }
});

onUnmounted(() => {
  disableParallaxListener();
  motionMedia?.removeEventListener('change', handleReducedMotionChange);
});
</script>

<template>
  <div
    class="site-cosmos min-h-screen text-offWhite antialiased"
    :class="{ 'fx-enabled': animationsEnabled }"
    :style="parallaxStyle"
  >
    <!-- Global corridor background shared across sections -->
    <div class="global-bg" aria-hidden="true" :style="fondoBgStyle" />

    <!-- Fluid fog / mist ambience -->
    <div class="fog-fx" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>

    <SiteHeader />
    <main class="relative z-10">
      <HeroSection />
      <CurriculumSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TechnologiesSection />
      <ContactSection />
    </main>
    <SiteFooter />

    <!-- Back to top button - global -->
    <a
      v-if="showBackToTop"
      href="#top"
      class="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-volt bg-carbon text-volt shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300 hover:bg-volt hover:text-obsidian hover:shadow-[0_0_30px_rgba(204,255,0,0.6)]"
      title="Volver al inicio"
    >
      <svg
        viewBox="0 0 24 24"
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  </div>
</template>
